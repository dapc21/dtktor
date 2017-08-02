/**
 * @class eborasvehicle.view.Main.ViewMain
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Main.ViewMain', {
    extend: 'Ext.container.Container',
    requires: [
        /* Componentes de estructura principal (esqueleto) */
        'eborasvehicle.view.Main.Header',
        'eborasvehicle.view.Main.Menu',
        /* Filtro (Reutilizable para cada submódulo) */
        'eborasvehicle.view.Tools.Filter',
        'eborasvehicle.view.Tools.FilterVehicle',
        'eborasvehicle.view.Tools.FilterDashboard',
        /* Submódulos */
        'eborasvehicle.view.Module.Dashboard',
        'eborasvehicle.view.Module.Odometer',
        'eborasvehicle.view.Module.Hourmeter',
        'eborasvehicle.view.Module.Vehicle',
        'eborasvehicle.view.Module.GroupVehicle',
        'eborasvehicle.view.Module.Velocity',
        'eborasvehicle.view.Module.Batery',
        'eborasvehicle.view.Module.Rpm',
        'eborasvehicle.view.Module.Fuel',
        'eborasvehicle.view.Module.Driver',
        'eborasvehicle.view.Module.Account',
        'eborasvehicle.view.Module.FailCode',
        /*configuracion*/
        'eborasvehicle.view.Configuration.NewGroupVehicle',
        'eborasvehicle.view.Tools.GlobalFunction'

    ],
    xtype: 'app-main',
    initComponent: function () {
        Ext.apply(this, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            /* Contenedor General Superior: Header */
            items: [{
                    xtype: 'app-header'
                },
                /* Contenedor General Inferior: Menú e Info (contiene Filtro y Contenido de Datos) */
                {
                    xtype: 'container',
                    cls: 'ctn-general',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        /* Menú */
                        {
                            xtype: 'panel',
                            flex: 0.1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [{
                                    xtype: 'app-menu',
                                    flex: 1
                                }]

                        },
                        /* Info (Filtro y Contenido de Datos) */
                        {
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'app-filter'
                                },{
                                    xtype: 'app-filter-dashboard',
                                    hidden: true
                                },
                                {
                                    name: 'mainCard',
                                    xtype: 'panel',
                                    layout: {
                                        type: 'card'
                                    },
                                    activeItem: 0,
                                    flex: 1,
                                    items: [
                                        /* Contenedor KPI (Dashboard) */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-dashboard'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor Horómetro */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-hourmeter'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor Odómetro */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-odometer'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor Combustible */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-fuel'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor RPM */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-rpm'
                                                    }]
                                                }
                                            ]
                                        }
                                        /* Contenedor velocidad */
                                        ,
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-velocity'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor Batería */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-batery'
                                                    }]
                                                }
                                            ]
                                        },
                                        /* Contenedor Freno */
                                        {
                                            xtype: 'panel',
                                            html: 'Contenido Freno'
                                        },
                                        /* Contenedor Embrague */
                                        {
                                            xtype: 'panel',
                                            html: 'Contenido embrague'
                                        },
                                        /* Contenedor Códigos de Falla */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [{
                                                xtype: 'container',
                                                autoScroll: true,
                                                cls: 'ctn-fixed-data',
                                                items: [{
                                                    xtype: 'app-failcode'
                                                }]
                                            }]
                                        },

                                        /* Contenedor Vehículos */
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [{
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-vehicle'
                                                    }]
                                                }]
                                        },
                                        /*Contenedor Grupo de vehiculos*/
                                        {
                                            xtype: 'container',
                                            cls: 'ctn-info',
                                            items: [{
                                                    xtype: 'container',
                                                    autoScroll: true,
                                                    cls: 'ctn-fixed-data',
                                                    items: [{
                                                        xtype: 'app-groupvehicle'
                                                    }]
                                                }]
                                        },
                                        /* Contenedor Conductores */
                                        {
                                            xtype: 'panel',
                                            cls: 'ctn-info',
                                            items: [{
                                                xtype: 'container',
                                                autoScroll: true,
                                                cls: 'ctn-fixed-data',
                                                items: [{
                                                    xtype: 'app-driver'
                                                }]
                                            }]
                                        },
                                        {
                                            xtype: 'panel',
                                            cls: 'ctn-info',
                                            items: [{
                                                xtype: 'container',
                                                autoScroll: true,
                                                cls: 'ctn-fixed-data',
                                                items: [{
                                                    xtype: 'app-account'
                                                }]
                                            }]
                                        }
                                    ]

                            }]
                        }
                    ]
                }
            ]
        });
        this.callParent(arguments);
    }
});
