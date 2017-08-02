/**
 * @class eborasvehicle.store.Vehicle.FuelTypes
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Vehicle.FuelTypes', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Vehicle.FuelTypes',
    storeId    : 'storeFuelTypes',
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
