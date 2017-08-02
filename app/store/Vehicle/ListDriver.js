/**
 * @class eborasvehicle.store.Vehicle.ListDriver
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Vehicle.ListDriver', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Vehicle.ListDriver',
    storeId    : 'storeListDriver',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleInfo/rbFindCatalogDriver',
        extraParams:{
            drivName : ''
        },
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkDrivId',
        direction : 'ASC'
    }]
});
