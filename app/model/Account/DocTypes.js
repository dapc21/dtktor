/**
 * @class eborasvehicle.model.Account.DocTypes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Account.DocTypes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkDocuId',
            mapping : 'pkDocuId',
            type    : 'int'
        }
        ,
        {
            name    : 'docuName',
            mapping : 'docuName',
            type    : 'string'
        }
        ,
        {
            name    : 'docuAcronyms',
            mapping : 'docuAcronyms',
            type    : 'string'
        }
        ,
        {
            name    : 'docuLoginRegister',
            mapping : 'docuLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'docuDateRegister',
            mapping : 'docuDateRegister',
            type    : 'string'
        }
    ]
});
