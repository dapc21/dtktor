Ext.define('eborasvehicle.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'eborasvehicle.view.Main.ViewMain'
    ],
    refs: [
//        {
//            ref: 'viewconfigsubbuttonscp',
//            selector: 'viewconfigsubbuttonscp'
//        }
    ],
    config: {
        varCrdoMain: null,
        ctrlMainMap: null,
        ctrlMapSecundary: null,
        prfJson: null,
        profile: null
    },
    load: function() {
        try {
            Main = this;
        } catch (error) {
            console.log("error init Controller Main" + error);
        }
    },
    init: function() {
        console.log('Controller Main Loaded');
//        Ext.create('eborasvehicle.store.map.StoreTbEbrsListAlarm');
//        Ext.create('eborasvehicle.store.manageAlarm.StoreVwEbrsListPlate');
//        Ext.create('eborasvehicle.store.manageAlarm.StoreTbEbrsListManageAlarm');
//        Ext.create('eborasvehicle.store.manageAlarm.StoreTbEbrsTypeEvent');
//        Ext.create('eborasvehicle.store.informs.StoreTbEbrsInformOnOff');
        this.control({
            "viewmain button[itemId=btnLogout]": {
                click: this.Logout
            },

        });
    },
    dashboardView:function(){
        debugger;
    },
    loadMain: function() {
        Main = this;
    }
});