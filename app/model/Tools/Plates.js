/**
 * @class eborasvehicle.model.Tools.Plates
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Tools.Plates', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'pkGrvhId',
            type: 'int'
        },
        {
            name: 'grvhSource',
            mapping: 'grvhSource',
            type: 'int'
        },
        {
            name: 'grvhPlate',
            mapping: 'grvhPlate',
            type: 'string'
        },
        {
            name: 'grvhCp',
            mapping: 'grvhCp',
            type: 'string'
        },
        {
            name: 'grvhLoginRegister',
            mapping: 'grvhLoginRegister',
            type: 'string'
        },
        {
            name: 'grvhDateRegister',
            mapping: 'grvhDateRegister',
            type: 'string'
        },
        {
            name: 'fkCsgrId',
            mapping: 'fkCsgrId',
            type: 'string'
        }
    ]
});
