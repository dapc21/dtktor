Ext.define('eborasvehicle.view.Tools.GlobalFunction', {
    singleton: true,
    require: ['Ext.Date'],
    config: {
        actualVIewXtype: null
    },
    filters: function() {
        var str = '';
        var target = '';
        var storeVehicle = Ext.getStore('storeComboVehicles');
        var Group_id = Ext.getCmp('vehicleGroup').getValue();
        for (var contGroup = 0; contGroup < storeVehicle.data.items.length; contGroup++) {
            if (storeVehicle.data.items[contGroup].data.csgrName === Ext.getCmp('vehicleGroup').getValue()) {
                Group_id = storeVehicle.data.items[contGroup].data.pkCsgrId;
            }
        }
        var ActualVIewXtype = eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype;
        var Vehicle_plate = Ext.getCmp('licensePlate').getValue();
        var dtinit = Ext.util.Format.date(Ext.getCmp('startDate').getValue(), "Y-m-d");
        var dtend = Ext.util.Format.date(Ext.getCmp('endDate').getValue(), "Y-m-d");
        var label = "";
        if (ActualVIewXtype !== null) {
            if (ActualVIewXtype === "app-hourmeter") {
                label = 'doc_comp_horometer';
                target = 'horometro';
            } else if (ActualVIewXtype === 'app-rpm') {
                label = 'doc_comp_RPM';
                target = 'rpm';
            } else if (ActualVIewXtype === 'app-rpm-torque') {
                label = 'doc_comp_RPM_Torque';
                target = 'rpm';
            } else if (ActualVIewXtype === 'app-velocity') {
                label = 'doc_comp_Speed';
                target = 'velocity';
            } else if (ActualVIewXtype === 'app-velocity-avg') {
                label = 'doc_comp_Speed_AVG';
                target = 'velocity';
            } else if (ActualVIewXtype === 'app-batery') {
                label = 'doc_comp_Voltage';
                target = 'batery';
            } else if (ActualVIewXtype === 'app-batery-current') {
                label = 'doc_comp_Current';
                target = 'batery_Current';
            } else if (ActualVIewXtype === 'app-fuel') {
                label = 'doc_comp_fuel_consu';
                target = 'fuel';
            } else if (ActualVIewXtype === 'app-fuel-econo') {
                label = 'doc_comp_fuel_econo';
                target = 'fuel_econo';
            } else {
                label = 'doc_comp_odometer';
                target = 'departmentext';
            }
            str += 'Initial_date=' + dtinit;
            str += '&Final_date=' + dtend;
            if (Group_id === null) {
                str += '&Group_id=1';
            } else {
                str += '&Group_id=' + Group_id;
            }
            str += '&User_name=CInvytec';

            if (Vehicle_plate !== null && Vehicle_plate !== 'Todas') {
                str += '&Vehicle_plate=' + Vehicle_plate;
            } else {
                str += '&Vehicle_plate=';
            }

            var param = { PARAMETERS: str };

            Sbi.sdk.api.injectDocument({
                documentLabel: label,
                executionRole: '/spagobi/admin',
                parameters: param,
                displayToolbar: false,
                displaySliders: false,
                target: target,
                iframe: {
                    style: 'border: 0px;display: block !important;width: 1800px;height: 900px; margin-top:20px;'
                },
                useExtUI: true

            });
        }
    },
    getData: function() {
        var today = Ext.Date.clearTime(new Date()),
            makeDate = function(d, h, m, s) {
                d = d * 86400;
                h = (h || 0) * 3600;
                m = (m || 0) * 60;
                s = (s || 0);
                var date = new Date('2017-05-01');

                return Ext.Date.add(today, Ext.Date.SECOND, d + h + m + s);
            };

        return {
            "evts": [{
                    "id": 1001,
                    //"cid": 1,
                    "driverName": "Vacation 2",
                    "dateStart": new Date('2017-05-01 04:00'),
                    "dateEnd": new Date('2017-05-01 06:00'),
                    "recur_rule": true,
                    "driverIdentification": "Have fun"
                },
                /*{
                    "id": 1001,
                    "cid": 3,
                    "start": Ext.Date.add(new Date('2017-05-01'), Ext.Date.DAY, 1),
                    "hourStart": "04:00",
                    "end": Ext.Date.add(new Date('2017-05-01'), Ext.Date.DAY, 1),
                    "hourEnd": "06:00",
                    "title": "Vacation 2",
                    "driverName": "William",
                    "driverIdentification": "59888888"
                },*/
                /*{
                    "id": 1002,
                    "cid": 2,
                    "title": "Lunch with Matt",
                    "start": makeDate(0, 11, 30),
                    "end": makeDate(0, 13),
                    "loc": "Chuy's!",
                    "url": "http : //chuys.com",
                    "notes": "Order the queso",
                    "rem": "15"
                },*/
                /*{
                                                  "id": 1003,
                                                  "cid": 3,
                                                  "title": "Project due",
                                                  "start": makeDate(0, 15),
                                                  "end": makeDate(0, 15)
                                              },  {
                                                  "id": 1005,
                                                  "cid": 2,
                                                  "title": "A long one...",
                                                  "start": makeDate(-12),
                                                  "end": makeDate(10, 0, 0, -1),
                                                  "ad": true
                                              }, {
                                                  "id": 1006,
                                                  "cid": 3,
                                                  "title": "School holiday",
                                                  "start": makeDate(5),
                                                  "end": makeDate(7, 0, 0, -1),
                                                  "ad": true,
                                                  "rem": "2880"
                                              }, {
                                                  "id": 1007,
                                                  "cid": 1,
                                                  "title": "Haircut",
                                                  "start": makeDate(0, 9),
                                                  "end": makeDate(0, 9, 30),
                                                  "notes": "Get cash on the way"
                                              }, {
                                                  "id": 1008,
                                                  "cid": 3,
                                                  "title": "An old event",
                                                  "start": makeDate(-30),
                                                  "end": makeDate(-28),
                                                  "ad": true
                                              }, {
                                                  "id": 1009,
                                                  "cid": 2,
                                                  "title": "Board meeting",
                                                  "start": makeDate(-2, 13),
                                                  "end": makeDate(-2, 18),
                                                  "loc": "ABC Inc.",
                                                  "rem": "60"
                                              }, {
                                                  "id": 1010,
                                                  "cid": 3,
                                                  "title": "Jenny's final exams",
                                                  "start": makeDate(-2),
                                                  "end": makeDate(3, 0, 0, -1),
                                                  "ad": true
                                              }, {
                                                  "id": 1011,
                                                  "cid": 1,
                                                  "title": "Movie night",
                                                  "start": makeDate(2, 19),
                                                  "end": makeDate(2, 23),
                                                  "notes": "Don't forget the tickets!",
                                                  "rem": "60"
                                              }, {
                                                  "id": 1012,
                                                  "cid": 4,
                                                  "title": "Gina's basketball tournament",
                                                  "start": makeDate(8, 8),
                                                  "end": makeDate(10, 17)
                                              }, {
                                                  "id": 1013,
                                                  "cid": 4,
                                                  "title": "Toby's soccer game",
                                                  "start": makeDate(5, 10),
                                                  "end": makeDate(5, 12)
                                              }*/
            ]
        };
    },
    showFilter: function(bool) {
        var filter = Ext.ComponentQuery.query('[name=filter-view]')[0];
        if (bool) {
            filter.show();

        } else {

            filter.hide();
        }
    },
    showFilterDashboard: function(value) {
        var filterDashboard = Ext.getCmp('filterDashboard');
        if (value) {
            filterDashboard.show();
        } else {
            filterDashboard.hide();
        }
    }


});