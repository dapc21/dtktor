Ext.define('resources.label.LabelSpanish', {
 
    constructor: function() {
        Ext.window.MessageBox.prototype.buttonText.yes = "Si";
        Ext.window.MessageBox.prototype.buttonText.no = "No";
        Ext.window.MessageBox.prototype.buttonText.cancel = "Cancelar";
        Ext.window.MessageBox.prototype.buttonText.ok = "Aceptar";
        Ext.window.MessageBox.prototype.titleText.confirm = "Confirmar";
        Ext.window.MessageBox.prototype.titleText.wait = "Cargando...";
        Ext.window.MessageBox.prototype.titleText.alert = "Atencion";
        Ext.picker.Date.prototype.todayText = "Hoy";
        Ext.picker.Date.prototype.dayNames = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
        Ext.picker.Date.prototype.monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        Ext.picker.Date.prototype.monthNumbers = {Enero:0,Ene:0,Febrero:1,Feb:1,Marzo:2,Mar:2,Abril:3,Abr:3,Mayo:4,May:4,Junio:5,Jun:5,Julio:6,Jul:6,Agosto:7,Ago:7,Septiembre:8,Sep:8,Octubre:9,Oct:9,Noviembre:10,Nov:10,Diciembre:11,Dic:11}
        Ext.picker.Date.prototype.nextText = "Siguiente Mes ((Control+Derecha))";
        Ext.picker.Date.prototype.prevText = "Mes Anterior (Control+Izquierda)";
        Ext.picker.Date.prototype.monthYearText = "Escoja un Mes (Control+Arriba/Abajo para mover los años)";
        Ext.picker.Date.prototype.minText =  "Esta fecha es anterior a la fecha mínima";
        Ext.picker.Date.prototype.maxText =  "Esta fecha es posterior a la fecha máxima";
        Ext.picker.Date.prototype.invalidText = "{0} fecha no válida - debe estar en formato Y-m-d";
        Ext.Date.monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
        Ext.Date.dayNames = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
        Ext.Date.monthNumbers = {Enero:0,Ene:0,Febrero:1,Feb:1,Marzo:2,Mar:2,Abril:3,Abr:3,Mayo:4,May:4,Junio:5,Jun:5,Julio:6,Jul:6,Agosto:7,Ago:7,Septiembre:8,Sep:8,Octubre:9,Oct:9,Noviembre:10,Nov:10,Diciembre:11,Dic:11}
        Ext.Date.minText ="Esta fecha es anterior a la fecha mínima";
        Ext.Date.maxText = "Esta fecha es posterior a la fecha máxima";
        Ext.Date.invalidText = "{0} fecha no válida - debe estar en formato Y-m-d"; 
        Ext.picker.Date.prototype.todayTip = "{0} (Espaciadora)";
        Ext.Date.todayTip = "{0} (Espaciadora)";
        Ext.grid.RowEditor.prototype.saveBtnText = "Actualizar";
        Ext.grid.RowEditor.prototype.cancelBtnText = "Cancelar";
        Ext.grid.RowEditor.prototype.errorsText = "Error";
        Ext.grid.RowEditor.prototype.dirtyText = "Es necesario guardar los cambios o cancelar la edicion";
        Ext.view.AbstractView.prototype.loadingText = "Cargando..."
        Ext.form.DateField.prototype.invalidText = "{0} No es una fecha válida, debe tener formato yyyy-mm-dd";
        return this;
    }
})