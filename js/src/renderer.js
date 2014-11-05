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
      var column_space = canvas_width / nodes.length;
      var x = 0;
      var y = spacing / 2;
      var column_width = column_space - spacing;
      var column_height = canvas_height - spacing;

      _.each(nodes, function(node){
        paper.rect(x, y, column_width, column_height, 10);
        x += column_space;
      });
    };

    var render = function(event, options){
      calculate_canvas_dimensions();
      data = Object.keys(options.data);
      draw_columns(data);
      options.complete(options.data);
    };

    init();
  };
}());
