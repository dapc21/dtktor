/**
 * @class eborasvehicle.store.Dashboard.PieAvailableFleet
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.PieAvailableFleet', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.PieAvailableFleet',
    storeId    : 'storePieAvailableFleet',
    autoLoad   : false
});
