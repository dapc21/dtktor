/**
 * @class eborasvehicle.model.GroupVehicle.MeasureUnits
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.MeasureUnits', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'measureUnitId',
            mapping : 'measureUnitId',
            type    : 'int'
        }
        ,
        {
            name    : 'measureUnitName',
            mapping : 'measureUnitName',
            type    : 'string'
        }
    ]
});
