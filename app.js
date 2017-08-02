//var setTimeout = require("sdk/timers");

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        "Extensible": "lib/extensible/src",
        "eborasvehicle": "app"
    }
});
Ext.application({
    name: 'eborasvehicle',
    masterCentroid: {maceArea: null, maceCentroid: null, maceZoom: null, fkMastId: null, pkMaceId: null},
    controllers: [
        'eborasvehicle.controller.Main',
        'eborasvehicle.controller.Dashboard.Dashboard',
        'eborasvehicle.controller.Vehicle.Vehicle',
        'eborasvehicle.controller.GroupVehicle.GroupVehicle',
        'eborasvehicle.controller.Driver.Driver',
        'eborasvehicle.controller.Account.Account'
    ],
    views: [],
    stores: [],
    config: {
        vehicleGroup: null,
        endDate: null,
        startDate: null
    },
    launch: function () {
        app = this;
        //Set label of Components Extjs to Spanish
        Ext.create('resources.label.LabelSpanish');
        Ext.create('eborasvehicle.view.ViewPort');

        Extensible.calendar.data.EventMappings = {
            EventId: {name: 'EventId', mapping: 'id', type: 'string'},
            CalendarId: {name: 'CalendarId', mapping: 'calendar_id', type: 'string'},
            Title: {name: 'Title', mapping: 'Title'},
            StartDate: {name: 'Start', mapping: 'dateStart', type: 'date', dateFormat: 'c'},
            EndDate: {name: 'End', mapping: 'dateEnd', type: 'date', dateFormat: 'c'},
            RRule: {name: 'RecurRule', mapping: 'recur_rule'},
            Location: {name: 'Location', mapping: 'location'},
            Notes: {name: 'Notes', mapping: 'Notes'},
            Url: {name: 'Url', mapping: 'url'},
            IsAllDay: {name: 'IsAllDay', mapping: 'all_day', type: 'boolean'},
            Reminder: {name: 'Reminder', mapping: 'reminder'}
        };
        Extensible.calendar.data.EventModel.reconfigure();

        Sbi.sdk.services.setBaseUrl({
            protocol: 'http',
            host: 'reports.invytec.com',
            port: '',
            contextPath: 'SpagoBI',
            controllerPath: 'servlet/AdapterHTTP'
        });
        var cb = function (result, args, success) {

            setTimeout(function () {
                var storeVehicle = Ext.getStore('storeComboVehicles');
                for (var contGroup = 0; contGroup < storeVehicle.data.items.length; contGroup++) {
                    if (storeVehicle.data.items[contGroup].data.csgrName === Ext.getCmp('vehicleGroup').getValue()) {
                        app.vehicleGroup = storeVehicle.data.items[contGroup].data.pkCsgrId;
                    }
                }
                app.endDate = Ext.util.Format.date(Ext.getCmp('endDate').getValue(), "Y-m-d");
                app.startDate = Ext.util.Format.date(Ext.getCmp('startDate').getValue(), "Y-m-d");
                app.execTest5();

                //                if (success === true) {
                //
                //                    app.execTest4();
                //                    
                //                    app.execTestRPM();
                //                    app.execTestRPMDetails();
                //                    app.execTestSpeed();
                //                    app.execTestSpeedDetails();
                //                    app.execTestVoltage();
                //                    app.execTestCurrent();
                //                    app.execTestFuelConsum();
                //                    app.execTestFuelEcono();
                //
                //                } else {
                //                    alert('ERROR: Wrong username or password');
                //                }
            }, 1000);
        };
        Sbi.sdk.api.authenticate({
            params: {
                user: 'biadmin',
                password: 'biadmin'
            },
            callback: {
                fn: cb,
                scope: this
                        //, args: {arg1: 'A', arg2: 'B', ...}
            }
        });
        app.execTest4 = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_odometer',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'departmentext',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });

        };
        app.execTest5 = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_horometer',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'horometro',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestRPM = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_RPM',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'rpm',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestRPMDetails = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_RPM_Torque',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'rpm',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestSpeed = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_Speed',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'velocity',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestSpeedDetails = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_Speed_AVG',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'velocity',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestVoltage = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_Voltage',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'batery',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestCurrent = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_Current',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'batery_Current',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestFuelConsum = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_fuel_consu',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'fuel',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestFuelEcono = function () {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_fuel_econo',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Initial_date=' + app.startDate + '&Final_date=' + app.endDate + '&Group_id=' + app.vehicleGroup + '&User_name=CInvytec&Vehicle_plate='},
                displayToolbar: false,
                displaySliders: false,
                target: 'fuel_econo',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestFuelHist = function (year, Group_id, plate) {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_fuel_hist',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Year=' + year + '&Group_id=' + Group_id + '&User_name=CInvytec&Vehicle_plate=' + plate},
                displayToolbar: false,
                displaySliders: false,
                target: 'fuel_hist',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestRaleHist = function (year, Group_id, plate) {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_rale_hist',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Year=' + year + '&Group_id=' + Group_id + '&User_name=CInvytec&Vehicle_plate=' + plate},
                displayToolbar: false,
                displaySliders: false,
                target: 'rale_hist',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.execTestDispHist = function (year, Group_id, plate) {
            Sbi.sdk.api.injectDocument({
                documentLabel: 'doc_comp_disp_hist',
                executionRole: '/spagobi/admin',
                parameters: {PARAMETERS: 'Year=' + year + '&Group_id=' + Group_id + '&User_name=CInvytec&Vehicle_plate=' + plate},
                displayToolbar: false,
                displaySliders: false,
                target: 'disp_hist',
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true
            });
        };
        app.getMonth = function (month) {
            if (month == 'Enero') {
                return "1";
            }
            if (month == 'Febrero') {
                return "2";
            }
            if (month == 'Marzo') {
                return "3";
            }
            if (month == 'Abril') {
                return "4";
            }
            if (month == 'Mayo') {
                return "5";
            }
            if (month == 'Junio') {
                return "6";
            }
            if (month == 'Julio') {
                return "7";
            }
            if (month == 'Agosto') {
                return "8";
            }
            if (month == 'Septiembre') {
                return "9";
            }
            if (month == 'Octubre') {
                return "10";
            }
            if (month == 'Noviembre') {
                return "11";
            }
            if (month == 'Diciembre') {
                return "12";
            } else
                return "1"

        }
    },
    setLoadingView: function (value) {
        if (value) {
            Ext.getCmp('load-indicator').show();
            Ext.getCmp('load-indicator').setZIndex(99999);
        } else {
            Ext.getCmp('load-indicator').hide();
        }
    }
});