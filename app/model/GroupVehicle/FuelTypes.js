/**
 * @class eborasvehicle.model.GroupVehicle.FuelTypes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.FuelTypes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'fuelTypeId',
            mapping : 'fuelTypeId',
            type    : 'string'
        }
        ,
        {
            name    : 'fuelTypeName',
            mapping : 'fuelTypeName',
            type    : 'string'
        }
    ]
});
