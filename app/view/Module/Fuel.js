/**
 * @class eborasvehicle.view.Module.Hourmeter
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Module.Fuel', {
    extend: 'Ext.container.Container',
    xtype: 'app-fuel',
    layout: 'column',
    initComponent: function () {

        this.items = [{
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 25px 30px 5px 30px;',
                items: [
                    {
                        xtype: 'button',
                        cls: 'btn-title-window-spago',
                        id: 'btnSpendGas',
                        html: 'Consumo de Combustible',
                        itemId: 'btnSpendGas',
                        listeners: {
                            click: function (comb, records) {
                                app.execTestFuelConsum();
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype='app-fuel';
                                document.getElementById('fuel').style.display = 'none';
                                document.getElementById('fuel_econo').style.display = 'none';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                    document.getElementById('btnSpendGas').style.background = '#F5F5F5';
                                    document.getElementById('btnSaveGas').style.background = '#E0E0E0';
                                    document.getElementById('fuel').style.display = 'block';
                                    document.getElementById('fuel_econo').style.display = 'none';
                                }, 100);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        cls: 'btn-title-window-spago-two',
                        html: 'Ahorro y Eficiencia',
                        id: 'btnSaveGas',
                        itemId: 'btnSaveGas',
                        listeners: {
                            click: function (comb, records) {
                                app.execTestFuelEcono();
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype='app-fuel-econo';
                                document.getElementById('fuel').style.display = 'none';
                                document.getElementById('fuel_econo').style.display = 'none';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                    document.getElementById('btnSpendGas').style.background = '#E0E0E0';
                                    document.getElementById('btnSaveGas').style.background = '#F5F5F5';
                                    document.getElementById('fuel').style.display = 'none';
                                    document.getElementById('fuel_econo').style.display = 'block';
                                }, 100);
                            }
                        }
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctnInformMainFeul',
                        cls: 'ctn-principal-reports',
                        id: 'ctnInformMainFuel',
                        html: '<div id="fuel" class="ctn-spago-driver-reports" style="display:block"></div><div id="fuel_econo" class="ctn-spago-driver-reports" style="display:none"></div>',
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
