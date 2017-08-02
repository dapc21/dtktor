/**
 * @class eborasvehicle.model.Account.UTC
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Account.UTC', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkUtcId',
            mapping : 'pkUtcId',
            type    : 'int'
        }
        ,
        {
            name    : 'utcNameUtc',
            mapping : 'utcNameUtc',
            type    : 'string'
        }
        ,
        {
            name    : 'utcZone',
            mapping : 'utcZone',
            type    : 'string'
        }
    ]
});
