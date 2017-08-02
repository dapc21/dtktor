/**
 * @class eborasvehicle.model.Tools.Vehicles
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Tools.Vehicles', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'pkCsgrId',
            type: 'int'
        },
        {
            name: 'csgrName',
            mapping: 'csgrName',
            type: 'string'
        },
        {
            name: 'csgrSource',
            mapping: 'csgrSource',
            type: 'int'
        },
        {
            name: 'csgrUserId',
            mapping: 'csgrUserId',
            type: 'string'
        },
        {
            name: 'csgrLoginRegister',
            mapping: 'csgrLoginRegister',
            type: 'string'
        },
        {
            name: 'csgrDateRegister',
            mapping: 'csgrDateRegister',
            type: 'string'
        },
        {
            name: 'fkGrtyId',
            mapping: 'fkGrtyId',
            type: 'int'
        },
        {
            name: 'csgrDefault',
            mapping: 'csgrDefault',
            type: 'bool'
        }
    ]
});
