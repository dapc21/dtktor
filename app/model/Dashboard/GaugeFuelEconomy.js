/**
 * @class eborasvehicle.model.Dashboard.GaugeFuelEconomy
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.GaugeFuelEconomy', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name : 'name'
        },
        {
            name : 'value'
        }
        ,
        {
            name : 'price'
        }
        ,
        {
            name : 'fuelSavingCost'
        }
    ]
});
