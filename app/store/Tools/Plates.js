/**
 * @class eborasvehicle.store.Tools.Plates
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Tools.Plates', {
    extend: 'Ext.data.Store',
    model: 'eborasvehicle.model.Tools.Plates',
    storeId: 'storeComboPlates',
    autoLoad: true,
    remoteSort: false,
    proxy: {
        type: 'ajax',
        url: 'http://' + restService + '/rbVehicleGroup/rbFindPlatesByGroup',
        extraParams: {
            idGroup: ''
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    sorters: [{
        property: 'grvhPlate',
        direction: 'ASC'
    }],
    listeners: {
        load: function(store) {
            var rec = { grvhPlate: 'Todas' };
            store.insert(0, rec);
        }
    }
});
