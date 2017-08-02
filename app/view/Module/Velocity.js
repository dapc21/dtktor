/**
 * @class eborasvehicle.view.Module.Hourmeter
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Module.Velocity', {
    extend: 'Ext.container.Container',
    xtype: 'app-velocity',
    layout: 'column',
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 25px 30px 5px 30px;',
                items: [
                    {
                        xtype: 'button',
                        cls: 'btn-title-window-spago-all',
                        id: 'btnSpeedNormal',
                        html: 'Velocidad',
                        itemId: 'btnSpeedNormal',
                        listeners: {
                            click: function (comb, records) {
                                document.getElementById('btnDetailSpped').style.display = 'block';
                                document.getElementById('btnSpeedNormal').style.display = 'none';
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-velocity';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }, 100);
                            }
                        }
                },
                    {
                        xtype: 'button',
                        cls: 'btn-line-window-spago',
                        id: 'btnDetailSpped',
                        html: 'Ver Detalle',
                        itemId: 'btnDetailSpped',
                        listeners: {
                            click: function (comb, records) {
                                document.getElementById('btnDetailSpped').style.display = 'none';
                                document.getElementById('btnSpeedNormal').style.display = 'block';
                                eborasvehicle.view.Tools.GlobalFunction.actualVIewXtype = 'app-velocity-avg';
                                setTimeout(function () {
                                    eborasvehicle.view.Tools.GlobalFunction.filters();
                                }, 100);
                            }
                        }
                    },
                    {
                    xtype: 'container',
                    itemId: 'ctnInformMain3',
                    cls: 'ctn-principal-reports',
                    id: 'ctnInformMain3',

                    html: '<div  id="velocity"class="ctn-spago-driver-reports"></div>',

                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});