/**
 * @class eborasvehicle.view.Tools.Filter
 * @extends Ext.container.Container
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.view.Tools.FilterVehicle', {
    extend: 'Ext.container.Container',
    xtype: 'app-filtervehicle',
    cls: 'ctn-filter',
    initComponent: function() {
        this.items = [{
            xtype: 'container',
            cls: 'ctn-filter-allcomponents',
            items: [{
                xtype: 'container',
                width: 70,
                cls: 'ctn-filter-buttons',
                items: [{
                    xtype: 'button',
                    iconCls: 'iconalarmoff',
                    cls: 'x-btn-dashboard x-btn-default-medium-dashboard',
                    scale: 'medium'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});