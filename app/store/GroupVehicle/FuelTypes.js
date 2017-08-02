/**
 * @class eborasvehicle.store.GroupVehicle.FuelTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.FuelTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.FuelTypes',
    storeId    : 'storeFuelTypesGroup',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbTypeFuel/rbListFuelTypeComplete',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'fuelTypeName',
        direction : 'ASC'
    }]
});
