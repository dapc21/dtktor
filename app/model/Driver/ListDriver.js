/**
 * @class eborasvehicle.model.Driver.ListDriver
 * @extends Ext.data.Model
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.model.Driver.ListDriver', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkDrivId',
            mapping : 'pkDrivId',
            type    : 'int'
        }
        ,
        {
            name    : 'fkTpclId',
            mapping : 'fkTpclId',
            type    : 'int'
        }
        ,
        {
            name    : 'fkDocuId',
            mapping : 'fkDocuId',
            type    : 'int'
        }
        ,
        {
            name    : 'fkMastId',
            mapping : 'fkMastId',
            type    : 'int'
        }
        ,

        {
            name    : 'drivName',
            mapping : 'drivName',
            type    : 'string'
        }
        ,
        {
            name    : 'drivLastName',
            mapping : 'drivLastName',
            type    : 'string'
        }
        ,
        {
            name    : 'drivIdentification',
            mapping : 'drivIdentification',
            type    : 'string'
        }
        ,
        {
            name    : 'drivPhone',
            mapping : 'drivPhone',
            type    : 'string'
        }
        ,
        {
            name    : 'drivAddress',
            mapping : 'drivAddress',
            type    : 'string'
        }
        ,
        {
            name    : 'drivMobilePhone',
            mapping : 'drivMobilePhone',
            type    : 'string'
        }
        ,
        {
            name    : 'drivEmail',
            mapping : 'drivEmail',
            type    : 'string'
        }
        ,
        {
            name    : 'drivStatus',
            mapping : 'drivStatus',
            type    : 'bool'
        }
        ,
        {
            name    : 'drivLicense',
            mapping : 'drivLicense',
            type    : 'string'
        }
        ,
        {
            name    : 'drivExpirationLicence',
            mapping : 'drivExpirationLicence',
            type    : 'string'
        }
        ,
        {
            name    : 'tpclName',
            mapping : 'tpclName',
            type    : 'string'
        }
        ,
        {
            name    : 'vwcdTimeTransport',
            mapping : 'vwcdTimeTransport',
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
            name    : 'docuName',
            mapping : 'docuName',
            type    : 'string'
        }
        ,
        {
            name    : 'drivUrlPhoto',
            mapping : 'drivUrlPhoto',
            type    : 'string'
        }
        ,
        {
            name    : 'drivContractNumber',
            mapping : 'drivContractNumber',
            type    : 'string'
        }
        ,
        {
            name    : 'drivDisplayName',
            mapping : 'drivDisplayName',
            type    : 'string'
        }
    ]
});
