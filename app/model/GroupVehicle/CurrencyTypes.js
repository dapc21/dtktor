/**
 * @class eborasvehicle.model.GroupVehicle.CurrencyTypes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.GroupVehicle.CurrencyTypes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'currencyId',
            mapping : 'currencyId',
            type    : 'int'
        }
        ,
        {
            name    : 'currencyName',
            mapping : 'currencyName',
            type    : 'string'
        }
        ,
        {
            name    : 'currencyCountry',
            mapping : 'currencyCountry',
            type    : 'string'
        }
        ,
        {
            name    : 'currencyCode',
            mapping : 'currencyCode',
            type    : 'string'
        }
    ]
});
