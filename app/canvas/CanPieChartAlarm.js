Ext.define('eborasvehicle.canvas.CanPieChartAlarm', {
    alias: 'widget.canpiechartalarm',
    config: {
        ctx: null
    },
    init: function() {
        //cnvDonut=this;  
    },
    inicio: function(canvas, ctx, high, medium, low)
    {
        console.log('hola');
        
        var lastend = 0;
        var data = [high, medium,low]; // If you add more data values make sure you add more colors
        var myTotal = 0; // Automatically calculated so don't touch
        var myColor = ['#ed1c24', '#e95824', '#e9b020']; // Colors of each slice

        for (var e = 0; e < data.length; e++) {
            myTotal += data[e];
        }

        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = myColor[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (data[i] / myTotal);
        }
        console.log(ctx)
    }

});