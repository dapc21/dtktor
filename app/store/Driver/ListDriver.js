/**
 * @class eborasvehicle.store.Driver.ListDriver
 * @extends Ext.data.Store
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.store.Driver.ListDriver', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Driver.ListDriver',
    storeId    : 'storeListDriver',
    autoLoad   : false,
    sorters    : [{
        property  : 'pkDrivId',
        direction : 'ASC'
    }]
});
