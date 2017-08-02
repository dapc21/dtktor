/**
 * @class eborasbasic.view.Module.drivers
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez - isilio vilchez
 */
Ext.define('eborasvehicle.view.Module.Driver', {
    extend: 'Ext.container.Container',
    requires: [
        'eborasvehicle.view.Configuration.PassDriver',
        'eborasvehicle.view.Configuration.IdButton',
    ],
    xtype: 'app-driver',
    layout: 'column',
    initComponent: function() {

        var storeDocTypes = Ext.create('eborasvehicle.store.Driver.DocTypes');
        var storeCategoryTypes = Ext.create('eborasvehicle.store.Driver.CategoryTypes');
        var storeListDriver = Ext.create('eborasvehicle.store.Driver.ListDriver');
        var backgroundColor = "background-color: gray !important;color: white !important;";

        this.items = [

            {
                columnWidth: 1,
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 0px 30px 5px 30px;',
                items: [{
                    columnWidth: 1,
                    border: false,
                    style: 'margin: 5px 30px 5px 30px;',
                    items: [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },

                            cls: 'header-panel-gray-dark text-center',
                            items: [{
                                    flex: 1,
                                    xtype: 'button',
                                    text: 'Conductores',
                                    id: 'tabdriver',
                                    cls: 'driver-button',
                                    toggleGroup: 'menu-toggle-driver',
                                    pressed: true,
                                    pressedCls: 'driver-button-pressed',
                                    listeners: {
                                        click: function(button) {

                                            button.toggle(true);
                                            button.up().up().down('[name=driver-card]').getLayout().setActiveItem(0);
                                            Ext.getCmp('griddriver').store.removeAll();
                                            Ext.getCmp('searchdriver').setValue('');
                                        }
                                    }
                                },
                                {
                                    flex: 1,
                                    xtype: 'button',
                                    text: 'Buscar Conductores',
                                    id: 'tabSearchdriver',
                                    cls: 'driver-button-search',
                                    toggleGroup: 'menu-toggle-driver',
                                    enableToggle: true,
                                    pressedCls: 'driver-button-search-pressed',
                                    listeners: {
                                        click: function(button) {
                                            button.toggle(true);
                                            button.up().up().down('[name=driver-card]').getLayout().setActiveItem(1);
                                            Ext.ComponentQuery.query('image[itemId=photoImg]')[0].setSrc('resources/images/nn.jpg');
                                            Ext.getCmp('form_driver').getForm().reset();
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtpye: 'panel',
                            layout: 'card',
                            name: 'driver-card',
                            cls: 'body-panel-gray-dark',
                            activeItem: 0,
                            items: [{
                                xtype: 'panel',
                                layout: { type: 'hbox', align: 'stretch' },
                                style: 'margin: 0px 0px 0px 0px;',
                                items: [{
                                        flex: 0.25,
                                        xtype: 'panel',
                                        cls: 'header-panel-gray-dark text-center',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [{
                                                    xtype: 'image',
                                                    itemId: 'photoImg',
                                                    name: 'photoImg',
                                                    src: 'resources/images/nn.jpg',
                                                    flex: 0.75
                                                },
                                                {
                                                xtype: 'fileuploadfield',
                                                id: 'DriverFileUpload',
                                                cls: 'btn-load-photo',
                                                itemId: 'DriverFileUpload',
                                                buttonOnly: true,
                                                hideLabel: true,
                                                flex: 0.1,
                                                buttonText: "Cargar Foto"
                                            },
                                           {
                                                xtype: 'button',
                                                style: 'text-decoration: underline;',
                                                text: 'Autenticación',
                                                itemId: 'btnIdButton',
                                                id: 'btnIdButton',
                                                flex: 0.1,
//                                                menu: {
//                                                        xtype: 'app-configuration-IdButton'
//                                                    }
                                            },
                                           {
                                                xtype: 'label',
                                                flex: 0.1
                                            },

                                            {
                                                xtype: 'label',
                                                flex: 1.25
                                            }
                                        ]
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'panel',
                                        // height: 720,
                                        // width: 1250,
                                        style: 'margin: 55px 50px 50px 50px;',
                                        layout: { type: 'vbox', align: 'stretch' },
                                        items: [{
                                                xtype: 'form',
                                                id: 'form_driver',
                                                itemId:'form_driver',
                                                name: 'form_driver',
                                                layout: { type: 'vbox', align: 'stretch' },
                                                items: [{
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [{
                                                        xtype: 'label',
                                                        style: 'float: none;font-size: 13px;',
                                                        html: 'Datos Personales',
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        style: 'border: 1px solid;',
                                                        html: '',
                                                    }

                                                ]

                                            },
                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },

                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Nombres:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'name_driver',
                                                                    enforceMaxLength: 53,
                                                                    maxLength: 53,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\.\,\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Apellidos:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'lastname_driver',
                                                                    enforceMaxLength: 53,
                                                                    maxLength: 53,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\.\,\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Documento:'
                                                            },
                                                            {
                                                                columnWidth: .45,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: 'margin-left:0px !important',
                                                                    xtype: 'combobox',
                                                                    name: 'tipo_documento',
                                                                    hideLabel: true,
                                                                    store: storeDocTypes,
                                                                    cls: 'driver-dropdown',
                                                                    displayField: 'docuName',
                                                                    valueField: 'pkDocuId',
                                                                    typeAhead: true,
                                                                    queryMode: 'remote',
                                                                    triggerAction: 'all',
                                                                    emptyText: 'Seleccione...',
                                                                    allowBlank: false,
                                                                    width: 100,
                                                                    indent: true,
                                                                    listConfig: {
                                                                        loadingText: 'Cargando...',
                                                                        loadMask: true
                                                                    }
                                                                }]

                                                            }
                                                        ]
                                                    }

                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: '# de documento:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'identificacion_driver',
                                                                    enforceMaxLength: 10,
                                                                    maxLength: 10,
                                                                    minLength: 4,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',    
                                                                    maskRe: /([0-9]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Dirección:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'address_driver',
                                                                    enforceMaxLength: 100,
                                                                    maxLength: 100,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\.\,\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Correo:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'email_driver',
                                                                    enforceMaxLength: 255,
                                                                    maxLength: 255,
                                                                    vtype: 'email',
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    }

                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'start'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Teléfono:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'phone_driver',
                                                                    enforceMaxLength: 15,
                                                                    maxLength: 15,
                                                                    minLength: 6,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([0-9]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Celular:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'mobile_driver',
                                                                    enforceMaxLength: 15,
                                                                    maxLength: 15,
                                                                    minLength: 6,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([0-9]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column'
                                                    }


                                                ]
                                            },

                                            {
                                                xtype: 'panel',
                                                style: 'margin: 15px 0px 0px 0px;',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },

                                                items: [{
                                                        xtype: 'label',
                                                        style: 'float: none;font-size: 13px; ',
                                                        html: 'Licencia',
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        style: 'border: 1px solid;',
                                                        html: '',
                                                    },
                                                    {
                                                    xtype: 'textfield',
                                                    itemId: 'drivId',
                                                    id: 'drivId',
                                                    name: 'drivId',
                                                    hidden: true
                                                    },
                                                    {
                                                    xtype: 'textfield',
                                                    itemId: 'photo',
                                                    id: 'photo',
                                                    name: 'photo',
                                                    hidden: true
                                                    }
                                            ]

                                                

                                            },

                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: '# Licencia:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'license_driver',
                                                                    enforceMaxLength: 27,
                                                                    maxLength: 27,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\.\,\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Categoría:'
                                                            },
                                                            {
                                                                columnWidth: .45,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: 'margin-left:0px !important',
                                                                    xtype: 'combobox',
                                                                    name: 'tipo_categoria',
                                                                    hideLabel: true,
                                                                    store: storeCategoryTypes,
                                                                    cls: 'driver-dropdown',
                                                                    displayField: 'tpclName',
                                                                    valueField: 'pkTpclId',
                                                                    typeAhead: true,
                                                                    queryMode: 'remote',
                                                                    triggerAction: 'all',
                                                                    emptyText: 'Seleccione...',
                                                                    allowBlank: false,
                                                                    width: 100,
                                                                    indent: true,
                                                                    listConfig: {
                                                                        loadingText: 'Cargando...',
                                                                        loadMask: true
                                                                    }
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .3,
                                                                xtype: 'label',
                                                                style: 'font-size: 13px;',
                                                                text: 'Fecha de vencimiento:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'datefield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'date_driver',
                                                                    format: 'Y-m-d',
                                                                    value: new Date(),
                                                                    width: 100,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    }

                                                ]
                                            },
                                            {
                                                xtype: 'label',
                                                style: 'border: 1px solid;margin: 15px 0px 0px 0px;',
                                                html: '',
                                            },
                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'start'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        width: 50,
                                                        style: 'margin-top:3em;',
                                                        items: [{
                                                            xtype: 'label',
                                                            style: 'float: none;font-size: 13px;',
                                                            text: 'Estado:'
                                                        }]
                                                    },
                                                    {

                                                        xtype: 'container',
                                                        height: 50,
                                                        width: 50,
                                                        style: 'margin-top:2.5em;',
                                                        items: [{
                                                            xtype: 'checkbox',
                                                            name: 'state_driver',
                                                            checked: false
                                                        }]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: '# de contrato:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'contract_driver',
                                                                    enforceMaxLength: 20,
                                                                    maxLength: 20,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\.\,\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    }

                                                ]
                                            },
                                            {
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'end'
                                                },
                                                items: [{
                                                    xtype: 'container',

                                                    items: [,
                                                        {
                                                            xtype: 'button',
                                                            style: {

                                                                textAlign: 'center'
                                                            },
                                                            cls: 'icon-check btn-ok-window-configuration right',
                                                            id: 'driverSaveButton',
                                                            itemId: 'driverSaveButton'
                                                        }
                                                    ]
                                                }]
                                            }
                                    
                                        ]
                                        
                                            }]
                                    }
                                
                                ]
                            }, {
                                xtype: 'panel',
                                cls: 'body-panel-gray-dark',
                                layout: {  type: 'vbox', align: 'stretch' },
                                items: [{
                                        xtype: 'panel',
                                        layout: { type: 'hbox', pack: 'end' },
                                        items: [{
                                                xtype: 'container',
                                                cls: 'icon-lupa left',
                                                style: 'width: 25px; height: 25px; margin-top: 5px; font-size: 22px; margin-right: 25px; margin-left: 5px;'
                                            },
                                            {
                                                xtype: 'textfield',
                                                style: 'margin: 5px 25px 0px 0px;',
                                                enableKeyEvents: true,
                                                id: 'searchdriver',
                                                width: 105,
                                                cls: 'driver-dropdown',
                                                emptyText: 'Buscar Conductor...',
                                                listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            var text = textfield.getValue();
                                                            if (text.length > 2) {
                                                                 Ext.Ajax.request({
                                                                        url    : 'http://' + restService + '/rbDriver/rbFindCatalogDriver',
                                                                        method: "POST",
                                                                        params: Ext.JSON.encode({
                                                                            "drivName": text
                                                                        }),
                                                                        success: function(data) {
                                                                            var dataStore = JSON.parse(data.responseText);
                                                                        Ext.getCmp("griddriver").getStore().loadData(dataStore);
                                                                        },
                                                                        failure: function(response, opts) {},
                                                                        headers: {
                                                                            'Content-Type': 'aplication/json'
                                                                        },
                                                                        scope: this
                                                                    });                                                                
                                                                Ext.getCmp('griddriver').getView().refresh();
                                                            }else {
                                                                Ext.getCmp('griddriver').store.removeAll();
                                                                   }
                                                        }
                                                    }

                                            }
                                        ]
                                    },

                                    {
                                        xtype: 'grid',
                                        id: 'griddriver',
                                        itemId: 'griddriver',
                                        cls: 'vehicule-grid',
                                        store: storeListDriver,
                                        columns: [
                                            { text: 'pkDrivId', dataIndex: 'pkDrivId', flex: 1, hidden: true, sortable: true },
                                            { text: 'fkTpclId', dataIndex: 'fkTpclId', flex: 1, hidden: true, sortable: true },
                                            { text: 'fkDocuId', dataIndex: 'fkDocuId', flex: 1, hidden: true, sortable: true },
                                            { text: 'fkMastId', dataIndex: 'fkMastId', flex: 1, hidden: true, sortable: true },
                                            { text: 'Nombres', dataIndex: 'drivName', flex: 1, hidden: false, sortable: true },
                                            { text: 'Apellidos', dataIndex: 'drivLastName', flex: 1, hidden: false, sortable: true },
                                            { text: '# de identificación', dataIndex: 'drivIdentification', flex: 1, hidden: false, sortable: true },
                                            { text: 'Correo', dataIndex: 'drivEmail', flex: 1, hidden: false, sortable: true },
                                            {
                                                text: 'Estado',
                                                xtype: 'booleancolumn',
                                                flex: 1,
                                                dataIndex: 'drivStatus',
                                                falseText: 'Inactivo',
                                                trueText: 'Activo'
                                                }, {
                                                    text: 'Eliminar',
                                                    xtype: 'actioncolumn',
                                                    flex: 1,
                                                    hidden: false,
                                                    sortable: false,
                                                    stopSelection: true,
                                                    items: [{
                                                        icon: 'resources/images/delete-record.png',
                                                        tooltip: 'Eliminar',
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            this.fireEvent('actionDriverClick', view, rowIndex, colIndex, item, e, record, row, 'eliminar');
                                                        }
                                                    }]
                                                },
                                            { text: 'Dirección', dataIndex: 'drivAddress', flex: 1, hidden: true, sortable: true },
                                            { text: 'Teléfono', dataIndex: 'drivPhone', flex: 1, hidden: true, sortable: true },
                                            { text: 'Celular', dataIndex: 'drivMobilePhone', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivLicense', dataIndex: 'drivLicense', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivExpirationLicence', dataIndex: 'drivExpirationLicence', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivStatus', dataIndex: 'drivStatus', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivContractNumber', dataIndex: 'drivContractNumber', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivUrlPhoto', dataIndex: 'drivUrlPhoto', flex: 1, hidden: true, sortable: true },
                                            { text: 'tpclName', dataIndex: 'tpclName', flex: 1, hidden: true, sortable: true },
                                            { text: 'vwcdNumberPlate', dataIndex: 'vwcdNumberPlate', flex: 1, hidden: true, sortable: true },
                                            { text: 'vwcdTimeTransport', dataIndex: 'vwcdTimeTransport', flex: 1, hidden: true, sortable: true },
                                            { text: 'docuAcronyms', dataIndex: 'docuAcronyms', flex: 1, hidden: true, sortable: true },
                                            { text: 'docuName', dataIndex: 'docuName', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivUrlPhoto', dataIndex: 'drivUrlPhoto', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivPassword', dataIndex: 'drivPassword', flex: 1, hidden: true, sortable: true },
                                            { text: 'drivDisplayName', dataIndex: 'drivDisplayName', flex: 1, hidden: true, sortable: true },
    

                                        ],
                                        height: 320,
                                        width: '100%'

                                    }
                                ]
                            }]

                        }


                    ]
                }]
            }

        ];
        this.callParent(arguments);
    }
});