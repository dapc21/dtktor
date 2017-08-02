/**
 * @class eborasvehicle.model.Dashboard.LineGear
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.LineGear', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name : 'name',
            type : 'string'
        }
        ,
        {
            name : 'value',
            type : 'int'
        }
    ]
});
