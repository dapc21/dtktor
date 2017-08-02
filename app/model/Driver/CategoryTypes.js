/**
 * @class eborasvehicle.model.Driver.CategoryTypes
 * @extends Ext.data.Model
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.model.Driver.CategoryTypes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkTpclId',
            mapping : 'pkTpclId',
            type    : 'int'
        }
        ,
        {
            name    : 'tpclName',
            mapping : 'tpclName',
            type    : 'string'
        }
        ,
        {
            name    : 'tpclLoginRegister',
            mapping : 'tpclLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'tpclDateRegister',
            mapping : 'tpclDateRegister',
            type    : 'string'
        }
    ]
});
