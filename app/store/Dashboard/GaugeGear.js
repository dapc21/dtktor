/**
 * @class eborasvehicle.store.Dashboard.GaugeGear
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Dashboard.GaugeGear', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Dashboard.GaugeGear',
    storeId    : 'storeGaugeGear',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + spagoService + '/api/kpi/Uso promedio de embrague/Cuenta de pruebas/Grupo/ABC 123/Pepito Perez?desde=2015-01-02&hasta=2017-01-02',
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
