/**
 * @class eborasvehicle.store.GroupVehicle.Plates
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.Plates', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.Plates',
    storeId    : 'storeGroupVehiclePlates',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        //url    : 'http://' + spagoService + '/api/...',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'name',
        direction : 'ASC'
    }]
});
