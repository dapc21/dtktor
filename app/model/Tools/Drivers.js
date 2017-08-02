/**
 * @class eborasvehicle.model.Tools.Drivers
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Tools.Drivers', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name : 'id',
            type : 'int'
        }
        ,
        {
            name    : 'name',
            mapping : 'name',
            type    : 'string'
        }
    ]
});
