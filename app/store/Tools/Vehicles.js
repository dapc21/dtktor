/**
 * @class eborasvehicle.store.Tools.Vehicles
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Tools.Vehicles', {
    extend: 'Ext.data.Store',
    model: 'eborasvehicle.model.Tools.Vehicles',
    storeId: 'storeComboVehicles',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: 'http://' + restService + '/rbVehicleGroup/rbFindGroupsByAccount',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }]
});
