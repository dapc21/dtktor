Ext.define('eborasvehicle.canvas.CanPieChartTimes', {
    alias: 'widget.canpiecharttimes',
    config: {
        varNoReportTx: null,
        varSatelliteTx: null,
        varCellTx: null,
        varAccumulatedTx: null
    },
    init: function() {

    },

    inicio: function(noReport, satelital, cell, accumulated) {
        if (typeof noReport !== 'undefined' && noReport !== undefined) {
            var data = [noReport, satelital, cell, accumulated]; // If you add more data values make sure you add more colors
            var myTotal = 0; // Automatically calculated so don't touch
            var color = true;
            for (var numCategory = 0; numCategory < data.length; numCategory++) {
                myTotal += data[numCategory];
                if (data[numCategory] !== 0 && color === true) {
                    if (numCategory === 0) {
                        color = false;
                        document.getElementById("back-top").style.background = "#404041";
                        document.getElementById("back-bottom").style.background = "#404041";

                        // Create the click event by category.
                        var divNoReportCategory = document.getElementById("back-top");
                        var divNoReportCategoryBottom = document.getElementById("back-bottom");
                        divNoReportCategory.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('NOT_REPORT');
                            //alert('Categoria Gris No reporte');
                        };
                        divNoReportCategoryBottom.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('NOT_REPORT');
                            //alert('Categoria Gris No reporte1');
                        };
                        // End Create the click event by category.
                    }
                    else if (numCategory === 1) {
                        color = false;
                        document.getElementById("back-top").style.background = "#f05a28";
                        document.getElementById("back-bottom").style.background = "#f05a28";

                        // Create the click event by category.
                        var divSatelliteCategory = document.getElementById("back-top");
                        var divSatelliteCategoryBottom = document.getElementById("back-bottom");
                        divSatelliteCategory.onclick = function() {
                            //alert('Categoria Naranja Satelital');
                            ctrlInformTimes.loadDetailByCategory('SATELLITE');
                        };
                        divSatelliteCategoryBottom.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('SATELLITE');
                            //alert('Categoria Naranja Satelital');
                        };
                        // End Create the click event by category.
                    } else if (numCategory === 2) {
                        color = false;
                        document.getElementById("back-top").style.background = "#129bcb";
                        document.getElementById("back-bottom").style.background = "#129bcb";

                        // Create the click event by category.
                        var divCellCategory = document.getElementById("back-top");
                        var divCellCategoryBottom = document.getElementById("back-bottom");
                        divCellCategory.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('CELLULAR');
                        };
                        divCellCategoryBottom.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('CELLULAR');
                        };
                        // End Create the click event by category.

                    } else if (numCategory === 3) {
                        color = false;
                        document.getElementById("back-top").style.background = "#2e2f89";
                        document.getElementById("back-bottom").style.background = "#2e2f89";

                        // Create the click event by category.
                        var divAccumulatedCategory = document.getElementById("back-top");
                        var divAccumulatedCategoryBottom = document.getElementById("back-bottom");
                        divAccumulatedCategory.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('ACCUMULATED');
                        }
                        divAccumulatedCategoryBottom.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('ACCUMULATED');
                        }
                        // End Create the click event by category.
                    }
                }
            }
            for (var i = 1; i <= 6; i++) {
                document.getElementById("pai-" + i).style.transform = "rotate(0deg)";
                document.getElementById("pai-" + i).style.background = "";
                document.getElementById("pai-" + i).style.display = "none";
            }

            var contId = 0;
            var gradTop = 0;
            var gradBottom = 0;
            var input = true;
            for (var i = 0; i < data.length; i++) {
                if (input) {
                    if (data[i] !== 0) {
//                        document.getElementById("back-top").style.background = "#404041";
//                        document.getElementById("back-bottom").style.background = "#404041";
                        input = false;
                    }
                } else {
                    if (myTotal !== null) {
                        var percent = data[i] * 100 / myTotal;
                        gradTop = (percent * 3.60) + gradTop;
                    }
                    if (gradTop <= 180) {
                        var gradEnd = 180 - gradTop;
                    } else {
                        if (contId < 4) {
                            contId = 4;
                            gradEnd = 0;
                        }
                        var percent = data[i] * 100 / myTotal;
                        gradBottom = (percent * 3.60);
                        gradEnd = gradBottom + gradEnd;
                    }

                    if (i === 1) {
                        document.getElementById("pai-" + contId).style.background = "#f05a28";
                        document.getElementById("pai-" + contId).style.display = "block";
                        // Create the click event by category.
                        var divSatelliteCategoryPai = document.getElementById("pai-" + contId);
                        divSatelliteCategoryPai.onclick = function() {
                            //alert('categoria Nar Satelital');
                            ctrlInformTimes.loadDetailByCategory('SATELLITE');
                        };
                    }

                    if (i === 2) {
                        document.getElementById("pai-" + contId).style.background = "#129bcb";
                        document.getElementById("pai-" + contId).style.display = "block";

                        // Create the click event by category.
                        var divCellCategory0 = document.getElementById("pai-" + contId);
                        divCellCategory0.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('CELLULAR');
                        };
                    }

                    if (i === 3) {
                        document.getElementById("pai-" + contId).style.background = "#2e2f89";
                        document.getElementById("pai-" + contId).style.display = "block";

                        // Create the click event by category.
                        var divAccumulatedCategory0 = document.getElementById("pai-" + contId);
                        divAccumulatedCategory0.onclick = function() {
                            ctrlInformTimes.loadDetailByCategory('ACCUMULATED');
                        };
                    }
                    document.getElementById("pai-" + contId).style.transform = "rotate(" + gradEnd + "deg)";
                }
                contId++;
            }
        }
    }
});