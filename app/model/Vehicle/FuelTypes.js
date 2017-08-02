/**
 * @class eborasvehicle.model.Vehicle.FuelTypes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Vehicle.FuelTypes', {
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
