/**
 * @class eborasvehicle.view.Module.Hourmeter
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
//var asPlates = [];
Ext.define('eborasvehicle.view.Module.GroupVehicle', {
    extend: 'Ext.container.Container',
    requires: [
        'eborasvehicle.view.Configuration.NewGroupVehicle'
    ],
    xtype: 'app-groupvehicle',
    layout: 'column',
    initComponent: function() {
        var storeUnitFuelEfficiency = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                { "id": "1", "name": "Km/gl" },
                { "id": "2", "name": "Km/l" },
                { "id": "3", "name": "kWh/100Km" },
                { "id": "4", "name": "m3/100Km" }
            ]
        });

        var storeVehicleTypesAtGroup = Ext.create('eborasvehicle.store.GroupVehicle.VehicleTypes');
        var storeGroupVehicleGroups = Ext.create('eborasvehicle.store.GroupVehicle.Groups');
        var storeAssignedPlates = Ext.create('eborasvehicle.store.GroupVehicle.AssignedPlates');
        var storeAvailablePlates = Ext.create('eborasvehicle.store.GroupVehicle.AvailablePlates');
        var storeCurrency = Ext.create('eborasvehicle.store.GroupVehicle.CurrencyTypes');
        var storeFuelTypes = Ext.create('eborasvehicle.store.GroupVehicle.FuelTypes');
        var storeMeasureUnits = Ext.create('eborasvehicle.store.GroupVehicle.MeasureUnits');
        var backgroundColor = "background-color: gray !important;color: white  !important;";
        this.items = [

            {
                columnWidth: 1,
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 0px 30px 5px 30px;',
                items: [{
                    columnWidth: 1,
                    border: false,
                    xtype: 'panel',
                    layout: 'column',
                    style: 'margin: 5px 30px 5px 30px;',
                    items: [{
                            columnWidth: .34,
                            border: false,
                            style: 'margin: 5px 5px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Grupo de vehículos',
                                        style: 'background: none;font-size: 20px;'
                                    }]
                                },
                                {
                                    xtpye: 'panel',
                                    cls: 'body-panel-gray-dark ',
                                    items: [{
                                            xtype: 'toolbar',
                                            cls: 'black-cls-vehicle',
                                            height: 35,
                                            items: [{
                                                    xtype: 'button',
                                                    iconCls: 'new-group-search',
                                                    style: 'background-color: transparent;background-image: none;border-color:black;',
                                                    scale: 'medium'

                                                }, {
                                                    xtype: 'textfield',
                                                    id: 'searchGroupVehicle',
                                                    enableKeyEvents: true,
                                                    cls: 'vehicule-dropdown',
                                                    style: 'margin-left:10px',
                                                    emptyText: 'Buscar grupo...',
                                                    listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            var text = textfield.getValue();
                                                            if (text.length > 2) {
                                                                text = text;
                                                            } else {
                                                                text = '';
                                                            }
                                                            Ext.getCmp('gridGroupVehicle').store.proxy.extraParams = {
                                                                criteria: text
                                                            };
                                                            Ext.getCmp('gridGroupVehicle').store.load();
                                                            Ext.getCmp('gridGroupVehicle').getView().refresh();
                                                        }
                                                    }
                                                }, '->',
                                                {

                                                    xtype: 'button',
                                                    iconCls: 'new-group',
                                                    style: 'background-color: transparent;background-image: none;border-color:black;',
                                                    scale: 'medium',
                                                    menu: {
                                                        xtype: 'app-configuration-newgroupvehicle'
                                                    }

                                                }
                                            ]
                                        },
                                        {

                                            xtype: 'grid',
                                            id: 'gridGroupVehicle',
                                            height: 230,
                                            store: storeGroupVehicleGroups,
                                            cls: 'conductores-grid',
                                            scroll: 'vertical',
                                            columns: [{
                                                    text: 'ID',
                                                    dataIndex: 'pkCsgrId',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Nombre grupo',
                                                    dataIndex: 'csgrName',
                                                    flex: 1,
                                                    hidden: false,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Fuente',
                                                    dataIndex: 'csgrSource',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'ID Usuario',
                                                    dataIndex: 'csgrUserId',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Login Registro',
                                                    dataIndex: 'csgrLoginRegister',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Fecha de Registro',
                                                    dataIndex: 'csgrDateRegister',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'ID Grty',
                                                    dataIndex: 'fkGrtyId',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Gr Default',
                                                    dataIndex: 'csgrDefault',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: '',
                                                    xtype: 'actioncolumn',
                                                    width: 50,
                                                    hidden: false,
                                                    sortable: false,
                                                    stopSelection: true,
                                                    items: [{
                                                        icon: 'resources/images/delete-record.png',
                                                        tooltip: 'Eliminar',
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            this.fireEvent('actionClick', view, rowIndex, colIndex, item, e, record, row, 'eliminar');
                                                        }
                                                    }]
                                                }
                                            ],
                                            listeners: {
                                                cellclick: function(grid, rowIndex, colIndex, e) {
                                                    if (colIndex == 1) {
                                                        e.stopEvent();
                                                    }
                                                }
                                            }

                                        }
                                    ]
                                }
                            ]
                        },
                        {

                            columnWidth: .32,
                            border: false,
                            style: 'margin: 5px 5px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        xtype: 'label',
                                        name: 'vehicleGroupName',
                                        text: 'Nombre grupo',
                                        style: 'background: none;font-size: 20px;'
                                    }]
                                },
                                {
                                    xtpye: 'panel',
                                    cls: 'body-panel-gray-dark',
                                    items: [{
                                            xtype: 'toolbar',
                                            height: 35,
                                            items: ['->',
                                                {
                                                    xtype: 'tbtext',
                                                    style: 'margin-right:12px',
                                                    text: 'Tipo de vehículo',
                                                    name: 'tipo_combustible_vehiculo_texto'
                                                }
                                            ]
                                        },
                                        {
                                            height: 230,
                                            xtype: 'grid',
                                            id: 'gridAssignedPlates',
                                            viewConfig: {
                                                plugins: {
                                                    ptype: 'gridviewdragdrop',
                                                    dragGroup: 'assignedPlatesGroup',
                                                    dropGroup: 'availablePlatesGroup'
                                                },
                                                listeners: {
                                                    drop: function(node, data, dropRec, dropPosition) {
                                                        var comboVh = Ext.getCmp('tpvhCombobox').getValue();
                                                        var gridAssignedPlates = Ext.getCmp('gridAssignedPlates');
                                                        var gridAvailablePlates = Ext.getCmp('gridAvailablePlates');
                                                        var storeAssignedPlates = gridAssignedPlates.getStore();
                                                        var storeAvailablePlates = gridAvailablePlates.getStore();
                                                        var dropPlate = data.records[0].get('plate');
                                                        var exist = 0;

                                                        if (comboVh == null) {
                                                            Ext.MessageBox.show({
                                                                title: 'Asignar Placas de Vehículos al Grupo.',
                                                                msg: 'Debe seleccionar un tipo de vehículo antes de realizar la asignación!',
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.WARNING
                                                            });
                                                            storeAvailablePlates.add(data.records[0])
                                                            storeAssignedPlates.remove(data.records[0]);
                                                        }

                                                        /*storeAssignedPlates.each(function(record) {
                                                            if (record.data['plate'] == dropPlate) {
                                                                exist = 1;
                                                            }
                                                        });

                                                        if (exist == 1) {
                                                            Ext.MessageBox.show({
                                                                title        : 'Asignar Placas de Vehículos al Grupo.',
                                                                msg          : 'No se puede asignar. La placa '+dropPlate+' ya se encontraba asignada!',
                                                                buttons      : Ext.MessageBox.OK,
                                                                icon         : Ext.MessageBox.WARNING
                                                            });
                                                            storeAvailablePlates.add(data.records[0])
                                                            storeAssignedPlates.remove(data.records[0]);
                                                        }*/
                                                    }
                                                }
                                            },
                                            store: storeAssignedPlates,
                                            columns: [{
                                                text: 'ID',
                                                dataIndex: 'id',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }, {
                                                text: 'Placa',
                                                dataIndex: 'plate',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            }, 
                                            {
                                                text: 'Combustible',
                                                dataIndex: 'typeFuel',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            },
                                            {
                                                text: 'CP',
                                                dataIndex: 'cp',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }]
                                        }
                                    ]
                                }
                            ]

                        },
                        {

                            columnWidth: .34,
                            border: false,
                            style: 'margin: 5px 5px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Placas disponibles',
                                        style: 'background: none;font-size: 20px;'
                                    }]
                                },
                                {
                                    xtpye: 'panel',
                                    cls: 'body-panel-gray-dark',
                                    items: [{
                                            xtype: 'toolbar',
                                            //cls: 'black-cls-vehicle',
                                            height: 35,
                                            items: ['->',
                                                {
                                                    style: 'margin-right:12px',
                                                    xtype: 'container',
                                                    width: 150,
                                                    cls: 'ctn-filter-component combo-vehicules-combustible',
                                                    items: [{
                                                        xtype: 'combobox',
                                                        id: 'tpvhCombobox',
                                                        name: 'tipo_vehiculo',
                                                        hideLabel: true,
                                                        store: storeVehicleTypesAtGroup,
                                                        cls: 'vehicule-dropdown',
                                                        displayField: 'tpvhName',
                                                        valueField: 'pkTpvhId',
                                                        typeAhead: true,
                                                        queryMode: 'remote',
                                                        triggerAction: 'all',
                                                        emptyText: 'Tipo de vehículo...',
                                                        allowBlank: true,
                                                        width: 150,
                                                        indent: true,
                                                        listConfig: {
                                                            loadingText: 'Cargando...',
                                                            loadMask: true
                                                        },
                                                        listeners: {
                                                            select: function(combo, records, eOpts) {
                                                                var typeId = records[0].raw['pkTpvhId'];
                                                                storeAvailablePlates.filterBy(function (record) {
                                                                     return (parseInt(record.get('typeId')) === typeId);
                                                                });
                                                            }
                                                        }
                                                    }]
                                                }
                                            ]
                                        },
                                        {
                                            height: 230,
                                            xtype: 'grid',
                                            id: 'gridAvailablePlates',
                                            viewConfig: {
                                                plugins: {
                                                    ptype: 'gridviewdragdrop',
                                                    dragGroup: 'availablePlatesGroup',
                                                    dropGroup: 'assignedPlatesGroup'
                                                },

                                                listeners: {
                                                    drop: function(node, data, dropRec, dropPosition) {
                                                        //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('plate') : ' on empty view';
                                                        //alert(dropRec.get('plate'));
                                                        //alert(data.records[0].get('plate'));
                                                    }
                                                }
                                            },
                                            store: storeAvailablePlates,
                                            columns: [{
                                                text: 'ID',
                                                dataIndex: 'id',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }, {
                                                text: 'Placa',
                                                dataIndex: 'plate',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            }, 
                                            {
                                                text: 'Combustible',
                                                dataIndex: 'typeFuel',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            },
                                            {
                                                text: 'CP',
                                                dataIndex: 'cp',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }]
                                        }
                                    ]
                                }
                            ]

                        }
                    ]
                }, ]
            },
            {
                columnWidth: 1,
                border: false,
                style: 'margin: 5px 30px 5px 30px;',
                items: [{

                        columnWidth: 1,
                        border: false,
                        style: 'margin: 5px 30px 0px 30px;',
                        cls: 'body-panel-gray-red',
                        items: [{
                            xtype: 'container',
                            cls: 'header-panel-gray-dark text-center',
                            items: [{
                                xtype: 'label',
                                text: 'Configuración de Grupo',
                                style: 'background: none;font-size: 20px;'
                            }]
                        }, {
                            xtype: 'panel',
                            height: 265,
                            id: 'configVehicleGroupTabPanel',
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
                                            id: 'buttonTabFuel',
                                            text: 'Combustible',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: true,
                                            pressed: true,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(true);
                                                    button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(0);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabRpm',
                                            text: 'RPM',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: true,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(true);
                                                    button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(1);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabBrake',
                                            text: 'Freno',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: false,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(false);
                                                    //button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(2);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabGear',
                                            text: 'Embrague',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: false,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(false);
                                                    //button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(3);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabFleetAvailable',
                                            text: 'D. Flota',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: true,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(true);
                                                    button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(4);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabIdleSpeed',
                                            text: 'Ralentí',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: true,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(true);
                                                    button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(5);
                                                }
                                            }
                                        },
                                        {
                                            flex: 1,
                                            xtype: 'button',
                                            id: 'buttonTabSpeed',
                                            text: 'Velocidad Km/h',
                                            cls: 'vehicle-button-config',
                                            toggleGroup: 'menu-toggle-vehicle3',
                                            enableToggle: true,
                                            pressedCls: 'vehicle-button-config-pressed',
                                            listeners: {
                                                click: function(button) {
                                                    button.toggle(true);
                                                    button.up().up().down('[name=config-vehicule]').getLayout().setActiveItem(6);
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtpye: 'panel',
                                    layout: 'card',
                                    name: 'config-vehicule',
                                    activeItem: 0,
                                    items: [
                                        /*** Pestaña Combustible ***/
                                        {
                                            xtype: 'form',
                                            id: 'form_config_fuel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            style: 'margin: 5px 5px 5px 5px;',
                                            items: [{
                                                    xtpye: 'panel',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            layout: 'column',
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'font-size: 15px;',
                                                                    text: 'Unidad Medida:'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    width: 100,
                                                                    style: 'margin-left: 115px;',
                                                                    cls: 'ctn-filter-component combo-vehicules combo-vehicules-combustible',
                                                                    items: [{
                                                                        columnWidth: .5,
                                                                        xtype: 'container',
                                                                        width: 85,
                                                                        cls: 'ctn-filter-component combo-vehicules-combustible',
                                                                        items: [{
                                                                            style: 'margin-lef:0px',
                                                                            xtype: 'combobox',
                                                                            id: 'unity',
                                                                            name: 'unity',
                                                                            hideLabel: true,
                                                                            store: storeMeasureUnits,
                                                                            cls: 'vehicule-dropdown',
                                                                            displayField: 'measureUnitName',
                                                                            valueField: 'measureUnitId',
                                                                            typeAhead: true,
                                                                            queryMode: 'remote',
                                                                            triggerAction: 'all',
                                                                            emptyText: 'Seleccione...',
                                                                            allowBlank: false,
                                                                            forceSelection: true,
                                                                            width: 85,
                                                                            indent: true,
                                                                            listConfig: {
                                                                                loadingText: 'Cargando...',
                                                                                loadMask: true
                                                                            }
                                                                        }]
                                                                    }]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 0.8,
                                                            layout: 'column',
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'float: none;font-size: 17px;',
                                                                    cls: 'vehicule-dropdown',
                                                                    text: 'Precio:'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    width: 85,
                                                                    cls: 'ctn-filter-component combo-vehicules',
                                                                    style: 'margin-left: 175px;',
                                                                    items: [{
                                                                        xtype: 'numberfield',
                                                                        cls: 'vehicule-dropdown',
                                                                        id: 'price',
                                                                        name: 'price',
                                                                        fieldStyle: 'text-align: right;',
                                                                        width: 85,
                                                                        enforceMaxLength: true,
                                                                        maxLength: 9,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 1.00,
                                                                        maxValue: 999999.99,
                                                                        maskRe: /[\d\,]/,
                                                                        maskReText: 'Carácter inválido.',
                                                                        vtype: 'currency',
                                                                        emptyText: '0,00',
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        allowNegative: false,
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false
                                                                    }]

                                                                }
                                                            ]
                                                        }
                                                    ]

                                                },
                                                {
                                                    xtpye: 'panel',
                                                    flex: 0.5,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'label',
                                                            style: 'font-size: 18px;',
                                                            text: 'RAG'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redLowerRangeFuel',
                                                                    name: 'redLowerRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    html: ' % a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redUpperRangeFuel',
                                                                    name: 'redUpperRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('redLowerRangeFuel');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' %'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowLowerRangeFuel',
                                                                    name: 'yellowLowerRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('redUpperRangeFuel');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' % a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowUpperRangeFuel',
                                                                    name: 'yellowUpperRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowLowerRangeFuel');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' %'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenLowerRangeFuel',
                                                                    name: 'greenLowerRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('yellowUpperRangeFuel');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' % a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenUpperRangeFuel',
                                                                    name: 'greenUpperRangeFuel',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'percentageDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('greenLowerRangeFuel');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' %'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtpye: 'panel',
                                                    flex: 1,
                                                    style: 'margin-top:20px',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        layout: {
                                                            type: 'hbox'
                                                        },
                                                        items: [{
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 15px;',
                                                                cls: 'vehicule-dropdown',
                                                                text: 'Eficiencia de consumo de Combustible:'
                                                            },
                                                            {
                                                                xtype: 'numberfield',
                                                                width: 35,
                                                                id: 'fuelEfficiency',
                                                                name: 'fuelEfficiency',
                                                                style: 'margin-left:20px;',
                                                                fieldStyle: 'text-align: right;',
                                                                cls: 'vehicule-dropdown',
                                                                enforceMaxLength: true,
                                                                maxLength: 6,
                                                                maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                minLength: 1,
                                                                minLengthText: 'La longitud mínima para este campo es {0}',
                                                                minValue: 0,
                                                                allowNegative: false,
                                                                maskRe: /[\d\,]/,
                                                                maskReText: 'Carácter inválido.',
                                                                vtype: 'threeIntTwoDec',
                                                                allowBlank: false,
                                                                decimalPrecision: 2,
                                                                decimalSeparator: ',',
                                                                emptyText: '0,00',
                                                                hideTrigger: true,
                                                                keyNavEnabled: false,
                                                                mouseWheelEnabled: false
                                                                    /*,
                                                                                                                                    listeners: {
                                                                                                                                        blur: function(field) {
                                                                                                                                            var value = this.value;
                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                        }
                                                                                                                                    }*/
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                id: 'unitFuelEfficiency',
                                                                name: 'unitFuelEfficiency',
                                                                hideLabel: true,
                                                                store: storeUnitFuelEfficiency,
                                                                cls: 'vehicule-dropdown',
                                                                displayField: 'name',
                                                                valueField: 'id',
                                                                typeAhead: true,
                                                                queryMode: 'local',
                                                                triggerAction: 'all',
                                                                emptyText: '...',
                                                                allowBlank: false,
                                                                width: 65,
                                                                style: 'margin-left:15px;',
                                                                indent: true,
                                                                listConfig: {
                                                                    loadingText: null,
                                                                    loadMask: false
                                                                }
                                                            }
                                                        ]
                                                    }]
                                                }
                                            ]

                                        },
                                        /*** Pestaña RPM ***/
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            // height: 265,
                                            style: 'margin: 5px 5px 5px 5px;',
                                            items: [{
                                                xtype: 'form',
                                                id: 'form_config_rpm',
                                                layout: {
                                                    type: 'hbox',
                                                },
                                                items: [{
                                                    xtpye: 'panel',
                                                    flex: 0.5,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'label',
                                                            style: 'font-size: 18px;',
                                                            text: 'RAG'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    html: '<div style="width:15px;height:20px;background-color:white;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'whiteLowerRangeRpm',
                                                                    name: 'whiteLowerRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    html: '   a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'whiteUpperRangeRpm',
                                                                    name: 'whiteUpperRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('whiteLowerRangeRpm');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: '  '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redLowerRangeRpm',
                                                                    name: 'redLowerRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('whiteUpperRangeRpm');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (blanco)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    html: '  a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redUpperRangeRpm',
                                                                    name: 'redUpperRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('redLowerRangeRpm');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowLowerRangeRpm',
                                                                    name: 'yellowLowerRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('redUpperRangeRpm');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: '   a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowUpperRangeRpm',
                                                                    name: 'yellowUpperRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowLowerRangeRpm');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenLowerRangeRpm',
                                                                    name: 'greenLowerRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('yellowUpperRangeRpm');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: '   a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenUpperRangeRpm',
                                                                    name: 'greenUpperRangeRpm',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('greenLowerRangeRpm');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }, ]
                                            }]
                                        },
                                        /*** Pestaña Freno ***/
                                        {
                                            xtype: 'panel',
                                            layout: { type: 'vbox' },
                                            // height: 265,
                                            style: 'margin: 5px 0px 5px 0px;',
                                            items: [{
                                                xtype: 'form',
                                                id: 'form_config_brake',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'center'
                                                },
                                                style: 'margin: 5px 5px 5px 5px;',
                                                items: [{
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                                xtype: 'label',
                                                                style: 'font-size: 18px;',
                                                                text: 'RAG'
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{
                                                                        html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redLowerRangeBrake',
                                                                        name: 'redLowerRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        html: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redUpperRangeBrake',
                                                                        name: 'redUpperRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('redLowerRangeBrake');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowLowerRangeBrake',
                                                                        name: 'yellowLowerRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('redUpperRangeBrake');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowUpperRangeBrake',
                                                                        name: 'yellowUpperRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('yellowLowerRangeBrake');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenLowerRangeBrake',
                                                                        name: 'greenLowerRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowUpperRangeBrake');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenUpperRangeBrake',
                                                                        name: 'greenUpperRangeBrake',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('greenLowerRangeBrake');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        style: 'margin-top:20px',
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                            xtpye: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'float: none;font-size: 15px;',
                                                                    cls: 'vehicule-dropdown',
                                                                    text: 'Uso del Freno:'
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 35,
                                                                    id: 'brakeUse',
                                                                    name: 'brakeUse',
                                                                    style: 'margin-left:20px;',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    maskReText: 'Carácter inválido.',
                                                                    vtype: 'threeIntTwoDec',
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:10px',
                                                                    text: ' Cant/hora'
                                                                }

                                                            ]
                                                        }]
                                                    }
                                                ]

                                            }, ]
                                        },
                                        /*** Pestaña Embrague ***/
                                        {
                                            xtype: 'panel',
                                            layout: { type: 'vbox' },
                                            // height: 265,
                                            style: 'margin: 5px 0px 5px 0px;',
                                            items: [{
                                                xtype: 'form',
                                                id: 'form_config_gear',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'center'
                                                },
                                                style: 'margin: 5px 5px 5px 5px;',
                                                items: [{
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                                xtype: 'label',
                                                                style: 'font-size: 18px;',
                                                                text: 'RAG'
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{
                                                                        html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redLowerRangeGear',
                                                                        name: 'redLowerRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        html: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redUpperRangeGear',
                                                                        name: 'redUpperRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('redLowerRangeGear');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowLowerRangeGear',
                                                                        name: 'yellowLowerRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('redLowerRangeGear');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowUpperRangeGear',
                                                                        name: 'yellowUpperRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('yellowLowerRangeGear');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenLowerRangeGear',
                                                                        name: 'greenLowerRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowLowerRangeGear');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenUpperRangeGear',
                                                                        name: 'greenUpperRangeGear',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('greenLowerRangeGear');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        style: 'margin-top:20px',
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                            xtpye: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'float: none;font-size: 15px;',
                                                                    cls: 'vehicule-dropdown',
                                                                    text: 'Uso del Embrague:'
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 35,
                                                                    id: 'gearUse',
                                                                    name: 'gearUse',
                                                                    style: 'margin-left:20px;',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    maskReText: 'Carácter inválido.',
                                                                    vtype: 'threeIntTwoDec',
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:10px',
                                                                    text: ' Cant/hora'
                                                                }

                                                            ]
                                                        }]
                                                    }
                                                ]

                                            }, ]
                                        },
                                        /*** Pestaña D. Flota ***/
                                        {
                                            xtype: 'panel',
                                            layout: { type: 'vbox' },
                                            // height: 265,
                                            style: 'margin: 5px 0px 5px 0px;',
                                            items: [{
                                                xtype: 'panel',
                                                layout: { type: 'vbox' },
                                                // height: 265,
                                                style: 'margin: 5px 0px 5px 0px;',
                                                items: [{
                                                    xtype: 'form',
                                                    id: 'form_config_fleet_available',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch',
                                                        pack: 'center'
                                                    },
                                                    style: 'margin: 5px 5px 5px 5px;',
                                                    items: [{
                                                            xtpye: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'font-size: 18px;',
                                                                    text: 'RAG'
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    style: 'margin-top:20px',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [{
                                                                            html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                        }, {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'redLowerRangeFleetAvailable',
                                                                            name: 'redLowerRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            minValue: 0,
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            html: ' % a  '
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'redUpperRangeFleetAvailable',
                                                                            name: 'redUpperRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false,
                                                                            validator: function(field) {
                                                                                    var field1 = Ext.getCmp('redLowerRangeFleetAvailable');
                                                                                    if (this.getValue() <= field1.getValue()) {
                                                                                        return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                                    }
                                                                                    return true;
                                                                                }
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            text: ' %'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    style: 'margin-top:20px',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [{

                                                                            html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                        }, {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'yellowLowerRangeFleetAvailable',
                                                                            name: 'yellowLowerRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            minValue: 0,
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false,
                                                                            validator: function(field) {
                                                                                var field1 = Ext.getCmp('redUpperRangeFleetAvailable');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            text: ' % a  '
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'yellowUpperRangeFleetAvailable',
                                                                            name: 'yellowUpperRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false,
                                                                            validator: function(field) {
                                                                                    var field1 = Ext.getCmp('yellowLowerRangeFleetAvailable');
                                                                                    if (this.getValue() <= field1.getValue()) {
                                                                                        return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                                    }
                                                                                    return true;
                                                                                }
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            text: ' %'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    style: 'margin-top:20px',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [{

                                                                            html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                        }, {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'greenLowerRangeFleetAvailable',
                                                                            name: 'greenLowerRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            minValue: 0,
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false,
                                                                            validator: function(field) {
                                                                                var field1 = Ext.getCmp('yellowUpperRangeFleetAvailable');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            text: ' % a  '
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            width: 50,
                                                                            id: 'greenUpperRangeFleetAvailable',
                                                                            name: 'greenUpperRangeFleetAvailable',
                                                                            fieldStyle: 'text-align: right;',
                                                                            cls: 'vehicule-dropdown',
                                                                            style: 'margin-left:5px',
                                                                            enforceMaxLength: true,
                                                                            maxLength: 6,
                                                                            maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                            minLength: 1,
                                                                            minLengthText: 'La longitud mínima para este campo es {0}',
                                                                            allowNegative: false,
                                                                            maskRe: /[\d\,]/,
                                                                            allowBlank: false,
                                                                            decimalPrecision: 2,
                                                                            decimalSeparator: ',',
                                                                            emptyText: '0,00',
                                                                            vtype: 'percentageDec',
                                                                            hideTrigger: true,
                                                                            keyNavEnabled: false,
                                                                            mouseWheelEnabled: false,
                                                                            validator: function(field) {
                                                                                    var field1 = Ext.getCmp('greenLowerRangeFleetAvailable');
                                                                                    if (this.getValue() <= field1.getValue()) {
                                                                                        return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                                    }
                                                                                    return true;
                                                                                }
                                                                                /*,
                                                                                                                                                            listeners: {
                                                                                                                                                                blur: function(field) {
                                                                                                                                                                    var value = this.value;
                                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                                }
                                                                                                                                                            }*/
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            style: 'margin-left:5px',
                                                                            text: ' %'
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtpye: 'panel',
                                                            flex: 1,
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                xtpye: 'panel',
                                                                flex: 1,
                                                                layout: {
                                                                    type: 'hbox'
                                                                },
                                                                items: [{
                                                                        xtype: 'label',
                                                                        style: 'float: none;font-size: 15px;',
                                                                        cls: 'vehicule-dropdown',
                                                                        text: 'Tiempo de Operación:'
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 35,
                                                                        id: 'fleetOperationTime',
                                                                        name: 'fleetOperationTime',
                                                                        style: 'margin-left:20px;',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 5,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        maxValue: 24.00,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        maskReText: 'Carácter inválido.',
                                                                        vtype: 'twoIntTwoDec',
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:10px',
                                                                        text: ' hora/día'
                                                                    }

                                                                ]
                                                            }]
                                                        }
                                                    ]

                                                }, ]
                                            }, ]
                                        },
                                        /*** Pestaña Ralentí ***/
                                        {
                                            xtype: 'panel',
                                            layout: { type: 'vbox' },
                                            // height: 265,
                                            style: 'margin: 5px 0px 5px 0px;',
                                            items: [{
                                                xtype: 'form',
                                                id: 'form_config_idle_speed',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'center'
                                                },
                                                style: 'margin: 5px 5px 5px 5px;',
                                                items: [{
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                                xtype: 'label',
                                                                style: 'font-size: 18px;',
                                                                text: 'RAG'
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{
                                                                        html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redLowerRangeIdleSpeed',
                                                                        name: 'redLowerRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        html: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'redUpperRangeIdleSpeed',
                                                                        name: 'redUpperRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('redLowerRangeIdleSpeed');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowLowerRangeIdleSpeed',
                                                                        name: 'yellowLowerRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('redUpperRangeIdleSpeed');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'yellowUpperRangeIdleSpeed',
                                                                        name: 'yellowUpperRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('yellowLowerRangeIdleSpeed');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'panel',
                                                                style: 'margin-top:20px',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [{

                                                                        html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                    }, {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenLowerRangeIdleSpeed',
                                                                        name: 'greenLowerRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        minValue: 0,
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowUpperRangeIdleSpeed');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' % a  '
                                                                    },
                                                                    {
                                                                        xtype: 'numberfield',
                                                                        width: 50,
                                                                        id: 'greenUpperRangeIdleSpeed',
                                                                        name: 'greenUpperRangeIdleSpeed',
                                                                        fieldStyle: 'text-align: right;',
                                                                        cls: 'vehicule-dropdown',
                                                                        style: 'margin-left:5px',
                                                                        enforceMaxLength: true,
                                                                        maxLength: 6,
                                                                        maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                        minLength: 1,
                                                                        minLengthText: 'La longitud mínima para este campo es {0}',
                                                                        allowNegative: false,
                                                                        maskRe: /[\d\,]/,
                                                                        allowBlank: false,
                                                                        decimalPrecision: 2,
                                                                        decimalSeparator: ',',
                                                                        emptyText: '0,00',
                                                                        vtype: 'percentageDec',
                                                                        hideTrigger: true,
                                                                        keyNavEnabled: false,
                                                                        mouseWheelEnabled: false,
                                                                        validator: function(field) {
                                                                                var field1 = Ext.getCmp('greenLowerRangeIdleSpeed');
                                                                                if (this.getValue() <= field1.getValue()) {
                                                                                    return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                                }
                                                                                return true;
                                                                            }
                                                                            /*,
                                                                                                                                                    listeners: {
                                                                                                                                                        blur: function(field) {
                                                                                                                                                            var value = this.value;
                                                                                                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                        }
                                                                                                                                                    }*/
                                                                    },
                                                                    {
                                                                        xtype: 'label',
                                                                        style: 'margin-left:5px',
                                                                        text: ' %'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtpye: 'panel',
                                                        flex: 1,
                                                        style: 'margin-top:20px',
                                                        layout: {
                                                            type: 'vbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [{
                                                            xtpye: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox'
                                                            },
                                                            items: [{
                                                                    xtype: 'label',
                                                                    style: 'float: none;font-size: 15px;',
                                                                    cls: 'vehicule-dropdown',
                                                                    text: 'Tiempo Máximo de Ralentí:'
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 35,
                                                                    id: 'maximumIdleTime',
                                                                    name: 'maximumIdleTime',
                                                                    style: 'margin-left:20px;',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 5,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    maxValue: 60.00,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    maskReText: 'Carácter inválido.',
                                                                    vtype: 'twoIntTwoDec',
                                                                    emptyText: '0,00',
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' Min/Hora'
                                                                }

                                                            ]
                                                        }]
                                                    }
                                                ]

                                            }, ]
                                        },
                                        /*** Pestaña Velocidad ***/
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'center'
                                            },
                                            // height: 265,
                                            style: 'margin: 5px 5px 5px 5px;',
                                            items: [{
                                                xtype: 'form',
                                                id: 'form_config_speed',
                                                layout: {
                                                    type: 'hbox',
                                                },
                                                items: [{
                                                    xtpye: 'panel',
                                                    flex: 0.5,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [{
                                                            xtype: 'label',
                                                            style: 'font-size: 18px;',
                                                            text: 'RAG'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    html: '<div style="width:15px;height:20px;background-color:white;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'whiteLowerRangeSpeed',
                                                                    name: 'whiteLowerRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    html: '  a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'whiteUpperRangeSpeed',
                                                                    name: 'whiteUpperRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('whiteLowerRangeSpeed');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje inicial (blanco)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                    /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{
                                                                    html: '<div style="width:15px;height:20px;background-color:red;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redLowerRangeSpeed',
                                                                    name: 'redLowerRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('whiteUpperRangeSpeed');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (blanco)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                    /*,
                                                                    listeners: {
                                                                        blur: function(field) {
                                                                            var value = this.value;
                                                                            if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                        }
                                                                    }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    html: '  a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'redUpperRangeSpeed',
                                                                    name: 'redUpperRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('redLowerRangeSpeed');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (rojo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:yellow;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowLowerRangeSpeed',
                                                                    name: 'yellowLowerRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('redUpperRangeSpeed');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (rojo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: '  a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'yellowUpperRangeSpeed',
                                                                    name: 'yellowUpperRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('yellowLowerRangeSpeed');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (amarillo)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            style: 'margin-top:20px;margin-left: 10px;',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [{

                                                                    html: '<div style="width:15px;height:20px;background-color:green;border-radius: 25px;"></div>'
                                                                }, {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenLowerRangeSpeed',
                                                                    name: 'greenLowerRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    minValue: 0,
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                        var field1 = Ext.getCmp('yellowUpperRangeSpeed');
                                                                        if (this.getValue() <= field1.getValue()) {
                                                                            return 'Este valor debe ser mayor al porcentaje final (amarillo)';
                                                                        }
                                                                        return true;
                                                                    }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: '  a  '
                                                                },
                                                                {
                                                                    xtype: 'numberfield',
                                                                    width: 50,
                                                                    id: 'greenUpperRangeSpeed',
                                                                    name: 'greenUpperRangeSpeed',
                                                                    fieldStyle: 'text-align: right;',
                                                                    cls: 'vehicule-dropdown',
                                                                    style: 'margin-left:5px',
                                                                    enforceMaxLength: true,
                                                                    maxLength: 6,
                                                                    maxLengthText: 'La longitud máxima para este campo es {0}',
                                                                    minLength: 1,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    allowNegative: false,
                                                                    maskRe: /[\d\,]/,
                                                                    allowBlank: false,
                                                                    decimalPrecision: 2,
                                                                    decimalSeparator: ',',
                                                                    emptyText: '0,00',
                                                                    vtype: 'threeIntTwoDec',
                                                                    hideTrigger: true,
                                                                    keyNavEnabled: false,
                                                                    mouseWheelEnabled: false,
                                                                    validator: function(field) {
                                                                            var field1 = Ext.getCmp('greenLowerRangeSpeed');
                                                                            if (this.getValue() <= field1.getValue()) {
                                                                                return 'Este valor debe ser mayor al porcentaje inicial (verde)';
                                                                            }
                                                                            return true;
                                                                        }
                                                                        /*,
                                                                                                                                            listeners: {
                                                                                                                                                blur: function(field) {
                                                                                                                                                    var value = this.value;
                                                                                                                                                    if (Number(value) === value && value % 1 === 0) field.setRawValue(value.toFixed(2));
                                                                                                                                                }
                                                                                                                                            }*/
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    style: 'margin-left:5px',
                                                                    text: ' '
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }, ]
                                            }]
                                        }
                                    ]
                                },
                            ]
                        }]
                    },
                    //BOTONES
                    {
                        xtype: 'container',
                        height: 100,
                        style: 'margin: 0px 30px 5px 30px;',
                        items: [{
                                xtype: 'container',
                                items: [{
                                        xtype: 'button',
                                        style: {
                                            textAlign: 'center'
                                        },
                                        cls: 'icon-cancel btn-cancel-window-configuration right',
                                        id: 'vehicleGroupConfigCancelButton',
                                        itemId: 'vehicleGroupConfigCancelButton'
                                    },
                                    {
                                        xtype: 'button',
                                        style: {
                                            textAlign: 'center'
                                        },
                                        cls: 'icon-check btn-ok-window-configuration right',
                                        id: 'vehicleGroupConfigSaveButton',
                                        itemId: 'vehicleGroupConfigSaveButton'
                                    }
                                ]
                            }

                        ]

                    }
                ]
            }
        ];

        //Evento agregado para borrar grupo 
        //con un itemclick en controller
        this.addEvents('actionClick');
        this.callParent(arguments);
    }
});