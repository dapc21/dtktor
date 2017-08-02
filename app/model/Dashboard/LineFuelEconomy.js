/**
 * @class eborasvehicle.model.Dashboard.LineFuelEconomy
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.LineFuelEconomy', {
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
