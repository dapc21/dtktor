/**
 * @class eborasvehicle.store.GroupVehicle.MeasureUnits
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.GroupVehicle.MeasureUnits', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.GroupVehicle.MeasureUnits',
    storeId    : 'storeMeasureUnits',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbFuelMeasureUnit/rbListMeasureUnits',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'measureUnitName',
        direction : 'ASC'
    }]
});
