/**
 * @class eborasvehicle.view.Configuration.NewGroupVehicle
 * @extends Ext.menu.Menu
 * @author Adrian Rodriguez
 */
Ext.define('eborasvehicle.view.Configuration.NewGroupVehicle', {
    extend: 'Ext.menu.Menu',
    xtype: 'app-configuration-newgroupvehicle',
    id: 'windowNewGroupVehicle',
    width: 380,
    height: 40,
    plain: true,
    bodyStyle: 'background-color:gray !important;',
    items: [{
        xtype: 'container',
        cls: 'ctn-buttons-window-configuration',
        canActivate: false,
        items: [{
            xtype: 'form',
            id: 'form_group_vehicle',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    name: 'nameGroup',
                    style: 'margin-top: 12px;',
                    cls: 'vehicule-dropdown',
                    maxLength: 50,
                    minLength: 3,
                    maxLengthText: 'La longitud máxima para este campo es {0}',
                    minLengthText: 'La longitud mínima para este campo es {0}',
                    allowBlank: false,
                    maskRe: /([a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9\&\s\.\,\_]+)$/,
                    regex: /^[a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9]+(([\&\.\,\_][a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9\s])?[a-zA-ZáéíñóúüÁÉÍÑÓÚÜ0-9\s]*)*$/,
                    enableKeyEvents: true,
                    listeners: {
                        keydown: function (field, e) {
                            var input, selStart, selEnd, value;
                            if (e.getCharCode() === e.SPACE) {
                                input = field.getEl().query('input')[0];
                                selStart = input.selectionStart;
                                selEnd = input.selectionEnd;
                                value = field.getValue();
                                value = value.substring(0, selStart) + ' ' + value.substring(selEnd, value.length);
                                field.setValue(value);
                                input.selectionStart = selStart + 1;
                                input.selectionEnd = selStart + 1;
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    cls: 'icon-check btn-ok-window-configuration-group',
                    style: 'margin-left:90px',
                    action: 'vehicleGroupSaveButton',
                    id: 'vehicleGroupSaveButton',
                    itemId: 'vehicleGroupSaveButton'
                }, {
                    xtype: 'button',
                    cls: 'icon-cancel btn-cancel-window-configuration-group',
                    id: 'vehicleGroupCancelButton',
                    itemId: 'vehicleGroupCancelButton'
                }
            ]
        }]
    }]
});