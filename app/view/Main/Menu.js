/**
 * @class eborasvehicle.view.Main.Menu
 * @extends Ext.container.Container
 * @author Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Main.Menu', {
    extend: 'Ext.container.Container',
    xtype: 'app-menu',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
            xtype: 'button',
            name: 'dashboard',
            text: 'Dashboard',
            cls: 'icon-dashboard',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            iconAlign: 'top',
            pressed: true,
            pressedCls: 'icon-dashboard-pressed',
            flex: 1,
            tooltip: 'Dashboard',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(0);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(true);
                },
                render: function(button) {
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(true);
                }

            }
        },

        {
            xtype: 'button',
            text: 'Horómetro',
            cls: 'icon-hm',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            iconAlign: 'top',
            pressedCls: 'icon-hm-pressed',
            flex: 1,
            tooltip: 'Horómetro',
            listeners: {
                click: function(button) {
                    app.execTest5();
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(1);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-hourmeter';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);


                }
            }
        },

        {
            xtype: 'button',
            text: 'Odómetro',
            cls: 'icon-om',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-om-pressed',
            flex: 1,
            tooltip: 'Odómetro',
            listeners: {
                click: function(button) {
                    app.execTest4();
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(2);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-odometer';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
        {
            xtype: 'button',
            text: 'Combustible',
            cls: 'icon-fuel',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-fuel-pressed',
            flex: 1,
            tooltip: 'Combustible',
            listeners: {
                click: function(button) {
                    app.execTestFuelConsum();
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(3);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-fuel';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
        {
            xtype: 'button',
            text: 'RPM',
            cls: 'icon-rpm',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-rpm-pressed',
            flex: 1,
            tooltip: 'RPM',
            listeners: {
                click: function(button) {
                    app.execTestRPM();
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(4);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-rpm';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                    document.getElementById('btnDetailRpm').style.display = 'block';
                    document.getElementById('btnRpmNormal').style.display = 'none';
                }
            }
        },
        {
            xtype: 'button',
            text: 'Velocidad',
            cls: 'icon-velocity',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-velocity-pressed',
            flex: 1,
            tooltip: 'Velocidad',
            listeners: {
                click: function(button) {
                    document.getElementById('btnDetailSpped').style.display = 'block';
                    document.getElementById('btnSpeedNormal').style.display = 'none';
                    app.execTestSpeed();
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(5);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-velocity';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
        {
            xtype: 'button',
            text: 'Batería',
            cls: 'icon-battery',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-battery-pressed',
            flex: 1,
            tooltip: 'Batería',
            listeners: {
                click: function(button) {
                    app.execTestVoltage();
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(6);
                    eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-batery';
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },

        /* {
              xtype: 'button',
                text: 'Freno',
                cls: 'icon-break',
                toggleGroup: 'menu-toggle',
                enableToggle: true,
                pressedCls: 'icon-break-pressed',
                flex: 1,
                listeners: {
                    click: function(button) {
                        var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                        card[0].getLayout().setActiveItem(7);
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Embrague',
                cls: 'icon-embr',
                toggleGroup: 'menu-toggle',
                enableToggle: true,
                pressedCls: 'icon-embr-pressed',
                flex: 1,
                listeners: {
                    click: function(button) {
                        var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                        card[0].getLayout().setActiveItem(8);
                    }
                }
            },*/
        {
            xtype: 'button',
            text: 'Códigos de Falla',
            cls: 'icon-code',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-code-pressed',
            flex: 1,
            tooltip: 'Códigos de Falla',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(9);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(true);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);
                }
            }
        },

        {
            xtype: 'button',
            text: 'Vehículos',
            // style: 'font-size: 15px;',
            cls: 'icon-vehicle',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-vehicle-pressed',
            flex: 1,
            tooltip: 'Vehículos',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(10);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },

        {
            xtype: 'button',
            text: 'Grupo Vehículos',
            cls: 'icon-group',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-group-pressed',
            flex: 1,
            tooltip: 'Grupo Vehículos',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(11);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
        {
            xtype: 'button',
            text: 'Conductores',
            cls: 'icon-driver',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-driver-pressed',
            flex: 1,
            tooltip: 'Conductores',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(12);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
        {
            xtype: 'button',
            text: 'Cuentas',
            cls: 'icon-account',
            toggleGroup: 'menu-toggle',
            enableToggle: true,
            pressedCls: 'icon-account-pressed',
            flex: 1,
            tooltip: 'Cuentas',
            listeners: {
                click: function(button) {
                    button.toggle(true);
                    var card = Ext.ComponentQuery.query('panel[name=mainCard]');
                    card[0].getLayout().setActiveItem(13);
                    eborasvehicle.view.Tools.GlobalFunction.showFilter(false);
                    eborasvehicle.view.Tools.GlobalFunction.showFilterDashboard(false);

                }
            }
        },
    ]
});