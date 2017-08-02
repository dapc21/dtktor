/**
 * @class eborasvehicle.store.Tools.Drivers
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Tools.Drivers', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Tools.Drivers',
    storeId    : 'storeComboDrivers',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + spagoService + '/api/feeds/Cuenta de pruebas/drivers',
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
