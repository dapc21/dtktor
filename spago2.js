/* global Sbi */

Sbi.sdk.services.setBaseUrl({
    protocol: 'http'     
    , host: spagoService
    , port: '80'
    , contextPath: 'SpagoBI'
    , controllerPath: 'servlet/AdapterHTTP'  
});

Sbi.sdk.api.authenticate({ 
    params: {
            user: 'biadmin'
            , password: 'biadmin'
    }
    , callback: {
            fn: function() {
                Sbi.sdk.api.injectDocument({
                    documentLabel: 'doc_comp_horometer'
                    , executionRole: '/spagobi/admin'
                    //, parameters: {PARAMETERS: 'date_start=2016-09-01&date_end=2016-09-07&source=1&user_eboras=invytec'}
                    , parameters: {PARAMETERS: ''}
                    , displayToolbar: false
                    , displaySliders: false
                    , target: 'departmentext'
                    , iframe: {
                            style: 'border: 0px;'
                    }
                    , useExtUI: true
                });
            }
            , scope: this
    }
});
