/**
 * @class eborasvehicle.store.Dashboard.Plates
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.Plates', {
    extend: 'Ext.data.Store',
    model: 'eborasvehicle.model.Dashboard.Plates',
    storeId: 'storeDashboardPlates',
    autoLoad: false,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: 'http://' + restService + '/rbVehicleGroup/rbFindPlatesByGroup',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    sorters: [{
        property: 'pkGrvhId',
        direction: 'ASC'
    }],
    listeners: {
        load: function(store) {
            var rec = { grvhPlate: 'Todas' };
            store.insert(0, rec);
        }
    }
});