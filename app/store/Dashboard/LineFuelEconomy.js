/**
 * @class eborasvehicle.store.Dashboard.LineFuelEconomy
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.LineFuelEconomy', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.LineFuelEconomy',
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
