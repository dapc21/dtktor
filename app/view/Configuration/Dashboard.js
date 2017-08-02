/**
 * @class eborasvehicle.view.Configuration.Dashboard
 * @extends Ext.menu.Menu
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.view.Configuration.Dashboard', {
    extend    : 'Ext.menu.Menu',
    xtype     : 'app-configuration-dashboard',
    width     : 600,
    height    : 400,
    plain     : true,
    bodyStyle : 'background-color:transparent !important;',
    items     : [
        {
            xtype : 'container',
            cls   : 'ctn-toolbar-window-configuration',
            items : [
                {
                    xtype : 'container',
                    cls   : 'ctn-tab-window-configuration',
                    id    : 'tabDashboard',
                    html  : '1'
                }
                ,
                {
                    xtype : 'container',
                    cls   : 'ctn-tab-window-configuration',
                    id    : 'tab2',
                    html  : '2'
                }
                ,
                {
                    xtype : 'container',
                    cls   : 'ctn-tab-window-configuration',
                    id    : 'tab3',
                    html  : '3'
                }
                ,
                {
                    xtype : 'container',
                    cls   : 'ctn-tab-window-configuration',
                    id    : 'tab4',
                    html  : '4'
                }
                ,
                {
                    xtype : 'container',
                    cls   : 'ctn-title-window-configuration',
                    html  : 'Configuración'
                }
            ]
        }
        ,
        {
            xtype  : 'container',
            cls    : 'ctn-body-window-configuration',
            layout : 'column',
            items  : [
                {
                    columnWidth : 1,
                    border      : false,
                    cls         : 'ctn-title-body-window-configuration',
                    items       : [
                        {
                            xtype : 'label',
                            cls   : 'ctn-text-title-body-window-configuration',
                            text  : 'Ahorro de combustible'
                        }
                    ]
                }
                ,
                {
                    columnWidth : 1,
                    border      : false,
                    cls         : 'ctn-subtitle-body-window-configuration',
                    items       : [
                        {
                            xtype : 'label',
                            cls   : 'ctn-text-subtitle-body-window-configuration',
                            text  : 'Monetización'
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .4,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            cls   : 'ctn-label-form-body-window-configuration',
                                            text  : 'Moneda:'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .6,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype         : 'combobox',
                                            cls           : 'ctn-component-form-body-window-configuration',
                                            id            : 'cmbCurrency',
                                            itemId        : 'cmbCurrency',
                                            name          : 'cmbCurrency',
                                            hideLabel     : true,
                                            //store: store,
                                            displayField  : 'name',
                                            valueField    : 'id',
                                            typeAhead     : true,
                                            queryMode     : 'local',
                                            triggerAction : 'all',
                                            emptyText     : 'Seleccione...',
                                            allowBlank    : false,
                                            width         : 220,
                                            indent        : true,
                                            listConfig    : {
                                                loadingText : null,
                                                loadMask    : false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .4,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            cls   : 'ctn-label-form-body-window-configuration',
                                            text  : 'Tipo de combustible:'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .6,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype         : 'combobox',
                                            cls           : 'ctn-component-form-body-window-configuration',
                                            id            : 'cmbFuelType',
                                            itemId        : 'cmbFuelType',
                                            name          : 'cmbFuelType',
                                            hideLabel     : true,
                                            //store: store,
                                            displayField  : 'name',
                                            valueField    : 'id',
                                            typeAhead     : true,
                                            queryMode     : 'local',
                                            triggerAction : 'all',
                                            emptyText     : 'Seleccione...',
                                            allowBlank    : false,
                                            width         : 220,
                                            indent        : true,
                                            listConfig    : {
                                                loadingText : null,
                                                loadMask    : false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .4,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            cls   : 'ctn-label-form-body-window-configuration',
                                            text  : 'Unidad de Medida:'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .6,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype         : 'combobox',
                                            cls           : 'ctn-component-form-body-window-configuration',
                                            id            : 'cmbUnit',
                                            itemId        : 'cmbUnit',
                                            name          : 'cmbUnit',
                                            hideLabel     : true,
                                            //store: store,
                                            displayField  : 'name',
                                            valueField    : 'id',
                                            typeAhead     : true,
                                            queryMode     : 'local',
                                            triggerAction : 'all',
                                            emptyText     : 'Seleccione...',
                                            allowBlank    : false,
                                            width         : 220,
                                            indent        : true,
                                            listConfig    : {
                                                loadingText : null,
                                                loadMask    : false
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .4,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            cls   : 'ctn-label-form-body-window-configuration',
                                            text  : 'Precio:'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .6,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-form-body-window-configuration',
                                            id     : 'txtPrice',
                                            itemId : 'txtPrice',
                                            width  : 220
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    columnWidth : .6,
                    border      : false,
                    cls         : 'ctn-subtitle-body-window-configuration',
                    items       : [
                        {
                            xtype : 'label',
                            cls   : 'ctn-text-subtitle-body-window-configuration',
                            text  : 'RAG'
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            html  : '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:red;stroke-width:3;stroke:red"></svg></div>'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtRedPercentage1',
                                            itemId : 'txtRedPercentage1',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '% a'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtRedPercentage2',
                                            itemId : 'txtRedPercentage2',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .2,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '%'
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            html  : '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:yellow;stroke-width:3;stroke:yellow"></svg></div>'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtYellowPercentage1',
                                            itemId : 'txtYellowPercentage1',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '% a'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtYellowPercentage2',
                                            itemId : 'txtYellowPercentage2',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .2,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '%'
                                        }
                                    ]
                                }
                            ]
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            html  : '<div style="margin-top: 5px;display:inline-block;"><svg width="12" height="12"><rect width="12" height="12" style="fill:green;stroke-width:3;stroke:green"></svg></div>'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtGreenPercentage1',
                                            itemId : 'txtGreenPercentage1',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .1,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '% a'
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .3,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtGreenPercentage2',
                                            itemId : 'txtGreenPercentage2',
                                            width  : 90
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .2,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : '%'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    columnWidth : .4,
                    border      : false,
                    cls         : 'ctn-subtitle-body-window-configuration',
                    items       : [
                        {
                            xtype : 'label',
                            cls   : 'ctn-text-subtitle-body-window-configuration',
                            text  : 'Efic. de consumo combustible'
                        }
                        ,
                        {
                            xtype  : 'container',
                            layout : 'column',
                            items : [
                                {
                                    columnWidth : .5,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype  : 'textfield',
                                            cls    : 'ctn-component-middle-form-body-window-configuration',
                                            id     : 'txtFuelConsumption',
                                            itemId : 'txtFuelConsumption',
                                            width  : 100
                                        }
                                    ]
                                }
                                ,
                                {
                                    columnWidth : .5,
                                    border      : false,
                                    items       : [
                                        {
                                            xtype : 'label',
                                            text  : 'Km/gl'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        ,
        {
            xtype : 'container',
            cls   : 'ctn-buttons-window-configuration',
            items : [
                {
                    xtype : 'container',
                    cls   : 'ctn-btn-bottom-window-configuration',
                    items : [
                        {
                            xtype  : 'button',
                            cls    : 'icon-check btn-ok-window-configuration',
                            id     : 'btnSave',
                            itemId : 'btnSave'
                        }
                        ,
                        {
                            xtype  : 'button',
                            cls    : 'icon-cancel btn-cancel-window-configuration',
                            id     : 'btnCancel',
                            itemId : 'btnCancel'
                        }
                    ]
                }
            ]
        }
    ]
});
