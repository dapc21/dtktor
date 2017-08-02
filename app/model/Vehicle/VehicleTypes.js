/**
 * @class eborasvehicle.model.Vehicle.VehicleTypes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Vehicle.VehicleTypes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkTpvhId',
            mapping : 'pkTpvhId',
            type    : 'int'
        }
        ,
        {
            name    : 'tpvhName',
            mapping : 'tpvhName',
            type    : 'string'
        }
        ,
        {
            name    : 'tpvhLoginRegister',
            mapping : 'tpvhLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'tpvhDateRegister',
            mapping : 'tpvhDateRegister',
            type    : 'string'
        }
    ]
});
