/**
 * @class eborasvehicle.store.Dashboard.GaugeFuelEconomy
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.GaugeFuelEconomy', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.GaugeFuelEconomy',
    storeId    : 'storeGaugeFuelEconomy',
    autoLoad   : false
});
