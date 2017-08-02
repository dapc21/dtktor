/**
 * @class eborasvehicle.store.Vehicle.ListVehicle
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Vehicle.ListVehicle', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Vehicle.ListVehicle',
    storeId    : 'storeListVehicle',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbVehicleInfo/rbFindVehicle',
        extraParams:{
            vhclNumberPlate : ''
        },
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'pkVhclId',
        direction : 'ASC'
    }]
});
