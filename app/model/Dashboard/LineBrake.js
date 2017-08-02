/**
 * @class eborasvehicle.model.Dashboard.LineBrake
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.LineBrake', {
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
