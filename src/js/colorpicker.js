$(document).ready( function() {
      $("#background-color").minicolors({
          control: $(this).attr('data-control') || 'hue',
          defaultValue: $(this).attr('data-defaultValue') || '',
          inline: $(this).attr('data-inline') === 'true',
          letterCase: $(this).attr('data-letterCase') || 'lowercase',
          opacity: $(this).attr('data-opacity'),
          position: $(this).attr('data-position') || 'bottom left',
          change: function(hex, opacity) {
            canvas.setBackgroundColor(hex);
              var log;
              try {
                  log = hex ? hex : 'transparent';
                  if( opacity ) log += ', ' + opacity;
                  console.log(log);
              } catch(e) {}
          },
          theme: 'default'
      });
});
