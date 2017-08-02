/**
 * @class eborasbasic.view.Module.drivers
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez - isilio vilchez
 */
Ext.define('eborasvehicle.view.Module.Account', {
    extend: 'Ext.container.Container',
    xtype: 'app-account',
    layout: 'column',
    initComponent: function() {

        var storeListAccount = Ext.create('eborasvehicle.store.Account.ListAccount');
        var storeDocTypes = Ext.create('eborasvehicle.store.Account.DocTypes');
        var storeCities = Ext.create('eborasvehicle.store.Account.Cities');
        var storeUTC = Ext.create('eborasvehicle.store.Account.UTC');
        var storeUserProfile = Ext.create('eborasvehicle.store.Account.UserProfile');
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
                                    text: 'Cuentas',
                                    id: 'tabAccount',
                                    cls: 'driver-button',
                                    toggleGroup: 'menu-toggle-acc',
                                    pressed: true,
                                    pressedCls: 'driver-button-pressed',
                                    listeners: {
                                        click: function(button) {
                                            button.toggle(true);
                                            button.up().up().down('[name=account-card]').getLayout().setActiveItem(0);
                                        }
                                    }
                                },
                                {
                                    flex: 1,
                                    xtype: 'button',
                                    text: 'Buscar Cuentas',
                                    id: 'tabSearchAccount',
                                    cls: 'driver-button-search',
                                    toggleGroup: 'menu-toggle-acc',
                                    enableToggle: true,
                                    pressedCls: 'driver-button-search-pressed',
                                    listeners: {
                                        click: function(button) {
                                            button.toggle(true);
                                            button.up().up().down('[name=account-card]').getLayout().setActiveItem(1);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtpye: 'panel',
                            layout: 'card',
                            name: 'account-card',
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
                                            align: 'stretch',
                                            pack:'start'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'photo',
                                                style: 'margin: 0px 0px 0px 15px',
                                                cls: 'new-driver',
                                                flex: 0.75
                                            },
                                            {
                                                xtype: 'fileuploadfield',
                                                id: 'AccountfileUpload',
                                                cls: 'btn-load-photo',
                                                itemId: 'AccountfileUpload',
                                                buttonOnly: true,
                                                hideLabel: true,
                                                flex: 0.1,
                                                buttonText: "Cargar Foto +"
                                            },
                                            /*{
                                                xtype: 'button',
                                                id:'assignVehicle',
                                                style: 'text-decoration: underline;',
                                                text: 'Asignar Vehículo',
                                                flex: 0.1
                                            },
                                            {
                                                xtype: 'button',
                                                id:'resetPassword',
                                                style: 'text-decoration: underline;',
                                                text: 'Reiniciar Contraseña',
                                                flex: 0.1
                                            },*/
                                            {
                                                xtype: 'label',
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'form',
                                        id:'form_account_vehicle',
                                        style: 'margin: 35px 50px 50px 50px;',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [{
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
                                                                text: 'Nombre:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'name_account',
                                                                    enforceMaxLength: 53,
                                                                    maxLength: 53,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z\u00D1\u00F1\s]+)$/,
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
                                                                columnWidth: .46,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: 'margin-left:0px !important',
                                                                    xtype: 'combobox',
                                                                    name: 'document_account',
                                                                    hideLabel: true,
                                                                    store: storeDocTypes,
                                                                    cls: 'vehicule-dropdown',
                                                                    displayField: 'docuName',
                                                                    valueField: 'pkDocuId',
                                                                    typeAhead: true,
                                                                    forceSelection: true,
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
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Identificación:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'number_document_account',
                                                                    enforceMaxLength: 10,
                                                                    maxLength: 10,
                                                                    minLength: 4,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    vtype: 'alphanum',
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
                                                                    name: 'cell_account',
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
                                                                    name: 'tlf_account',
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
                                                                columnWidth: .3,
                                                                xtype: 'label',
                                                                style: 'font-size: 13px;',
                                                                text: 'Fecha de nacimiento:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'datefield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'birthdate_account',
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
                                                                text: 'Ciudad:'
                                                            },
                                                            {
                                                                columnWidth: .46,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: 'margin-left:0px !important',
                                                                    xtype: 'combobox',
                                                                    name: 'city_account',
                                                                    hideLabel: true,
                                                                    store: storeCities,
                                                                    cls: 'vehicule-dropdown',
                                                                    displayField: 'cityName',
                                                                    valueField: 'pkCityId',
                                                                    typeAhead: true,
                                                                    forceSelection: true,
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
                                                                    name: 'address_account',
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
                                                                text: 'E-mail:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'email_account',
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
                                                                text: 'UTC:'
                                                            },
                                                            {
                                                                columnWidth: .46,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    style: 'margin-left:0px !important',
                                                                    xtype: 'combobox',
                                                                    name: 'utc_account',
                                                                    hideLabel: true,
                                                                    store: storeUTC,
                                                                    cls: 'vehicule-dropdown',
                                                                    displayField: 'utcNameUtc',
                                                                    valueField: 'pkUtcId',
                                                                    typeAhead: true,
                                                                    forceSelection: true,
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
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Contrato:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'contract_account',
                                                                    enforceMaxLength: 20,
                                                                    maxLength: 20,
                                                                    minLength: 3,
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
                                                                text: 'NIT:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'nit_account',
                                                                    enforceMaxLength: 50,
                                                                    maxLength: 50,
                                                                    minLength: 4,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([0-9]+)$/,
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
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .2,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 13px;',
                                                                text: 'Perfil Usuario:'
                                                            },
                                                            {
                                                                columnWidth: .46,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    xtype: 'combobox',
                                                                    name: 'user_profile_account',
                                                                    hideLabel: true,
                                                                    store: storeUserProfile,
                                                                    cls: 'vehicule-dropdown',
                                                                    displayField: 'prflName',
                                                                    valueField: 'pkPrflId',
                                                                    typeAhead: true,
                                                                    forceSelection: true,
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
                                                            ,
                                                            /**** Id Cuenta ****/
                                                            {
                                                                xtype : 'hiddenfield',
                                                                name  : 'id_account',
                                                                value : ''
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin-top:3em;',
                                                        layout: 'column'
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
                                                    align: 'left'
                                                },

                                                items: [{
                                                        xtype: 'label',
                                                        style: 'float: none;font-size: 13px; ',
                                                        html: '* Todos los campos son obligatorios',
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

                                                    items: [{
                                                        xtype: 'button',
                                                        style: {
                                                            textAlign: 'center'
                                                        },
                                                        cls: 'icon-check btn-ok-window-configuration right',
                                                        id: 'accountVehicleSaveButton',
                                                        itemId: 'accountVehicleSaveButton'
                                                    }]
                                                }]
                                            }

                                        ]
                                    }
                                ]
                            }, {
                                xtype: 'panel',
                                cls: 'black-cls-vehicle',
                                layout: { type: 'vbox', align: 'stretch' },
                                items: [{
                                        xtype: 'panel',
                                        layout: { type: 'hbox', pack: 'start' },
                                        items: [{
                                                xtype: 'button',
                                                iconCls: 'new-group-search',
                                                style: 'background-color: transparent;background-image: none;border-color:black;',
                                                scale: 'medium'
                                            },
                                            {
                                                xtype: 'textfield',
                                                style: 'margin-top:0.5em',
                                                enableKeyEvents: true,
                                                id: 'searchAccount',
                                                width: 130,
                                                cls: 'driver-dropdown',
                                                emptyText: 'Buscar'
                                            }

                                        ]
                                    },

                                    {
                                        xtype: 'grid',
                                        id: 'gridAccount',
                                        cls: 'account-search-grid',
                                        store: storeListAccount,
                                        columns: [
                                            { text: 'ID', dataIndex: 'pkMastId', flex: 1, hidden: true, sortable: true },
                                            { text: 'Nombre', dataIndex: 'mastName', flex: 1, hidden: false, sortable: true },
                                            { text: 'Identificación', dataIndex: 'mastIdentification', flex: 1, hidden: false, sortable: true },
                                            { text: 'Usuario', dataIndex: 'mastLogin', flex: 1, hidden: false, sortable: true },
                                            { text: 'Correo', dataIndex: 'mastEmail', flex: 1, hidden: false, sortable: true },
                                            { text: 'Tlf', dataIndex: 'mastPhone', flex: 1, hidden: true, sortable: true },
                                            { text: 'Móvil', dataIndex: 'mastMobilePhone', flex: 1, hidden: true, sortable: true },
                                            { text: 'Dirección', dataIndex: 'mastAddress', flex: 1, hidden: true, sortable: true },
                                            { text: 'Crear Cta', dataIndex: 'mastCreateAccount', flex: 1, hidden: true, sortable: true },
                                            { text: 'Estado', dataIndex: 'mastStatus', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Creación', dataIndex: 'mastCreationDate', flex: 1, hidden: true, sortable: true },
                                            { text: 'Cambiar Contraseña', dataIndex: 'mastChangePassword', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Nacimiento', dataIndex: 'mastBirthDate', flex: 1, hidden: true, sortable: true },
                                            { text: 'Contrato #', dataIndex: 'mastContractNumber', flex: 1, hidden: true, sortable: true },
                                            { text: 'Registro de Usuario', dataIndex: 'mastLoginRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Registro de Usuario', dataIndex: 'mastDateRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'ID Documento', dataIndex: 'pkDocuId', flex: 1, hidden: true, sortable: true },
                                            { text: 'Tipo Documento', dataIndex: 'docuName', flex: 1, hidden: true, sortable: true },
                                            { text: 'Acrónimo Documento', dataIndex: 'docuAcronyms', flex: 1, hidden: true, sortable: true },
                                            { text: 'Usuario del Registro de Documento', dataIndex: 'docuLoginRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Registro de Documento', dataIndex: 'docuDateRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'ID Ciudad', dataIndex: 'pkCityId', flex: 1, hidden: true, sortable: true },
                                            { text: 'Ciudad', dataIndex: 'cityName', flex: 1, hidden: true, sortable: true },
                                            { text: 'Usuario del Registro de Ciudad', dataIndex: 'cityLoginRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Registro de Ciudad', dataIndex: 'cityDateRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'ID Departamento', dataIndex: 'pkStatId', flex: 1, hidden: true, sortable: true },
                                            { text: 'Departamento', dataIndex: 'statName', flex: 1, hidden: true, sortable: true },
                                            { text: 'Usuario del Registro del Departamento', dataIndex: 'statLoginRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Registro del Departamento', dataIndex: 'statDateRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'ID País', dataIndex: 'pkCounId', flex: 1, hidden: true, sortable: true },
                                            { text: 'País', dataIndex: 'counName', flex: 1, hidden: true, sortable: true },
                                            { text: 'Usuario del Registro del País', dataIndex: 'counLoginRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'Fecha Registro del País', dataIndex: 'counDateRegister', flex: 1, hidden: true, sortable: true },
                                            { text: 'ID UTC', dataIndex: 'pkUtcId', flex: 1, hidden: true, sortable: true },
                                            { text: 'UTC', dataIndex: 'utcNameUtc', flex: 1, hidden: true, sortable: true },
                                            { text: 'Zona UTC', dataIndex: 'utcZone', flex: 1, hidden: true, sortable: true }

                                        ],
                                        height: 320,
                                        width: '100%'
                                    }
                                ]
                            }
                            ]
                        }
                    ]
                }]
            }

        ];
        this.callParent(arguments);
    }
});
