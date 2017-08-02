/**
 * @class eborasvehicle.model.Account.Cities
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Account.Cities', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkCityId',
            mapping : 'pkCityId',
            type    : 'int'
        }
        ,
        {
            name    : 'cityName',
            mapping : 'cityName',
            type    : 'string'
        }
        ,
        {
            name    : 'cityLoginRegister',
            mapping : 'cityLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'cityDateRegister',
            mapping : 'cityDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'pkStatId',
            mapping : 'fkStatId.pkStatId',
            type    : 'string'
        }
        ,
        {
            name    : 'statName',
            mapping : 'fkStatId.statName',
            type    : 'string'
        }
        ,
        {
            name    : 'statLoginRegister',
            mapping : 'fkStatId.statLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'statDateRegister',
            mapping : 'fkStatId.statDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'pkCounId',
            mapping : 'fkStatId.fkCounId.pkCounId',
            type    : 'string'
        }
        ,
        {
            name    : 'counName',
            mapping : 'fkStatId.fkCounId.counName',
            type    : 'string'
        }
        ,
        {
            name    : 'counLoginRegister',
            mapping : 'fkStatId.fkCounId.counLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'counDateRegister',
            mapping : 'fkStatId.fkCounId.counDateRegister',
            type    : 'string'
        }
    ]
});
