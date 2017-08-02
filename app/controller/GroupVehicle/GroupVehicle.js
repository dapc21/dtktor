/**
 * @class eborasvehicle.controller.GroupVehicle.GroupVehicle
 * @extends Ext.app.Controller
 * @author Daniel Peña
 */
Ext.define('eborasvehicle.controller.GroupVehicle.GroupVehicle', {
    extend   : 'Ext.app.Controller',
    requires : [],
    models   : [
        'eborasvehicle.model.GroupVehicle.Groups',
        'eborasvehicle.model.GroupVehicle.AvailablePlates',
        'eborasvehicle.model.GroupVehicle.AssignedPlates',
        'eborasvehicle.model.GroupVehicle.CurrencyTypes',
        'eborasvehicle.model.GroupVehicle.MeasureUnits',
        'eborasvehicle.model.GroupVehicle.FuelTypes'
    ]
    ,
    stores   : [
        'eborasvehicle.store.GroupVehicle.Groups',
        'eborasvehicle.store.GroupVehicle.AvailablePlates',
        'eborasvehicle.store.GroupVehicle.AssignedPlates',
        'eborasvehicle.store.GroupVehicle.CurrencyTypes',
        'eborasvehicle.store.GroupVehicle.MeasureUnits',
        'eborasvehicle.store.GroupVehicle.FuelTypes'
    ]
    ,
    views    : [
        //
    ]
    ,
    refs     : []
    ,
    init : function() {
        console.log('Controller GroupVehicle Loaded');
        Ext.menu.Menu.override({
            canActivateItem: function(item) {
                return item && !item.isDisabled() && item.isVisible() && item.canActivate;
            }
        });

        // custom Vtype for 3 integers and 2 decimals
        Ext.apply(Ext.form.field.VTypes, {
            percentageDec:  function(val, field) {
                val = val.replace(",",".");
                if(isNaN(val)){
                    return false;
                }
                number = parseFloat(val);
                return number >= 0 && number <= 100;
            },
            percentageDecText: 'Valor no válido. La expresión debe ser un número entre 0 y 100. Ejm: 1.50, 28.35, 40.49',
            percentageDecMask: /[\d\,]/,
            threeIntTwoDec:  function(val, field) {
                var regExp = /^(\d{1,3}){1}((\,){1}(\d{1,2}){1}$)?/;
                return regExp.test(val);
            },
            threeIntTwoDecText: 'Valor no válido. La expresión debe ser un número entre 0 y 100. Ejm: 1.50, 28.35, 40.49',
            threeIntTwoDecMask: /[\d\,]/,
            twoIntTwoDec:  function(val, field) {
                var regExp = /^(\d{1,2}){1}((\,){1}(\d{1,2}){1}$)?/;
                return regExp.test(val);
            },
            twoIntTwoDecText: 'Valor no válido. La expresión debe contener:</br> 1-2 enteros, una coma(,) y 2 decimales. Ejm: 1.50, 28.35',
            twoIntTwoDecMask: /[\d\,]/,
            currency:  function(val, field) {
                var regExp = /^(\d{1,6}){1}((\,){1}(\d{1,2}){1}$)?/;
                return regExp.test(val);
            },
            currencyText: 'Valor no válido. La expresión debe contener:</br> 1-6 enteros, una coma(,) y 2 decimales.</br> Ejm: 1.50, 28.35, 340.49, 425.20, 8966.81, 76453.00, 461384.12',
            currencyMask: /[\d\,]/
        });

        this.control({
            '#vehicleGroupSaveButton' : {
                click : this.saveVehicleGroup
            }
            ,
            '#vehicleGroupCancelButton' : {
                click : this.cancelVehicleGroup
            }
            ,
            'actioncolumn': {
                actionClick: this.onActionColumnItemClick
            }
            ,
            '#gridGroupVehicle': {
                itemclick: this.selectRecordGroupVehicle
            }
            ,
            '#vehicleGroupConfigSaveButton' : {
                click : this.checkVehicleGroupConfig
            },
            '#vehicleGroupConfigCancelButton' : {
                click :  function() {
                    grid = Ext.getCmp('gridGroupVehicle');
                    var row = grid.getSelectionModel().getSelection()[0];
                    if(typeof(row) !== "undefined"){
                        var name = row.data['csgrName'];
                        var id = row.data['pkCsgrId'];
                        this.onSelectGroupVehicle(id, name);
                    }
                }   
            }
        });
    }
    ,
    saveVehicleGroup : function() {
        var url = 'http://' + restService + '/rbVehicleGroup/rbVehicleSaveGroup';
        var form = Ext.getCmp('form_group_vehicle').getForm();
        console.log('Datos enviados...');
        if (form.isValid()) {
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            Ext.Ajax.request({
                url      : url,
                type     : 'rest',
                dataType : 'json',
                method   : 'PUT',
                scope    : this,
                params   : Ext.JSON.encode({
                    'nameGroup' : form.findField("nameGroup").getValue()
                }),
                success  : function(response){
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : 'Almacenar Grupo',
                        msg     : 'El grupo ha sido creado!',
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.INFO
                    });
                    form.reset();
                    Ext.getCmp('gridGroupVehicle').store.reload();
                    Ext.getCmp('gridGroupVehicle').getView().refresh();
                },
                failure  : function(response) {
                    msgWait.hide();
                    form.reset();
                    Ext.MessageBox.show({
                        title   : 'Almacenar Grupo',
                        msg     : 'No se pudo crear el grupo',
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });
        }
    }
    ,
    cancelVehicleGroup : function() {
        var menuGroup = Ext.ComponentQuery.query('#windowNewGroupVehicle')[0];
        var form = Ext.getCmp('form_group_vehicle').getForm();
        menuGroup.hide();
        form.reset();
    }
    ,
    deleteVehicleGroup : function(record) {
        var idGroup = record.get('pkCsgrId');
        var nameGroup = record.get('csgrName');
        Ext.Msg.confirm('Eliminar Grupo','Desea eliminar el Grupo '+nameGroup, function(btn) {
            if (btn === 'yes') {
                var msgWait = Ext.MessageBox.wait('Enviando datos...');
                Ext.Ajax.request({
                    url      : 'http://' + restService + '/rbVehicleGroup/rbDeleteGroup/'+idGroup,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'DELETE',
                    success  : function(response){
                        var label = Ext.ComponentQuery.query('label[name=vehicleGroupName]');
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : 'Eliminar Grupo',
                            msg     : 'El grupo '+nameGroup+' ha sido eliminado!',
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp('gridGroupVehicle').store.load();
                        Ext.getCmp('gridGroupVehicle').getView().refresh();
                        Ext.getCmp('gridAssignedPlates').store.removeAll();
                        Ext.getCmp('gridAvailablePlates').store.load();
                        Ext.getCmp('gridAvailablePlates').getView().refresh();
                        label[0].setText('Nombre grupo');
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : 'Eliminar Grupo',
                            msg     : 'No se pudo eliminar el grupo '+nameGroup,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    }
    ,
    selectRecordGroupVehicle : function(itemh, record, item, index, e, eOpts) {
        var name = record.raw['csgrName'];
        var id = record.raw['pkCsgrId'];
        this.onSelectGroupVehicle(id,name);  
    },
    onSelectGroupVehicle : function(id,name) {
        
        var label = Ext.ComponentQuery.query('label[name=vehicleGroupName]');
        var tabPanel = Ext.getCmp('configVehicleGroupTabPanel').up().up().up().down('[name=config-vehicule]');
        
        //Sobreescritura de Título en Panel "Nombre de Grupo"
        label[0].setText(name);
        //Carga de valores (placas) que han sido asignadas al grupo seleccionado
        Ext.getCmp('gridAssignedPlates').store.proxy.url = 'http://' + restService + '/rbVehicleGroup/rbFindPlatesByGroup';
        Ext.getCmp('gridAssignedPlates').store.proxy.extraParams = {
            idGroup: id
        };
        Ext.getCmp('gridAssignedPlates').store.load();
        Ext.getCmp('gridAssignedPlates').getView().refresh();
        Ext.getCmp('gridAvailablePlates').store.load();
        Ext.getCmp('gridAvailablePlates').getView().refresh();
        Ext.getCmp('tpvhCombobox').clearValue();        
        Ext.getCmp('buttonTabFuel').toggle(true);
        tabPanel.getLayout().setActiveItem(0);
                
        //Seteo de valores en pestañas de configuración del grupo seleccionado
        this.getFuelFormData(id); //suspendido hasta que se acomode el servicio
        this.getRpmFormData(id); //suspendido hasta que se acomode el servicio
        this.getBrakeFormData(id); //suspendido hasta que se acomode el servicio
        this.getGearFormData(id); //suspendido hasta que se acomode el servicio
        this.getFleetAvailableFormData(id); //suspendido hasta que se acomode el servicio
        this.getIdleSpeedFormData(id); //suspendido hasta que se acomode el servicio
        this.getSpeedFormData(id); //suspendido hasta que se acomode el servicio
    }
    ,
    getFuelFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindFuelConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_fuel').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                form.findField('price').setValue(objectData.price);
                form.findField('fuelEfficiency').setValue(objectData.fuelEfficiency);
                form.findField('unitFuelEfficiency').reset();
                form.findField('unitFuelEfficiency').setValue(objectData.efficiencyUnit);
                form.findField('redLowerRangeFuel').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeFuel').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeFuel').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeFuel').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeFuel').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeFuel').setValue(objectData.greenUpperRange);
                var unity = form.findField('unity');
                var index = parseInt(objectData.measurementUnit) - 1;
                if(unity.getStore().getCount()===0){
                   unity.getStore().load({callback: function(){
                        unity.setValue(unity.getStore().getAt(index).get(unity.valueField));
                 }}); 
                } else if(index<unity.getStore().getCount()){
                    unity.setValue(unity.getStore().getAt(index).get(unity.valueField));
                }
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getRpmFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindRpmConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_rpm').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                form.findField('whiteLowerRangeRpm').setValue(objectData.whiteLowerRange);
                form.findField('whiteUpperRangeRpm').setValue(objectData.whiteUpperRange);
                form.findField('redLowerRangeRpm').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeRpm').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeRpm').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeRpm').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeRpm').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeRpm').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getBrakeFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindBrakeConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_brake').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                form.findField('brakeUse').setValue(objectData.brakeUse);
                form.findField('redLowerRangeBrake').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeBrake').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeBrake').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeBrake').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeBrake').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeBrake').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getGearFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindClutchConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_gear').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                form.findField('gearUse').setValue(objectData.clutchUse);
                form.findField('redLowerRangeGear').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeGear').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeGear').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeGear').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeGear').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeGear').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getFleetAvailableFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindAvailabilityConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_fleet_available').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                operationTime = parseFloat(objectData.fleetOperationTime) / 3600; // Seconds
                form.findField('fleetOperationTime').setValue(operationTime);
                form.findField('redLowerRangeFleetAvailable').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeFleetAvailable').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeFleetAvailable').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeFleetAvailable').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeFleetAvailable').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeFleetAvailable').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getIdleSpeedFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindRalentiConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_idle_speed').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                maxRalentiTime = parseFloat(objectData.maxRalentiTime) / 60; //Seconds
                form.findField('maximumIdleTime').setValue(maxRalentiTime);
                form.findField('redLowerRangeIdleSpeed').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeIdleSpeed').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeIdleSpeed').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeIdleSpeed').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeIdleSpeed').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeIdleSpeed').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    getSpeedFormData : function(idGroup) {
        Ext.Ajax.request({
            url      : 'http://' + restService + '/rbGroupConfig/rbFindVelocityConfigByGroup?idGroup='+idGroup,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : this,
            success  : function(response){
                var form = Ext.getCmp('form_config_speed').getForm();
                var result = Ext.decode(response.responseText);
                if(typeof(result[0]) === "undefined"){
                    form.reset();
                    return;
                }
                var objectData = JSON.parse(result[0].sgvcJsonConfiguration);
                form.findField('whiteLowerRangeSpeed').setValue(objectData.whiteLowerRange);
                form.findField('whiteUpperRangeSpeed').setValue(objectData.whiteUpperRange);
                form.findField('redLowerRangeSpeed').setValue(objectData.redLowerRange);
                form.findField('redUpperRangeSpeed').setValue(objectData.redUpperRange);
                form.findField('yellowLowerRangeSpeed').setValue(objectData.yellowLowerRange);
                form.findField('yellowUpperRangeSpeed').setValue(objectData.yellowUpperRange);
                form.findField('greenLowerRangeSpeed').setValue(objectData.greenLowerRange);
                form.findField('greenUpperRangeSpeed').setValue(objectData.greenUpperRange);
            },
            failure : function(response) {
                console.log(response);
            }
        });
    }
    ,
    onActionColumnItemClick : function(view, rowIndex, colIndex, item, e, record, row, action) {
        switch(action) {
            case "eliminar":
                this.deleteVehicleGroup(record);
                break;
            default:
                //
        }
    }
    ,
    isValidAllForms : function(fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed, form_config_fuel, form_config_rpm, form_config_brake, form_config_gear, form_config_fleet_available, form_config_idle_speed, form_config_speed) {
        var formNames = [], formValues = [], idTab = [];
        var tp = Ext.getCmp('configVehicleGroupTabPanel').up().up().up().down('[name=config-vehicule]');
        var formsAreValid = true;
        formValues.push(fcFuel);
        formValues.push(fcRpm);
        formValues.push(fcBrake);
        formValues.push(fcGear);
        formValues.push(fcFleetAvailable);
        formValues.push(fcIdleSpeed);
        formValues.push(fcSpeed);
        formNames.push(form_config_fuel);
        formNames.push(form_config_rpm);
        formNames.push(form_config_brake);
        formNames.push(form_config_gear);
        formNames.push(form_config_fleet_available);
        formNames.push(form_config_idle_speed);
        formNames.push(form_config_speed);
        idTab.push('buttonTabFuel');
        idTab.push('buttonTabRpm');
        idTab.push('buttonTabBrake');
        idTab.push('buttonTabGear');
        idTab.push('buttonTabFleetAvailable');
        idTab.push('buttonTabIdleSpeed');
        idTab.push('buttonTabSpeed');
        
        for (var j = 0; j < formValues.length; j++) {
            if (formValues[j]) {
                if (!formNames[j].isValid()) {
                    Ext.getCmp(idTab[j]).toggle(true);
                    tp.getLayout().setActiveItem(j);
                    formsAreValid = false;
                    break;
                }
            }
        }
        return formsAreValid;
    }
    ,
    checkVehicleGroupConfig : function() {
        var selectedRecordGroup = Ext.getCmp('gridGroupVehicle').getSelectionModel().getSelection();
        // Verificamos que haya un grupo seleccionado en el gridpanel de Grupo de Vehículos para obtener el ID
        if(selectedRecordGroup.length > 0){
            var fcFuel = false, fcRpm = false, fcBrake = false, fcGear = false, fcFleetAvailable = false, fcIdleSpeed = false, fcSpeed = false;
            var idGroup = selectedRecordGroup[0].get('pkCsgrId');
            var nameGroup = selectedRecordGroup[0].get('csgrName');
            var form_config_fuel = Ext.getCmp('form_config_fuel').getForm();
            var form_config_rpm = Ext.getCmp('form_config_rpm').getForm();
            var form_config_brake = Ext.getCmp('form_config_brake').getForm();
            var form_config_gear = Ext.getCmp('form_config_gear').getForm();
            var form_config_fleet_available = Ext.getCmp('form_config_fleet_available').getForm();
            var form_config_idle_speed = Ext.getCmp('form_config_idle_speed').getForm();
            var form_config_speed = Ext.getCmp('form_config_speed').getForm();
            // Validamos que al menos un formulario (equivale a una pestaña) esté rellenado para enviar
            if (this.validateFuelForm(form_config_fuel) || this.validateRpmForm(form_config_rpm) || this.validateBrakeForm(form_config_brake) || this.validateGearForm(form_config_gear) || this.validateFleetAvailableForm(form_config_fleet_available) || this.validateIdleSpeedForm(form_config_idle_speed) || this.validateSpeedForm(form_config_speed)) {
                // Si devuelve true (hay valores en form) inspecciona que todos estén
                if ( this.validateFuelForm(form_config_fuel) ) {
                    fcFuel = true;
                }
                if ( this.validateRpmForm(form_config_rpm) ) {
                    fcRpm = true;
                }
                if ( this.validateBrakeForm(form_config_brake) ) {
                    fcBrake = true;
                }
                if ( this.validateGearForm(form_config_gear) ) {
                    fcGear = true;
                }
                if ( this.validateFleetAvailableForm(form_config_fleet_available) ) {
                    fcFleetAvailable = true;
                }
                if ( this.validateIdleSpeedForm(form_config_idle_speed) ) {
                    fcIdleSpeed = true;
                }
                if ( this.validateSpeedForm(form_config_speed) ) {
                    fcSpeed = true;
                }

                if ( this.isValidAllForms(fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed, form_config_fuel, form_config_rpm, form_config_brake, form_config_gear, form_config_fleet_available, form_config_idle_speed, form_config_speed) ) {
                    this.sendForms(idGroup, nameGroup, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
                }

            } else {
                Ext.MessageBox.show({
                    title   : 'Configuración de Grupo',
                    msg     : 'Debe rellenar los datos de por lo menos una de las pestañas de la configuración de grupo.',
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.ERROR
                });
            }
        } else {
            Ext.MessageBox.show({
                title   : 'Configuración de Grupo',
                msg     : 'Debe seleccionar un grupo antes de realizar la configuración.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }

    }
    ,
    sendForms : function(id, name, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        var nRecordsPlates = Ext.getCmp('gridAssignedPlates').getStore().getCount();
        if ( nRecordsPlates > 0 ) {
            var form_config_fuel = Ext.getCmp('form_config_fuel').getForm();
            var form_config_rpm = Ext.getCmp('form_config_rpm').getForm();
            var form_config_brake = Ext.getCmp('form_config_brake').getForm();
            var form_config_gear = Ext.getCmp('form_config_gear').getForm();
            var form_config_fleet_available = Ext.getCmp('form_config_fleet_available').getForm();
            var form_config_idle_speed = Ext.getCmp('form_config_idle_speed').getForm();
            var form_config_speed = Ext.getCmp('form_config_speed').getForm();
            var msgWait = Ext.MessageBox.wait('Enviando datos...');
            if ( fcFuel ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de combustible...');
                this.saveFuelForm(id, name, msgWait, form_config_fuel, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcRpm ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de RPM...');
                this.saveRpmForm(id, name, msgWait, form_config_rpm, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcBrake ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de frenos...');
                this.saveBrakeForm(id, name, msgWait, form_config_brake, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcGear ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de embrague...');
                this.saveGearForm(id, name, msgWait, form_config_gear, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcFleetAvailable ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de disponibilidad de la flota...');
                this.saveFleetAvailableForm(id, name, msgWait, form_config_fleet_available, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcIdleSpeed ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de ralentí...');
                this.saveIdleSpeedForm(id, name, msgWait, form_config_idle_speed, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }
            else if ( fcSpeed ) {
                msgWait = Ext.MessageBox.wait('Almacenando datos de velocidad...');
                this.saveSpeedForm(id, name, msgWait, form_config_speed, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
            }

            if (!fcFuel && !fcRpm && !fcBrake && !fcGear && !fcFleetAvailable && !fcIdleSpeed && !fcSpeed) {
                this.assignPlates(id, name, msgWait, form_config_fuel, form_config_rpm, form_config_brake, form_config_gear, form_config_fleet_available, form_config_idle_speed, form_config_speed);
            }
        } else {
            Ext.MessageBox.show({
                title   : 'Configuración de Grupo',
                msg     : 'Debe asignar placas al grupo "'+ name +'".',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
    }
    ,
    validateFuelForm : function(form) {
        var measurementUnit = form.findField('unity');
        var price = form.findField('price');
        var redLowerRangeFuel = form.findField('redLowerRangeFuel');
        var redUpperRangeFuel = form.findField('redUpperRangeFuel');
        var yellowLowerRangeFuel = form.findField('yellowLowerRangeFuel');
        var yellowUpperRangeFuel = form.findField('yellowUpperRangeFuel');
        var greenLowerRangeFuel = form.findField('greenLowerRangeFuel');
        var greenUpperRangeFuel = form.findField('greenUpperRangeFuel');
        var fuelEfficiency = form.findField('fuelEfficiency');
        var efficiencyUnit = form.findField('unitFuelEfficiency');

        if (measurementUnit.getValue() != null || price.getValue() != null || redLowerRangeFuel.getValue() != null || redUpperRangeFuel.getValue() != null || yellowLowerRangeFuel.getValue() != null || yellowUpperRangeFuel.getValue() != null || greenLowerRangeFuel.getValue() != null || greenUpperRangeFuel.getValue() != null || fuelEfficiency.getValue() != null || efficiencyUnit.getValue() != null) {
            measurementUnit.allowBlank = false;
            measurementUnit.validate();
            price.allowBlank = false;
            price.validate();
            redLowerRangeFuel.allowBlank = false;
            redLowerRangeFuel.validate();
            if (redLowerRangeFuel.getValue() != null) {
                redUpperRangeFuel.allowBlank = false;
                redUpperRangeFuel.validate();  
            }
            yellowLowerRangeFuel.allowBlank = false;
            yellowLowerRangeFuel.validate();
            if (yellowLowerRangeFuel.getValue() != null) {
                yellowUpperRangeFuel.allowBlank = false;
                yellowUpperRangeFuel.validate();  
            }
            greenLowerRangeFuel.allowBlank = false;
            greenLowerRangeFuel.validate();
            if (greenLowerRangeFuel.getValue() != null) {
                greenUpperRangeFuel.allowBlank = false;
                greenUpperRangeFuel.validate();
            }
            fuelEfficiency.allowBlank = false;
            fuelEfficiency.validate();
            efficiencyUnit.allowBlank = false;
            efficiencyUnit.validate();
            return true;
        }
        measurementUnit.allowBlank = true;
        measurementUnit.validate();
        price.allowBlank = true;
        price.validate();
        redLowerRangeFuel.allowBlank = true;
        redLowerRangeFuel.validate();
        redUpperRangeFuel.allowBlank = true;
        redUpperRangeFuel.validate();
        redUpperRangeFuel.clearInvalid();
        yellowLowerRangeFuel.allowBlank = true;
        yellowLowerRangeFuel.validate();
        yellowUpperRangeFuel.allowBlank = true;
        yellowUpperRangeFuel.validate();
        yellowUpperRangeFuel.clearInvalid();
        greenLowerRangeFuel.allowBlank = true;
        greenLowerRangeFuel.validate();
        greenUpperRangeFuel.allowBlank = true;
        greenUpperRangeFuel.validate();
        greenUpperRangeFuel.clearInvalid();
        fuelEfficiency.allowBlank = true;
        fuelEfficiency.validate();
        efficiencyUnit.allowBlank = true;
        efficiencyUnit.validate();
        return false;
    }
    ,
    validateRpmForm : function(form) {
        var whiteLowerRangeRpm = form.findField('whiteLowerRangeRpm');
        var whiteUpperRangeRpm = form.findField('whiteUpperRangeRpm');
        var redLowerRangeRpm = form.findField('redLowerRangeRpm');
        var redUpperRangeRpm = form.findField('redUpperRangeRpm');
        var yellowLowerRangeRpm = form.findField('yellowLowerRangeRpm');
        var yellowUpperRangeRpm = form.findField('yellowUpperRangeRpm');
        var greenLowerRangeRpm = form.findField('greenLowerRangeRpm');
        var greenUpperRangeRpm = form.findField('greenUpperRangeRpm');

        if (whiteLowerRangeRpm.getValue() != null || whiteUpperRangeRpm.getValue() != null || redLowerRangeRpm.getValue() != null || redUpperRangeRpm.getValue() != null || yellowLowerRangeRpm.getValue() != null || yellowUpperRangeRpm.getValue() != null || greenLowerRangeRpm.getValue() != null || greenUpperRangeRpm.getValue() != null) {

            whiteLowerRangeRpm.allowBlank = false;
            whiteLowerRangeRpm.validate();
            if (whiteLowerRangeRpm.getValue() != null) {
                whiteUpperRangeRpm.allowBlank = false;
                whiteUpperRangeRpm.validate();  
            }
            redLowerRangeRpm.allowBlank = false;
            redLowerRangeRpm.validate();
            if (redLowerRangeRpm.getValue() != null) {
                redUpperRangeRpm.allowBlank = false;
                redUpperRangeRpm.validate();  
            }
            yellowLowerRangeRpm.allowBlank = false;
            yellowLowerRangeRpm.validate();
            if (yellowLowerRangeRpm.getValue() != null) {
                yellowUpperRangeRpm.allowBlank = false;
                yellowUpperRangeRpm.validate();
            }
            greenLowerRangeRpm.allowBlank = false;
            greenLowerRangeRpm.validate();
            if (greenLowerRangeRpm.getValue() != null) {
                greenUpperRangeRpm.allowBlank = false;
                greenUpperRangeRpm.validate();
            }
            return true;
        }
        whiteLowerRangeRpm.allowBlank = true;
        whiteLowerRangeRpm.validate();
        whiteUpperRangeRpm.allowBlank = true;
        whiteUpperRangeRpm.validate();
        whiteUpperRangeRpm.clearInvalid();
        redLowerRangeRpm.allowBlank = true;
        redLowerRangeRpm.validate();
        redUpperRangeRpm.allowBlank = true;
        redUpperRangeRpm.validate();
        redUpperRangeRpm.clearInvalid();
        yellowLowerRangeRpm.allowBlank = true;
        yellowLowerRangeRpm.validate();
        yellowUpperRangeRpm.allowBlank = true;
        yellowUpperRangeRpm.validate();
        yellowUpperRangeRpm.clearInvalid();
        greenLowerRangeRpm.allowBlank = true;
        greenLowerRangeRpm.validate();
        greenUpperRangeRpm.allowBlank = true;
        greenUpperRangeRpm.validate();
        greenUpperRangeRpm.clearInvalid();
        return false;
    }
    ,
    validateBrakeForm : function(form) {
        var brakeUse = form.findField('brakeUse');
        var redLowerRangeBrake = form.findField('redLowerRangeBrake');
        var redUpperRangeBrake = form.findField('redUpperRangeBrake');
        var yellowLowerRangeBrake = form.findField('yellowLowerRangeBrake');
        var yellowUpperRangeBrake = form.findField('yellowUpperRangeBrake');
        var greenLowerRangeBrake = form.findField('greenLowerRangeBrake');
        var greenUpperRangeBrake = form.findField('greenUpperRangeBrake');

        if (brakeUse.getValue() != null || redLowerRangeBrake.getValue() != null || redUpperRangeBrake.getValue() != null || yellowLowerRangeBrake.getValue() != null || yellowUpperRangeBrake.getValue() != null || greenLowerRangeBrake.getValue() != null || greenUpperRangeBrake.getValue() != null) {
            brakeUse.allowBlank = false;
            brakeUse.validate();
            redLowerRangeBrake.allowBlank = false;
            redLowerRangeBrake.validate();
            if (redLowerRangeBrake.getValue() != null) {
                redUpperRangeBrake.allowBlank = false;
                redUpperRangeBrake.validate();  
            }
            yellowLowerRangeBrake.allowBlank = false;
            yellowLowerRangeBrake.validate();
            if (yellowLowerRangeBrake.getValue() != null) {
                yellowUpperRangeBrake.allowBlank = false;
                yellowUpperRangeBrake.validate();  
            }
            greenLowerRangeBrake.allowBlank = false;
            greenLowerRangeBrake.validate();
            if (greenLowerRangeBrake.getValue() != null) {
                greenUpperRangeBrake.allowBlank = false;
                greenUpperRangeBrake.validate();
            }
            return true;
        }
        brakeUse.allowBlank = true;
        brakeUse.validate();
        redLowerRangeBrake.allowBlank = true;
        redLowerRangeBrake.validate();
        redUpperRangeBrake.allowBlank = true;
        redUpperRangeBrake.validate();
        redUpperRangeBrake.clearInvalid();
        yellowLowerRangeBrake.allowBlank = true;
        yellowLowerRangeBrake.validate();
        yellowUpperRangeBrake.allowBlank = true;
        yellowUpperRangeBrake.validate();
        yellowUpperRangeBrake.clearInvalid();
        greenLowerRangeBrake.allowBlank = true;
        greenLowerRangeBrake.validate();
        greenUpperRangeBrake.allowBlank = true;
        greenUpperRangeBrake.validate();
        greenUpperRangeBrake.clearInvalid();
        return false;
    }
    ,
    validateGearForm : function(form) {
        var gearUse = form.findField('gearUse');
        var redLowerRangeGear = form.findField('redLowerRangeGear');
        var redUpperRangeGear = form.findField('redUpperRangeGear');
        var yellowLowerRangeGear = form.findField('yellowLowerRangeGear');
        var yellowUpperRangeGear = form.findField('yellowUpperRangeGear');
        var greenLowerRangeGear = form.findField('greenLowerRangeGear');
        var greenUpperRangeGear = form.findField('greenUpperRangeGear');

        if (gearUse.getValue() != null || redLowerRangeGear.getValue() != null || redUpperRangeGear.getValue() != null || yellowLowerRangeGear.getValue() != null || yellowUpperRangeGear.getValue() != null || greenLowerRangeGear.getValue() != null || greenUpperRangeGear.getValue() != null) {
            gearUse.allowBlank = false;
            gearUse.validate();
            redLowerRangeGear.allowBlank = false;
            redLowerRangeGear.validate();
            if (redLowerRangeGear.getValue() != null) {
                redUpperRangeGear.allowBlank = false;
                redUpperRangeGear.validate();  
            }
            yellowLowerRangeGear.allowBlank = false;
            yellowLowerRangeGear.validate();
            if (yellowLowerRangeGear.getValue() != null) {
                yellowUpperRangeGear.allowBlank = false;
                yellowUpperRangeGear.validate();  
            }
            greenLowerRangeGear.allowBlank = false;
            greenLowerRangeGear.validate();
            if (greenLowerRangeGear.getValue() != null) {
                greenUpperRangeGear.allowBlank = false;
                greenUpperRangeGear.validate();
            }
            return true;
        }
        gearUse.allowBlank = true;
        gearUse.validate();
        redLowerRangeGear.allowBlank = true;
        redLowerRangeGear.validate();
        redUpperRangeGear.allowBlank = true;
        redUpperRangeGear.validate();
        redUpperRangeGear.clearInvalid();
        yellowLowerRangeGear.allowBlank = true;
        yellowLowerRangeGear.validate();
        yellowUpperRangeGear.allowBlank = true;
        yellowUpperRangeGear.validate();
        yellowUpperRangeGear.clearInvalid();
        greenLowerRangeGear.allowBlank = true;
        greenLowerRangeGear.validate();
        greenUpperRangeGear.allowBlank = true;
        greenUpperRangeGear.validate();
        greenUpperRangeGear.clearInvalid();
        return false;
    }
    ,
    validateFleetAvailableForm : function(form) {
        var fleetOperationTime = form.findField('fleetOperationTime');
        var redLowerRangeFleetAvailable = form.findField('redLowerRangeFleetAvailable');
        var redUpperRangeFleetAvailable = form.findField('redUpperRangeFleetAvailable');
        var yellowLowerRangeFleetAvailable = form.findField('yellowLowerRangeFleetAvailable');
        var yellowUpperRangeFleetAvailable = form.findField('yellowUpperRangeFleetAvailable');
        var greenLowerRangeFleetAvailable = form.findField('greenLowerRangeFleetAvailable');
        var greenUpperRangeFleetAvailable = form.findField('greenUpperRangeFleetAvailable');

        if (fleetOperationTime.getValue() != null || redLowerRangeFleetAvailable.getValue() != null || redUpperRangeFleetAvailable.getValue() != null || yellowLowerRangeFleetAvailable.getValue() != null || yellowUpperRangeFleetAvailable.getValue() != null || greenLowerRangeFleetAvailable.getValue() != null || greenUpperRangeFleetAvailable.getValue() != null) {
            fleetOperationTime.allowBlank = false;
            fleetOperationTime.validate();
            redLowerRangeFleetAvailable.allowBlank = false;
            redLowerRangeFleetAvailable.validate();
            if (redLowerRangeFleetAvailable.getValue() != null) {
                redUpperRangeFleetAvailable.allowBlank = false;
                redUpperRangeFleetAvailable.validate();  
            }
            yellowLowerRangeFleetAvailable.allowBlank = false;
            yellowLowerRangeFleetAvailable.validate();
            if (yellowLowerRangeFleetAvailable.getValue() != null) {
                yellowUpperRangeFleetAvailable.allowBlank = false;
                yellowUpperRangeFleetAvailable.validate();  
            }
            greenLowerRangeFleetAvailable.allowBlank = false;
            greenLowerRangeFleetAvailable.validate();
            if (greenLowerRangeFleetAvailable.getValue() != null) {
                greenUpperRangeFleetAvailable.allowBlank = false;
                greenUpperRangeFleetAvailable.validate();
            }
            return true;
        }
        fleetOperationTime.allowBlank = true;
        fleetOperationTime.validate();
        redLowerRangeFleetAvailable.allowBlank = true;
        redLowerRangeFleetAvailable.validate();
        redUpperRangeFleetAvailable.allowBlank = true;
        redUpperRangeFleetAvailable.validate();
        redUpperRangeFleetAvailable.clearInvalid();
        yellowLowerRangeFleetAvailable.allowBlank = true;
        yellowLowerRangeFleetAvailable.validate();
        yellowUpperRangeFleetAvailable.allowBlank = true;
        yellowUpperRangeFleetAvailable.validate();
        yellowUpperRangeFleetAvailable.clearInvalid();
        greenLowerRangeFleetAvailable.allowBlank = true;
        greenLowerRangeFleetAvailable.validate();
        greenUpperRangeFleetAvailable.allowBlank = true;
        greenUpperRangeFleetAvailable.validate();
        greenUpperRangeFleetAvailable.clearInvalid();
        return false;
    }
    ,
    validateIdleSpeedForm : function(form) {
        var maximumIdleTime = form.findField('maximumIdleTime');
        var redLowerRangeIdleSpeed = form.findField('redLowerRangeIdleSpeed');
        var redUpperRangeIdleSpeed = form.findField('redUpperRangeIdleSpeed');
        var yellowLowerRangeIdleSpeed = form.findField('yellowLowerRangeIdleSpeed');
        var yellowUpperRangeIdleSpeed = form.findField('yellowUpperRangeIdleSpeed');
        var greenLowerRangeIdleSpeed = form.findField('greenLowerRangeIdleSpeed');
        var greenUpperRangeIdleSpeed = form.findField('greenUpperRangeIdleSpeed');

        if (maximumIdleTime.getValue() != null || redLowerRangeIdleSpeed.getValue() != null || redUpperRangeIdleSpeed.getValue() != null || yellowLowerRangeIdleSpeed.getValue() != null || yellowUpperRangeIdleSpeed.getValue() != null || greenLowerRangeIdleSpeed.getValue() != null || greenUpperRangeIdleSpeed.getValue() != null) {
            maximumIdleTime.allowBlank = false;
            maximumIdleTime.validate();
            redLowerRangeIdleSpeed.allowBlank = false;
            redLowerRangeIdleSpeed.validate();
            if (redLowerRangeIdleSpeed.getValue() != null) {
                redUpperRangeIdleSpeed.allowBlank = false;
                redUpperRangeIdleSpeed.validate();  
            }
            yellowLowerRangeIdleSpeed.allowBlank = false;
            yellowLowerRangeIdleSpeed.validate();
            if (yellowLowerRangeIdleSpeed.getValue() != null) {
                yellowUpperRangeIdleSpeed.allowBlank = false;
                yellowUpperRangeIdleSpeed.validate();  
            }
            greenLowerRangeIdleSpeed.allowBlank = false;
            greenLowerRangeIdleSpeed.validate();
            if (greenLowerRangeIdleSpeed.getValue() != null) {
                greenUpperRangeIdleSpeed.allowBlank = false;
                greenUpperRangeIdleSpeed.validate();
            }
            return true;
        }
        maximumIdleTime.allowBlank = true;
        maximumIdleTime.validate();
        redLowerRangeIdleSpeed.allowBlank = true;
        redLowerRangeIdleSpeed.validate();
        redUpperRangeIdleSpeed.allowBlank = true;
        redUpperRangeIdleSpeed.validate();
        redUpperRangeIdleSpeed.clearInvalid();
        yellowLowerRangeIdleSpeed.allowBlank = true;
        yellowLowerRangeIdleSpeed.validate();
        yellowUpperRangeIdleSpeed.allowBlank = true;
        yellowUpperRangeIdleSpeed.validate();
        yellowUpperRangeIdleSpeed.clearInvalid();
        greenLowerRangeIdleSpeed.allowBlank = true;
        greenLowerRangeIdleSpeed.validate();
        greenUpperRangeIdleSpeed.allowBlank = true;
        greenUpperRangeIdleSpeed.validate();
        greenUpperRangeIdleSpeed.clearInvalid();
        return false;
    },
    validateSpeedForm : function(form) {
        var whiteLowerRangeSpeed = form.findField('whiteLowerRangeSpeed');
        var whiteUpperRangeSpeed = form.findField('whiteUpperRangeSpeed');
        var redLowerRangeSpeed = form.findField('redLowerRangeSpeed');
        var redUpperRangeSpeed = form.findField('redUpperRangeSpeed');
        var yellowLowerRangeSpeed = form.findField('yellowLowerRangeSpeed');
        var yellowUpperRangeSpeed = form.findField('yellowUpperRangeSpeed');
        var greenLowerRangeSpeed = form.findField('greenLowerRangeSpeed');
        var greenUpperRangeSpeed = form.findField('greenUpperRangeSpeed');

        if (whiteLowerRangeSpeed.getValue() != null || whiteUpperRangeSpeed.getValue() != null || redLowerRangeSpeed.getValue() != null || redUpperRangeSpeed.getValue() != null || yellowLowerRangeSpeed.getValue() != null || yellowUpperRangeSpeed.getValue() != null || greenLowerRangeSpeed.getValue() != null || greenUpperRangeSpeed.getValue() != null) {

            whiteLowerRangeSpeed.allowBlank = false;
            whiteLowerRangeSpeed.validate();
            if (whiteLowerRangeSpeed.getValue() != null) {
                whiteUpperRangeSpeed.allowBlank = false;
                whiteUpperRangeSpeed.validate();  
            }
            redLowerRangeSpeed.allowBlank = false;
            redLowerRangeSpeed.validate();
            if (redLowerRangeSpeed.getValue() != null) {
                redUpperRangeSpeed.allowBlank = false;
                redUpperRangeSpeed.validate();  
            }
            yellowLowerRangeSpeed.allowBlank = false;
            yellowLowerRangeSpeed.validate();
            if (yellowLowerRangeSpeed.getValue() != null) {
                yellowUpperRangeSpeed.allowBlank = false;
                yellowUpperRangeSpeed.validate();
            }
            greenLowerRangeSpeed.allowBlank = false;
            greenLowerRangeSpeed.validate();
            if (greenLowerRangeSpeed.getValue() != null) {
                greenUpperRangeSpeed.allowBlank = false;
                greenUpperRangeSpeed.validate();
            }
            return true;
        }
        whiteLowerRangeSpeed.allowBlank = true;
        whiteLowerRangeSpeed.validate();
        whiteUpperRangeSpeed.allowBlank = true;
        whiteUpperRangeSpeed.validate();
        whiteUpperRangeSpeed.clearInvalid();
        redLowerRangeSpeed.allowBlank = true;
        redLowerRangeSpeed.validate();
        redUpperRangeSpeed.allowBlank = true;
        redUpperRangeSpeed.validate();
        redUpperRangeSpeed.clearInvalid();
        yellowLowerRangeSpeed.allowBlank = true;
        yellowLowerRangeSpeed.validate();
        yellowUpperRangeSpeed.allowBlank = true;
        yellowUpperRangeSpeed.validate();
        yellowUpperRangeSpeed.clearInvalid();
        greenLowerRangeSpeed.allowBlank = true;
        greenLowerRangeSpeed.validate();
        greenUpperRangeSpeed.allowBlank = true;
        greenUpperRangeSpeed.validate();
        greenUpperRangeSpeed.clearInvalid();
        return false;
    }
    ,
    saveFuelForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveFuelConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'measurementUnit': form.findField('unity').getValue(),
            'price': form.findField('price').getValue(),
            'fuelEfficiency': form.findField('fuelEfficiency').getValue(),
            'efficiencyUnit': form.findField('unitFuelEfficiency').getValue(),
            'redLowerRange': form.findField('redLowerRangeFuel').getValue(),
            'redUpperRange': form.findField('redUpperRangeFuel').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeFuel').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeFuel').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeFuel').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeFuel').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Combustible',
                msg     : 'Error al intentar almacenar la Configuración de Combustible.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveRpmForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveRpmConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'redLowerRange': form.findField('redLowerRangeRpm').getValue(),
            'redUpperRange': form.findField('redUpperRangeRpm').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeRpm').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeRpm').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeRpm').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeRpm').getValue(),
            'whiteLowerRange': form.findField('whiteLowerRangeRpm').getValue(),
            'whiteUpperRange': form.findField('whiteUpperRangeRpm').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de RPM',
                msg     : 'Error al intentar almacenar la Configuración de RPM.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveBrakeForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveBrakeConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'brakeUse': form.findField('brakeUse').getValue(),
            'redLowerRange': form.findField('redLowerRangeBrake').getValue(),
            'redUpperRange': form.findField('redUpperRangeBrake').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeBrake').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeBrake').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeBrake').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeBrake').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, false, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Frenos',
                msg     : 'Error al intentar almacenar la Configuración de Frenos.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveGearForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveClutchConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'clutchUse': form.findField('gearUse').getValue(),
            'redLowerRange': form.findField('redLowerRangeGear').getValue(),
            'redUpperRange': form.findField('redUpperRangeGear').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeGear').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeGear').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeGear').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeGear').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, false, false, fcFleetAvailable, fcIdleSpeed, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Embrague',
                msg     : 'Error al intentar almacenar la Configuración de Embrague.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveFleetAvailableForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveAvailabilityConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'fleetOperationTime': parseFloat(form.findField('fleetOperationTime').getValue())*3600, //Seconds
            'redLowerRange': form.findField('redLowerRangeFleetAvailable').getValue(),
            'redUpperRange': form.findField('redUpperRangeFleetAvailable').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeFleetAvailable').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeFleetAvailable').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeFleetAvailable').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeFleetAvailable').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, false, false, false, fcIdleSpeed, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Embrague',
                msg     : 'Error al intentar almacenar la Configuración de Embrague.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveIdleSpeedForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveRalentiConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'maxRalentiTime': parseFloat(form.findField('maximumIdleTime').getValue())*60, //Seconds
            'redLowerRange': form.findField('redLowerRangeIdleSpeed').getValue(),
            'redUpperRange': form.findField('redUpperRangeIdleSpeed').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeIdleSpeed').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeIdleSpeed').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeIdleSpeed').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeIdleSpeed').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, false, false, false, false, fcSpeed);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Ralentí',
                msg     : 'Error al intentar almacenar la Configuración de Ralentí.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    saveSpeedForm : function(id, name, msgWait, form, fcFuel, fcRpm, fcBrake, fcGear, fcFleetAvailable, fcIdleSpeed, fcSpeed) {
        Ext.Ajax.request({
        url      : 'http://' + restService + '/rbGroupConfig/rbSaveVelocityConfig',
        type     : 'rest',
        dataType : 'json',
        method   : 'PUT',
        scope    : this,
        params   : Ext.JSON.encode({
            'idGroup': id,
            'redLowerRange': form.findField('redLowerRangeSpeed').getValue(),
            'redUpperRange': form.findField('redUpperRangeSpeed').getValue(),
            'yellowLowerRange': form.findField('yellowLowerRangeSpeed').getValue(),
            'yellowUpperRange': form.findField('yellowUpperRangeSpeed').getValue(),
            'greenLowerRange': form.findField('greenLowerRangeSpeed').getValue(),
            'greenUpperRange': form.findField('greenUpperRangeSpeed').getValue(),
            'whiteLowerRange': form.findField('whiteLowerRangeSpeed').getValue(),
            'whiteUpperRange': form.findField('whiteUpperRangeSpeed').getValue()
        }),
        success  : function(response){
            this.sendForms(id, name, false, false, false, false, false, false, false);
        },
        failure  : function(response) {
            msgWait.hide();
            Ext.MessageBox.show({
                title   : 'Almacenar Configuración de Velocidad',
                msg     : 'Error al intentar almacenar la Configuración de Velocidad.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }
        });
    }
    ,
    assignPlates : function(id, name, msgWait) {
        var plates = [];
        var storeAssignPlates = Ext.getCmp('gridAssignedPlates').store;

        storeAssignPlates.each(function(record) {
            plates.push({
                'plate' : record.data['plate'],
                'cp' : record.data['cp'],
                'idTypeVehicle' : 1,
                'idTypeFuel' : 2
            });
        });
        //NOTA: sustituír valores de grid idTypeVehicle y idTypeFuel
        //cuando estén incoporados en el servicio REST y se incorporen al modelo
        //console.log(plates);

        Ext.Ajax.request({
            url: 'http://' + restService + '/rbVehicleGroup/rbSavePlateByGroup',
            type: 'rest',
            dataType: 'json',
            method: 'PUT',
            scope: this,
            params: Ext.JSON.encode({
                'idGroup': id,
                'plates': plates
            }),
            success: function(response) {
                this.clearAll();
                msgWait.hide();
                Ext.MessageBox.show({
                    title   : 'Almacenar Configuración de Combustible',
                    msg     : 'Los Datos de la Configuración del Grupo "'+ name +'" han sido Guardados!',
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.INFO
                });
            },
            failure: function(response) {
                msgWait.hide();
                Ext.MessageBox.show({
                    title: 'Asignar Placas',
                    msg: 'No se realizó la asignación de placas al grupo',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    clearAll : function(){
        
        var form_config_fuel = Ext.getCmp('form_config_fuel').getForm();
        var form_config_rpm = Ext.getCmp('form_config_rpm').getForm();
        var form_config_brake = Ext.getCmp('form_config_brake').getForm();
        var form_config_gear = Ext.getCmp('form_config_gear').getForm();
        var form_config_fleet_available = Ext.getCmp('form_config_fleet_available').getForm();
        var form_config_idle_speed = Ext.getCmp('form_config_idle_speed').getForm();
        var form_config_speed = Ext.getCmp('form_config_speed').getForm();
            
        var tabPanel = Ext.getCmp('configVehicleGroupTabPanel').up().up().up().down('[name=config-vehicule]');
        Ext.getCmp('gridAssignedPlates').store.removeAll();
        Ext.getCmp('gridGroupVehicle').store.load();
        Ext.getCmp('gridGroupVehicle').getView().refresh();
        Ext.getCmp('gridAvailablePlates').store.load();
        Ext.getCmp('gridAvailablePlates').getView().refresh();
        form_config_fuel.reset();
        form_config_rpm.reset();
        form_config_brake.reset();
        form_config_gear.reset();
        form_config_fleet_available.reset();
        form_config_idle_speed.reset();
        form_config_speed.reset();
        Ext.getCmp('buttonTabFuel').toggle(true);
        tabPanel.getLayout().setActiveItem(0);
    }
});

