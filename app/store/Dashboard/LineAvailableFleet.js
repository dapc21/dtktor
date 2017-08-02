/**
 * @class eborasvehicle.store.Dashboard.LineAvailableFleet
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.LineAvailableFleet', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.LineAvailableFleet',
    storeId    : 'storeGaugeBrake',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        //url    : 'http://' + spagoService + '/api/kpi/...',
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
