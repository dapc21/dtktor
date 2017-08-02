/**
 * @class eborasvehicle.store.Dashboard.GaugeBrake
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.GaugeBrake', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.GaugeBrake',
    storeId    : 'storeGaugeBrake',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + spagoService + '/api/kpi/Uso promedio de freno/Cuenta de pruebas/Grupo/ABC 123/Pepito Perez?desde=2015-01-02&hasta=2017-01-02',
        reader : {
            type : 'json'//,
            //root : 'data'
        }
    },
    sorters    : [{
        property  : 'name',
        direction : 'ASC'
    }]
});
