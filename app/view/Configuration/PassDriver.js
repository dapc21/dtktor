/**
 * @class eborasvehicle.view.Configuration.PassDriver
 * @extends Ext.menu.Menu
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.view.Configuration.PassDriver', {
    extend: 'Ext.window.Window',
    xtype: 'app-configuration-passdriver',
    id: 'windowpassdriver',
    width: 350,
    height: 180,
    layout: {
        type: 'hbox',
        align: 'stretch'
        },
                resizable: false,
        modal: true,
        autoScroll:true,
        closable: false,
          draggable:false,
    plain: true,
    bodyStyle: 'background-color:white !important;',
    items: [{
        flex:2,    
        xtype: 'panel',
        layout: {
        type: 'vbox',
        align: 'stretch'
        },
        items: [
            {
            xtype: 'form',
            id: 'form_pass_driver',
            layout: {
            type: 'vbox',
            align: 'stretch'
            },
            items: [
                {
                                    xtype: 'container',
                                    flex: 1,
                                    cls: 'header-panel-new-pass text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Contraseña',
                                        style: 'background: none;color: white;font-size: 20px;'
                                    }]
                                },
                                {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        style: 'margin: 15px 5px 5px 25px;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 15px;',
                                                                text: 'Nueva Contraseña:'
                                                            },
                                                            {
                                                                columnWidth: .45,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component',
                                                                items: [{
                                                                    style: 'background-color: gray !important;color: white !important;',
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'new_passsword',
                                                                    enforceMaxLength: 27,
                                                                    maxLength: 27,
                                                                    minLength: 27,
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
                                                        style: 'margin: 15px 5px 5px 25px;',
                                                        layout: 'column',
                                                        items: [{
                                                                columnWidth: .5,
                                                                xtype: 'label',
                                                                style: 'float: none;font-size: 15px;',
                                                                text: 'Confirmar Contraseña:'
                                                            },
                                                            {
                                                                columnWidth: .45,
                                                                xtype: 'container',
                                                                cls: 'ctn-filter-component',
                                                                items: [{
                                                                    style: 'background-color: gray !important;color: white !important;',
                                                                    xtype: 'textfield',
                                                                    cls: 'driver-dropdown',
                                                                    name: 'repeat_passsword',
                                                                    enforceMaxLength: 27,
                                                                    maxLength: 27,
                                                                    minLength: 27,
                                                                    minLengthText: 'La longitud mínima para este campo es {0}',
                                                                    vtype: 'alphanum',
                                                                    allowBlank: false
                                                                }]

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
                                                            style: {

                                                                textAlign: 'center'
                                                            },
                                                            xtype: 'button',
                                                            cls: 'icon-cancel btn-cancel-window-configuration right',
                                                            id: 'passDriverCancelButton',
                                                            itemId: 'passDriverCancelButton'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            style: {

                                                                textAlign: 'center'
                                                            },
                                                            cls: 'icon-check btn-ok-window-configuration right',
                                                            id: 'passSaveButton',
                                                            itemId: 'passSaveButton'
                                                        }
                                                    ]
                                                }]
                                            }
        
        
        
        
            
        ]
        
                }]   
        
    }]
});