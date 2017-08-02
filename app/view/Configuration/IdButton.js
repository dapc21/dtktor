/**
 * @class eborasvehicle.view.Configuration.IdButton
 * @extends Ext.menu.Menu
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.view.Configuration.IdButton', {
    extend: 'Ext.window.Window',
    requires: [
        'eborasvehicle.view.Configuration.NewIdButton',
    ],
    xtype: 'app-configuration-IdButton',
    id: 'windowIdButton',
    width: 400,
    height: 450,
    layout: {
        type: 'hbox',
        align: 'stretch'
        },
        resizable: false,
        modal: true,
        autoScroll:true,
        closable: false,
          draggable:false,
            plain:true,
    bodyStyle: 'background-color:#58585B !important;',
    
     initComponent: function() {
    
    var storeListIdButton = Ext.create('eborasvehicle.store.Driver.ListIdButton');
    
    this.items = [{
        flex:0.1,    
        xtype: 'panel',
        bodyStyle: 'background-color:white !important;',
        layout: {
        type: 'vbox',
        align: 'stretch'
        },
        items: [{
            flex:2, 
            xtype: 'form',
            id: 'form_id_button',
            layout: {
            type: 'vbox',
            align: 'stretch'
            },
            items: [                  
                
                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    cls: 'header-panel-new-pass text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'ID Button',
                                        style: 'background: none;color: white;font-size: 20px;'
                                    }]
                                },
                                {
                                xtype: 'panel',
                                flex: 2,
                                layout: { type: 'hbox', align: 'stretch' },
                                style: 'margin: 15px 0px 0px 0px;',
                                items: [{
                                        xtype: 'textfield',
                                        itemId: 'idButton',
                                        id: 'idButton',
                                        name: 'idButton',
                                        allowBlank: false,
                                        hidden: true
                                        },
                                        {
                                        flex: 0.25,
                                        xtype: 'panel',
                                        style: 'margin: 10px 0px 0px 0px;',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [{
                                                    xtype: 'button',
                                                    itemId: 'photo',
                                                    style: 'margin: 0px 0px 0px 15px',
                                                    cls: 'new-driver',
                                                    flex: 1
                                                }
                                           
                                        ]
                                    },
                                    {
                                xtype: 'panel',
                                flex: 0.75,
                                layout: { type: 'vbox', align: 'stretch' },
                                style: 'margin: 15px 0px 0px 0px;',
                                items: [{
                                        xtype: 'label',
                                        name: 'name',
                                        flex: 1,
                                        text: 'Nombre'
                                        }
                                            ,{
                                                xtype: 'label',
                                                name: 'id',
                                                id:'id',
                                                flex: 1,
                                                text: 'Id:'
                                            },
                                            {
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
                                                id: 'searchIdButton',
                                                width: 105,
                                                cls: 'driver-dropdown',
                                                emptyText: 'Buscar Id...',
                                                listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            var texto = textfield.getValue();
                                                            if (texto.length > 2) {
                                                                Ext.getCmp('gridIdButton').store.clearData();
                                                                Ext.getCmp('gridIdButton').store.proxy.extraParams = {
                                                                    idbuCode: texto
                                                                };
                                                                Ext.getCmp('gridIdButton').store.load();
                                                                Ext.getCmp('gridIdButton').getView().refresh();
                                                            }else {
                                                                if (texto.length == 0){
                                                                Ext.getCmp('gridIdButton').store.clearData();
                                                                Ext.getCmp('gridIdButton').store.proxy.extraParams = {
                                                                    idbuCode: ''
                                                                };
                                                                Ext.getCmp('gridIdButton').store.load();
                                                                Ext.getCmp('gridIdButton').getView().refresh();
                                                            }
                                                                   }
                                                        }
                                                    }
                                                
                                                            }
                                        ]
                                    }
                                
                    
                    
                    
                    ]
                }
                                
                    
                    
                    
                    ]
                }
                            ,
                                
                                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    cls: 'header-panel-new-pass text-center',
                                    layout: 'column',
                                    items: [{
                                        columnWidth: .9,
                                        xtype: 'label',
                                        text: 'Id disponibles',
                                        style: 'background: none;color: white;font-size: 20px;'
                                    },
                                                {
                                                    columnWidth: .08,
                                                    xtype: 'button',
                                                    iconCls: 'new-id-button',
                                                    itemId: 'btnNewIdButton',
                                                    id: 'btnNewIdButton',
                                                    style: 'background-color: transparent;background-image: none;border-color:#58585B;',
                                                    scale: 'medium',
//                                                    menu: {
//                                                        xtype: 'app-configuration-newidbutton'
//                                                    }
                                                }
                                            
                                                ]
                                },
                                                    {

                                            xtype: 'grid',
                                            id: 'gridIdButton',
                                            style: 'margin: 5px 0px 0px 0px;',
                                            flex: 2,
                                            allowBlank: false,
                                            store: storeListIdButton,
                                            scroll: 'vertical',
                                            columns: [{
                                                    text: 'ID',
                                                    dataIndex: 'pkIdbuId',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'Id',
                                                    dataIndex: 'idbuCode',
                                                    flex: 1,
                                                    hidden: false,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'idbuLoginRegister',
                                                    dataIndex: 'idbuLoginRegister',
                                                    flex: 1,
                                                    hidden: true,
                                                    sortable: true
                                                },
                                                {
                                                    text: 'idbuDateRegister',
                                                    dataIndex: 'idbuDateRegister',
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
                                                            this.fireEvent('actionIdButtonClick', view, rowIndex, colIndex, item, e, record, row, 'eliminar');
                                                        }
                                                    }]
                                                }
                                            ]
                                            

                                        },
                                                    {
                                                xtype: 'panel',
                                                cls: 'header-panel-new-pass text-center',
                                                style: 'margin: 0px 0px 0px 0px;',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch',
                                                    pack: 'end'
                                                },
                                                items: [{
                                                    xtype: 'container',
                                                    style: 'margin: 0px 10px 10px 0px;',
                                                    items: [{
                                                            style: {

                                                                textAlign: 'center'
                                                            },
                                                            xtype: 'button',
                                                            cls: 'icon-cancel btn-cancel-window-configuration right',
                                                            id: 'idButtonCancelButton',
                                                            itemId: 'idButtonCancelButton'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            style: {

                                                                textAlign: 'center'
                                                            },
                                                            cls: 'icon-check btn-ok-window-configuration right',
                                                            id: 'idButtonSaveButton',
                                                            itemId: 'idButtonSaveButton'
                                                        }
                                                    ]
                                                }]
                                            }
        
        
        
        
            
        ]
        
                }]
        
    }];
    this.addEvents('actionIdButtonClick');
    this.callParent(arguments);


     }


});