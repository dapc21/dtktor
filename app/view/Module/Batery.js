Ext.define('eborasvehicle.view.Module.Batery', {
    extend: 'Ext.container.Container',
    xtype: 'app-batery',
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
                        id: 'btnAverageCurrent',
                        html: 'Promedio Voltaje',
                        itemId: 'btnAverageCurrent',
                        listeners: {
                            click: function (comb, records) {
                                app.execTestVoltage();
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-batery';
                                document.getElementById('batery').style.display = 'none';
                                document.getElementById('batery_Current').style.display = 'none';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                    document.getElementById('btnAverageCurrent').style.background = '#F5F5F5';
                                    document.getElementById('btnAverageVoltage').style.background = '#E0E0E0';
                                    document.getElementById('batery').style.display = 'block';
                                    document.getElementById('batery_Current').style.display = 'none';
                                }, 100);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        cls: 'btn-title-window-spago-two',
                        html: 'Promedio Corriente',
                        id: 'btnAverageVoltage',
                        itemId: 'btnAverageVoltage',
                        listeners: {
                            click: function (comb, records) {
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-batery-current';
                                app.execTestCurrent();
                                document.getElementById('batery').style.display = 'none';
                                document.getElementById('batery_Current').style.display = 'none';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                    document.getElementById('btnAverageCurrent').style.background = '#E0E0E0';
                                    document.getElementById('btnAverageVoltage').style.background = '#F5F5F5';
                                    document.getElementById('batery').style.display = 'none';
                                    document.getElementById('batery_Current').style.display = 'block';
                                }, 100);
                            }
                        }
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctnInformMain4',
                        cls: 'ctn-principal-reports',
                        id: 'ctnInformMain4',
                        html: '<div id="batery" class="ctn-spago-driver-reports" style="display:block"></div><div id="batery_Current" class="ctn-spago-driver-reports" style="display:none"></div>'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
