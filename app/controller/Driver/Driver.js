/**
 * @class eborasvehicle.controller.Driver.Driver
 * @extends Ext.app.Controller
 * @author isilio vilchez
 */
Ext.define('eborasvehicle.controller.Driver.Driver', {
    extend: 'Ext.app.Controller',
    requires: [],
    models: [
        'eborasvehicle.model.Driver.DocTypes',
        'eborasvehicle.model.Driver.CategoryTypes'
    ],
    stores: [
        'eborasvehicle.store.Driver.DocTypes',
        'eborasvehicle.store.Driver.CategoryTypes'
    ],
    views: [
        //
    ],
    refs: [
        {
            ref: 'frmDriver',
            selector: 'form[itemId=form_driver]'
        },
        {
            ref: 'comTypeDocument',
            selector: 'combobox[name=tipo_documento]'
        },
        {
            ref: 'comCategoryLicense',
            selector: 'combobox[name=tipo_categoria]'
        },
        {
            ref: 'name',
            selector: 'textfield[name=name_driver]'
        },
        {
            ref: 'id',
            selector: 'textfield[name=drivId]'
        },
        {
            ref: 'lastname',
            selector: 'textfield[name=lastname_driver]'
        },
        {
            ref: 'identificacion',
            selector: 'textfield[name=identificacion_driver]'
        },
        {
            ref: 'direccion',
            selector: 'textfield[name=address_driver]'
        },
        {
            ref: 'correo',
            selector: 'textfield[name=email_driver]'
        },
        {
            ref: 'telefono',
            selector: 'textfield[name=phone_driver]'
        },
        {
            ref: 'celular',
            selector: 'textfield[name=mobile_driver]'
        },
        {
            ref: 'licencia',
            selector: 'textfield[name=license_driver]'
        },
        {
            ref: 'fecha',
            selector: 'datefield[name=date_driver]'
        },
        {
            ref: 'estado',
            selector: 'checkbox[name=state_driver]'
        },
        {
            ref: 'contrato',
            selector: 'textfield[name=contract_driver]'
        }
    ],
    config: {
        varDataUrl: null,
        rowSelectVwEbrsCatalogDriver: null,
        varWindowIdButton: null,
        varWindowNewIdButton: null,
    },
    init: function () {
        console.log('Controller Driver Loaded');
        ctrlDriver = this;
        this.control({
            '#driverSaveButton': {
                click: this.saveDriver
            },
            '#passDriverCancelButton': {
                click: this.cancelPassDriver
            },
            '#newidbuttonSaveButton': {
                click: this.saveNewIdButton
            },
            '#idButtonCancelButton': {
                click: this.cancelIdButton
            },
            '#idButtonSaveButton': {
                click: this.saveIdButton
            },
            '#newidbuttonCancelButton': {
                click: this.cancelNewIdButton
            },
            'actioncolumn': {
                actionIdButtonClick: this.columnItemIdButtonClick
            },
            'actioncolumn': {
                actionDriverClick: this.columnItemDriverClick
            },
            '#gridIdButton': {
                itemclick: this.selectRecordIdButton
            },
            'filefield[itemId=DriverFileUpload]': {
                change: this.onChangeUpload
            },
            'button[itemId=btnIdButton]': {
                click: this.onBtnOpenIdButton
            },
            'button[itemId=btnNewIdButton]': {
                click: this.onBtnOpenNewIdButton
            },
            'gridpanel[itemId=griddriver]': {
                celldblclick: this.onBtnLoad
            }

        });
    },
    saveDriver: function () {
        var url = 'http://' + restService + '/rbDriver/rbSaveDriverBasic';
        var form = Ext.getCmp('form_driver').getForm();
        console.log('Datos enviados...');
        if (form.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url: url,
                type: 'rest',
                dataType: 'json',
                method: 'PUT',
                scope: this,
                params: Ext.JSON.encode(
                        {
                            "query": {
                                "drivName": form.findField("name_driver").getValue(),
                                "drivLastName": form.findField("lastname_driver").getValue(),
                                "comTypeDocument-inputEl": form.findField("tipo_documento").getRawValue(),
                                "drivIdentification": form.findField("identificacion_driver").getValue(),
                                "drivAddress": form.findField("address_driver").getValue(),
                                "drivEmail": form.findField("email_driver").getValue(),
                                "drivPhone": form.findField("phone_driver").getValue(),
                                "drivMobilePhone": form.findField("mobile_driver").getValue(),
                                "drivLicense": form.findField("license_driver").getValue(),
                                "fkTpclId": {
                                    "pkTpclId": form.findField("tipo_categoria").getValue()
                                },
                                "drivExpirationLicence": form.findField("date_driver").getValue(),
                                "drivId": "17584",//form.findField("drivId").getValue(),
                                "drivContractNumber": form.findField("contract_driver").getValue(),
                                "pkDrivId": 12,//form.findField("drivId").getValue(),
                                "fkDocuId": {
                                    "pkDocuId": form.findField("tipo_documento").getValue()
                                },
                                "drivPassword": "",
                                "drivStatus": form.findField("state_driver").getValue()

                            },
                            "blob": form.findField("photo").getValue()
                        }
                ),
                success: function (response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title: 'Guardar conductor',
                        msg: 'El conductor ha sido creado!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    form.reset();
                    Ext.ComponentQuery.query('image[itemId=photoImg]')[0].setSrc('resources/images/nn.jpg');
                },
                failure: function (response, opts) {
                    msgWait.hide();
                    try {
                        if (response) {
                            Ext.MessageBox.show({
                                title: 'Guardar Conductor',
                                msg: 'No se pudo crear el conductor',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            throw new Error(opts);
                        }
                    } catch (error) {
                        console.log("Error " + error.name + " " + error.message);
                    }
                },
                headers: {
                    'Content-Type': 'aplication/json'
                },
                scope: this
            });
        } else {
            Ext.MessageBox.show({
                title: 'Mensaje',
                msg: 'Debe Completar los datos',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    },
    saveIdButton: function () {
        var url = 'http://' + restService + '/rbDriver/rbAssignIdButton';
        var form = Ext.getCmp('form_id_button').getForm();
        console.log('Datos enviados...');
        if (form.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url: url,
                method: "POST",
                params: Ext.JSON.encode(
                        {
                            'idButton': form.findField("idButton").getValue(),
                            'idDriver': 1//ctrlDriver.getFrmDriver().getValues().drivId
                        }
                ),
                success: function (response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title: 'Asignar Id Button',
                        msg: 'El Id Button ha sido asignado!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    form.reset();
                    Ext.getCmp('gridIdButton').store.reload();
                    Ext.getCmp('gridIdButton').getView().refresh();
                },
                failure: function (response, opts) {
                    msgWait.hide();
                    try {
                        if (response) {
                            Ext.MessageBox.show({
                                title: 'Asignar Id Button',
                                msg: 'No se pudo Asignar Id Button',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            throw new Error(opts);
                        }
                    } catch (error) {
                        console.log("Error " + error.name + " " + error.message);
                    }
                },
                headers: {
                    'Content-Type': 'aplication/json'
                },
                scope: this
            });
        } else {
            Ext.MessageBox.show({
                title: 'Mensaje',
                msg: 'Debe Seleccionar un Id Button',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    },
    saveNewIdButton: function () {
        var url = 'http://' + restService + '/rbDriver/rbCreateIdButton';
        var form = Ext.getCmp('form_new_id_button').getForm();
        console.log('Datos enviados...');
        if (form.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url: url,
                method: "POST",
                params: Ext.JSON.encode({
                    'idButton': form.findField("nameIdButton").getValue()
                }),
                success: function (response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title: 'Guardar Id',
                        msg: 'El Id ha sido creado!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    form.reset();
                    Ext.getCmp('gridIdButton').store.reload();
                    Ext.getCmp('gridIdButton').getView().refresh();
                    var labelid = Ext.ComponentQuery.query('label[name=id]');
                    labelid[0].setText('id');
                },
                failure: function (response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title: 'Guardar Id',
                        msg: 'No se pudo crear el id',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },
    deleteIdButton: function (record) {
        var id = record.get('pkIdbuId');
        var nameId = record.get('idbuCode');
        Ext.Msg.confirm('Eliminar Id Button', 'Desea eliminar el Id Button ' + nameId, function (btn) {
            if (btn === 'yes') {
                var msgWait = Ext.MessageBox.wait('Enviando datos...');
                Ext.Ajax.request({
                    url: 'http://' + restService + '/rbDriver/rbDeleteIdButton/' + nameId,
                    type: 'rest',
                    dataType: 'json',
                    method: 'DELETE',
                    success: function () {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title: 'Eliminar Id Button',
                            msg: 'El Id Button ' + nameId + ' ha sido eliminado!',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        Ext.getCmp('gridIdButton').store.load();
                        Ext.getCmp('gridIdButton').getView().refresh();
                        var labelname = Ext.ComponentQuery.query('label[name=name]');
                        var labelid = Ext.ComponentQuery.query('label[name=id]');

                        labelname[0].setText('name');
                        labelid[0].setText('id');
                    },
                    failure: function () {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title: 'Eliminar Id Button',
                            msg: 'No se pudo eliminar Id Button ' + nameId,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    },
        deleteDriver: function (record) {
        var id = record.get('pkDrivId');
        var nameId = record.get('drivDisplayName');
        Ext.Msg.confirm('Eliminar Conductor', 'Desea eliminar el conductor ' + nameId, function (btn) {
            if (btn === 'yes') {
                var msgWait = Ext.MessageBox.wait('Enviando datos...');
                Ext.Ajax.request({
                    url: 'http://' + restService + '/rbDriver/rbDeleteDriverById/' + id,
                    type: 'rest',
                    dataType: 'json',
                    method: 'DELETE',
                    success: function () {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title: 'Eliminar Conductor',
                            msg: 'El Conductor ' + nameId + ' ha sido eliminado!',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        Ext.getCmp('griddriver').store.load();
                        Ext.getCmp('griddriver').getView().refresh();
                    },
                    failure: function () {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title: 'Eliminar Conductor',
                            msg: 'No se pudo eliminar el conductor ' + nameId,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    },
    selectRecordIdButton: function (itemh, record, item, index, e, eOpts) {

        var id = record.raw['idbuCode'];
        var labelid = Ext.ComponentQuery.query('label[name=id]');
        var idButton = Ext.ComponentQuery.query('textfield[name=idButton]');
        labelid[0].setText(id);
        idButton[0].setValue(id);

    },
    onChangeUpload: function (cmp, value, eOpts) {
        var arrValidExtension = ["jpg", "jpeg", "gif", "png"];
        console.log(cmp);
        console.log(value);
        console.log(eOpts);

        var arrSplit = value.split(".");
        console.log(arrSplit);
        if (Array.isArray(arrSplit) && arrSplit.length > 0) {
            console.log("Es arreglo y tiene extensión");
            console.log(arrSplit.length);
            var fileType = arrSplit[arrSplit.length - 1];
            console.log(fileType);

            var indexValid = arrValidExtension.lastIndexOf(fileType);

            if (indexValid >= 0) {
                var img = new Image();
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log(e);
                    var im = e.target.result;
                    Ext.ComponentQuery.query('image[itemId=photoImg]')[0].setSrc(e.target.result);
                    Ext.ComponentQuery.query('textfield[itemId=photo]')[0].setValue(e.target.result);
                    ctrlDriver.resize(im, 80, 100);
                }
                var input = Ext.ComponentQuery.query('filefield[itemId=DriverFileUpload]')[0].extractFileInput();
                reader.readAsDataURL(input.files[0]);
            } else {
                Ext.Msg.alert("Error", "El archivo no es una imagen");
            }
        } else {
            Ext.Msg.alert("Error", "El archivo no tiene un nombre válido");
        }


    },
    resize: function (im, maxWidth, maxHeight) {
        var img = new Image();
        img.onload = function () {
            var w = this.width;
            var h = this.height;
            var scale = Math.min(maxWidth / w, maxHeight / h);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = w * scale;
            canvas.height = h * scale;
            ctx.drawImage(img, 0, 0, w * scale, h * scale);
            this.varDataUrl = canvas.toDataURL();
            //Ext.ComponentQuery.query('image[itemId=photoImg]')[0].setSrc = canvas.toDataURL();
        }
        img.src = im;
    },

    cancelPassDriver: function () {
        var PassDriver = Ext.ComponentQuery.query('#windowpassdriver')[0];
        var form = Ext.getCmp('form_pass_driver').getForm();
        PassDriver.hide();
        form.reset();
    },
    cancelNewIdButton: function () {
        var PassDriver = Ext.ComponentQuery.query('#windowNewIdButton')[0];
        var form = Ext.getCmp('form_new_id_button').getForm();
        PassDriver.hide();
        form.reset();
        ctrlDriver.varWindowNewIdButton.destroy();
        ctrlDriver.varWindowNewIdButton = null;
    },
    cancelIdButton: function () {
        var PassDriver = Ext.ComponentQuery.query('#windowIdButton')[0];
        var form = Ext.getCmp('form_id_button').getForm();
        var labelname = Ext.ComponentQuery.query('label[name=name]');
        var labelid = Ext.ComponentQuery.query('label[name=id]');

        labelname[0].setText('name');
        labelid[0].setText('id');
        PassDriver.hide();
        form.reset();
        ctrlDriver.varWindowIdButton.destroy();
        ctrlDriver.varWindowIdButton = null;
    }
    ,
    columnItemIdButtonClick: function (view, rowIndex, colIndex, item, e, record, row, action) {
        switch (action) {
            case "eliminar":
                this.deleteIdButton(record);
                break;
            default:
            //
        }
    },
        columnItemDriverClick: function (view, rowIndex, colIndex, item, e, record, row, action) {
        switch (action) {
            case "eliminar":
                this.deleteDriver(record);
                break;
            default:
            //
        }
    },

    onBtnOpenIdButton: function () {
        if (ctrlDriver.varWindowIdButton === null) {

            if (ctrlDriver.getFrmDriver().getValues().drivId.length > 0) {
                ctrlDriver.varIdButtonUser = ctrlDriver.getFrmDriver().getValues().drivId;
                ctrlDriver.varWindowIdButton = Ext.create("eborasvehicle.view.Configuration.IdButton").show();
                var labelname = Ext.ComponentQuery.query('label[name=name]');

                labelname[0].setText(ctrlDriver.getFrmDriver().getValues().name_driver + ' ' + ctrlDriver.getFrmDriver().getValues().lastname_driver);

            } else {
                Ext.Msg.alert('ID Button', 'Debe Consultar Primero el conductor');
            }


        } else {
            ctrlDriver.varWindowIdButton.destroy();
            ctrlDriver.varWindowIdButton = null;
        }
    },

    onBtnOpenNewIdButton: function () {
        if (ctrlDriver.varWindowNewIdButton === null) {
            ctrlDriver.varWindowNewIdButton = Ext.create("eborasvehicle.view.Configuration.NewIdButton").show();


        } else {
            ctrlDriver.varWindowNewIdButton.destroy();
            ctrlDriver.varWindowNewIdButton = null;
        }
    },
        onBtnLoad: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        ctrlDriver.setRowSelectVwEbrsCatalogDriver(record.data);

        if (ctrlDriver.getRowSelectVwEbrsCatalogDriver() !== null) {
            ctrlDriver.getFrmDriver().getForm().setValues(ctrlDriver.rowSelectVwEbrsCatalogDriver);
            ctrlDriver.getId().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.pkDrivId);
            ctrlDriver.getComTypeDocument().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.docuName);
            ctrlDriver.getComCategoryLicense().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.tpclName);
            ctrlDriver.getName().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivName);
            ctrlDriver.getLastname().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivLastName);
            ctrlDriver.getIdentificacion().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivIdentification);
            ctrlDriver.getDireccion().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivAddress);
            ctrlDriver.getCorreo().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivEmail);
            ctrlDriver.getTelefono().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivPhone);
            ctrlDriver.getCelular().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivMobilePhone);
            ctrlDriver.getLicencia().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivLicense);
            ctrlDriver.getFecha().setValue(new Date(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivExpirationLicence));
            ctrlDriver.getEstado().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivStatus);
            ctrlDriver.getContrato().setValue(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivContractNumber);
            Ext.ComponentQuery.query('image[itemId=photoImg]')[0].setSrc(ctrlDriver.rowSelectVwEbrsCatalogDriver.drivUrlPhoto);
            Ext.getCmp('tabdriver').up().up().down('[name=driver-card]').getLayout().setActiveItem(0);
            Ext.getCmp('griddriver').store.removeAll();
            Ext.getCmp('searchdriver').setValue('');
        }
    }

});