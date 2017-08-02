/**
 * @class eborasvehicle.model.GroupVehicle.AssignedPlates
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.AssignedPlates', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'id',
            mapping : 'pkGrvhId'
        }
        ,
        {
            name    : 'plate',
            mapping : 'grvhPlate',
            type    : 'string'
        }
        ,
        {
            name    : 'cp',
            mapping : 'grvhCp',
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
