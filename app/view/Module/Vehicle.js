/**
 * @class eborasvehicle.view.Module.Vehicle
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Module.Vehicle', {
    extend: 'Ext.container.Container',
    xtype: 'app-vehicle',
    layout: 'column',
    initComponent: function() {
        var storeVehicleTypes = Ext.create('eborasvehicle.store.Vehicle.VehicleTypes');
        var storeProductCodes = Ext.create('eborasvehicle.store.Vehicle.ProductCodes');
        var storeListVehicle = Ext.create('eborasvehicle.store.Vehicle.ListVehicle');
        var storeListDriver = Ext.create('eborasvehicle.store.Vehicle.ListDriver');
        var storeFuelTypes = Ext.create('eborasvehicle.store.Vehicle.FuelTypes');
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
                                        text: 'Vehículo',
                                        id: 'tabVehicle1',
                                        cls: 'vehicle-button',
                                        toggleGroup: 'menu-toggle-vehicle',
                                        enableToggle: true,
                                        pressed: true,
                                        pressedCls: 'vehicle-button-pressed',
                                        listeners: {
                                            click: function(button) {

                                                button.toggle(true);
                                                button.up().up().down('[name=vehicule-card]').getLayout().setActiveItem(0);
                                            }
                                        }
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Buscar Vehículo',
                                        id: 'tabSearchVehicle',
                                        cls: 'vehicle-button-search',
                                        toggleGroup: 'menu-toggle-vehicle',
                                        enableToggle: true,
                                        pressedCls: 'vehicle-button-search-pressed',
                                        listeners: {
                                            click: function(button) {
                                                button.toggle(true);
                                                button.up().up().down('[name=vehicule-card]').getLayout().setActiveItem(1);
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtpye: 'panel',
                                layout: 'card',
                                name: 'vehicule-card',
                                cls: 'body-panel-gray-dark',
                                activeItem: 0,
                                items: [{
                                    xtype: 'form',
                                    id: 'form_vehicle1',
                                    height: 265,
                                    layout: 'column',
                                    style: 'margin: 5px 5px 5px 5px;',
                                    items: [{
                                            columnWidth: .35,
                                            xtpye: 'container',
                                            style: 'border-right:1px solid',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [{
                                                    xtype: 'container',
                                                    flex: 1,
                                                    height: 50,
                                                    width: 270,
                                                    style: 'margin-top:4em;',
                                                    layout: 'column',
                                                    items: [{
                                                            columnWidth: .5,
                                                            xtype: 'label',
                                                            style: 'float: none;font-size: 17px;',
                                                            text: 'Tipo:'
                                                        },
                                                        {
                                                            columnWidth: .5,
                                                            xtype: 'container',
                                                            width: 110,
                                                            cls: 'ctn-filter-component combo-vehicules',
                                                            items: [{
                                                                style: backgroundColor,
                                                                xtype: 'combobox',
                                                                cls: 'vehicule-dropdown',
                                                                name: 'tipo_vehiculo',
                                                                hideLabel: true,
                                                                store: storeVehicleTypes,
                                                                displayField: 'tpvhName',
                                                                valueField: 'pkTpvhId',
                                                                typeAhead: true,
                                                                queryMode: 'remote',
                                                                triggerAction: 'all',
                                                                emptyText: 'Seleccione...',
                                                                allowBlank: false,
                                                                width: 110,
                                                                indent: true,
                                                                listConfig: {
                                                                    loadingText: 'Cargando...',
                                                                    loadMask: true
                                                                },
                                                                listeners: {
                                                                    select: function(combo, records, eOpts) {
                                                                        var name = records[0].raw['tpvhName'];
                                                                        var imgTag = document.getElementsByClassName('vehicle-image-size');
                                                                        imgTag[0].src = 'resources/images/' + name + '.png';
                                                                    }
                                                                }
                                                            }]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    height: 50,
                                                    width: 270,
                                                    layout: 'column',
                                                    items: [{
                                                            columnWidth: .5,
                                                            xtype: 'label',
                                                            style: 'float: none;font-size: 17px;',
                                                            text: 'Placa:'
                                                        },
                                                        {
                                                            columnWidth: .5,
                                                            xtype: 'container',
                                                            width: 110,
                                                            cls: 'ctn-filter-component combo-vehicules',
                                                            items: [{
                                                                cls: 'vehicule-dropdown',
                                                                style: backgroundColor,
                                                                fieldStyle: 'text-transform: uppercase',
                                                                xtype: 'textfield',
                                                                name: 'placa_vehiculo',
                                                                allowBlank: false,
                                                                maxLength: 10,
                                                                enforceMaxLength :10,
                                                                minLength: 5,
                                                                minLengthText: 'La longitud mínima para este campo es {0}',
                                                                vtype: 'alphanum',
                                                                width: 110,
                                                                listeners: {
                                                                    change: function(field, newValue, oldValue) {
                                                                        field.setValue(newValue.toUpperCase());
                                                                    }
                                                                }
                                                            }]

                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    height: 50,
                                                    width: 270,
                                                    layout: 'column',
                                                    items: [{
                                                            columnWidth: .5,
                                                            xtype: 'label',
                                                            style: 'float: none;font-size: 17px;',
                                                            text: 'Asignar CP:'
                                                        },
                                                        {
                                                            columnWidth: .5,
                                                            xtype: 'container',
                                                            width: 110,
                                                            cls: 'ctn-filter-component combo-vehicules',
                                                            items: [{
                                                                style: backgroundColor,
                                                                xtype: 'combobox',
                                                                name: 'asignarcp_vehiculo',
                                                                hideLabel: true,
                                                                store: storeProductCodes,
                                                                displayField: 'cpsMin',
                                                                cls: 'vehicule-dropdown',
                                                                valueField: 'pkCpsId',
                                                                typeAhead: true,
                                                                queryMode: 'remote',
                                                                triggerAction: 'all',
                                                                emptyText: 'Seleccione...',
                                                                allowBlank: false,
                                                                width: 110,
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
                                                    height: 50,
                                                    width: 270,
                                                    layout: 'column',
                                                    items: [{
                                                            columnWidth: .5,
                                                            xtype: 'label',
                                                            style: 'float: none;font-size: 17px;',
                                                            text: 'Alias:'
                                                        },
                                                        {
                                                            columnWidth: .5,
                                                            xtype: 'container',
                                                            width: 110,
                                                            cls: 'ctn-filter-component combo-vehicules',
                                                            items: [{
                                                                style: backgroundColor,
                                                                cls: 'vehicule-dropdown',
                                                                xtype: 'textfield',
                                                                name: 'alias_vehiculo',
                                                                allowBlank: true,
                                                                vtype: 'alphanum',
                                                                maxLength: 15,
                                                                enforceMaxLength :15,
                                                                width: 110
                                                            }]

                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            columnWidth: .55,
                                            xtpye: 'container',
                                            items: [{
                                                xtype: 'panel',
                                                style: 'margin: 0px 0px 0px 5em',
                                                html: '<img class="vehicle-image-size" src="././resources/images/A1A1A1.png"/>',

                                            }]
                                        }
                                    ]
                                }, {
                                    xtype: 'panel',
                                    layout: { type: 'vbox' },
                                    height: 265,
                                    style: 'margin: 5px 0px 5px 0px;',
                                    items: [{
                                            xtype: 'panel',
                                            layout: { type: 'hbox' },
                                            items: [{
                                                    xtype: 'textfield',
                                                    enableKeyEvents: true,
                                                    id: 'searchVehicle',
                                                    style: 'margin-left:85em',
                                                    width: 85,
                                                    cls: 'vehicule-dropdown',
                                                    emptyText: 'Buscar vehículo...',
                                                    listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            var text = textfield.getValue();
                                                            if (text.length > 2) {
                                                                Ext.getCmp('gridVehicle').store.clearData();
                                                                Ext.getCmp('gridVehicle').store.proxy.extraParams = {
                                                                    vhclNumberPlate: text
                                                                };
                                                                Ext.getCmp('gridVehicle').store.load();
                                                                Ext.getCmp('gridVehicle').getView().refresh();
                                                            } else {
                                                                Ext.getCmp('gridVehicle').store.removeAll();
                                                                $('.tag-with-close').each(function() {
                                                                    var idDriver = $(this).parent().parent().parent().parent().attr('id');
                                                                    Ext.getCmp('panelDrivers').remove(idDriver);
                                                                });
                                                                Ext.getCmp('tabVehicle2').toggle(true);
                                                                Ext.getCmp('tabDrivers').toggle(false);
                                                                Ext.getCmp('tabDrivers').up().up().down('[name=vehicule-card-result]').getLayout().setActiveItem(0);
                                                                Ext.getCmp('tabDrivers').disable();
                                                                Ext.getCmp('comboDrivers').reset();
                                                                Ext.getCmp('comboDrivers').getStore().load();
                                                                Ext.getCmp('detailsVehicle').update('<div style="width: 100%;color: #6D6D6D;font-weight: bold;font-size: 16px;">Sin datos</div>');
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    html: '<div class="x-container icon-lupa left x-container-default" style="width:25px;height:25px;font-size:22px;margin-right:5px;margin-left:5px;" id="container-1199"><span id="container-1199-outerCt" style="display: table; width: 100%; table-layout: fixed;"><div id="container-1199-innerCt" style="display:table-cell;height:100%;vertical-align:top;" class=""></div></span></div>'
                                                }
                                            ]
                                        },

                                        {
                                            xtype: 'grid',
                                            id: 'gridVehicle',
                                            cls: 'vehicule-grid',
                                            store: storeListVehicle,
                                            columns: [
                                                { text: 'ID', dataIndex: 'pkVhclId', flex: 1, hidden: true, sortable: true },
                                                { text: 'Tipo', dataIndex: 'nameType', flex: 1, hidden: false, sortable: true },
                                                { text: 'Placa', dataIndex: 'vhclNumberPlate', flex: 1, hidden: false, sortable: true },
                                                { text: 'CP', dataIndex: 'imeiCp', flex: 1, hidden: false, sortable: true },
                                                { text: 'Alias', dataIndex: 'vhclAlias', flex: 1, hidden: false, sortable: true },
                                                { text: 'Grupo', dataIndex: 'nameUnity', flex: 1, hidden: false, sortable: true },
                                                { text: 'Vel. Límite', dataIndex: 'vhclVelocityLimit', flex: 1, hidden: true, sortable: true },
                                                { text: 'Chasis', dataIndex: 'vhclChasis', flex: 1, hidden: true, sortable: true },
                                                { text: 'Cilindraje', dataIndex: 'vhclCylinder', flex: 1, hidden: true, sortable: true },
                                                { text: 'Color', dataIndex: 'vhclColor', flex: 1, hidden: true, sortable: true },
                                                { text: 'Marca', dataIndex: 'vhclBrand', flex: 1, hidden: true, sortable: true },
                                                { text: 'Núm. de Motor', dataIndex: 'vhclMotor', flex: 1, hidden: true, sortable: true },
                                                { text: 'Modelo', dataIndex: 'vhclModel', flex: 1, hidden: true, sortable: true },
                                                { text: 'Núm. SOAT', dataIndex: 'vhclSoat', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Exp. SOAT', dataIndex: 'vhclExpirationSoat', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID trailer', dataIndex: 'vhclTrailerId', flex: 1, hidden: true, sortable: true },
                                                { text: 'Núm. Placa Trailer', dataIndex: 'vhclTrailerNumberPlate', flex: 1, hidden: true, sortable: true },
                                                { text: 'Capacidad Trailer', dataIndex: 'vhclTrailerNumberCapacity', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Venc. Revisión', dataIndex: 'vhclExpirationRevision', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Vehículo', dataIndex: 'vhclLoginRegister', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Creación del Vehículo', dataIndex: 'vhclDateRegister', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Tipo Vehículo', dataIndex: 'idType', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Tipo Vehículo', dataIndex: 'loginRegisterType', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Creación del Tipo de Vehículo', dataIndex: 'dateRegisterType', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Unidad de Medida', dataIndex: 'idUnity', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación de la Unidad de Medida', dataIndex: 'loginRegisterUnity', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Creación de la Unidad de Medida', dataIndex: 'dateRegisterUnity', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Código del Producto', dataIndex: 'idCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Mínimo del Código del Producto', dataIndex: 'minCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Firewall del Código del Producto', dataIndex: 'firewallCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Hardware del Código del Producto', dataIndex: 'hardwareCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Estado del Código del Producto', dataIndex: 'statusCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Protocolo del Código del Producto', dataIndex: 'protocolCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Núm. SIM Card del Código del Producto', dataIndex: 'numSimCardCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Código del Producto', dataIndex: 'loginRegisterCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Creación del Código del Producto', dataIndex: 'dateRegisterCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Operador del Código del Producto', dataIndex: 'operIdCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Operador del Código del Producto', dataIndex: 'operNameCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Operador del Código del Producto', dataIndex: 'operLoginRegisterCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Creación del Operador del Código del Producto', dataIndex: 'operDateRegisterCp', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Usuario Asignado del Vehículo', dataIndex: 'idUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Nombre del Usuario Asignado del Vehículo', dataIndex: 'nameUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'DNI del Usuario Asignado del Vehículo', dataIndex: 'identificationUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Teléfono del Usuario Asignado del Vehículo', dataIndex: 'phoneUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Móvil del Usuario Asignado del Vehículo', dataIndex: 'mobilePhoneUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Dirección del Usuario Asignado del Vehículo', dataIndex: 'addressUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Login del Usuario Asignado del Vehículo', dataIndex: 'loginUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Password del Usuario Asignado del Vehículo', dataIndex: 'passwordUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Correo Electrónico del Usuario Asignado del Vehículo', dataIndex: 'emailUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Cuenta Creada del Usuario Asignado del Vehículo', dataIndex: 'createAccountUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Estado del Usuario Asignado del Vehículo', dataIndex: 'statusUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Creación del Usuario Asignado del Vehículo', dataIndex: 'creationDateUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Cambio de Password del Usuario Asignado del Vehículo', dataIndex: 'changePasswordUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha Nacimiento del Usuario Asignado del Vehículo', dataIndex: 'birthDateUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'NIT del Usuario Asignado del Vehículo', dataIndex: 'nitUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Número de Contrato del Usuario Asignado del Vehículo', dataIndex: 'contractNumberUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fotos del Usuario Asignado del Vehículo', dataIndex: 'photoBlobUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Usuario Asignado del Vehículo', dataIndex: 'loginRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha de Creación del Usuario Asignado del Vehículo', dataIndex: 'dateRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Documento del Usuario Asignado del Vehículo', dataIndex: 'docuIdUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Nombre del Documento del Usuario Asignado del Vehículo', dataIndex: 'docuNameUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Acrónimo del Documento del Usuario Asignado del Vehículo', dataIndex: 'docuAcronymsUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Documento del Usuario Asignado del Vehículo', dataIndex: 'docuLoginRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha de Creación del Documento del Usuario Asignado del Vehículo', dataIndex: 'docuDateRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Ciudad del Usuario Asignado del Vehículo', dataIndex: 'cityIdUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Ciudad del Usuario Asignado del Vehículo', dataIndex: 'cityNameUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación de la Ciudad del Usuario Asignado del Vehículo', dataIndex: 'cityLoginRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha de Creación de la Ciudad del Usuario Asignado del Vehículo', dataIndex: 'cityDateRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Departamento del Usuario Asignado del Vehículo', dataIndex: 'statIdUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Departamento del Usuario Asignado del Vehículo', dataIndex: 'statNameUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del Departamento del Usuario Asignado del Vehículo', dataIndex: 'statLoginRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha de Creación del Departamento del Usuario Asignado del Vehículo', dataIndex: 'statDateRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID del País del Usuario Asignado del Vehículo', dataIndex: 'counIdUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'País del Usuario Asignado del Vehículo', dataIndex: 'counNameUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Usuario de Creación del País del Usuario Asignado del Vehículo', dataIndex: 'counLoginRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Fecha de Creación del País del Usuario Asignado del Vehículo', dataIndex: 'counDateRegisterUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'ID Tiempo Universal Coordinado del Usuario Asignado del Vehículo', dataIndex: 'utcIdUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Nombre del Tiempo Universal Coordinado del Usuario Asignado del Vehículo', dataIndex: 'utcNameUtcUser', flex: 1, hidden: true, sortable: true },
                                                { text: 'Zona Horaria del Tiempo Universal Coordinado del Usuario Asignado del Vehículo', dataIndex: 'utcZoneUser', flex: 1, hidden: true, sortable: true }

                                            ],
                                            height: 240,
                                            width: '100%',
                                            listeners: {
                                                itemclick: function(grid, record, item, index, e, eOpts) {
                                                    Ext.getCmp('tabVehicle2').toggle(false);
                                                    Ext.getCmp('tabDrivers').toggle(true);
                                                    Ext.getCmp('tabDrivers').enable();
                                                    Ext.getCmp('tabDrivers').up().up().down('[name=vehicule-card-result]').getLayout().setActiveItem(1);
                                                    Ext.getCmp('detailsVehicle').update('<div style="width: 100%;color: #6D6D6D;font-weight: bold;font-size: 16px;">' + record.data['vhclNumberPlate'] + " " + record.data['vhclAlias'] + '</div>');
                                                    storeListDriver.load();
                                                }
                                            }

                                        }
                                    ]
                                }]
                            }

                        ]
                    },
                    {

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
                                        text: 'Vehículo',
                                        id: 'tabVehicle2',
                                        cls: 'vehicle-button',
                                        toggleGroup: 'menu-toggle-vehicle2',
                                        enableToggle: true,
                                        pressed: true,
                                        pressedCls: 'vehicle-button-pressed',
                                        listeners: {
                                            click: function(button) {
                                                button.toggle(true);
                                                button.up().up().down('[name=vehicule-card-result]').getLayout().setActiveItem(0);
                                            }
                                        }
                                    },
                                    {
                                        flex: 1,
                                        xtype: 'button',
                                        text: 'Conductores',
                                        id: 'tabDrivers',
                                        cls: 'vehicle-button-search',
                                        toggleGroup: 'menu-toggle-vehicle2',
                                        enableToggle: true,
                                        pressedCls: 'vehicle-button-search-pressed',
                                        disabled: true,
                                        listeners: {
                                            click: function(button) {
                                                button.toggle(true);
                                                button.up().up().down('[name=vehicule-card-result]').getLayout().setActiveItem(1);
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtpye: 'panel',
                                layout: 'card',
                                name: 'vehicule-card-result',
                                cls: 'body-panel-gray-dark',
                                activeItem: 0,
                                items: [{
                                    xtype: 'form',
                                    id: 'form_vehicle2',
                                    height: 265,
                                    layout: 'column',
                                    style: 'margin: 5px 5px 5px 5px;',
                                    items: [{
                                                xtype: 'hiddenfield',
                                                name: 'id',
                                                value: ''
                                            },
                                            {
                                                columnWidth: .33,
                                                xtpye: 'container',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,
                                                        style: 'margin-top:4em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Chasis:'
                                                            },
                                                            {
                                                                columnWidth: .5,

                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'chasis_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :17,
                                                                    maxLength: 17,
                                                                    minLength: 17,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    vtype: 'alphanum',
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,

                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Cilindraje:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'cilindraje_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :5,
                                                                    maxLength: 5,
                                                                    minLength: 2,
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
                                                        height: 50,
                                                        width: 250,
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Color:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'color_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :15,
                                                                    maxLength: 15,
                                                                    minLength: 4,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,

                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Marca:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'marca_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :15,
                                                                    maxLength: 15,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .33,
                                                xtpye: 'container',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,
                                                        style: 'margin-top:4em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                cls: 'vehicule-dropdown',
                                                                text: 'Motor:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'motor_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :15,
                                                                    maxLength: 15,
                                                                    minLength: 3,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    vtype: 'alphanum',
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,

                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                cls: 'vehicule-dropdown',
                                                                text: 'Modelo:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'modelo_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :4,
                                                                    maxLength: 4,
                                                                    minLength: 4,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    maskRe: /([a-zA-Z0-9\s]+)$/,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 15px;',
                                                                text: 'Venc Revisión:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'datefield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'venc_revision_vehiculo',
                                                                    format: 'Y-m-d',
                                                                    value: new Date(),
                                                                    width: 100,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .4,
                                                                xtype: 'label',
                                                                style: 'font-size: 15px;',
                                                                text: 'Tipo Combustible:'
                                                            },
                                                            {
                                                                columnWidth: .55,
                                                                xtype: 'container',
                                                                style: 'margin-left:0px !important;',
                                                                cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                items: [{
                                                                    xtype: 'container',
                                                                    width: 100,
                                                                    cls: 'ctn-filter-component combo-vehicules-combustible',
                                                                    style: 'margin-left:0px !important',
                                                                    items: [{
                                                                        style: 'margin-left:0px !important',
                                                                        xtype: 'combobox',
                                                                        name: 'tipo_combustible_vehiculo',
                                                                        hideLabel: true,
                                                                        store: storeFuelTypes,
                                                                        cls: 'vehicule-dropdown',
                                                                        displayField: 'fuelTypeName',
                                                                        valueField: 'fuelTypeId',
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

                                                                }]

                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: .33,
                                                xtpye: 'container',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'center'
                                                },
                                                items: [{
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,
                                                        style: 'margin-top:4em;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Soat:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'textfield',
                                                                    cls: 'vehicule-dropdown',
                                                                    name: 'soat_vehiculo',
                                                                    width: 100,
                                                                    enforceMaxLength :15,
                                                                    maxLength: 15,
                                                                    vtype: 'alphanum',
                                                                    allowBlank: true
                                                                }]

                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        height: 50,
                                                        width: 250,

                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 17px;',
                                                                text: 'Venc Soat:'
                                                            },
                                                            {
                                                                columnWidth: .5,
                                                                xtype: 'container',
                                                                width: 100,
                                                                cls: 'ctn-filter-component combo-vehicules',
                                                                items: [{
                                                                    style: backgroundColor,
                                                                    xtype: 'datefield',
                                                                    name: 'venc_soat_vehiculo',
                                                                    cls: 'vehicule-dropdown',
                                                                    format: 'Y-m-d',
                                                                    value: new Date(),
                                                                    width: 100,
                                                                    allowBlank: false
                                                                }]

                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                        //fin form
                                }, {
                                    xtype: 'panel',
                                    layout: { type: 'vbox', layout: 'stretch' },
                                    height: 265,
                                    style: 'margin: 5px 0px 5px 0px;',
                                    items: [{
                                            flex: 0.3,
                                            items: [{
                                                    xtype: 'panel',
                                                    layout: { type: 'hbox' },
                                                    items: [{
                                                            xtype: 'combobox',
                                                            id: 'comboDrivers',
                                                            name: 'comboDrivers',
                                                            tpl: '<tpl for="."><div class="x-boundlist-item" >{drivName} {drivLastName}</div></tpl>',
                                                            displayTpl: '<tpl for=".">{drivName} {drivLastName}</tpl>',
                                                            cls: 'vehicule-dropdown',
                                                            style: 'margin-left:80em',
                                                            hideLabel: true,
                                                            store: storeListDriver,
                                                            displayField: 'drivName',
                                                            valueField: 'pkDrivId',
                                                            typeAhead: true,
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            emptyText: 'Conductores...',
                                                            allowBlank: false,
                                                            width: 140,
                                                            indent: true,
                                                            listConfig: {
                                                                loadingText: null,
                                                                loadMask: true,
                                                                listeners: {
                                                                    itemclick: function(list, record) {
                                                                        var band = 0;
                                                                        $(".tag-with-close").each(function() {
                                                                            if ($(this).attr('id') == record.get('pkDrivId')) {
                                                                                band = 1;
                                                                                return false;
                                                                            }
                                                                        });
                                                                        if (band != 1) {
                                                                            Ext.getCmp('panelDrivers').add({ id: 'driver' + record.get('pkDrivId'), html: '<div id="' + record.get('pkDrivId') + '" class="tag-with-close"><input name="radioBtnDrv" style="margin: 0px;" value="1" onchange="" type="radio"> ' + record.get('drivName') + ' ' + record.get('drivLastName') + '</div><a class="circle-close" onclick="removeDriver(driver' + record.get('pkDrivId') + ');">x</a>' });
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            html: '<div class="x-container icon-lupa left x-container-default" style="width:25px;height:25px;font-size:22px;margin-right:5px;margin-left:5px;" id="container-1199"><span id="container-1199-outerCt" style="display: table; width: 100%; table-layout: fixed;"><div id="container-1199-innerCt" style="display:table-cell;height:100%;vertical-align:top;" class=""></div></span></div>'

                                                        }
                                                    ]
                                                },

                                                {
                                                    xtpye: 'panel',
                                                    name: 'titleVehicle',
                                                    style: 'margin:12px',
                                                    width: 1000,
                                                    items: [{
                                                        id: 'detailsVehicle',
                                                        html: '<div style="width: 100%;color: #6D6D6D;font-weight: bold;font-size: 14px;">Sin datos</div>'
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'panel',
                                            id: 'panelDrivers',
                                            layout: 'hbox',
                                            style: 'margin:12px',
                                            width: 1000,
                                            items: [{
                                                    id: 'driver-1',
                                                    html: '<div class="tag-normal"> <input name="radioBtnDrv" style="margin: 0px;" value="-1" onchange="" type="radio"> Sin Conductor</div>'
                                                },
                                                {
                                                    id: 'driver-2',
                                                    html: '<div class="tag-normal"> <input name="radioBtnDrv" style="margin: 0px;" value="-2" onchange="" type="radio"> Conductor No Autorizado</div>'
                                                }
                                            ]
                                        }
                                    ]
                                }]
                            },
                            //BOTON OK
                            {
                                xtype: 'container',
                                height: 100,
                                /* items: [{
                                         xtype: 'button',
                                         cls: 'icon-check vehicle-btn-ok right',
                                         id: 'vehicleSaveButton',
                                         itemId: 'vehicleSaveButton'
                                     },
                                     {
                                         xtype: 'button',
                                         cls: 'icon-cancel btn-cancel-window-configuration right',
                                         id: 'vehicleCancelButton',
                                         itemId: 'vehicleCancelButton'
                                     }
                                 ]*/
                                items: [{
                                    xtype: 'container',

                                    items: [{
                                            style: {

                                                textAlign: 'center'
                                            },
                                            xtype: 'button',
                                            cls: 'icon-cancel btn-cancel-window-configuration right',
                                            id: 'vehicleCancelButton',
                                            itemId: 'vehicleCancelButton'
                                        },
                                        {
                                            xtype: 'button',
                                            style: {

                                                textAlign: 'center'
                                            },
                                            cls: 'icon-check btn-ok-window-configuration right',
                                            id: 'vehicleSaveButton',
                                            itemId: 'vehicleSaveButton'
                                        }
                                    ]
                                }]
                            }

                        ]

                    }
                ]
            }

        ];
        this.callParent(arguments);
    }
});