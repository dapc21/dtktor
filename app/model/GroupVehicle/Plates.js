/**
 * @class eborasvehicle.model.GroupVehicle.Plates
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.Plates', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'name',
            mapping : 'name',
            type    : 'string'
        }
        ,
        {
            name    : 'fuelType',
            mapping : 'fuelType',
            type    : 'string'
        }
    ]
});
