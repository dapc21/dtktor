/**
 * @class eborasvehicle.model.Dashboard.PieIdleTime
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.PieIdleTime', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name : 'name'
        }
        ,
        {
            name : 'percentage'
        }
    ]
});
