/**
 * @class eborasvehicle.model.Dashboard.GaugeBrake
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.Planner', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'dateStart', type: 'int'},
        {name: 'hourStart', type: 'text'},
        {name: 'dateEnd', type: 'text'},
        {name: 'hourEnd', type: 'text'},
        {name: 'driverName', type: 'text'},
        {name: 'driverIdentification', type: 'text'}
    ]
});
