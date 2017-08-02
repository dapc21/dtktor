/**
 * @class eborasvehicle.view.Main.Header
 * @extends Ext.container.Container
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.view.Main.Header', {
    extend: 'Ext.container.Container',
    xtype: 'app-header',
    cls: 'ctn-brand',
    id: 'ctnHeader',
    items: [{
            xtype: 'container',
            cls: 'ctn-brand-text-module',
            style: 'font-size:15px;',
            html: 'Vehículos'
        },
        {
            xtype: 'container',
            cls: 'ctn-name-login',
            items: [{
                    xtype: 'image',
                    itemId: 'imgLogin',
                    cls: 'right',
                    style: 'height:20px; width: 20px;margin-left: 18px;',
                    src: 'resources/images/nn.jpg'
                },
                {
                    xtype: 'label',
                    itemId: 'lblLogin',
                    cls: 'right lbl-name-login',
                    style: 'font-size:15px;',
                    text: 'Nombre de la cuenta'
                }
            ]
        },
        {
            xtype: 'button',
            itemId: 'btnLogout',
            cls: 'btn-close-session'
        }
    ]
});