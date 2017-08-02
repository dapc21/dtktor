/**
 * @class eborasvehicle.view.Tools.Filter
 * @extends Ext.container.Container
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.view.Tools.Filter', {
    extend: 'Ext.container.Container',
    xtype: 'app-filter',
    cls: 'ctn-filter',
    name: 'filter-view',
    require: ['eborasvehicle.view.Tools.GlobalFunction', 'Ext.Date'],

    initComponent: function() {
        var storeDriver = Ext.create('eborasvehicle.store.Tools.Drivers');
        var storePlate = Ext.create('eborasvehicle.store.Tools.Plates');
        var storeVehicle = Ext.create('eborasvehicle.store.Tools.Vehicles');
        var url = 'http://' + restService + '/rbPlanner/rbGraphicPlannerDrivingTime';
        //var url = 'http://eborastester.invytec.com/AppEborasBasic/eborasbasic/rbPlanner/rbGraphicPlannerDrivingTime';
        var date = new Date().getFullYear();
        var yearNow = date;
        var monthNow = new Date().getMonth();
        var object = [];
        var monthNames = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];


        for (var i = 0; i <= 2; i++) {

            object.push({
                'year': date
            });
            date -= 1;
        }


        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['year'],
            data: object
        });
        var monthStore = Ext.create('Ext.data.Store', {
            fields: ['month'],
            data: [
                { 'month': 'Enero' },
                { 'month': 'Febrero' },
                { 'month': 'Marzo' },
                { 'month': 'Abril' },
                { 'month': 'Mayo' },
                { 'month': 'Junio' },
                { 'month': 'Julio' },
                { 'month': 'Agosto' },
                { 'month': 'Septiembre' },
                { 'month': 'Octubre' },
                { 'month': 'Noviembre' },
                { 'month': 'Diciembre' }
            ]
        });
        var monthStoreReverse = Ext.create('Ext.data.Store', {
            fields: ['month'],
            data: [
                { 'Enero': 1 },
                { 'Febrero': 2 },
                { 'Marzo': 3 },
                { 'Abril': 4 },
                { 'Mayo': 5 },
                { 'Junio': 6 },
                { 'Julio': 7 },
                { 'Agosto': 8 },
                { 'Septiembre': 9 },
                { 'Octubre': 10 },
                { 'Noviembre': 11 },
                { 'Diciembre': 12 }
            ]
        });
        this.items = [{
            xtype: 'container',
            cls: 'ctn-filter-allcomponents',
            items: [{
                    xtype: 'container',
                    width: 100,
                    cls: 'ctn-filter-buttons',
                    items: [
                        /*{
                         xtype: 'button',
                         iconCls: 'iconalarmoff',
                         cls: 'x-btn-dashboard x-btn-default-medium-dashboard',
                         scale: 'medium'
                         },*/
                        {
                            xtype: 'button',
                            iconCls: 'iconcal',
                            cls: 'x-btn-dashboard x-btn-default-medium-dashboard',
                            menuAlign: 'tr-tl?',
                            scale: 'medium',
                            arrowCls: '',
                            //style: 'margin: 0px 0px 0px 55px;',
                            listeners: {
                                click: function(button) {
                                        var endDate = button.up().up().up().up().down('[name=end_date]');
                                        var statDate = button.up().up().up().up().down('[name=start_date]');

                                        var gorup = button.up().up().up().up().down('[name=vehicle_group]');
                                        var VehiclesPlate = button.up().up().up().up().down('[name=license_plate]');
                                        storePlate.proxy.extraParams = {
                                            idGroup: gorup.getValue()
                                        };
                                        storePlate.load();
                                        if (VehiclesPlate.getValue() == 'Todas') {
                                            VehiclesPlate = 0;
                                        } else {
                                            VehiclesPlate = VehiclesPlate.getValue()
                                        }
                                        debugger;
                                        //var calendarStore = new Extensible.calendar.data.CalendarModel({ CalendarId: 5, Title: 'My Holidays', Description: 'My personal holiday schedule', ColorId: 3 });
                                        /* var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                         // defined in ../data/Events.js
                                         data: eborasvehicle.view.Tools.GlobalFunction.getData()
                                         });*/

                                        Ext.Ajax.request({
                                            url: url,
                                            method: "POST",
                                            params: Ext.JSON.encode({
                                                "initialDate": statDate['rawValue'],
                                                "finalDate": endDate['rawValue'],
                                                "idGroup": gorup.getValue(),
                                                "plate": VehiclesPlate
                                            }),
                                            success: function(data) {
                                                var dataStore = JSON.parse(data.responseText);
                                                //debugger;
                                                dataStore.forEach(function(item) {
                                                    item.dateEnd = new Date(item.dateEnd + ' ' + item.hourEnd);
                                                    item.dateStart = new Date(item.dateStart + ' ' + item.hourStart);
                                                    item.Notes = item.hourStart + ' ---- ' + item.hourEnd;
                                                    item.Title = item.driverName + ' ID: ' + item.driverIdentification;
                                                });
                                                app.eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                                    data: dataStore,
                                                    autoMsg: false
                                                });
                                                var calendar = Ext.create('Extensible.calendar.CalendarPanel', {
                                                    eventStore: app.eventStore,
                                                    name: 'calendar',
                                                    //renderTo: 'simple',
                                                    //title: 'Basic Calendar',
                                                    width: 1250,
                                                    height: 530,
                                                    monthViewCfg: {
                                                        showHeader: false,
                                                        showWeekLinks: false,
                                                        showWeekNumbers: false
                                                    },
                                                    showDayView: false,
                                                    showMultiDayView: false,
                                                    showWeekView: false,
                                                    showMultiWeekView: false,
                                                    showMonthView: true,
                                                    showNavBar: false,
                                                    showTodayText: false,
                                                    showTime: false,
                                                    editModal: false,
                                                    eventupdate: false,
                                                    enableEditDetails: false,

                                                });
                                                var win = Ext.create('Ext.window.Window', {
                                                    title: 'Planner',
                                                    height: 600,
                                                    width: 1250,
                                                    //modal: true,
                                                    cls: 'window-fuel-dash',
                                                    name: 'planner',
                                                    draggable: false,
                                                    //closable: false,
                                                    tools: [{
                                                            xtype: 'combobox',
                                                            cls: 'vehicule-dropdown combo-fontsize',
                                                            name: 'license_plate_planner_year',
                                                            style: 'margin-right:2em;',
                                                            hideLabel: true,
                                                            store: yearStore,
                                                            displayField: 'year',
                                                            valueField: 'year',
                                                            typeAhead: true,
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            value: yearNow,
                                                            // disabled: true,
                                                            //allowBlank: false,

                                                            width: 100,
                                                            indent: true,
                                                            listConfig: {
                                                                loadingText: null,
                                                                loadMask: false
                                                            },
                                                            listeners: {
                                                                select: function(comb, records) {

                                                                    var calendar = comb.up().up().down('[name=calendar]');
                                                                    var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                    var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                    var groupVehicle = comb.up().up().down('[name=vehicle_group_planer]');
                                                                    //calendar.setStartDate(new Date(comb.getValue() + '-' + mont.getValue()));

                                                                    Ext.Ajax.request({
                                                                        url: url,
                                                                        method: "POST",
                                                                        params: Ext.JSON.encode({
                                                                            "initialDate": comb.getValue() + '-' + app.getMonth(mont.getValue()) + '-1',
                                                                            "finalDate": comb.getValue() + '-' + app.getMonth(mont.getValue()) + '-28',
                                                                            "idGroup": groupVehicle.getValue(),
                                                                            "plate": comboPlaca.getValue()
                                                                        }),
                                                                        success: function(data) {
                                                                            var comb = this;
                                                                            var dataStore = JSON.parse(data.responseText);
                                                                            //debugger;
                                                                            dataStore.forEach(function(item) {
                                                                                item.dateEnd = new Date(item.dateEnd + ' ' + item.hourEnd);
                                                                                item.dateStart = new Date(item.dateStart + ' ' + item.hourStart);
                                                                                item.Notes = item.hourStart + ' ---- ' + item.hourEnd;
                                                                                item.Title = item.driverName + ' ID: ' + item.driverIdentification;
                                                                            });
                                                                            var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                                                                data: dataStore,
                                                                                autoMsg: false
                                                                            });
                                                                            var calendar = comb.up('window').down('[name=calendar]');
                                                                            var calendarPanel = comb.up('window').down('[name=calendarPanel]');
                                                                            var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                            //calendar.setStore(eventStore);
                                                                            // debugger;
                                                                            var cal = Ext.create('Extensible.calendar.CalendarPanel', {
                                                                                eventStore: eventStore,
                                                                                name: 'calendar',
                                                                                //renderTo: 'simple',
                                                                                //title: 'Basic Calendar',
                                                                                width: 1250,
                                                                                height: 530,
                                                                                monthViewCfg: {
                                                                                    showHeader: false,
                                                                                    showWeekLinks: false,
                                                                                    showWeekNumbers: false
                                                                                },
                                                                                showDayView: false,
                                                                                showMultiDayView: false,
                                                                                showWeekView: false,
                                                                                showMultiWeekView: false,
                                                                                showMonthView: true,
                                                                                showNavBar: false,
                                                                                showTodayText: false,
                                                                                showTime: false,
                                                                                editModal: false,
                                                                                eventupdate: false,
                                                                                enableEditDetails: false,

                                                                            });

                                                                            calendarPanel.remove(calendarPanel.items.items[1]);
                                                                            calendarPanel.add(cal);
                                                                            debugger;
                                                                            cal.setStartDate(new Date(comb.getValue() + '-' + mont.getValue()))
                                                                                //calendar.getActiveView().reloadStore();
                                                                        },
                                                                        failure: function(response, opts) {},
                                                                        headers: {
                                                                            'Content-Type': 'aplication/json'
                                                                        },
                                                                        scope: this
                                                                    });


                                                                }

                                                            }
                                                        }, {
                                                            xtype: 'combobox',
                                                            cls: 'vehicule-dropdown combo-fontsize',
                                                            name: 'license_plate_planner_month',
                                                            style: 'margin-right:2em;',
                                                            hideLabel: true,
                                                            store: monthStore,
                                                            displayField: 'month',
                                                            valueField: 'month',
                                                            typeAhead: true,
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            value: monthNames[monthNow],
                                                            // disabled: true,
                                                            //allowBlank: false,

                                                            width: 100,
                                                            indent: true,
                                                            listConfig: {
                                                                loadingText: null,
                                                                loadMask: false
                                                            },
                                                            listeners: {
                                                                select: function(comb, records) {
                                                                    debugger;
                                                                    var calendar = comb.up().up().down('[name=calendar]');
                                                                    var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                    var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                    var groupVehicle = comb.up().up().down('[name=vehicle_group_planer]');
                                                                    //calendar.setStartDate(new Date(year.getValue() + '-' + comb.getValue()));

                                                                    Ext.Ajax.request({
                                                                        url: url,
                                                                        method: "POST",
                                                                        params: Ext.JSON.encode({
                                                                            "initialDate": year.getValue() + '-' + app.getMonth(comb.getValue()) + '-1',
                                                                            "finalDate": year.getValue() + '-' + app.getMonth(comb.getValue()) + '-28',
                                                                            "idGroup": groupVehicle.getValue(),
                                                                            "plate": comboPlaca.getValue()
                                                                        }),
                                                                        success: function(data) {
                                                                            var comb = this;
                                                                            var dataStore = JSON.parse(data.responseText);
                                                                            //debugger;
                                                                            dataStore.forEach(function(item) {
                                                                                item.dateEnd = new Date(item.dateEnd + ' ' + item.hourEnd);
                                                                                item.dateStart = new Date(item.dateStart + ' ' + item.hourStart);
                                                                                item.Notes = item.hourStart + ' ---- ' + item.hourEnd;
                                                                                item.Title = item.driverName + ' ID: ' + item.driverIdentification;
                                                                            });
                                                                            var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                                                                data: dataStore,
                                                                                autoMsg: false
                                                                            });
                                                                            var calendar = comb.up('window').down('[name=calendar]');
                                                                            var calendarPanel = comb.up('window').down('[name=calendarPanel]');
                                                                            var calendarPanel = comb.up('window').down('[name=calendarPanel]');
                                                                            var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                            //calendar.setStore(eventStore);
                                                                            // debugger;
                                                                            var cal = Ext.create('Extensible.calendar.CalendarPanel', {
                                                                                eventStore: eventStore,
                                                                                name: 'calendar',
                                                                                //renderTo: 'simple',
                                                                                //title: 'Basic Calendar',
                                                                                width: 1250,
                                                                                height: 530,
                                                                                monthViewCfg: {
                                                                                    showHeader: false,
                                                                                    showWeekLinks: false,
                                                                                    showWeekNumbers: false
                                                                                },
                                                                                showDayView: false,
                                                                                showMultiDayView: false,
                                                                                showWeekView: false,
                                                                                showMultiWeekView: false,
                                                                                showMonthView: true,
                                                                                showNavBar: false,
                                                                                showTodayText: false,
                                                                                showTime: false,
                                                                                editModal: false,
                                                                                eventupdate: false,
                                                                                enableEditDetails: false,

                                                                            });

                                                                            calendarPanel.remove(calendarPanel.items.items[1]);
                                                                            calendarPanel.add(cal);
                                                                            debugger;
                                                                            cal.setStartDate(new Date(year.getValue() + '-' + comb.getValue()))
                                                                                //calendar.getActiveView().reloadStore();
                                                                        },
                                                                        failure: function(response, opts) {},
                                                                        headers: {
                                                                            'Content-Type': 'aplication/json'
                                                                        },
                                                                        scope: this
                                                                    });
                                                                }

                                                            }
                                                        }, {
                                                            xtype: 'label',
                                                            html: '|',
                                                            style: 'color:White;margin-right:2em;font-size:20px;',
                                                            handler: function(event, toolEl, panel) {
                                                                // show help here
                                                            }
                                                        }, {
                                                            xtype: 'combobox',
                                                            name: 'vehicle_group_planer',
                                                            id: 'vehicleGroupPlanner',
                                                            hideLabel: true,
                                                            store: storeVehicle,
                                                            displayField: 'csgrName',
                                                            style: 'margin-right:2em;',
                                                            valueField: 'pkCsgrId',
                                                            typeAhead: true,
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            cls: 'vehicule-dropdown combo-fontsize',
                                                            emptyText: 'Grupo de vehículos...',
                                                            // storeVehicle.data.items[0].data['csgrName'],
                                                            allowBlank: false,
                                                            width: 160,
                                                            autoSelect: true,
                                                            indent: true,
                                                            listConfig: {
                                                                loadingText: null,
                                                                loadMask: false
                                                            },
                                                            listeners: {
                                                                select: function(comb, records) {
                                                                    //comb.setValue(records);
                                                                    var calendar = comb.up().up().down('[name=calendar]');
                                                                    var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                    var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                    var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                    //comboPlaca.setValue('');
                                                                    comboPlaca.store.proxy.extraParams = {
                                                                        idGroup: comb.getValue()
                                                                    };
                                                                    comboPlaca.store.load();
                                                                    comboPlaca.setDisabled(false);
                                                                    //eborasvehicle.view.Tools.GlobalFunction.filters();
                                                                    Ext.Ajax.request({
                                                                        url: url,
                                                                        method: "POST",
                                                                        params: Ext.JSON.encode({
                                                                            "initialDate": year.getValue() + '-' + app.getMonth(comb.getValue()) + '-1',
                                                                            "finalDate": year.getValue() + '-' + app.getMonth(comb.getValue()) + '-28',
                                                                            "idGroup": comb.getValue(),
                                                                            "plate": comboPlaca.getValue()
                                                                        }),
                                                                        success: function(data) {
                                                                            var comb = this;
                                                                            var dataStore = JSON.parse(data.responseText);
                                                                            //debugger;
                                                                            dataStore.forEach(function(item) {
                                                                                item.dateEnd = new Date(item.dateEnd + ' ' + item.hourEnd);
                                                                                item.dateStart = new Date(item.dateStart + ' ' + item.hourStart);
                                                                                item.Notes = item.hourStart + ' ---- ' + item.hourEnd;
                                                                                item.Title = item.driverName + ' ID: ' + item.driverIdentification;
                                                                            });
                                                                            var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                                                                data: dataStore,
                                                                                autoMsg: false
                                                                            });
                                                                            var calendar = comb.up('window').down('[name=calendar]');
                                                                            var calendarPanel = comb.up('window').down('[name=calendarPanel]');
                                                                            var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                            var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                            var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                            //calendar.setStore(eventStore);
                                                                            // debugger;
                                                                            var cal = Ext.create('Extensible.calendar.CalendarPanel', {
                                                                                eventStore: eventStore,
                                                                                name: 'calendar',
                                                                                //renderTo: 'simple',
                                                                                //title: 'Basic Calendar',
                                                                                width: 1250,
                                                                                height: 530,
                                                                                monthViewCfg: {
                                                                                    showHeader: false,
                                                                                    showWeekLinks: false,
                                                                                    showWeekNumbers: false
                                                                                },
                                                                                showDayView: false,
                                                                                showMultiDayView: false,
                                                                                showWeekView: false,
                                                                                showMultiWeekView: false,
                                                                                showMonthView: true,
                                                                                showNavBar: false,
                                                                                showTodayText: false,
                                                                                showTime: false,
                                                                                editModal: false,
                                                                                eventupdate: false,
                                                                                enableEditDetails: false,

                                                                            });

                                                                            calendarPanel.remove(calendarPanel.items.items[1]);
                                                                            calendarPanel.add(cal);
                                                                            debugger;
                                                                            cal.setStartDate(new Date(year.getValue() + '-' + mont.getValue()))
                                                                                //calendar.getActiveView().reloadStore();
                                                                        },
                                                                        failure: function(response, opts) {},
                                                                        headers: {
                                                                            'Content-Type': 'aplication/json'
                                                                        },
                                                                        scope: this
                                                                    });

                                                                },
                                                                afterrender: function(comb) {

                                                                        comb.store.load({
                                                                            scope: this,
                                                                            callback: function(records, operation, success) {
                                                                                // the operation object
                                                                                // contains all of the details of the load operation

                                                                                comb.select(comb.getStore().getAt(0));
                                                                                var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                                comboPlaca.store.load({
                                                                                    scope: this,
                                                                                    callback: function(records, operation, success) {
                                                                                        // the operation object
                                                                                        // contains all of the details of the load operation

                                                                                        comboPlaca.select(comboPlaca.getStore().getAt(0));

                                                                                        comboPlaca.setDisabled(false);
                                                                                        eborasvehicle.view.Tools.GlobalFunction.filters();
                                                                                    }
                                                                                });
                                                                                comboPlaca.setDisabled(false);
                                                                            }
                                                                        });
                                                                    }
                                                                    /*comb.store.load({
                                                                        scope: this,
                                                                        callback: function(records, operation, success) {
                                                                            // the operation object
                                                                            // contains all of the details of the load operation
                                                                            comb.setValue(records[0].data['csgrName']);
                                                                            var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                            comboPlaca.store.proxy.extraParams = {
                                                                                idGroup: comb.getValue()
                                                                            };
                                                                            comboPlaca.store.load();
                                                                            comboPlaca.setDisabled(false);
                                                                        }
                                                                    })*/

                                                            }

                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            cls: 'vehicule-dropdown combo-fontsize',
                                                            name: 'license_plate_planner',
                                                            style: 'margin-right:2em;',
                                                            hideLabel: true,
                                                            store: storePlate,
                                                            displayField: 'grvhPlate',
                                                            valueField: 'grvhPlate',
                                                            typeAhead: true,
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            emptyText: 'Placa...',
                                                            // disabled: true,
                                                            //allowBlank: false,

                                                            width: 140,
                                                            indent: true,
                                                            listConfig: {
                                                                loadingText: null,
                                                                loadMask: false
                                                            },
                                                            listeners: {
                                                                select: function(comb) {
                                                                    //var comboPlaca = comb.up().up().down('[name=license_plate_planner]');
                                                                    var calendar = comb.up().up().down('[name=calendar]');
                                                                    var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                    var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                    var groupVehicle = comb.up().up().down('[name=vehicle_group_planer]');

                                                                    // eborasvehicle.view.Tools.GlobalFunction.filters();
                                                                    Ext.Ajax.request({
                                                                        url: url,
                                                                        method: "POST",
                                                                        params: Ext.JSON.encode({
                                                                            "initialDate": year.getValue() + '-' + app.getMonth(mont.getValue()) + '-1',
                                                                            "finalDate": year.getValue() + '-' + app.getMonth(mont.getValue()) + '-28',
                                                                            "idGroup": groupVehicle.getValue(),
                                                                            "plate": comb.getValue()
                                                                        }),
                                                                        success: function(data) {
                                                                            var comb = this;
                                                                            var dataStore = JSON.parse(data.responseText);
                                                                            //debugger;
                                                                            dataStore.forEach(function(item) {
                                                                                item.dateEnd = new Date(item.dateEnd + ' ' + item.hourEnd);
                                                                                item.dateStart = new Date(item.dateStart + ' ' + item.hourStart);
                                                                                item.Notes = item.hourStart + ' ---- ' + item.hourEnd;
                                                                                item.Title = item.driverName + ' ID: ' + item.driverIdentification;
                                                                            });
                                                                            var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
                                                                                data: dataStore,
                                                                                autoMsg: false
                                                                            });
                                                                            var calendar = comb.up('window').down('[name=calendar]');
                                                                            var calendarPanel = comb.up('window').down('[name=calendarPanel]');
                                                                            var groupVehicle = comb.up().up().down('[name=vehicle_group_planer]');
                                                                            var year = comb.up().up().down('[name=license_plate_planner_year]');
                                                                            var mont = comb.up().up().down('[name=license_plate_planner_month]');
                                                                            //calendar.setStore(eventStore);
                                                                            // debugger;
                                                                            var cal = Ext.create('Extensible.calendar.CalendarPanel', {
                                                                                eventStore: eventStore,
                                                                                name: 'calendar',
                                                                                //renderTo: 'simple',
                                                                                //title: 'Basic Calendar',
                                                                                width: 1250,
                                                                                height: 530,
                                                                                monthViewCfg: {
                                                                                    showHeader: false,
                                                                                    showWeekLinks: false,
                                                                                    showWeekNumbers: false
                                                                                },
                                                                                showDayView: false,
                                                                                showMultiDayView: false,
                                                                                showWeekView: false,
                                                                                showMultiWeekView: false,
                                                                                showMonthView: true,
                                                                                showNavBar: false,
                                                                                showTodayText: false,
                                                                                showTime: false,
                                                                                editModal: false,
                                                                                eventupdate: false,
                                                                                enableEditDetails: false,

                                                                            });

                                                                            calendarPanel.remove(calendarPanel.items.items[1]);
                                                                            calendarPanel.add(cal);
                                                                            debugger;
                                                                            cal.setStartDate(new Date(year.getValue() + '-' + mont.getValue()))
                                                                                //calendar.getActiveView().reloadStore();
                                                                        },
                                                                        failure: function(response, opts) {},
                                                                        headers: {
                                                                            'Content-Type': 'aplication/json'
                                                                        },
                                                                        scope: this
                                                                    });
                                                                    //app.eventStore.load();
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            html: '|',
                                                            style: 'color:White;margin-right:1em;font-size:20px;',
                                                            handler: function(event, toolEl, panel) {
                                                                // show help here
                                                            }
                                                        },
                                                        /*{
                                                         html: '<img class="" src="././resources/images/closemark.png"/>'
                                                         },
                                                         /*{
                                                         id: 'close',
                                                         hidden: true,
                                                         }*/

                                                    ],
                                                    items: [{
                                                        xtype: 'panel',
                                                        layout: 'vbox',
                                                        items: [{
                                                                flex: 1,
                                                                xtype: 'panel',
                                                                name: 'calendarPanel',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch',
                                                                    //pack: 'center'

                                                                },
                                                                items: [{
                                                                    flex: 1,
                                                                    width: 1,
                                                                    //html: 'hola',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    /*listeners: {
                                                                     beforerender: function(panel) {
                                                                     Ext.Array.each(storePlate, function(element, index, AllData) {
                                                                     debugger;
                                                                     console.log(element);
                                                                     var alldatacomplete = AllData[0].data.items;
                                                                     for (var i = 0; i < alldatacomplete.length; i++) {
                                                                     panel.add({ flex: 1, html: alldatacomplete[i].data['grvhPlate'] });
                                                                     }
                                                                     
                                                                     });
                                                                     }
                                                                     }*/
                                                                }, {
                                                                    flex: 2,
                                                                    // width: 1250,
                                                                    xtype: calendar,

                                                                }]
                                                            },
                                                            {

                                                                width: 1250,
                                                                xtype: 'container',
                                                                cls: 'days-on-off',
                                                                items: [{
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Domingo'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Lunes'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Martes'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Miercoles'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Jueves'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Viernes'
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lbl-days-on-off',
                                                                        text: 'Sabado'
                                                                    },
                                                                ]
                                                            },
                                                        ]
                                                    }]
                                                });
                                                // debugger;
                                                win.show();
                                                calendar.setStartDate(statDate['rawValue']);

                                            },
                                            failure: function(response, opts) {},
                                            headers: {
                                                'Content-Type': 'aplication/json'
                                            },
                                            scope: this
                                        });

                                        //var eventStore = new Extensible.calendar.data.EventModel({ StartDate: '2017-05-01 12:00:00', EndDate: '2017-05-01 13:30:00', Title: 'My cool event', Notes: 'Some notes' });
                                        //debugger;
                                        console.log("-----------");
                                        console.log(app.eventStore);
                                        console.log("-----------");


                                        // button.up().up().up().up().up().getLayout().setActiveItem(1);

                                    }
                                    /*click: function(button) {
                                     Ext.create('Ext.window.Window', {
                                     title: 'Hello',
                                     height: 200,
                                     width: 400,
                                     layout: 'fit',
                                     items: { // Let's put an empty grid in just to illustrate fit layout
                                     xtype: 'app-configuration-calendar'
                                     /*border: false,
                                     columns: [{ header: 'World' }], // One header just for show. There's no data,
                                     store: Ext.create('Ext.data.ArrayStore', {})// A dummy empty data store
                                     }
                                     }).show();
                                     }*/
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: 5,
                    cls: 'ctn-filter-separator',
                    items: [{
                        xtype: 'label',
                        text: '|'
                    }]
                },
                /*{
                 xtype: 'container',
                 width: 140,
                 cls: 'ctn-filter-component',
                 items: [{
                 xtype: 'combobox',
                 name: 'driver',
                 hideLabel: true,
                 store: storeDriver,
                 displayField: 'name',
                 valueField: 'id',
                 typeAhead: true,
                 queryMode: 'local',
                 triggerAction: 'all',
                 emptyText: 'Conductores...',
                 allowBlank: false,
                 width: 140,
                 indent: true,
                 listConfig: {
                 loadingText: null,
                 loadMask: false
                 }
                 }]
                 },*/
                {
                    xtype: 'container',
                    width: 160,
                    cls: 'ctn-filter-component',
                    items: [{
                        xtype: 'combobox',
                        name: 'license_plate',
                        id: 'licensePlate',
                        hideLabel: true,
                        store: storePlate,
                        displayField: 'grvhPlate',
                        valueField: 'grvhPlate',
                        typeAhead: true,
                        queryMode: 'local',
                        triggerAction: 'all',
                        emptyText: 'Placa...',
                        disabled: true,
                        //allowBlank: false,
                        cls: 'combo-fontsize',
                        width: 160,
                        indent: true,
                        listConfig: {
                            loadingText: null,
                            loadMask: false
                        },
                        listeners: {
                            select: function(comb, records) {
                                eborasvehicle.view.Tools.GlobalFunction.filters();
                            }
                        }
                    }]
                },
                {
                    xtype: 'container',
                    width: 160,

                    cls: 'ctn-filter-component',
                    items: [{
                        xtype: 'combobox',
                        name: 'vehicle_group',
                        id: 'vehicleGroup',
                        hideLabel: true,
                        store: storeVehicle,
                        displayField: 'csgrName',
                        valueField: 'pkCsgrId',
                        typeAhead: true,
                        queryMode: 'local',
                        triggerAction: 'all',
                        cls: 'combo-fontsize',
                        emptyText: 'Grupo de vehículos...',
                        // storeVehicle.data.items[0].data['csgrName'],
                        allowBlank: false,
                        width: 160,
                        autoSelect: true,
                        indent: true,
                        listConfig: {
                            loadingText: null,
                            loadMask: false
                        },
                        listeners: {
                            select: function(comb, records) {
                                //comb.setValue(records);
                                var comboPlaca = comb.up().up().down('[name=license_plate]');
                                // comboPlaca.setValue('');
                                comboPlaca.store.proxy.extraParams = {
                                    idGroup: comb.getValue()
                                };
                                //comboPlaca.store.load();
                                //comboPlaca.store.on('load', comboPlaca.getStore().getAt(0));
                                comboPlaca.store.load({
                                    scope: this,
                                    callback: function(records, operation, success) {
                                        // the operation object
                                        // contains all of the details of the load operation
                                        /*comb.setValue(records[0].data['csgrName']);
                                       ;
                                        comboPlaca.store.proxy.extraParams = {
                                            idGroup: comb.getValue()
                                        };
                                      
                                     */
                                        comboPlaca.select(comboPlaca.getStore().getAt(0));

                                        comboPlaca.setDisabled(false);
                                        eborasvehicle.view.Tools.GlobalFunction.filters();
                                    }
                                });




                            },
                            afterrender: function(comb) {
                                comb.store.load({
                                    scope: this,
                                    callback: function(records, operation, success) {
                                        // the operation object
                                        // contains all of the details of the load operation
                                        /*comb.setValue(records[0].data['csgrName']);
                                       ;
                                        comboPlaca.store.proxy.extraParams = {
                                            idGroup: comb.getValue()
                                        };
                                      
                                     */
                                        comb.select(comb.getStore().getAt(0));
                                        var comboPlaca = comb.up().up().down('[name=license_plate]');
                                        comboPlaca.store.load({
                                            scope: this,
                                            callback: function(records, operation, success) {
                                                // the operation object
                                                // contains all of the details of the load operation
                                                /*comb.setValue(records[0].data['csgrName']);
                                       ;
                                        comboPlaca.store.proxy.extraParams = {
                                            idGroup: comb.getValue()
                                        };
                                      
                                     */
                                                comboPlaca.select(comboPlaca.getStore().getAt(0));

                                                comboPlaca.setDisabled(false);
                                                eborasvehicle.view.Tools.GlobalFunction.filters();
                                            }
                                        });
                                        comboPlaca.setDisabled(false);
                                    }
                                });
                            }
                        }
                    }]
                },
                {
                    xtype: 'container',
                    width: 5,
                    cls: 'ctn-filter-separator',
                    items: [{
                        xtype: 'label',
                        text: '|'
                    }]
                },
                {
                    xtype: 'container',
                    width: 220,
                    cls: 'ctn-filter-component',
                    items: [{
                            xtype: 'label',
                            cls: 'left lbls-form-cp',
                            style: 'font-size:15px;',
                            text: 'Fecha Hasta:'
                        },
                        {
                            xtype: 'datefield',
                            name: 'end_date',
                            id: 'endDate',
                            labelAlign: 'left',
                            format: 'Y-m-d',
                            value: new Date(new Date() - 24 * 60 * 60 * 1000),
                            maxValue: new Date(new Date() - 24 * 60 * 60 * 1000),
                            width: 110,
                            listeners: {
                                select: function(comb, records) {
                                    comb.setValue(records);
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: 220,
                    cls: 'ctn-filter-component',
                    items: [{
                            xtype: 'label',
                            cls: 'left lbls-form-cp',
                            style: 'font-size:15px;',
                            text: 'Fecha Desde:'
                        },
                        {
                            xtype: 'datefield',
                            id: 'startDate',
                            name: 'start_date',
                            labelAlign: 'left',
                            value: new Date(new Date() - 24 * 60 * 60 * 1000 * 7),
                            maxValue: new Date(new Date() - 24 * 60 * 60 * 1000),
                            format: 'Y-m-d',
                            width: 110,
                            listeners: {
                                select: function(comb, records) {
                                    comb.setValue(records);
                                    var date = comb.up().up().down('[name=end_date]');
                                    if (comb.getValue() - new Date(new Date() - 24 * 60 * 60 * 1000 * 7 * 4) > 0) {
                                        date.setMaxValue(new Date(new Date() - 24 * 60 * 60 * 1000));
                                    } else {
                                        var a = Ext.Date.add(comb.getValue(), Ext.Date.DAY, 28);
                                        date.setMaxValue(a);
                                        date.setValue(a);
                                    }
                                    date.setMinValue(comb.getValue());
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }
                            }
                        }
                    ]
                }
            ]
        }];
        this.callParent(arguments);


    }
});
Ext.tip.QuickTipManager.init()
Extensible.calendar.view.Month.override({
    getEventTemplate: function() {
        if (!this.eventTpl) {
            var tpl, body = this.getEventBodyMarkup();

            tpl = !(Ext.isIE || Ext.isOpera) ?
                Ext.create('Ext.XTemplate',
                    '<div data-qtip="<b>{Title}</b><br/>{Notes}" class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evr">',
                    body,
                    '</div>'
                ) :
                Ext.create('Ext.XTemplate',
                    '<tpl if="_renderAsAllDay">',
                    '<div data-qtip="<b>{Title}</b><br/>{Notes}" class="{_extraCls} {spanCls} ext-cal-evt ext-cal-evo">',
                    '<div class="ext-cal-evm">',
                    '<div class="ext-cal-evi">',
                    '</tpl>',
                    '<tpl if="!_renderAsAllDay">',
                    '<div data-qtip="<b>{Title}</b><br/>{Notes}" class="{_extraCls} ext-cal-evt ext-cal-evr">',
                    '</tpl>',
                    body,
                    '<tpl if="_renderAsAllDay">',
                    '</div>',
                    '</div>',
                    '</tpl>',
                    '</div>'
                );
            tpl.compile();
            this.eventTpl = tpl;
        }
        return this.eventTpl;
    }
});