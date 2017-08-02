/**
 * @class eborasvehicle.view.Module.Hourmeter
 * @extends Ext.container.Container
 * @author Daniel Peña - Adrián Rodríguez
 */
Ext.define('eborasvehicle.view.Module.Hourmeter', {
    extend: 'Ext.container.Container',
    xtype: 'app-hourmeter',
    layout: 'column',
    initComponent: function() {



        this.items = [{
                //columnWidth: .78,
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 25px 30px 5px 30px;',
                style: {
                    width: '100%'
                },
                items: [{
                    xtype: 'container',
                    itemId: 'ctnInformMain2',
                    cls: 'ctn-principal-reports',
                    id: 'ctnInformMain2',

                    html: '<div  id="horometro"class="ctn-spago-driver-reports"></div>',

                }]
            },
            /*{
                columnWidth: .22,
                xtype: 'panel',
                height: 650,
                style: 'margin: 25px 30px 5px 30px;',
                items: [{
                        xtype: 'container',
                        cls: 'header-panel-gray-dark text-center',
                        items: [{
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        xtype: 'label',
                                        text: 'Vehículos',
                                        style: 'background: none;font-size: 16px;    font-weight: bold;'
                                    },
                                    {
                                        flex: 0.3,
                                        html: '<div class="x-container icon-lupa left x-container-default" style="width:25px;height:25px;font-size:22px;" id="container-1199"><span id="container-1199-outerCt" style="display: table; width: 100%; table-layout: fixed;"><div id="container-1199-innerCt" style="display:table-cell;height:100%;vertical-align:top;" class=""></div></span></div>'
                                    }
                                ]
                            }

                        ]
                    },
                    /*{
                        border: false,
                        style: 'margin: 5px 5px 5px 5px;',
                        items: [{
                            xtype: 'grid',
                            height: 550,
                            store: storeConduct,
                            header: false,
                            hideHeaders: true,
                            cls: 'conductores-grid',
                            scroll: 'vertical',
                            columns: [{
                                    text: 'Name',
                                    dataIndex: 'name',
                                    flex: 1,
                                    renderer: function(value, p, r) {
                                        return '<di><span>' + r.data['email'] + '</span><br><span>' + r.data['phone'] + '</span><br><span>' + value + '</span></div>';
                                    }
                                }

                            ]
                        }]
                    },
                    {
                        xtype: 'panel',
                        height: 30,
                        cls: 'header-panel-black-dark text-center',

                        html: '<div style="color:white">T. Horómetro: <span style="font-size:16px"><strong>12:35:48</strong> </span></div>'
                    }
        ]
    }*/
        ];
        this.callParent(arguments);
    }
});