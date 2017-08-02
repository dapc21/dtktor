/**
 * @class eborasvehicle.model.Driver.ListIdButton
 * @extends Ext.data.Model
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.model.Driver.ListIdButton', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkIdbuId',
            mapping : 'pkIdbuId',
            type    : 'int'
        }
        ,

        {
            name    : 'idbuCode',
            mapping : 'idbuCode',
            type    : 'string'
        }
        ,
        {
            name    : 'idbuLoginRegister',
            mapping : 'idbuLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'idbuDateRegister',
            mapping : 'idbuDateRegister',
            type    : 'string'
        }
    ]
});
