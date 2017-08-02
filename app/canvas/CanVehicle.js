Ext.define('eborasvehicle.canvas.CanVehicle', {
    alias: 'widget.canvehicle',
    createCanvas: function(ctx, name) {
        var gradient;

         // contorno/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(236.2, 212.3);
      ctx.lineTo(0.0, 212.3);
      ctx.lineTo(0.0, 0.0);
      ctx.lineTo(236.2, 0.0);
      ctx.lineTo(236.2, 212.3);
      ctx.closePath();
      ctx.restore();

      // vehiculo/Group
      ctx.save();

      // vehiculo/Group/Clipping Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(29.3, 48.1);
      ctx.lineTo(185.7, 48.1);
      ctx.lineTo(185.7, 164.0);
      ctx.lineTo(29.3, 164.0);
      ctx.lineTo(29.3, 48.1);
      ctx.closePath();
      ctx.clip();

      // vehiculo/Group/Path
      ctx.beginPath();
      ctx.moveTo(29.3, 50.8);
      ctx.bezierCurveTo(29.3, 48.8, 30.0, 48.1, 31.8, 48.1);
      ctx.lineTo(124.3, 48.1);
      ctx.bezierCurveTo(126.1, 48.1, 128.6, 48.8, 128.6, 50.8);
      ctx.lineTo(128.6, 122.8);
      ctx.bezierCurveTo(128.6, 124.8, 126.1, 127.1, 124.3, 127.1);
      ctx.lineTo(31.8, 127.1);
      ctx.bezierCurveTo(30.0, 127.1, 29.3, 124.8, 29.3, 122.8);
      ctx.lineTo(29.3, 50.8);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();

      // vehiculo/Group/Path
      ctx.beginPath();
      ctx.moveTo(133.6, 98.5);
      ctx.lineTo(184.8, 98.5);
      ctx.lineTo(185.7, 133.8);
      ctx.lineTo(133.6, 133.8);
      ctx.lineTo(133.6, 98.5);
      ctx.closePath();
      ctx.fill();

      // vehiculo/Group/Path
      ctx.beginPath();
      ctx.moveTo(30.2, 136.4);
      ctx.bezierCurveTo(30.2, 134.0, 32.1, 132.2, 34.4, 132.2);
      ctx.lineTo(185.6, 132.2);
      ctx.bezierCurveTo(185.6, 132.2, 185.5, 140.3, 185.6, 140.6);
      ctx.bezierCurveTo(185.7, 140.8, 34.4, 140.6, 34.4, 140.6);
      ctx.bezierCurveTo(32.1, 140.6, 30.2, 138.7, 30.2, 136.4);
      ctx.fill();

      // vehiculo/Group/Compound Path
      ctx.beginPath();

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(132.3, 149.0);
      ctx.bezierCurveTo(132.3, 140.7, 139.0, 133.9, 147.3, 133.9);
      ctx.bezierCurveTo(155.6, 133.9, 162.3, 140.7, 162.3, 149.0);
      ctx.bezierCurveTo(162.3, 157.3, 155.6, 164.0, 147.3, 164.0);
      ctx.bezierCurveTo(139.0, 164.0, 132.3, 157.3, 132.3, 149.0);

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(140.7, 149.0);
      ctx.bezierCurveTo(140.7, 152.6, 143.6, 155.6, 147.3, 155.6);
      ctx.bezierCurveTo(151.0, 155.6, 153.9, 152.6, 153.9, 149.0);
      ctx.bezierCurveTo(153.9, 145.3, 151.0, 142.3, 147.3, 142.3);
      ctx.bezierCurveTo(143.6, 142.3, 140.7, 145.3, 140.7, 149.0);
      ctx.fill();

      // vehiculo/Group/Compound Path
      ctx.beginPath();

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(45.0, 149.0);
      ctx.bezierCurveTo(45.0, 140.7, 51.7, 133.9, 60.0, 133.9);
      ctx.bezierCurveTo(68.3, 133.9, 75.1, 140.7, 75.1, 149.0);
      ctx.bezierCurveTo(75.1, 157.3, 68.3, 164.0, 60.0, 164.0);
      ctx.bezierCurveTo(51.7, 164.0, 45.0, 157.3, 45.0, 149.0);

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(53.4, 149.0);
      ctx.bezierCurveTo(53.4, 152.6, 56.4, 155.6, 60.0, 155.6);
      ctx.bezierCurveTo(63.7, 155.6, 66.7, 152.6, 66.7, 149.0);
      ctx.bezierCurveTo(66.7, 145.3, 63.7, 142.3, 60.0, 142.3);
      ctx.bezierCurveTo(56.4, 142.3, 53.4, 145.3, 53.4, 149.0);
      ctx.fill();

      // vehiculo/Group/Compound Path
      ctx.beginPath();

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(133.6, 99.4);
      ctx.lineTo(133.6, 64.0);
      ctx.bezierCurveTo(133.6, 61.7, 135.5, 59.8, 137.8, 59.8);
      ctx.lineTo(168.0, 59.8);
      ctx.bezierCurveTo(169.8, 59.8, 171.3, 61.0, 171.9, 62.6);
      ctx.lineTo(184.5, 97.9);
      ctx.bezierCurveTo(185.0, 99.2, 184.8, 100.7, 184.0, 101.8);
      ctx.bezierCurveTo(183.2, 102.9, 181.9, 103.6, 180.6, 103.6);
      ctx.lineTo(137.8, 103.6);
      ctx.bezierCurveTo(135.5, 103.6, 133.6, 101.7, 133.6, 99.4);

      // vehiculo/Group/Compound Path/Path
      ctx.moveTo(165.0, 68.2);
      ctx.lineTo(142.0, 68.2);
      ctx.lineTo(142.0, 95.2);
      ctx.lineTo(174.6, 95.2);
      ctx.lineTo(165.0, 68.2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.restore();
    }
});