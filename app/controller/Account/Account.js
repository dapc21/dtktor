/**
 * @class eborasvehicle.controller.Account.Account
 * @extends Ext.app.Controller
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.controller.Account.Account', {
    extend   : 'Ext.app.Controller',
    requires : [],
    models   : [
        'eborasvehicle.model.Account.DocTypes',
        'eborasvehicle.model.Account.Cities',
        'eborasvehicle.model.Account.UTC',
        'eborasvehicle.model.Account.UserProfile',
        'eborasvehicle.model.Account.ListAccount'
    ]
    ,
    stores   : [
        'eborasvehicle.store.Account.DocTypes',
        'eborasvehicle.store.Account.Cities',
        'eborasvehicle.store.Account.UTC',
        'eborasvehicle.store.Account.UserProfile',
        'eborasvehicle.store.Account.ListAccount'
    ]
    ,
    views    : [
        //
    ]
    ,
    refs     : []
    ,
    init : function() {
        console.log('Controller Account Loaded');


        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: 'Las contraseñas no coinciden.'
        });


        this.control({
            '#accountVehicleSaveButton' : {
                click : this.saveAccountVehicle
            },
            '#assignVehicle' : {
                click : this.windowAssignVehicle
            },
            '#btnCloseWindowAssignVehicle' : {
                click : this.closeWindowAssignVehicle
            },
            '#assignVehicleCancelButton' : {
                click : this.closeWindowAssignVehicle
            },
            '#resetPassword' : {
                click : this.windowResetPassword
            },
            '#btnCloseWindowResetPassword' : {
                click : this.closeWindowResetPassword
            },
            '#resetPasswordCancelButton' : {
                click : this.closeWindowResetPassword
            },
            '#password' : {
                change : this.validatePasswordsMatch
            },
            '#searchAccount' : {
                keyup : this.searchAccount
            },
            '#gridAccount' : {
                itemclick : this.selectRecordAccount
            }
        });
    }
    ,
    saveAccountVehicle : function() {
        var form = Ext.getCmp('form_account_vehicle').getForm();
        var idAct = form.findField('id_account').getValue();
        var idAccount = ( idAct == '' ) ? null : idAct;
        var titleAccount = ( idAccount != null ) ? 'Editar Cuentas' : 'Almacenar Cuentas';
        var msgAccount = ( idAccount != null ) ? 'La cuenta ha sido editada!' : 'La cuenta ha sido creada!';
        //var jsonVehicles = [];
        //console.log(window.localStorage.getItem('jsonVehicles'));
        
        var jsonData = Ext.JSON.encode({
            'jsonVehicles': [{'pkVhclId': 49},{'pkVhclId': 50},{'pkVhclId': 15},{'pkVhclId': 4},{'pkVhclId': 54},{'pkVhclId': 51},{'pkVhclId': 48},{'pkVhclId': 47},{'pkVhclId': 46},{'pkVhclId': 41},{'pkVhclId': 40},{'pkVhclId': 26}],
            'profile': {
                'fkPrflId': form.findField('user_profile_account').getValue(),
                'mtpfProduct': 'btn-product-vehiculos'
            },
            'master': {
                'pkMastId': idAccount,
                'mastPassword': 'c3b7ccc4385e8e1a6847a8358909a1f6',
                'mastName': form.findField('name_account').getValue(),
                'mastIdentification': form.findField('number_document_account').getValue(),
                'fkDocuId': {'pkDocuId': form.findField('document_account').getValue()},
                'mastMobilePhone': form.findField('cell_account').getValue(),
                'mastPhone': form.findField('tlf_account').getValue(),
                'mastBirthDate': Ext.Date.format(form.findField('birthdate_account').getValue(), 'Y-m-d')+'T'+Ext.Date.format(form.findField('birthdate_account').getValue(), 'H:i:s.u')+'Z',
                'mastAddress': form.findField('address_account').getValue(),
                'fkCityId': {'pkCityId': form.findField('city_account').getValue()},
                'mastNit': form.findField('nit_account').getValue(),
                'mastContractNumber': form.findField('contract_account').getValue(),
                'mastEmail': form.findField('email_account').getValue(),
                'mastStatus': true,
                'fkUtcId': {'pkUtcId': form.findField('utc_account').getValue()}
            },
            'blob': 'data:image/png;base64,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…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'
        });

        console.log(jsonData);
        
        if (form.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url      : 'http://' + restService + '/rbAccountVehicles/rbSaveMaster',
                type     : 'rest',
                dataType : 'json',
                method   : 'PUT',
                scope    : this,
                params   : jsonData,
                success  : function(response){
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : titleAccount,
                        msg     : msgAccount,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.INFO
                    });
                    form.reset();
                    //window.localStorage.removeItem('jsonVehicles');
                },
                failure  : function(response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : titleAccount,
                        msg     : msgAccount,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });
        }
    }
    ,
    searchAccount : function(textfield, e, eOpts) {
        var text = textfield.getValue(); console.log(text);
        if (text.length > 2) {
            this.sendData(text);
        } else {
            Ext.getCmp('gridAccount').store.removeAll();
        }
    }
    ,
    sendData: function(name) {
        var loader = new Ext.LoadMask(Ext.getCmp('gridAccount').el, {msg: 'Cargando datos...'});
        loader.show();

        Ext.Ajax.request({
            url     : 'http://' + restService + '/rbAccountVehicles/rbFindMaster',
            method  : 'POST',
            scope   : this,
            params  : Ext.JSON.encode({
                'mastName' : name
            }),
            headers : {
                'Content-Type' : 'application/json'
            },
            success : function(response){
                var json = Ext.decode(response.responseText);
                var jsonData = json[0];
                Ext.getCmp('gridAccount').store.clearData();

                if (jsonData != undefined){
                    Ext.getCmp('gridAccount').store.add({
                        pkMastId           : jsonData.pkMastId,
                        mastName           : jsonData.mastName,
                        mastIdentification : jsonData.mastIdentification,
                        mastPhone          : jsonData.mastPhone,
                        mastMobilePhone    : jsonData.mastMobilePhone,
                        mastAddress        : jsonData.mastAddress,
                        mastLogin          : jsonData.mastLoginRegister,
                        mastPassword       : jsonData.mastPassword,
                        mastEmail          : jsonData.mastEmail,
                        mastCreateAccount  : jsonData.mastCreateAccount,
                        mastStatus         : jsonData.mastStatus,
                        mastCreationDate   : jsonData.mastCreationDate,
                        mastChangePassword : jsonData.mastChangePassword,
                        mastBirthDate      : jsonData.mastBirthDate,
                        mastNit            : jsonData.mastNit,
                        mastContractNumber : jsonData.mastContractNumber,
                        mastLoginRegister  : jsonData.mastLoginRegister,
                        mastDateRegister   : jsonData.mastDateRegister,
                        pkDocuId           : jsonData.fkDocuId.pkDocuId,
                        docuName           : jsonData.fkDocuId.docuName,
                        docuAcronyms       : jsonData.fkDocuId.docuAcronyms,
                        docuLoginRegister  : jsonData.fkDocuId.docuLoginRegister,
                        docuDateRegister   : jsonData.fkDocuId.docuDateRegister,
                        pkCityId           : jsonData.fkCityId.pkCityId,
                        cityName           : jsonData.fkCityId.cityName,
                        cityLoginRegister  : jsonData.fkCityId.cityLoginRegister,
                        cityDateRegister   : jsonData.fkCityId.cityDateRegister,
                        pkStatId           : jsonData.fkCityId.fkStatId.pkStatId,
                        statName           : jsonData.fkCityId.fkStatId.statName,
                        statLoginRegister  : jsonData.fkCityId.fkStatId.statLoginRegister,
                        statDateRegister   : jsonData.fkCityId.fkStatId.statDateRegister,
                        pkCounId           : jsonData.fkCityId.fkStatId.fkCounId.pkCounId,
                        counName           : jsonData.fkCityId.fkStatId.fkCounId.counName,
                        counLoginRegister  : jsonData.fkCityId.fkStatId.fkCounId.counLoginRegister,
                        counDateRegister   : jsonData.fkCityId.fkStatId.fkCounId.counDateRegister,
                        pkUtcId            : jsonData.fkUtcId.pkUtcId,
                        utcNameUtc         : jsonData.fkUtcId.utcNameUtc,
                        utcZone            : jsonData.fkUtcId.utcZone
                    });
                    Ext.getCmp('gridAccount').getView().refresh();
                } else{
                    Ext.getCmp('gridAccount').store.removeAll();
                }
                if (loader) loader.hide();
            },
            failure : function(response){
                console.log(response);
                if (loader) loader.hide();
            }
        });
    }
    ,
    selectRecordAccount : function(grid, record, item, index, e, eOpts) {
        var form = Ext.getCmp('form_account_vehicle').getForm();
        var storeDocTypes = Ext.create('eborasvehicle.store.Account.DocTypes');
        var storeCities = Ext.create('eborasvehicle.store.Account.Cities');
        var storeUTC = Ext.create('eborasvehicle.store.Account.UTC');
        var storeUserProfile = Ext.create('eborasvehicle.store.Account.UserProfile');
        Ext.getCmp('tabAccount').toggle(true);
        Ext.getCmp('tabSearchAccount').toggle(false);
        Ext.getCmp('tabAccount').up().up().down('[name=account-card]').getLayout().setActiveItem(0);
        //Seteo de valores
        form.findField('id_account').setValue(record.data['pkMastId']);
        form.findField('name_account').setValue(record.data['mastName']);
        storeDocTypes.load();
        form.findField('document_account').setValue(record.data['pkDocuId']);
        form.findField('number_document_account').setValue(record.data['mastIdentification']);
        form.findField('cell_account').setValue(record.data['mastMobilePhone']);
        form.findField('tlf_account').setValue(record.data['mastPhone']);
        form.findField('birthdate_account').setValue(Ext.util.Format.date(record.data['mastBirthDate']), "Y-m-d");//hacer conversión de fecha
        storeCities.load();
        form.findField('city_account').setValue(record.data['pkCityId']);
        form.findField('address_account').setValue(record.data['mastAddress']);
        form.findField('email_account').setValue(record.data['mastEmail']);
        storeUTC.load();
        form.findField('utc_account').setValue(record.data['pkUtcId']);
        form.findField('contract_account').setValue(record.data['mastContractNumber']);
        form.findField('nit_account').setValue(record.data['mastNit']);
        storeUserProfile.load();
        form.findField('user_profile_account').setValue(7);
    }
    ,
    windowAssignVehicle : function() {
        var win = Ext.create('Ext.window.Window', {
            title: 'Asignación de vehículos a cuenta',
            id:'windowAssignVehicle',
            itemId:'windowAssignVehicle',
            autoHeight: true,
            width: 800,
            cls: 'window-standard',
            header: {
                titlePosition: 0,
                titleAlign: 'center',
                items: [{
                    xtype: 'button',
                    cls: 'window-standard-x-btn-header',
                    id:'btnCloseWindowAssignVehicle',
                    itemId:'btnCloseWindowAssignVehicle',
                    text: 'X',
                    scope: this
                }]
            },
            resizable: false,
            modal: true,
            autoScroll:true,
            closable: false,
            draggable:false,
            //plain:true,
            tools: [],
            items: [
                {
                    columnWidth: 1,
                    xtype: 'panel',
                    layout: 'column',
                    style: 'margin: 5px 30px 5px 30px;',
                    items: [
                        /* grid 1 */
                        {
                            columnWidth: .5,
                            border: false,
                            style: 'margin: 15px 5px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Vehículos Disponibles',
                                        style: 'background: none;font-size: 16px;'
                                    }]
                                },{
                                    xtpye: 'panel',
                                    cls: 'body-panel-gray-dark',
                                    items: [{
                                            xtype: 'toolbar',
                                            //cls: 'black-cls-vehicle',
                                            height: 35,
                                            items: ['->',
                                                {
                                                    xtype: 'textfield',
                                                    id: 'searchAvailableVehicle',
                                                    enableKeyEvents: true,
                                                    cls: 'vehicule-dropdown',
                                                    style: 'float:right;margin-right:6px',
                                                    emptyText: 'Buscar...',
                                                    listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            //var text = textfield.getValue();
                                                            //if (text.length > 2) {
                                                            //    text = text;
                                                            //} else {
                                                            //    text = '';
                                                            //}
                                                            //Ext.getCmp('gridAvailableVehicle').store.proxy.extraParams = {
                                                            //    criteria: text
                                                            //};
                                                            //Ext.getCmp('gridAvailableVehicle').store.load();
                                                            //Ext.getCmp('gridAvailableVehicle').getView().refresh();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            id: 'gridAvailableVehicle',
                                            height: 350,
                                            scroll: 'vertical',
                                            style: 'padding-left:2px;padding-right:2px;padding-bottom:1px;',
                                            viewConfig: {
                                                plugins: {
                                                    ptype: 'gridviewdragdrop',
                                                    dragGroup: 'gridAvailableVehicleGroup',
                                                    dropGroup: 'gridAssignedVehicleGroup'
                                                },
                                                listeners: {
                                                    drop: function(node, data, dropRec, dropPosition) {
                                                        //
                                                    }
                                                }
                                            },
                                            store: Ext.create('Ext.data.Store', {
                                                fields:['pkVhclId', 'plate'],
                                                data:[
                                                    { pkVhclId : 1, plate : 'ABC123' },
                                                    { pkVhclId : 2, plate : 'DEF456' },
                                                    { pkVhclId : 3, plate : 'HIJ789' }
                                                ]
                                            }),
                                            columns: [{
                                                text: 'ID',
                                                dataIndex: 'pkVhclId',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }, {
                                                text: 'Placa',
                                                dataIndex: 'plate',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            }]
                                        }
                                    ]


                            }]

                        },
                        /* grid 2 */
                        {
                            columnWidth: .5,
                            border: false,
                            style: 'margin: 15px 5px 5px 30px;',
                            items: [{
                                    xtype: 'container',
                                    cls: 'header-panel-gray-dark text-center',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Vehículos Asignados',
                                        style: 'background: none;font-size: 16px;'
                                    }]
                                },{
                                    xtpye: 'panel',
                                    cls: 'body-panel-gray-dark',
                                    items: [{
                                            xtype: 'toolbar',
                                            //cls: 'black-cls-vehicle',
                                            height: 35,
                                            items: ['->',
                                                {
                                                    xtype: 'textfield',
                                                    id: 'searchAssignedVehicle',
                                                    enableKeyEvents: true,
                                                    cls: 'vehicule-dropdown',
                                                    style: 'float:right;margin-right:6px',
                                                    emptyText: 'Buscar...',
                                                    listeners: {
                                                        keyup: function(textfield, e, eOpts) {
                                                            //var text = textfield.getValue();
                                                            //if (text.length > 2) {
                                                            //    text = text;
                                                            //} else {
                                                            //    text = '';
                                                            //}
                                                            //Ext.getCmp('gridAvailableVehicle').store.proxy.extraParams = {
                                                            //    criteria: text
                                                            //};
                                                            //Ext.getCmp('gridAvailableVehicle').store.load();
                                                            //Ext.getCmp('gridAvailableVehicle').getView().refresh();
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'grid',
                                            id: 'gridAssignedVehicle',
                                            height: 350,
                                            scroll: 'vertical',
                                            style: 'padding-left:2px;padding-right:2px;padding-bottom:1px;',
                                            viewConfig: {
                                                plugins: {
                                                    ptype: 'gridviewdragdrop',
                                                    dragGroup: 'gridAssignedVehicleGroup',
                                                    dropGroup: 'gridAvailableVehicleGroup'
                                                },
                                                listeners: {
                                                    drop: function(node, data, dropRec, dropPosition) {
                                                        /*var json = [];
                                                        var gridAssignedVehicle = Ext.getCmp('gridAssignedVehicle');
                                                        var storeAssignedVehicle = gridAssignedVehicle.getStore();
                                                        storeAssignedVehicle.each(function(record) {
                                                            json.push(record.data['pkVhclId']);
                                                        });
                                                        window.localStorage.setItem('jsonVehicles', json);*/
                                                    }
                                                }
                                            },
                                            store: Ext.create('Ext.data.Store', {
                                                fields:['pkVhclId', 'plate'],
                                                data:[
                                                    { pkVhclId : 5, plate : 'HRT999' },
                                                    { pkVhclId : 6, plate : 'TYV333' }
                                                ]
                                            }),
                                            columns: [{
                                                text: 'ID',
                                                dataIndex: 'pkVhclId',
                                                flex: 1,
                                                hidden: true,
                                                sortable: true
                                            }, {
                                                text: 'Placa',
                                                dataIndex: 'plate',
                                                flex: 1,
                                                hidden: false,
                                                sortable: true
                                            }]
                                        }
                                    ]

                            }]

                        }
                    ]

                },
                /*** columna botones ***/
                {
                    columnWidth: 1,
                    xtype: 'panel',
                    layout: 'column',
                    style: 'margin: 5px 30px 30px 30px;',
                    items: [
                        {
                            style: {
                                textAlign: 'center'
                            },
                            xtype: 'button',
                            cls: 'icon-cancel btn-cancel-window-configuration right',
                            id: 'assignVehicleCancelButton',
                            itemId: 'assignVehicleCancelButton',
                            scope: this
                        },
                        {
                            xtype: 'button',
                            style: {
                                textAlign: 'center'
                            },
                            cls: 'icon-check btn-ok-window-configuration right',
                            id: 'assignVehicleSaveButton',
                            itemId: 'assignVehicleSaveButton',
                            scope: this
                        }
                    ]
                }
            ]
        });
        win.show();
    }
    ,
    closeWindowAssignVehicle : function() {
        Ext.getCmp('windowAssignVehicle').destroy();
    }
    ,
    windowResetPassword : function() {
        var win = Ext.create('Ext.window.Window', {
            title: 'Reiniciar Contraseña',
            id:'windowResetPassword',
            itemId:'windowResetPassword',
            autoHeight: true,
            width: 510,
            cls: 'window-standard',
            header: {
                titlePosition: 0,
                titleAlign: 'center',
                items: [{
                    xtype: 'button',
                    cls: 'window-standard-x-btn-header',
                    id:'btnCloseWindowResetPassword',
                    itemId:'btnCloseWindowResetPassword',
                    text: 'X',
                    scope: this
                }]
            },
            resizable: false,
            modal: true,
            autoScroll:true,
            closable: false,
            draggable:false,
            //plain:true,
            tools: [],
            items: [
                {
                    columnWidth: 1,
                    xtype: 'form',
                    id: 'form_reset_password',
                    layout: 'column',
                    style: 'margin: 5px 30px 5px 30px;',
                    items: [
                        /* Label 1 */
                        {
                            columnWidth: .4,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                xtype: 'label',
                                style: 'float: none;font-size: 15px;',
                                text: 'Nueva Contraseña:'
                            }]
                        },
                        /* Textfield 1 */
                        {
                            columnWidth: .59,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                style: 'background-color: gray !important;color: white !important;width:100%;',
                                xtype: 'textfield',
                                cls: 'driver-dropdown',
                                id: 'passsword',
                                name: 'passsword',
                                enforceMaxLength: 10,
                                maxLength: 10,
                                minLength: 6,
                                minLengthText: 'La longitud mínima para este campo es {0}',
                                inputType : 'password',
                                allowBlank: false
                            }]
                        },
                        /* Label 2 */
                        {
                            columnWidth: .4,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                xtype: 'label',
                                style: 'float: none;font-size: 15px;',
                                text: 'Confirmar Contraseña:'
                            }]
                        },
                        /* Textfield 2 */
                        {
                            columnWidth: .59,
                            border: false,
                            style: 'margin: 5px 5px 5px 5px;',
                            items: [{
                                style: 'background-color: gray !important;color: white !important;width:100%;',
                                xtype: 'textfield',
                                cls: 'driver-dropdown',
                                id: 'confirm_passsword',
                                name: 'confirm_passsword',
                                enforceMaxLength: 10,
                                maxLength: 10,
                                minLength: 6,
                                minLengthText: 'La longitud mínima para este campo es {0}',
                                inputType : 'password',
                                initialPassField  : 'passsword',
                                vtype : 'password',
                                allowBlank: false
                            }]
                        }
                    ]

                }
                ,
                /*** columna botones ***/
                {
                    columnWidth: 1,
                    xtype: 'panel',
                    layout: 'column',
                    style: 'margin: 5px 30px 30px 30px;',
                    items: [
                        {
                            xtype: 'button',
                            style: {
                                textAlign: 'center'
                            },
                            cls: 'icon-cancel btn-cancel-window-configuration right',
                            id: 'resetPasswordCancelButton',
                            itemId: 'resetPasswordCancelButton',
                            scope: this
                        },
                        {
                            xtype: 'button',
                            style: {
                                textAlign: 'center'
                            },
                            cls: 'icon-check btn-ok-window-configuration right',
                            id: 'resetPasswordSaveButton',
                            itemId: 'resetPasswordSaveButton',
                            scope: this
                        }
                    ]
                }
            ]
        });
        win.show();
    }
    ,
    closeWindowResetPassword : function() {
        Ext.getCmp('windowResetPassword').destroy();
    }
    ,
    validatePasswordsMatch : function() {
        var confirmField = Ext.getCmp('confirm_passsword');
        confirmField.validate();
    }
});

