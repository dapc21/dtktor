/**
 * @class eborasvehicle.model.Dashboard.LineAvailableFleet
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.LineAvailableFleet', {
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
