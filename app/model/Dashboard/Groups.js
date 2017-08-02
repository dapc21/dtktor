/**
 * @class eborasvehicle.model.Dashboard.Groups
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Dashboard.Groups', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'id',
            mapping : 'pkCsgrId'
        }
        ,
        {
            name    : 'group',
            mapping : 'csgrName',
            type    : 'string'
        }
    ]
});
