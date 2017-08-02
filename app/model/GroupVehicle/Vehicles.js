/**
 * @class eborasvehicle.model.GroupVehicle.Vehicles
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.Vehicles', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'name',
            mapping : 'name',
            type    : 'string'
        }
        ,
        {
            name    : 'account',
            mapping : 'account',
            type    : 'string'
        }
    ]
});
