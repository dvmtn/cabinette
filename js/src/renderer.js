(function(){
  window.cabinette.Renderer = function(){
    var font_size = 12;
    var spacing = 4;
    var paper, canvas_width, canvas_height;

    var init = function(){
      paper = Raphael("display", "100%", "100%");
      $(cabinette).on('render', render);
    };

    var calculate_canvas_dimensions = function(){
      canvas_width = paper.canvas.clientWidth;
      canvas_height = paper.canvas.clientHeight;
    };

    var draw_columns = function(nodes){
      var column_space = canvas_width / Object.keys(nodes).length;
      var x = 0;
      var y = spacing / 2;
      var column_width = column_space - spacing;
      var column_height = canvas_height - spacing;
      var column_centre_offset = column_width / 2;

      _.each(nodes, function(column, header){
        paper.rect(x, y, column_width, column_height, 10);
        paper.text(x+column_centre_offset, y + font_size, header);
        x += column_space;
      });
    };

    var render = function(event, options){
      calculate_canvas_dimensions();
      draw_columns(options.data);
      options.complete(options.data);
    };

    init();
  };
}());
