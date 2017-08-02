/**
 * @class eborasvehicle.model.Vehicle.ProductCodes
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Vehicle.ProductCodes', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'cpsOnOff',
            mapping : 'cpsOnOff',
            type    : 'bool'
        }
        ,
        {
            name    : 'pkCpsId',
            mapping : 'pkCpsId',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsMin',
            mapping : 'cpsMin',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsImei',
            mapping : 'cpsImei',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsFirewall',
            mapping : 'cpsFirewall',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsHardware',
            mapping : 'cpsHardware',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsStatus',
            mapping : 'cpsStatus',
            type    : 'bool'
        }
        ,
        {
            name    : 'cpsProtocol',
            mapping : 'cpsProtocol',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsNumSimCard',
            mapping : 'cpsNumSimCard',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsLoginRegister',
            mapping : 'cpsLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'cpsDateRegister',
            mapping : 'cpsDateRegister',
            type    : 'string'
        }

        ,
        {
            name    : 'pkOperId',
            mapping : 'fkOperId.pkOperId',
            type    : 'int'
        }
        ,
        {
            name    : 'operName',
            mapping : 'fkOperId.operName',
            type    : 'string'
        }
        ,
        {
            name    : 'operLoginRegister',
            mapping : 'fkOperId.operLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'operDateRegister',
            mapping : 'fkOperId.operDateRegister',
            type    : 'string'
        }
    ]
});
