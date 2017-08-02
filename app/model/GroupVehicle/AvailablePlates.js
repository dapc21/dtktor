/**
 * @class eborasvehicle.model.GroupVehicle.AvailablePlates
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.AvailablePlates', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'id',
            mapping : 'pkVhclId'
        }
        ,
        {
            name    : 'plate',
            mapping : 'vhclNumberPlate',
            type    : 'string'
        }
        ,
        {
            name    : 'cp',
            mapping : 'fkCpsId',
            type    : 'string'
        },
        {
            name    : 'typeFuel',
            mapping : 'fkFltyName',
            type    : 'string'
        },
        {
            name    : 'typeId',
            mapping : 'fkTpvhId',
            type    : 'string'
        }
    ]
});
