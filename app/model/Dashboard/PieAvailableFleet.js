/**
 * @class eborasvehicle.model.Dashboard.PieAvailableFleet
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.PieAvailableFleet', {
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
