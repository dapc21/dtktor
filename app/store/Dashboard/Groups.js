/**
 * @class eborasvehicle.store.Dashboard.Groups
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.Groups', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.Groups',
    storeId    : 'storeDashboardGroups',
    autoLoad   : false,
    remoteSort : false,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleGroup/rbFindGroupsByCriteria',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkCsgrId',
        direction : 'DESC'
    }]
});
