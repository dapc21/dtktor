/**
 * @class eborasbasic.view.Module.drivers
 * @extends Ext.container.Container
 * @author Adrián Rodríguez - Isilio vilchez
 */
Ext.define('eborasvehicle.view.Module.FailCode', {
    extend: 'Ext.container.Container',
    xtype: 'app-failcode',
    layout: 'column',
    initComponent: function() {

        var storeListDriver = Ext.create('Ext.data.Store', {
            storeId: 'simpsonsStore',
            fields: ['name', 'email', 'phone'],
            data: {
                'items': [
                    { 'name': 'Lisa', "email": "lisa@simpsons.com", "phone": "555-111-1224" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" },
                    { 'name': 'Bart', "email": "bart@simpsons.com", "phone": "555-222-1234" },
                    { 'name': 'Homer', "email": "home@simpsons.com", "phone": "555-222-1244" },
                    { 'name': 'Marge', "email": "marge@simpsons.com", "phone": "555-222-1254" }
                ]
            },
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });

        var backgroundColor = "background-color: gray !important;color: white !important;";

        this.items = [

            {
                columnWidth: 1,
                xtype: 'panel',
                layout: 'column',
                style: 'margin: 0px 30px 5px 30px;',
                items: [{
                    columnWidth: 1,
                    border: false,
                    style: 'margin: 5px 30px 5px 30px;',
                    items: [{
                            xtype: 'container',
                            cls: 'header-panel-gray-dark text-center',
                            items: [{
                                xtype: 'label',
                                text: 'Lista de Fallos',
                                style: 'background: none;'
                            }]
                        },
                        {
                            xtpye: 'panel',
                            layout: 'card',
                            name: 'driver-card',
                            cls: 'body-panel-gray-dark',
                            activeItem: 0,
                            items: [{
                                xtype: 'panel',
                                layout: { type: 'hbox', align: 'stretch' },
                                //height: 720,
                                // style: 'margin: 0px 0px 0px 0px;',
                                items: [{
                                    flex: 1,
                                    xtype: 'grid',
                                    id: 'gridaccount2',
                                    cls: 'account-search-grid',
                                    store: storeListDriver,
                                    style: 'border:1px solid gray',
                                    sortableColumns: true,
                                    columns: [
                                        { text: 'Placa', dataIndex: 'name', flex: 1, sortable: true },
                                        { text: 'Codigo de falla', dataIndex: 'email', flex: 1, hidden: false, sortable: true },
                                        { text: 'Fecha que se presento', dataIndex: 'phone', flex: 1, hidden: false, sortable: true }


                                    ],
                                    //height: 320,
                                    //width: '100%'

                                }]
                            }]
                        }


                    ]
                }]
            }

        ];
        this.callParent(arguments);
    }
});