Ext.define('eborasvehicle.view.Module.Rpm', {
    extend: 'Ext.container.Container',
    xtype: 'app-rpm',
    layout: 'column',
    initComponent: function () {
        this.items = [{
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 25px 30px 5px 30px;',
                items: [
                    {
                        xtype: 'button',
                        cls: 'btn-title-window-spago-all',
                        id: 'btnRpmNormal',
                        html: 'RMP',
                        itemId: 'btnRpmNormal',
                        listeners: {
                            click: function (comb, records) {
                                document.getElementById('btnDetailRpm').style.display = 'block';
                                document.getElementById('btnRpmNormal').style.display = 'none';
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-rpm';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }, 100);
                            }
                        }
                },
                    {
                        xtype: 'button',
                        cls: 'btn-footer-window-spago',
                        id: 'btnDetailRpm',
                        html: 'Ver Detalle',
                        itemId: 'btnDetailRpm',
                        listeners: {
                            click: function (comb, records) {
                                document.getElementById('btnDetailRpm').style.display = 'none';
                                document.getElementById('btnRpmNormal').style.display = 'block';
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-rpm-torque';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }, 100);
                            }
                        }
                    },
                    {
                    xtype: 'container',
                    itemId: 'ctnInformMain5',
                    cls: 'ctn-principal-reports',
                    id: 'ctnInformMain5',

                    html: '<div  id="rpm"class="ctn-spago-driver-reports"></div>',

                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});