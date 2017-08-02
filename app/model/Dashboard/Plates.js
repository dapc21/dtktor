/**
 * @class eborasvehicle.model.Dashboard.Plates
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.Plates', {
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
    ]
});
