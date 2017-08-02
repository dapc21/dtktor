/**
 * @class eborasvehicle.view.Viewport
 * @extends Ext.container.Viewport
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.view.ViewPort', {
    extend    : 'Ext.container.Viewport',
    requires  : [
        'Ext.layout.container.Fit',
        'eborasvehicle.view.Main.ViewMain'
    ],
    layout    : 'fit',
    items     : [{
        xtype : 'app-main'
    }]
});
