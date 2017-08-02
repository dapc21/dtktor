Ext.define('eborasvehicle.view.Configuration.Calendar', {
    extend: 'Ext.container.Container',
    alias: 'widget.calendar',
    xtype: 'app-configuration-calendar',
    //itemId: 'viewinformpause', 
    //renderTo:'calendarid',
    requires: [
        'Extensible.calendar.data.MemoryEventStore',
        'Extensible.calendar.CalendarPanel'

    ],
    initComponent: function() {
        debugger;
        viewinformonoff = this;
        var calendarStore = new Extensible.calendar.data.CalendarModel({ CalendarId: 5, Title: 'My Holidays', Description: 'My personal holiday schedule', ColorId: 3 });
        var eventStore = new Extensible.calendar.data.EventModel({ StartDate: '2101-01-12 12:00:00', EndDate: '2101-01-12 13:30:00', Title: 'My cool event', Notes: 'Some notes' });
        /* viewinformonoff.calendarStore = Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
             data: Ext.create('eborasvehicle.store.data.Calendars')
         });
         viewinformonoff.eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
             data: Ext.create('Extensible.calendar.data.EventModel',{
                         StartDate: '2017-01-12 12:00:00',
                         EndDate: '2017-01-30 13:30:00',
                         Title: 'My cool event',
                         Notes: 'Some notes'
                     }),
             autoMsg: false
         });*/
        this.items = [{
            xtype: 'extensible.calendarpanel',
            //itemId: 'pnlCalendarPausa',
            width: 509,
            height: 187,

            eventStore: this.eventStore,
            calendarStore: this.calendarStore,
            border: false,
            // id: 'app-calendar',
            region: 'center',
            activeItem: 3,
            monthViewCfg: {
                showHeader: false,
                showWeekLinks: false,
                showWeekNumbers: false
            },
            showDayView: false,
            showMultiDayView: false,
            showWeekView: false,
            showMultiWeekView: false,
            showMonthView: true,
            showNavBar: false,
            showTodayText: false,
            showTime: false,
            editModal: false,
            eventupdate: false,
            enableEditDetails: false,
            /*listeners: {
                'dayclick': {
                    fn: function(vw, dt, ad, el) {
                        app.setLoadingView(true);
                        alert("Reporte en Construcción");
                        //ctrlInformAlarm.onClickDetailCalendar(-1, dt, ad, el);
                    },
                    scope: this
                },
                'eventclick': {
                    fn: function(vw, dt, ad, el) {
                        app.setLoadingView(true);
                        var cid = dt.raw.cid;
                        dt = dt.data.EndDate;
                        alert("Reporte en Construcción");
                        //ctrlInformAlarm.onClickDetailCalendar(cid, dt, ad, el);
                    },
                    scope: this
                }
            }*/

        }];

        this.callParent(arguments);
    }
});