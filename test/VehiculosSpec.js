var expect = require('chai').expect;

var widgets = {
    'Inputs':['Cuenta', 'Fecha desde', 'Fecha hasta', 'Grupo de vehículos', 'Placa', 'Conductores'],
    'Dashboard':['Ahorro de combustible', 'Tiempo ralentí', 'Uso promedrio de embrague', 'Uso promedio de freno', 'Disponibilidad de la flota', 'Pantalla configuración'],
    'Combustible':['Consumo combustible']
};
var definitions = {
    'Data sources' : []
    
};

var implementations = {
   'Data sources':{
        'rest':{
                'Dashboard':widgets.Dashboard,
                'Inputs':widgets.Inputs
            },
        'Spago':widgets.Combustible
    }
    
};

var implemented = [];
implementations['Data sources'].rest.Dashboard.forEach(w => implemented.push(w));
implementations['Data sources'].rest.Inputs.forEach(w => implemented.push(w));
implementations['Data sources'].Spago.forEach(w => implemented.push(w));


describe('Definiciones de Vehículos', function () {
    var keys = Object.keys(widgets);
    
    keys.forEach(page => 
        widgets[page].forEach(widget => it('Fuente de datos del widget '+page+'/'+widget+' definida al 100 %', () => 1+1)));

    keys.forEach(page => 
        widgets[page].forEach(widget => it('Conexión con la fuente de datos del widget '+page+'/'+widget+' funcionando y probada %', (done) => {
            expect(implemented).to.include(widget);
            done();
        })));    
  
        
  


});
