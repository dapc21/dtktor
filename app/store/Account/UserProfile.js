/**
 * @class eborasvehicle.store.Account.UserProfile
 * @extends Ext.data.Store
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.store.Account.UserProfile', {
    extend     : 'Ext.data.Store',
    model      : 'eborasvehicle.model.Account.UserProfile',
    storeId    : 'storeUserProfile',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type   : 'ajax',
        url    : 'http://' + restService + '/rbAccountVehicles/rbFindProfile',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters    : [{
        property  : 'prflName',
        direction : 'ASC'
    }]
});
