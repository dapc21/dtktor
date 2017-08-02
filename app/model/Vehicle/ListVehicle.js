/**
 * @class eborasvehicle.model.Vehicle.ListVehicle
 * @extends Ext.data.Model
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.model.Vehicle.ListVehicle', {
    extend     : 'Ext.data.Model',
    fields     : [
        {
            name    : 'pkVhclId',
            mapping : 'pkVhclId',
            type    : 'int'
        }
        ,
        {
            name    : 'vhclAlias',
            mapping : 'vhclAlias',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclVelocityLimit',
            mapping : 'vhclVelocityLimit',
            type    : 'int'
        }
        ,
        {
            name    : 'vhclChasis',
            mapping : 'vhclChasis',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclCylinder',
            mapping : 'vhclCylinder',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclColor',
            mapping : 'vhclColor',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclBrand',
            mapping : 'vhclBrand',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclMotor',
            mapping : 'vhclMotor',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclModel',
            mapping : 'vhclModel',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclSoat',
            mapping : 'vhclSoat',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclExpirationSoat',
            mapping : 'vhclExpirationSoat',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclNumberPlate',
            mapping : 'vhclNumberPlate',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclTrailerId',
            mapping : 'vhclTrailerId',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclTrailerNumberPlate',
            mapping : 'vhclTrailerNumberPlate',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclTrailerNumberCapacity',
            mapping : 'vhclTrailerNumberCapacity',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclExpirationRevision',
            mapping : 'vhclExpirationRevision',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclLoginRegister',
            mapping : 'vhclLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'vhclDateRegister',
            mapping : 'vhclDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'idType',
            mapping : 'fkTpvhId.pkTpvhId',
            type    : 'int'
        }
        ,
        {
            name    : 'nameType',
            mapping : 'fkTpvhId.tpvhName',
            type    : 'string'
        }
        ,
        {
            name    : 'loginRegisterType',
            mapping : 'fkTpvhId.tpvhLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'dateRegisterType',
            mapping : 'fkTpvhId.tpvhDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'idUnity',
            mapping : 'fkTpmsId.pkTpmsId',
            type    : 'int'
        }
        ,
        {
            name    : 'nameUnity',
            mapping : 'fkTpmsId.tpmsName',
            type    : 'string'
        }
        ,
        {
            name    : 'loginRegisterUnity',
            mapping : 'fkTpmsId.tpmsLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'dateRegisterUnity',
            mapping : 'fkTpmsId.tpmsDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'idCp',
            mapping : 'fkCpsId.pkCpsId',
            type    : 'string'
        }
        ,
        {
            name    : 'minCp',
            mapping : 'fkCpsId.cpsMin',
            type    : 'string'
        }
        ,
        {
            name    : 'imeiCp',
            mapping : 'fkCpsId.cpsImei',
            type    : 'string'
        }
        ,
        {
            name    : 'firewallCp',
            mapping : 'fkCpsId.cpsFirewall',
            type    : 'string'
        }
        ,
        {
            name    : 'hardwareCp',
            mapping : 'fkCpsId.cpsHardware',
            type    : 'string'
        }
        ,
        {
            name    : 'statusCp',
            mapping : 'fkCpsId.cpsStatus',
            type    : 'bool'
        }
        ,
        {
            name    : 'protocolCp',
            mapping : 'fkCpsId.cpsProtocol',
            type    : 'string'
        }
        ,
        {
            name    : 'numSimCardCp',
            mapping : 'fkCpsId.cpsNumSimCard',
            type    : 'string'
        }
        ,
        {
            name    : 'loginRegisterCp',
            mapping : 'fkCpsId.cpsLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'dateRegisterCp',
            mapping : 'fkCpsId.cpsDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'operIdCp',
            mapping : 'fkCpsId.fkOperId.pkOperId',
            type    : 'int'
        }
        ,
        {
            name    : 'operNameCp',
            mapping : 'fkCpsId.fkOperId.operName',
            type    : 'string'
        }
        ,
        {
            name    : 'operLoginRegisterCp',
            mapping : 'fkCpsId.fkOperId.operLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'operDateRegisterCp',
            mapping : 'fkCpsId.fkOperId.operDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'idUser',
            mapping : 'fkMastId.pkMastId',
            type    : 'int'
        }
        ,
        {
            name    : 'nameUser',
            mapping : 'fkMastId.mastName',
            type    : 'string'
        }
        ,
        {
            name    : 'identificationUser',
            mapping : 'fkMastId.mastIdentification',
            type    : 'string'
        }
        ,
        {
            name    : 'phoneUser',
            mapping : 'fkMastId.mastPhone',
            type    : 'string'
        }
        ,
        {
            name    : 'mobilePhoneUser',
            mapping : 'fkMastId.mastMobilePhone',
            type    : 'string'
        }
        ,
        {
            name    : 'addressUser',
            mapping : 'fkMastId.mastAddress',
            type    : 'string'
        }
        ,
        {
            name    : 'loginUser',
            mapping : 'fkMastId.mastLogin',
            type    : 'string'
        }
        ,
        {
            name    : 'passwordUser',
            mapping : 'fkMastId.mastPassword',
            type    : 'string'
        }
        ,
        {
            name    : 'emailUser',
            mapping : 'fkMastId.mastEmail',
            type    : 'string'
        }
        ,
        {
            name    : 'createAccountUser',
            mapping : 'fkMastId.mastCreateAccount',
            type    : 'bool'
        }
        ,
        {
            name    : 'statusUser',
            mapping : 'fkMastId.mastStatus',
            type    : 'bool'
        }
        ,
        {
            name    : 'creationDateUser',
            mapping : 'fkMastId.mastCreationDate',
            type    : 'string'
        }
        ,
        {
            name    : 'changePasswordUser',
            mapping : 'fkMastId.mastChangePassword',
            type    : 'string'
        }
        ,
        {
            name    : 'birthDateUser',
            mapping : 'fkMastId.mastBirthDate',
            type    : 'string'
        }
        ,
        {
            name    : 'nitUser',
            mapping : 'fkMastId.mastNit',
            type    : 'string'
        }
        ,
        {
            name    : 'contractNumberUser',
            mapping : 'fkMastId.mastContractNumber',
            type    : 'string'
        }
        ,
        {
            name    : 'photoBlobUser',
            mapping : 'fkMastId.mastPhotoBlob',
            type    : 'auto'
        }
        ,
        {
            name    : 'loginRegisterUser',
            mapping : 'fkMastId.mastLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'dateRegisterUser',
            mapping : 'fkMastId.mastDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'docuIdUser',
            mapping : 'fkMastId.fkDocuId.pkDocuId',
            type    : 'int'
        }
        ,
        {
            name    : 'docuNameUser',
            mapping : 'fkMastId.fkDocuId.docuName',
            type    : 'string'
        }
        ,
        {
            name    : 'docuAcronymsUser',
            mapping : 'fkMastId.fkDocuId.docuAcronyms',
            type    : 'string'
        }
        ,
        {
            name    : 'docuLoginRegisterUser',
            mapping : 'fkMastId.fkDocuId.docuLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'docuDateRegisterUser',
            mapping : 'fkMastId.fkDocuId.docuDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'cityIdUser',
            mapping : 'fkMastId.fkCityId.pkCityId',
            type    : 'int'
        }
        ,
        {
            name    : 'cityNameUser',
            mapping : 'fkMastId.fkCityId.cityName',
            type    : 'string'
        }
        ,
        {
            name    : 'cityLoginRegisterUser',
            mapping : 'fkMastId.fkCityId.cityLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'cityDateRegisterUser',
            mapping : 'fkMastId.fkCityId.cityDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'statIdUser',
            mapping : 'fkMastId.fkCityId.fkStatId.pkStatId',
            type    : 'int'
        }
        ,
        {
            name    : 'statNameUser',
            mapping : 'fkMastId.fkCityId.fkStatId.statName',
            type    : 'string'
        }
        ,
        {
            name    : 'statLoginRegisterUser',
            mapping : 'fkMastId.fkCityId.fkStatId.statLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'statDateRegisterUser',
            mapping : 'fkMastId.fkCityId.fkStatId.statDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'counIdUser',
            mapping : 'fkMastId.fkCityId.fkStatId.fkCounId.pkCounId',
            type    : 'int'
        }
        ,
        {
            name    : 'counNameUser',
            mapping : 'fkMastId.fkCityId.fkStatId.fkCounId.counName',
            type    : 'string'
        }
        ,
        {
            name    : 'counLoginRegisterUser',
            mapping : 'fkMastId.fkCityId.fkStatId.fkCounId.counLoginRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'counDateRegisterUser',
            mapping : 'fkMastId.fkCityId.fkStatId.fkCounId.counDateRegister',
            type    : 'string'
        }
        ,
        {
            name    : 'utcIdUser',
            mapping : 'fkMastId.fkUtcId.pkUtcId',
            type    : 'int'
        }
        ,
        {
            name    : 'utcNameUtcUser',
            mapping : 'fkMastId.fkUtcId.utcNameUtc',
            type    : 'string'
        }
        ,
        {
            name    : 'utcZoneUser',
            mapping : 'fkMastId.fkUtcId.utcZone',
            type    : 'string'
        }
    ]
});
