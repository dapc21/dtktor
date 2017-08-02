/**
 * @class eborasvehicle.controller.Dashboard.Dashboard
 * @extends Ext.app.Controller
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.controller.Dashboard.Dashboard', {
    extend   : 'Ext.app.Controller',
    requires : [],
    models   : [
        'eborasvehicle.model.Dashboard.Plates',
        'eborasvehicle.model.Dashboard.Groups',
        'eborasvehicle.model.Dashboard.GaugeFuelEconomy',
        'eborasvehicle.model.Dashboard.PieIdleTime',
        'eborasvehicle.model.Dashboard.PieAvailableFleet'
    ]
    ,
    stores   : [
        'eborasvehicle.store.Dashboard.Plates',
        'eborasvehicle.store.Dashboard.Groups',
        'eborasvehicle.store.Dashboard.GaugeFuelEconomy',
        'eborasvehicle.store.Dashboard.PieIdleTime',
        'eborasvehicle.store.Dashboard.PieAvailableFleet'
    ]
    ,
    views    : [
        //
    ]
    ,
    refs     : []
    ,
    init : function() {
        console.log('Controller Dashboard Loaded');
        
        this.control({
            '#filterDashboard': {
                //
            },
            '#start_date_dashboard': {
                select: this.selectStartDate,
                change: this.sendData
            },
            '#end_date_dashboard': {
                select: this.selectEndDate,
                change: this.sendData
            },
            'combo[id=vehicle_group_dashboard]' : {
                render : this.loadDefaultValuesCharts,
                select : this.selectComboGroup
            },
            'combo[id=license_plate_dashboard]' : {
                select : this.selectComboPlate
            }
        });
    }
    ,
    selectStartDate: function(picker, date) {
        picker.setValue(date);
        var date = picker.up().up().down('[name=end_date_dashboard]');
        if (picker.getValue() - new Date(new Date() - 24 * 60 * 60 * 1000 * 7 * 4) > 0) {
            date.setMaxValue(new Date(new Date() - 24 * 60 * 60 * 1000));
        } else {
            var a = Ext.Date.add(picker.getValue(), Ext.Date.DAY, 28);
            date.setMaxValue(a);
            date.setValue(a);
        }
        date.setMinValue(picker.getValue());
    }
    ,
    selectEndDate: function(picker, date) {
        picker.setValue(date);
    }
    ,
    selectComboGroup: function(combo, record, index) {
        var comboPlate = Ext.getCmp('license_plate_dashboard');
        comboPlate.reset();
        comboPlate.store.proxy.extraParams = {
            idGroup: combo.getValue()
        };
        comboPlate.store.load();
        comboPlate.setDisabled(false);
        this.sendData();
    }
    ,
    selectComboPlate: function(combo, record, index) {
        this.sendData();
    }
    ,
    loadDefaultValuesCharts: function() {
        var me = this;
        var comboGroup = Ext.getCmp('vehicle_group_dashboard');
        var comboPlate = Ext.getCmp('license_plate_dashboard');
        var cmbStore = comboGroup.getStore();
        cmbStore.load();
        cmbStore.on('load', function() {
           comboGroup.setValue(140);
           comboPlate.setValue('');
           me.sendData();
        });
    }
    ,
    sendData: function() {
        var initialDate = Ext.util.Format.date(new Date(Ext.getCmp('start_date_dashboard').getValue()), "Y-m-d");
        var finalDate = Ext.util.Format.date(new Date(Ext.getCmp('end_date_dashboard').getValue()), "Y-m-d");
        var idGroup = Ext.getCmp('vehicle_group_dashboard').getValue();
        var plt = Ext.getCmp('license_plate_dashboard').getValue();
        var plate = (plt != null) ? plt : '';
        if (initialDate != null && finalDate != null && idGroup != null) {
            this.multiSearch(initialDate, finalDate, idGroup, plate);
        }
    }
    ,
    multiSearch: function(initialDate, finalDate, idGroup, plate) {
        this.buildChartFuelEconomy(initialDate, finalDate, idGroup, plate);
        this.buildChartIdleTime(initialDate, finalDate, idGroup, plate);
        this.buildChartAvailableFleet(initialDate, finalDate, idGroup, plate);
    }
    ,
    buildChartFuelEconomy: function(initialDate, finalDate, idGroup, plate) {
        var storeGaugeFuelEconomy = Ext.create('eborasvehicle.store.Dashboard.GaugeFuelEconomy');
        var cont = 0;
        var loader = new Ext.LoadMask(Ext.getCmp('ctnFuelEconomy').el, {msg: 'Cargando datos...'});
        loader.show();

        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicFuelSaving',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData);
                var panel = Ext.getCmp('ctnGaugeFuelEconomy');
                var fuelPrice = parseFloat(jsonData.fuelPrice).toFixed(2);
                var totalFuelSavingCost = parseFloat(jsonData.totalFuelSavingCost).toFixed(2);

                storeGaugeFuelEconomy.add({
                    name           : 'Ahorro de Combustible',
                    value          : jsonData.fuelSaved,
                    price          : jsonData.fuelPrice,
                    fuelSavingCost : jsonData.totalFuelSavingCost
                });

                var chart = new Ext.chart.Chart({
                    id: 'gaugeFuelEconomy',
                    animate: {
                        easing: 'elasticIn',
                        duration: 1000
                    },
                    height: 265,
                    store: storeGaugeFuelEconomy,
                    insetPadding: 35,
                    axes: [{
                        type: 'gauge',
                        position: 'gauge',
                        minimum: 0,
                        maximum: 100,
                        steps: 10,
                        margin: 7,
                        label: {
                            fill: '#333',
                            font: '12px Heveltica, sans-serif',
                            renderer: function(v) {
                                if (v === 0) return '0%';
                                if (v === 10) return '10%';
                                if (v === 20) return '20%';
                                if (v === 30) return '30%';
                                if (v === 40) return '40%';
                                if (v === 50) return '50%';
                                if (v === 60) return '60%';
                                if (v === 70) return '70%';
                                if (v === 80) return '80%';
                                if (v === 90) return '90%';
                                if (v === 100) return '100%';
                                return ' ';
                            }
                        }
                    }],
                    series: [{
                        type: 'gauge',
                        field: 'value',
                        donut: 80,
                        colorSet: ['#39b54a', '#ddd'],
                        label: {
                            field: 'name',
                            display: 'outside',
                            calloutLine: true
                        },
                        showInLegend: true,
                        highlight: {
                            segment: {
                                margin: 5
                            }
                        },
                        tips: {
                            trackMouse: true,
                            layout: 'fit',
                            width: 200,
                            renderer: function(storeItem, item) {
                                var value = parseFloat(storeItem.get('value')).toFixed(2);
                                this.setTitle(storeItem.get('name') + ': ' + value + '%');
                            }
                        }

                    }]
                });
                panel.add(chart);
                panel.doLayout();
                Ext.getCmp('totalFuelSavingCost').update('<div style="margin-top: 5px;float: right;color: #6D6D6D;font-weight: bold;font-size: 20px;">' + totalFuelSavingCost + ' Lts</div>');
                Ext.getCmp('fuelPrice').update('<div style="margin-top: 5px;float: right;color: #6D6D6D;font-weight: bold;font-size: 20px;">' + fuelPrice + ' Pesos</div>');
                loader.hide();
                this.getTrendFuelEconomy(initialDate, finalDate, idGroup, plate, 1);
            },
            failure : function(response){
                console.log(response);
                if (loader) loader.hide();
            }
        });
    }
    ,
    getTrendFuelEconomy: function(initialDate, finalDate, idGroup, plate, idGraphic) {

        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicTrend',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate,
                'idGraphic'   : idGraphic
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData.trend);
                
                if (jsonData.trend == 'Stable') {
                    Ext.getCmp('headerCtnFuelEconomy').update('<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: #ba9b00;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Ahorro de Combustible</div>');
                }
                if (jsonData.trend == 'Up') {
                    Ext.getCmp('headerCtnFuelEconomy').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 0 8px 13.9px 8px;border-color: transparent transparent #016b11 transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Ahorro de Combustible</div>');
                }
                if (jsonData.trend == 'Down') {
                    Ext.getCmp('headerCtnFuelEconomy').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 13.9px 9px 0 9px;border-color: #7a0101 transparent transparent transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Ahorro de Combustible</div>');
                }
            },
            failure : function(response){
                console.log(response);
            }
        });
    }
    ,
    buildChartIdleTime: function(initialDate, finalDate, idGroup, plate) {
        var storePieIdleTime = Ext.create('eborasvehicle.store.Dashboard.PieIdleTime');
        var cont = 0;
        var loader = new Ext.LoadMask(Ext.getCmp('ctnIdleTime').el, {msg: 'Cargando datos...'});
        loader.show();
        
        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicIdleTime',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData);
                var panel = Ext.getCmp('ctnPieIdleTime');
                var data = [];
                var percentageTotalEngineUse = parseFloat(jsonData.percentageTotalEngineUse).toFixed(2);
                var percentageTotalIdle = parseFloat(jsonData.percentageTotalIdle).toFixed(2);

                data.push({name : 'Total uso del motor', percentage : percentageTotalEngineUse});
                data.push({name : 'Total en ralentí', percentage : percentageTotalIdle});

                storePieIdleTime.add(data);

                var chart = new Ext.chart.Chart({
                    id: 'pieIdleTime',
                    height: 265,
                    animate: true,
                    shadow: false,
                    store: storePieIdleTime,
                    insetPadding: 45,
                    legend: {
                        field: 'name',
                        position: 'bottom',
                        boxStrokeWidth: 0,
                        labelFont: '12px Helvetica'
                    },
                    series: [{
                        type: 'pie',
                        angleField: 'percentage',
                        colorSet: ['#008d36', '#575756'],
                        label: {
                            field: 'name',
                            display: 'outside',
                            calloutLine: true
                        },
                        showInLegend: true,
                        highlight: {
                            segment: {
                                margin: 8
                            }
                        },
                        tips: {
                            trackMouse: true,
                            layout: 'fit',
                            width: 200,
                            renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('percentage') + '%');
                            }
                        }
                    }]
                });
                panel.add(chart);
                panel.doLayout();
                Ext.getCmp('hoursTotalEngineUse').update('<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#09A645;stroke-width:3;stroke:#09A645"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">'+jsonData.hoursTotalEngineUse+'</div>');
                Ext.getCmp('hoursTotalTotalIdle').update('<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#6D6D6D;stroke-width:3;stroke:#6D6D6D"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">'+jsonData.hoursTotalTotalIdle+'</div>');
                loader.hide();
                this.getTrendIdleTime(initialDate, finalDate, idGroup, plate, 2);
            },
            failure : function(response){
                console.log(response);
                if (loader) loader.hide();
            }
        });
    }
    ,
    getTrendIdleTime: function(initialDate, finalDate, idGroup, plate, idGraphic) {

        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicTrend',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate,
                'idGraphic'   : idGraphic
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData.trend);
                if (jsonData.trend == 'Stable') {
                    Ext.getCmp('headerCtnIdleTime').update('<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: #ba9b00;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Tiempo ralentí</div>');
                }
                if (jsonData.trend == 'Up') {
                    Ext.getCmp('headerCtnIdleTime').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 0 8px 13.9px 8px;border-color: transparent transparent #016b11 transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Tiempo ralentí</div>');
                }
                if (jsonData.trend == 'Down') {
                    Ext.getCmp('headerCtnIdleTime').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 13.9px 9px 0 9px;border-color: #7a0101 transparent transparent transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Tiempo ralentí</div>');
                }
            },
            failure : function(response){
                console.log(response);
            }
        });
    }
    ,
    buildChartAvailableFleet: function(initialDate, finalDate, idGroup, plate) {
        var storePieAvailableFleet = Ext.create('eborasvehicle.store.Dashboard.PieAvailableFleet');
        var cont = 0;
        var loader = new Ext.LoadMask(Ext.getCmp('ctnAvailableFleet').el, {msg: 'Cargando datos...'});
        loader.show();
        
        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicFleetAvailability',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData);
                var panel = Ext.getCmp('ctnPieAvailableFleet');
                var data = [];
                var percentageTotalAvailability = parseFloat(jsonData.percentageTotalAvailability).toFixed(2);
                var percentageTotalTimeUse = parseFloat(jsonData.percentageTotalTimeUse).toFixed(2);

                data.push({name : 'Tiempo de disponibilidad', percentage : percentageTotalAvailability});
                data.push({name : 'Tiempo total uso', percentage : percentageTotalTimeUse});

                storePieAvailableFleet.add(data);

                var chart = new Ext.chart.Chart({
                    id: 'pieAvailableFleet',
                    height: 265,
                    animate: true,
                    shadow: false,
                    store: storePieAvailableFleet,
                    insetPadding: 45,
                    legend: {
                        field: 'name',
                        position: 'bottom',
                        boxStrokeWidth: 0,
                        labelFont: '12px Helvetica'
                    },
                    series: [{
                        type: 'pie',
                        angleField: 'percentage',
                        colorSet: ['#F48C03', '#AD6003'],
                        label: {
                            field: 'name',
                            display: 'outside',
                            calloutLine: true
                        },
                        showInLegend: true,
                        highlight: {
                            segment: {
                                margin: 8
                            }
                        },
                        tips: {
                            trackMouse: true,
                            layout: 'fit',
                            width: 200,
                            renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('percentage') + '%');
                            }
                        }
                    }]
                });
                panel.add(chart);
                panel.doLayout();
                Ext.getCmp('hoursTotalAvailability').update('<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#F48C03;stroke-width:3;stroke:#F48C03"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">'+jsonData.hoursTotalAvailability+'</div>');
                Ext.getCmp('hoursTotalTimeUse').update('<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#AD6003;stroke-width:3;stroke:#AD6003"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">'+jsonData.hoursTotalTimeUse+'</div>');
                loader.hide();
                this.getTrendAvailableFleet(initialDate, finalDate, idGroup, plate, 3);
            },
            failure : function(response){
                console.log(response);
                if (loader) loader.hide();
            }
        });
    }
    ,
    getTrendAvailableFleet: function(initialDate, finalDate, idGroup, plate, idGraphic) {

        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbDashBoard/rbGraphicTrend',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'initialDate' : initialDate,
                'finalDate'   : finalDate,
                'idGroup'     : idGroup,
                'plate'       : plate,
                'idGraphic'   : idGraphic
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var jsonData = Ext.decode(response.responseText);
                console.log(jsonData.trend);
                if (jsonData.trend == 'Stable') {
                    Ext.getCmp('headerCtnAvailableFleet').update('<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: #ba9b00;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Disponibilidad de la flota</div>');
                }
                if (jsonData.trend == 'Up') {
                    Ext.getCmp('headerCtnAvailableFleet').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 0 8px 13.9px 8px;border-color: transparent transparent #016b11 transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Disponibilidad de la flota</div>');
                }
                if (jsonData.trend == 'Down') {
                    Ext.getCmp('headerCtnAvailableFleet').update('<div style="float: left;margin-left:8px;width: 0;height: 0;border-style: solid;border-width: 13.9px 9px 0 9px;border-color: #7a0101 transparent transparent transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Disponibilidad de la flota</div>');
                }
            },
            failure : function(response){
                console.log(response);
            }
        });
    }
});