/**
 * @class eborasvehicle.view.Module.Dashboard
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Module.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'app-dashboard',
    cls: 'ctn-dashboard',
    layout: 'column',
    border: false,
    requires: [
        //'eborasvehicle.view.Configuration.Dashboard',
        //'eborasvehicle.view.Configuration.Calendar',

    ],
    initComponent: function() {
        var storeGaugeGear = Ext.create('eborasvehicle.store.Dashboard.GaugeGear');
        var storeGaugeBrake = Ext.create('eborasvehicle.store.Dashboard.GaugeBrake');
        var storeVehicleTypes = Ext.create('eborasvehicle.store.Vehicle.VehicleTypes');
        var storePlate = Ext.create('eborasvehicle.store.Tools.Plates');
        var result = [];
        for (i = 2017; i <= new Date().getFullYear(); i++) {
            result.push({ 'years': i.toString() });
        }
        var years = Ext.create('Ext.data.Store', {
            fields: ['years'],
            data: result
        });
        //var storePieIdleTime = Ext.create('eborasvehicle.store.Dashboard.PieIdleTime');
        //var storePieAvailableFleet = Ext.create('eborasvehicle.store.Dashboard.PieAvailableFleet');

        this.items = [
            //Columna General 1
            {
                columnWidth: .5,
                border: false,
                items: [{
                    xtype: 'container',
                    layout: 'column',
                    border: false,
                    items: [{
                            columnWidth: 1,
                            border: false,
                            style: 'margin: 5px 30px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        id: 'headerCtnFuelEconomy',
                                        html: '<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Ahorro de Combustible</div>'
                                    }]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'card',
                                    cls: 'body-panel-gray-dark',
                                    activeItem: 0,
                                    items: [{
                                            xtype: 'container',
                                            id: 'ctnFuelEconomy',
                                            layout: 'column',
                                            height: 265,
                                            items: [{
                                                    columnWidth: .75,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        id: 'ctnGaugeFuelEconomy',
                                                        layout: 'fit',
                                                        border: false,
                                                        items: []
                                                    }]
                                                },
                                                {
                                                    columnWidth: .25,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'column',
                                                        border: false,
                                                        items: [{
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-top: 15px;float: right;color: #6D6D6D;font-size: 12px;">Combustible ahorrado:</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'totalFuelSavingCost',
                                                                    html: '<div style="margin-top: 5px;float: right;color: #6D6D6D;font-weight: bold;font-size: 20px;">0.00 Lts</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-top: 25px;float: right;color: #6D6D6D;font-size: 12px;">Precio Combustible:</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'fuelPrice',
                                                                    html: '<div style="margin-top: 5px;float: right;color: #6D6D6D;font-weight: bold;font-size: 20px;">0.00 Pesos</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    xtype: 'button',
                                                                    text: 'Histórico',
                                                                    style: 'margin: 85px 0px 0px 0px;float: right;color: #6D6D6D;font-size: 12px;background:none!important;border:none;padding:0!important;font: inherit;border-bottom:1px solid #6D6D6D;cursor: pointer;',
                                                                    listeners: {
                                                                        click: function(button) {

                                                                            var group = Ext.ComponentQuery.query('[name=vehicle_group_dashboard]');
                                                                            storePlate.proxy.extraParams = {
                                                                                idGroup: group[0].getValue()
                                                                            };
                                                                            storePlate.load();

                                                                            // button.up().up().up().up().up().getLayout().setActiveItem(1);
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                title: 'Histórico Ahorro de combustible',
                                                                                height: 800,
                                                                                width: 1250,
                                                                                modal: true,
                                                                                cls: 'window-fuel-dash',
                                                                                draggable: false,
                                                                                //closable: false,
                                                                                tools: [{
                                                                                        xtype: 'label',
                                                                                        html: group[0]['rawValue'],
                                                                                        style: 'color:White;margin-right:4em;font-size: 16px;top :12px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        cls: 'vehicule-dropdown',
                                                                                        style: 'margin-right:2em;',
                                                                                        hideLabel: true,
                                                                                        store: storePlate,
                                                                                        name: 'historicFuelPlate',
                                                                                        displayField: 'grvhPlate',
                                                                                        valueField: 'grvhPlate',
                                                                                        typeAhead: true,
                                                                                        queryMode: 'local',
                                                                                        triggerAction: 'all',
                                                                                        value: 'todas',
                                                                                        // disabled: true,
                                                                                        //allowBlank: false,
                                                                                        cls: 'combo-fontsize',
                                                                                        width: 160,
                                                                                        indent: true,
                                                                                        listConfig: {
                                                                                            loadingText: null,
                                                                                            loadMask: false
                                                                                        },
                                                                                        listeners: {
                                                                                            select: function(comb) {
                                                                                                var year = comb.up(win).down('[name=hisYears]');
                                                                                                var value = 0;
                                                                                                if (comb.getValue() != 'todas') {
                                                                                                    value = comb.getValue();
                                                                                                }
                                                                                                app.execTestFuelHist(year.getValue(), group[0].getValue(), value);
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        html: '|',
                                                                                        style: 'color:White;margin-right:2em;font-size:20px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    }

                                                                                ],
                                                                                items: [{
                                                                                    xtype: 'combobox',
                                                                                    autoSelect: true,
                                                                                    store: years,
                                                                                    name: 'hisYears',
                                                                                    value: new Date().getFullYear(),
                                                                                    displayField: 'years',
                                                                                    valueField: 'years',
                                                                                    typeAhead: true,
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    cls: 'historico',
                                                                                    width: 160,
                                                                                    indent: true,
                                                                                    listConfig: {
                                                                                        loadingText: null,
                                                                                        loadMask: false
                                                                                    },
                                                                                    listeners: {
                                                                                        select: function(comb) {
                                                                                            var plate = comb.up(win).down('[name=historicFuelPlate]');
                                                                                            var value = 0;
                                                                                            if (plate.getValue() != 'todas') {
                                                                                                value = plate.getValue();
                                                                                            }

                                                                                            app.execTestFuelHist(comb.getValue(), group[0].getValue(), value);
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'container',
                                                                                    itemId: 'ctnInformMainEasyFuel',
                                                                                    cls: 'ctn-principal-reports',
                                                                                    id: 'ctnInformMainEasyFuel',
                                                                                    html: '<div id="fuel_hist" class="ctn-spago-driver-reports" style="display:block"></div><div id="fuel_hist" class="ctn-spago-driver-reports" style="display:none"></div>',

                                                                                }]
                                                                            });
                                                                            win.show();
                                                                            app.execTestFuelHist(new Date().getFullYear(), group[0].getValue(), 0);
                                                                        }
                                                                    }
                                                                }]
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            height: 265,
                                            width: '100%',
                                            bodyStyle: 'margin: 0px;padding: 2px;',
                                            dockedItems: [{
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        text: 'X',
                                                        cls: 'right',
                                                        listeners: {
                                                            click: function(button) {
                                                                button.up().up().up().getLayout().setActiveItem(0);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }],
                                            items: [{

                                                xtype: 'chart',
                                                height: 265,
                                                width: '100%',
                                                insetPadding: 35,
                                                animate: true,
                                                store: Ext.create('Ext.data.JsonStore', {
                                                    fields: ['name', 'data'],
                                                    data: [
                                                        { 'name': '20/07/2025', 'data': 12 },
                                                        { 'name': '21/07/2025', 'data': 8 },
                                                        { 'name': '22/07/2025', 'data': 2 },
                                                        { 'name': '24/07/2025', 'data': 14 },
                                                        { 'name': '27/07/2025', 'data': 4 }
                                                    ]
                                                }),
                                                axes: [{
                                                        type: 'Numeric',
                                                        position: 'left',
                                                        fields: ['data'],
                                                        label: {
                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                        },

                                                        grid: true,
                                                        minimum: 0
                                                    },
                                                    {
                                                        type: 'Category',
                                                        position: 'bottom',
                                                        fields: ['name']
                                                    }
                                                ],
                                                series: [{
                                                    type: 'line',
                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },
                                                    axis: 'left',
                                                    fill: true,
                                                    xField: 'name',
                                                    yField: 'data',
                                                    markerConfig: {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }]

                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            columnWidth: .5,
                            border: false,
                            style: 'margin: 5px 5px 5px 30px;',
                            disabled: true,

                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        id: 'headerCtnGear',
                                        html: '<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Uso promedio de embrague</div>'
                                    }]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'card',
                                    cls: 'body-panel-gray-dark',
                                    activeItem: 0,
                                    items: [{
                                            xtype: 'container',
                                            id: 'ctnGear',

                                            layout: 'column',
                                            height: 265,
                                            items: [{
                                                    columnWidth: 1,
                                                    border: false,
                                                    style: 'margin: 5px 5px 0px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'fit',
                                                        height: 215,
                                                        border: false,
                                                        items: [{
                                                            xtype: 'chart',
                                                            animate: true,
                                                            store: storeGaugeGear,
                                                            insetPadding: 45,
                                                            axes: [{
                                                                type: 'gauge',
                                                                position: 'gauge',
                                                                minimum: 0,
                                                                maximum: 100,
                                                                steps: 10,
                                                                margin: 0,
                                                                label: {
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
                                                                field: ['value'],
                                                                donut: 80,
                                                                colorSet: ['#FF0000', '#ddd'],
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
                                                                },
                                                                listeners: {
                                                                    afterrender: function(chart) {
                                                                        Ext.getCmp('maskCtnGear').hide();
                                                                        console.log('afterrender');
                                                                    }
                                                                }
                                                            }]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    columnWidth: 1,
                                                    border: false,
                                                    style: 'margin: 0px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'column',
                                                        height: 30,
                                                        border: false,
                                                        items: [{
                                                                columnWidth: .5,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-left:5px;float: left;color: #6D6D6D;font-weight: bold;font-size: 16px;">18 veces</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                border: false,
                                                                items: [{
                                                                    xtype: 'button',
                                                                    text: 'Histórico',
                                                                    style: 'margin-right:5px;float: right;color: #6D6D6D;font-size: 12px;background:none!important;border:none;padding:0!important;font: inherit;border-bottom:1px solid #6D6D6D;cursor: pointer;',
                                                                    listeners: {

                                                                        click: function(button) {

                                                                            var group = Ext.ComponentQuery.query('[name=vehicle_group_dashboard]');
                                                                            storePlate.proxy.extraParams = {
                                                                                idGroup: group[0].getValue()
                                                                            };
                                                                            storePlate.load();

                                                                            // button.up().up().up().up().up().getLayout().setActiveItem(1);
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                title: 'Histórico Tiempo Ralenti',
                                                                                height: 800,
                                                                                width: 1250,
                                                                                modal: true,
                                                                                cls: 'window-fuel-dash',
                                                                                draggable: false,
                                                                                //closable: false,
                                                                                tools: [{
                                                                                        xtype: 'label',
                                                                                        html: group[0]['rawValue'],
                                                                                        style: 'color:White;margin-right:4em;font-size: 16px;top :12px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        cls: 'vehicule-dropdown',
                                                                                        style: 'margin-right:2em;',
                                                                                        hideLabel: true,
                                                                                        store: storePlate,
                                                                                        name: 'historicFuelPlate',
                                                                                        displayField: 'grvhPlate',
                                                                                        valueField: 'grvhPlate',
                                                                                        typeAhead: true,
                                                                                        queryMode: 'local',
                                                                                        triggerAction: 'all',
                                                                                        value: 'todas',
                                                                                        // disabled: true,
                                                                                        //allowBlank: false,
                                                                                        cls: 'combo-fontsize',
                                                                                        width: 160,
                                                                                        indent: true,
                                                                                        listConfig: {
                                                                                            loadingText: null,
                                                                                            loadMask: false
                                                                                        },
                                                                                        listeners: {
                                                                                            select: function(comb) {
                                                                                                var year = comb.up(win).down('[name=hisYears]');
                                                                                                var value = 0;
                                                                                                if (comb.getValue() != 'todas') {
                                                                                                    value = comb.getValue();
                                                                                                }
                                                                                                app.execTestFuelHist(year.getValue(), group[0].getValue(), value);
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        html: '|',
                                                                                        style: 'color:White;margin-right:2em;font-size:20px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    }

                                                                                ],
                                                                                items: [{
                                                                                    xtype: 'combobox',
                                                                                    autoSelect: true,
                                                                                    store: years,
                                                                                    name: 'hisYears',
                                                                                    value: new Date().getFullYear(),
                                                                                    displayField: 'years',
                                                                                    valueField: 'years',
                                                                                    typeAhead: true,
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    cls: 'historico',
                                                                                    width: 160,
                                                                                    indent: true,
                                                                                    listConfig: {
                                                                                        loadingText: null,
                                                                                        loadMask: false
                                                                                    },
                                                                                    listeners: {
                                                                                        select: function(comb) {
                                                                                            var plate = comb.up(win).down('[name=historicFuelPlate]');
                                                                                            var value = 0;
                                                                                            if (plate.getValue() != 'todas') {
                                                                                                value = plate.getValue();
                                                                                            }

                                                                                            app.execTestFuelHist(comb.getValue(), group[0].getValue(), value);
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'container',
                                                                                    itemId: 'ctnInformMainEasyFuel1',
                                                                                    cls: 'ctn-principal-reports',
                                                                                    id: 'ctnInformMainEasyFuel1',
                                                                                    html: '<div id="rale_hist" class="ctn-spago-driver-reports" style="display:block"></div><div id="rale_hist" class="ctn-spago-driver-reports" style="display:none"></div>',

                                                                                }]
                                                                            });
                                                                            win.show();
                                                                            app.execTestFuelHist(new Date().getFullYear(), group[0].getValue(), 0);
                                                                        }

                                                                    }
                                                                }]
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            height: 265,
                                            width: '100%',
                                            bodyStyle: 'margin: 0px;padding: 2px;',
                                            dockedItems: [{
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        text: 'X',
                                                        cls: 'right',
                                                        listeners: {
                                                            click: function(button) {
                                                                button.up().up().up().getLayout().setActiveItem(0);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }],
                                            items: [{

                                                xtype: 'chart',
                                                height: 265,
                                                width: '100%',
                                                insetPadding: 35,
                                                animate: true,
                                                store: Ext.create('Ext.data.JsonStore', {
                                                    fields: ['name', 'data'],
                                                    data: [
                                                        { 'name': '20/07/2025', 'data': 12 },
                                                        { 'name': '21/07/2025', 'data': 8 },
                                                        { 'name': '22/07/2025', 'data': 2 },
                                                        { 'name': '24/07/2025', 'data': 14 },
                                                        { 'name': '27/07/2025', 'data': 4 }
                                                    ]
                                                }),
                                                axes: [{
                                                        type: 'Numeric',
                                                        position: 'left',
                                                        fields: ['data'],
                                                        label: {
                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                        },

                                                        grid: true,
                                                        minimum: 0
                                                    },
                                                    {
                                                        type: 'Category',
                                                        position: 'bottom',
                                                        fields: ['name']
                                                    }
                                                ],
                                                series: [{
                                                    type: 'line',
                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },
                                                    axis: 'left',
                                                    fill: true,
                                                    xField: 'name',
                                                    yField: 'data',
                                                    markerConfig: {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }]

                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            columnWidth: .5,
                            border: false,
                            style: 'margin: 5px 30px 5px 5px;',
                            disabled: true,
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        id: 'headerCtnBrake',
                                        html: '<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Uso promedio de freno</div>'
                                    }]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'card',
                                    cls: 'body-panel-gray-dark',
                                    activeItem: 0,
                                    items: [{
                                            xtype: 'container',
                                            id: 'ctnBrake',

                                            layout: 'column',
                                            height: 265,
                                            items: [{
                                                    columnWidth: 1,
                                                    border: false,
                                                    style: 'margin: 5px 5px 0px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'fit',
                                                        height: 215,
                                                        border: false,
                                                        items: [{
                                                            xtype: 'chart',
                                                            animate: true,
                                                            store: storeGaugeBrake,
                                                            insetPadding: 45,
                                                            axes: [{
                                                                type: 'gauge',
                                                                position: 'gauge',
                                                                minimum: 0,
                                                                maximum: 100,
                                                                steps: 10,
                                                                margin: 0,
                                                                label: {
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
                                                                field: ['value'],
                                                                donut: 80,
                                                                colorSet: ['#eaac11', '#ddd'],
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
                                                                },
                                                                listeners: {
                                                                    afterrender: function(chart) {
                                                                        Ext.getCmp('maskCtnBrake').hide();
                                                                    }
                                                                }
                                                            }]
                                                        }]
                                                    }]
                                                },
                                                {
                                                    columnWidth: 1,
                                                    border: false,
                                                    style: 'margin: 0px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'column',
                                                        height: 30,
                                                        border: false,
                                                        items: [{
                                                                columnWidth: .5,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-left:5px;float: left;color: #6D6D6D;font-weight: bold;font-size: 16px;">18 veces</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                border: false,
                                                                items: [{
                                                                    xtype: 'button',
                                                                    text: 'Histórico',
                                                                    style: 'margin-right:5px;float: right;color: #6D6D6D;font-size: 12px;background:none!important;border:none;padding:0!important;font: inherit;border-bottom:1px solid #6D6D6D;cursor: pointer;',
                                                                    listeners: {

                                                                        click: function(button) {

                                                                            var group = Ext.ComponentQuery.query('[name=vehicle_group]');
                                                                            storePlate.proxy.extraParams = {
                                                                                idGroup: group[0].getValue()
                                                                            };
                                                                            storePlate.load();

                                                                            // button.up().up().up().up().up().getLayout().setActiveItem(1);
                                                                            Ext.create('Ext.window.Window', {
                                                                                title: 'Histórico Uso promedio de freno',
                                                                                height: 450,
                                                                                width: 1250,
                                                                                modal: true,
                                                                                cls: 'window-fuel-dash',
                                                                                draggable: false,
                                                                                //closable: false,
                                                                                tools: [{
                                                                                        xtype: 'label',
                                                                                        html: group[0]['rawValue'],
                                                                                        style: 'color:White;margin-right:4em;font-size: 16px;top :12px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        cls: 'vehicule-dropdown',
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
                                                                                        cls: 'combo-fontsize',
                                                                                        width: 160,
                                                                                        indent: true,
                                                                                        listConfig: {
                                                                                            loadingText: null,
                                                                                            loadMask: false
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        html: '|',
                                                                                        style: 'color:White;margin-right:2em;font-size:20px;',
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
                                                                                items: {}
                                                                            }).show();
                                                                        }

                                                                    }
                                                                }]
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            height: 265,
                                            width: '100%',
                                            bodyStyle: 'margin: 0px;padding: 2px;',
                                            dockedItems: [{
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        text: 'X',
                                                        cls: 'right',
                                                        listeners: {
                                                            click: function(button) {
                                                                button.up().up().up().getLayout().setActiveItem(0);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }],
                                            items: [{

                                                xtype: 'chart',
                                                height: 265,
                                                width: '100%',
                                                insetPadding: 35,
                                                animate: true,
                                                store: Ext.create('Ext.data.JsonStore', {
                                                    fields: ['name', 'data'],
                                                    data: [
                                                        { 'name': '20/07/2025', 'data': 12 },
                                                        { 'name': '21/07/2025', 'data': 8 },
                                                        { 'name': '22/07/2025', 'data': 2 },
                                                        { 'name': '24/07/2025', 'data': 14 },
                                                        { 'name': '27/07/2025', 'data': 4 }
                                                    ]
                                                }),
                                                axes: [{
                                                        type: 'Numeric',
                                                        position: 'left',
                                                        fields: ['data'],
                                                        label: {
                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                        },

                                                        grid: true,
                                                        minimum: 0
                                                    },
                                                    {
                                                        type: 'Category',
                                                        position: 'bottom',
                                                        fields: ['name']
                                                    }
                                                ],
                                                series: [{
                                                    type: 'line',
                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },
                                                    axis: 'left',
                                                    fill: true,
                                                    xField: 'name',
                                                    yField: 'data',
                                                    markerConfig: {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }]

                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }]
            },
            //Columna General 2
            {
                columnWidth: .45,
                border: false,
                items: [{
                    xtype: 'container',
                    layout: 'column',
                    border: false,
                    items: [{
                            columnWidth: 1,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-light text-center',
                                    items: [{
                                        id: 'headerCtnIdleTime',
                                        html: '<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Tiempo ralentí</div>'
                                    }]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'card',
                                    items: [{
                                            xtype: 'container',
                                            id: 'ctnIdleTime',
                                            cls: 'body-panel-gray-light',
                                            layout: 'column',
                                            height: 265,
                                            items: [{
                                                    columnWidth: .8,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        id: 'ctnPieIdleTime',
                                                        layout: 'fit',
                                                        border: false,
                                                        items: []
                                                    }]
                                                },
                                                {
                                                    columnWidth: .2,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'column',
                                                        border: false,
                                                        items: [{
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-top: 75px;color: #6D6D6D;font-size: 12px;">Horas:</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'hoursTotalEngineUse',
                                                                    html: '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#09A645;stroke-width:3;stroke:#09A645"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">22:14:15</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'hoursTotalTotalIdle',
                                                                    html: '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#6D6D6D;stroke-width:3;stroke:#6D6D6D"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">00:02:10</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    xtype: 'button',
                                                                    text: 'Histórico',
                                                                    style: 'margin: 5px 0px 0px 0px;color: #6D6D6D;font-size: 12px;background:none!important;border:none;padding:0!important;font: inherit;border-bottom:1px solid #6D6D6D;cursor: pointer;',
                                                                    listeners: {

                                                                        click: function(button) {

                                                                            var group = Ext.ComponentQuery.query('[name=vehicle_group_dashboard]');
                                                                            storePlate.proxy.extraParams = {
                                                                                idGroup: group[0].getValue()
                                                                            };
                                                                            storePlate.load();

                                                                            // button.up().up().up().up().up().getLayout().setActiveItem(1);
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                title: 'Histórico Tiempo Ralenti',
                                                                                height: 800,
                                                                                width: 1250,
                                                                                modal: true,
                                                                                cls: 'window-fuel-dash',
                                                                                draggable: false,
                                                                                //closable: false,
                                                                                tools: [{
                                                                                        xtype: 'label',
                                                                                        html: group[0]['rawValue'],
                                                                                        style: 'color:White;margin-right:4em;font-size: 16px;top :12px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        cls: 'vehicule-dropdown',
                                                                                        style: 'margin-right:2em;',
                                                                                        hideLabel: true,
                                                                                        store: storePlate,
                                                                                        name: 'historicFuelPlate',
                                                                                        displayField: 'grvhPlate',
                                                                                        valueField: 'grvhPlate',
                                                                                        typeAhead: true,
                                                                                        queryMode: 'local',
                                                                                        triggerAction: 'all',
                                                                                        value: 'todas',
                                                                                        // disabled: true,
                                                                                        //allowBlank: false,
                                                                                        cls: 'combo-fontsize',
                                                                                        width: 160,
                                                                                        indent: true,
                                                                                        listConfig: {
                                                                                            loadingText: null,
                                                                                            loadMask: false
                                                                                        },
                                                                                        listeners: {
                                                                                            select: function(comb) {
                                                                                                var year = comb.up(win).down('[name=hisYears]');
                                                                                                var value = 0;
                                                                                                if (comb.getValue() != 'todas') {
                                                                                                    value = comb.getValue();
                                                                                                }
                                                                                                app.execTestRaleHist(year.getValue(), group[0].getValue(), value);
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        html: '|',
                                                                                        style: 'color:White;margin-right:2em;font-size:20px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    }

                                                                                ],
                                                                                items: [{
                                                                                    xtype: 'combobox',
                                                                                    autoSelect: true,
                                                                                    store: years,
                                                                                    name: 'hisYears',
                                                                                    value: new Date().getFullYear(),
                                                                                    displayField: 'years',
                                                                                    valueField: 'years',
                                                                                    typeAhead: true,
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    cls: 'historico',
                                                                                    width: 160,
                                                                                    indent: true,
                                                                                    listConfig: {
                                                                                        loadingText: null,
                                                                                        loadMask: false
                                                                                    },
                                                                                    listeners: {
                                                                                        select: function(comb) {
                                                                                            var plate = comb.up(win).down('[name=historicFuelPlate]');
                                                                                            var value = 0;
                                                                                            if (plate.getValue() != 'todas') {
                                                                                                value = plate.getValue();
                                                                                            }

                                                                                            app.execTestRaleHist(comb.getValue(), group[0].getValue(), value);
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'container',
                                                                                    itemId: 'ctnInformMainEasyFuel1',
                                                                                    cls: 'ctn-principal-reports',
                                                                                    id: 'ctnInformMainEasyFuel1',
                                                                                    html: '<div id="rale_hist" class="ctn-spago-driver-reports" style="display:block"></div><div id="rale_hist" class="ctn-spago-driver-reports" style="display:none"></div>',

                                                                                }]
                                                                            });
                                                                            win.show();
                                                                            app.execTestRaleHist(new Date().getFullYear(), group[0].getValue(), 0);
                                                                        }

                                                                    }
                                                                }]
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            height: 265,
                                            width: '100%',
                                            bodyStyle: 'margin: 0px;padding: 2px;',
                                            dockedItems: [{
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        text: 'X',
                                                        cls: 'right',
                                                        listeners: {
                                                            click: function(button) {
                                                                button.up().up().up().getLayout().setActiveItem(0);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }],
                                            items: [{

                                                xtype: 'chart',
                                                height: 265,
                                                width: '100%',
                                                insetPadding: 35,
                                                animate: true,
                                                store: Ext.create('Ext.data.JsonStore', {
                                                    fields: ['name', 'data'],
                                                    data: [
                                                        { 'name': '20/07/2025', 'data': 12 },
                                                        { 'name': '21/07/2025', 'data': 8 },
                                                        { 'name': '22/07/2025', 'data': 2 },
                                                        { 'name': '24/07/2025', 'data': 14 },
                                                        { 'name': '27/07/2025', 'data': 4 }
                                                    ]
                                                }),
                                                axes: [{
                                                        type: 'Numeric',
                                                        position: 'left',
                                                        fields: ['data'],
                                                        label: {
                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                        },

                                                        grid: true,
                                                        minimum: 0
                                                    },
                                                    {
                                                        type: 'Category',
                                                        position: 'bottom',
                                                        fields: ['name']
                                                    }
                                                ],
                                                series: [{
                                                    type: 'line',
                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },
                                                    axis: 'left',
                                                    fill: true,
                                                    xField: 'name',
                                                    yField: 'data',
                                                    markerConfig: {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }]

                                            }]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            columnWidth: 1,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-light text-center',
                                    items: [{
                                        id: 'headerCtnAvailableFleet',
                                        html: '<div style="float: left;margin-left:8px;width: 18px;height: 18px;background: transparent;"></div><div style="display:inline-block;margin-left:-24px;color: #333333;font-size: 15px;font-weight: bold;background: transparent;">Disponibilidad de la flota</div>'
                                    }]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'card',
                                    activeItem: 0,
                                    items: [{
                                            xtype: 'container',
                                            id: 'ctnAvailableFleet',
                                            cls: 'body-panel-gray-light',
                                            layout: 'column',
                                            height: 265,
                                            items: [{
                                                    columnWidth: .8,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        id: 'ctnPieAvailableFleet',
                                                        layout: 'fit',
                                                        border: false,
                                                        items: []
                                                    }]
                                                },
                                                {
                                                    columnWidth: .2,
                                                    border: false,
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                        xtype: 'container',
                                                        layout: 'column',
                                                        border: false,
                                                        items: [{
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    html: '<div style="margin-top: 75px;color: #6D6D6D;font-size: 12px;">Horas:</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'hoursTotalAvailability',
                                                                    html: '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#F48C03;stroke-width:3;stroke:#F48C03"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">22:14:15</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    id: 'hoursTotalTimeUse',
                                                                    html: '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:#AD6003;stroke-width:3;stroke:#AD6003"></svg></div><div style="margin: 5px 0px 0px 5px;display:inline-block;color: #6D6D6D;font-weight: bold;font-size: 11px;">00:02:10</div>'
                                                                }]
                                                            },
                                                            {
                                                                columnWidth: 1,
                                                                border: false,
                                                                items: [{
                                                                    xtype: 'button',
                                                                    text: 'Histórico',
                                                                    style: 'margin: 5px 0px 0px 0px;color: #6D6D6D;font-size: 12px;background:none!important;border:none;padding:0!important;font: inherit;border-bottom:1px solid #6D6D6D;cursor: pointer;',
                                                                    listeners: {

                                                                        click: function(button) {

                                                                            var group = Ext.ComponentQuery.query('[name=vehicle_group_dashboard]');
                                                                            storePlate.proxy.extraParams = {
                                                                                idGroup: group[0].getValue()
                                                                            };
                                                                            storePlate.load();

                                                                            // button.up().up().up().up().up().getLayout().setActiveItem(1);
                                                                            var win = Ext.create('Ext.window.Window', {
                                                                                title: 'Histórico Disponibilidad de la Flota',
                                                                                height: 800,
                                                                                width: 1250,
                                                                                modal: true,
                                                                                cls: 'window-fuel-dash',
                                                                                draggable: false,
                                                                                //closable: false,
                                                                                tools: [{
                                                                                        xtype: 'label',
                                                                                        html: group[0]['rawValue'],
                                                                                        style: 'color:White;margin-right:4em;font-size: 16px;top :12px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        cls: 'vehicule-dropdown',
                                                                                        style: 'margin-right:2em;',
                                                                                        hideLabel: true,
                                                                                        store: storePlate,
                                                                                        name: 'historicFuelPlate',
                                                                                        displayField: 'grvhPlate',
                                                                                        valueField: 'grvhPlate',
                                                                                        typeAhead: true,
                                                                                        queryMode: 'local',
                                                                                        triggerAction: 'all',
                                                                                        value: 'todas',
                                                                                        // disabled: true,
                                                                                        //allowBlank: false,
                                                                                        cls: 'combo-fontsize',
                                                                                        width: 160,
                                                                                        indent: true,
                                                                                        listConfig: {
                                                                                            loadingText: null,
                                                                                            loadMask: false
                                                                                        },
                                                                                        listeners: {
                                                                                            select: function(comb) {
                                                                                                var year = comb.up(win).down('[name=hisYears]');
                                                                                                var value = 0;
                                                                                                if (comb.getValue() != 'todas') {
                                                                                                    value = comb.getValue();
                                                                                                }
                                                                                                app.execTestDispHist(year.getValue(), group[0].getValue(), value);
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        xtype: 'label',
                                                                                        html: '|',
                                                                                        style: 'color:White;margin-right:2em;font-size:20px;',
                                                                                        handler: function(event, toolEl, panel) {
                                                                                            // show help here
                                                                                        }
                                                                                    }

                                                                                ],
                                                                                items: [{
                                                                                    xtype: 'combobox',
                                                                                    autoSelect: true,
                                                                                    store: years,
                                                                                    name: 'hisYears',
                                                                                    value: new Date().getFullYear(),
                                                                                    displayField: 'years',
                                                                                    valueField: 'years',
                                                                                    typeAhead: true,
                                                                                    queryMode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    cls: 'historico',
                                                                                    width: 160,
                                                                                    indent: true,
                                                                                    listConfig: {
                                                                                        loadingText: null,
                                                                                        loadMask: false
                                                                                    },
                                                                                    listeners: {
                                                                                        select: function(comb) {
                                                                                            var plate = comb.up(win).down('[name=historicFuelPlate]');
                                                                                            var value = 0;
                                                                                            if (plate.getValue() != 'todas') {
                                                                                                value = plate.getValue();
                                                                                            }

                                                                                            app.execTestDispHist(comb.getValue(), group[0].getValue(), value);
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'container',
                                                                                    itemId: 'ctnInformMainEasyFuel2',
                                                                                    cls: 'ctn-principal-reports',
                                                                                    id: 'ctnInformMainEasyFuel2',
                                                                                    html: '<div id="disp_hist" class="ctn-spago-driver-reports" style="display:block"></div><div id="rale_hist" class="ctn-spago-driver-reports" style="display:none"></div>',

                                                                                }]
                                                                            });
                                                                            win.show();
                                                                            app.execTestDispHist(new Date().getFullYear(), group[0].getValue(), 0);
                                                                        }

                                                                    }
                                                                }]
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            height: 265,
                                            width: '100%',
                                            bodyStyle: 'margin: 0px;padding: 2px;',
                                            dockedItems: [{
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        text: 'X',
                                                        cls: 'right',
                                                        listeners: {
                                                            click: function(button) {
                                                                button.up().up().up().getLayout().setActiveItem(0);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }],
                                            items: [{

                                                xtype: 'chart',
                                                height: 265,
                                                width: '100%',
                                                insetPadding: 35,
                                                animate: true,
                                                store: Ext.create('Ext.data.JsonStore', {
                                                    fields: ['name', 'data'],
                                                    data: [
                                                        { 'name': '20/07/2025', 'data': 12 },
                                                        { 'name': '21/07/2025', 'data': 8 },
                                                        { 'name': '22/07/2025', 'data': 2 },
                                                        { 'name': '24/07/2025', 'data': 14 },
                                                        { 'name': '27/07/2025', 'data': 4 }
                                                    ]
                                                }),
                                                axes: [{
                                                        type: 'Numeric',
                                                        position: 'left',
                                                        fields: ['data'],
                                                        label: {
                                                            renderer: Ext.util.Format.numberRenderer('0,0')
                                                        },

                                                        grid: true,
                                                        minimum: 0
                                                    },
                                                    {
                                                        type: 'Category',
                                                        position: 'bottom',
                                                        fields: ['name']
                                                    }
                                                ],
                                                series: [{
                                                    type: 'line',
                                                    highlight: {
                                                        size: 7,
                                                        radius: 7
                                                    },
                                                    axis: 'left',
                                                    fill: true,
                                                    xField: 'name',
                                                    yField: 'data',
                                                    markerConfig: {
                                                        type: 'circle',
                                                        size: 4,
                                                        radius: 4,
                                                        'stroke-width': 0
                                                    }
                                                }]

                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }]
            },
            //Columna General 3

        ];
        this.callParent(arguments);
    }
});