/**
 * @class eborasvehicle.store.Dashboard.LineIdleTime
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.LineIdleTime', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.LineIdleTime',
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
