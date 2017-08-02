/**
 * @class eborasvehicle.model.Dashboard.LineIdleTime
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.LineIdleTime', {
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
