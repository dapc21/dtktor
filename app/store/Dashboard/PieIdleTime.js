/**
 * @class eborasvehicle.store.Dashboard.PieIdleTime
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.PieIdleTime', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.PieIdleTime',
    storeId    : 'storePieIdleTime',
    autoLoad   : false
});
