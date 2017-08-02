/**
 * @class eborasvehicle.controller.Vehicle.Vehicle
 * @extends Ext.app.Controller
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.controller.Vehicle.Vehicle', {
    extend: 'Ext.app.Controller',
    requires: [],
    models: [
        'eborasvehicle.model.Vehicle.ListVehicle',
        'eborasvehicle.model.Vehicle.ListDriver',
        'eborasvehicle.model.Vehicle.VehicleTypes',
        'eborasvehicle.model.Vehicle.FuelTypes',
        'eborasvehicle.model.Vehicle.ProductCodes'
    ],
    stores: [
        'eborasvehicle.store.Vehicle.ListVehicle',
        'eborasvehicle.store.Vehicle.ListDriver',
        'eborasvehicle.store.Vehicle.VehicleTypes',
        'eborasvehicle.store.Vehicle.FuelTypes',
        'eborasvehicle.store.Vehicle.ProductCodes'
    ],
    views: [
        //
    ],
    refs: [],
    init: function() {
        console.log('Controller Vehicle Loaded');
        this.control({
            '#vehicleSaveButton': {
                click: this.saveVehicle
            }
        });
    },
    saveVehicle: function() {
        var url = 'http://' + restService + '/rbVehicleInfo/rbSaveVehicleInfoMod';
        var form1 = Ext.getCmp('form_vehicle1').getForm();
        var form2 = Ext.getCmp('form_vehicle2').getForm();

        Ext.getCmp('tabVehicle1').toggle(true);
        Ext.getCmp('tabVehicle2').toggle(true);
        Ext.getCmp('tabDrivers').toggle(false);
        Ext.getCmp('tabDrivers').disable();
        Ext.getCmp('tabVehicle1').up().up().down('[name=vehicule-card]').getLayout().setActiveItem(0);
        Ext.getCmp('tabDrivers').up().up().down('[name=vehicule-card-result]').getLayout().setActiveItem(0);

        if (form1.isValid() && form2.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url: url,
                method: "POST",
                params: Ext.JSON.encode({
                    'fkTpvhId': { 'pkTpvhId': form1.findField("tipo_vehiculo").getValue() },
                    'vhclNumberPlate': form1.findField("placa_vehiculo").getValue(),
                    'fkCpsId': { 'pkCpsId': form1.findField("asignarcp_vehiculo").getValue() },
                    'vhclAlias': form1.findField("alias_vehiculo").getValue(),
                    'vhclChasis': form2.findField("chasis_vehiculo").getValue(),
                    'vhclCylinder': form2.findField("cilindraje_vehiculo").getValue(),
                    'vhclColor': form2.findField("color_vehiculo").getValue(),
                    'vhclBrand': form2.findField("marca_vehiculo").getValue(),
                    'vhclMotor': form2.findField("motor_vehiculo").getValue(),
                    'vhclModel': form2.findField("modelo_vehiculo").getValue(),
                    'vhclExpirationRevision': Ext.Date.format(form2.findField("venc_revision_vehiculo").getValue(), 'Y-m-d H:i:s.u'),
                    'fkFltyId': form2.findField("tipo_combustible_vehiculo").getValue(),
                    'vhclSoat': form2.findField("soat_vehiculo").getValue(),
                    'vhclExpirationSoat': Ext.Date.format(form2.findField("venc_soat_vehiculo").getValue(), 'Y-m-d H:i:s.u'),
                    'vhclVelocityLimit': 0,
                    'vhclTrailerId': 0,
                    'vhclTrailerNumberPlate': 'NA',
                    'vhclTrailerNumberCapacity': 'NA',
                    'fkTpmsId': { "pkTpmsId": 1 }
                }),
                success: function(data) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title: 'Almacenar Vehículo',
                        msg: 'El vehículo ha sido creado!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    //Reseteamos los formularios
                    form1.reset();
                    form2.reset();
                    //Reseteamos la imagen
                    document.getElementsByClassName('vehicle-image-size')[0].src = '././resources/images/A1A1A1.png';
                },
                failure: function(response, opts) {
                    msgWait.hide();
                    try {
                        if (response) {
                            Ext.MessageBox.show({
                                title: 'Almacenar Vehículo',
                                msg: 'No se pudo crear el vehículo',
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
        }
    }
});