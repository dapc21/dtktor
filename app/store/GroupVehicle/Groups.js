/**
 * @class eborasvehicle.store.GroupVehicle.Groups
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.Groups', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.Groups',
    storeId    : 'storeGroupVehicleGroups',
    autoLoad   : true,
    remoteSort : false,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleGroup/rbFindGroupsByCriteria',
        extraParams:{
            criteria : ''
        },
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
