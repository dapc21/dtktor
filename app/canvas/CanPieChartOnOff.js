Ext.define('eborasvehicle.canvas.CanPieChartOnOff', {
    alias: 'widget.canpiechartonoff',
    config: {
        ctx: null
    },
    init: function() {
        //cnvDonut=this;  
    },
    inicio: function(canvas, ctx, timeOn, timeOff, timeRalenti)
    {
        var lastend = 0;
        var data = [timeOn, timeOff, timeRalenti]; // If you add more data values make sure you add more colors
        var myTotal = 0; // Automatically calculated so don't touch
        var myColor = ['#2cb34a', '#58585b', '#ef4036']; // Colors of each slice

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