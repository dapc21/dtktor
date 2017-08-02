/**
 * @class eborasvehicle.model.Driver.DocTypes
 * @extends Ext.data.Model
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.model.Driver.DocTypes', {
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
