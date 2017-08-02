/**
 * @class eborasvehicle.model.Account.UserProfile
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Account.UserProfile', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkPrflId',
            mapping : 'pkPrflId',
            type    : 'int'
        }
        ,
        {
            name    : 'prflName',
            mapping : 'prflName',
            type    : 'string'
        }
        ,
        {
            name    : 'prflJsonFile',
            mapping : 'prflJsonFile',
            type    : 'string'
        }
        ,
        {
            name    : 'prflLoginRegister',
            mapping : 'prflLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'prflDateRegister',
            mapping : 'prflDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'prflTypeProfile',
            mapping : 'prflTypeProfile',
            type    : 'string'
        }
        ,
        {
            name    : 'prflKey',
            mapping : 'prflKey',
            type    : 'string'
        }
    ]
});
