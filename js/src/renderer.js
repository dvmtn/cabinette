(function(){
  window.cabinette.Renderer = function(){
    var font_size = 12;
    var spacing = 4;
    var paper, canvas_width, canvas_height, column_width;

    var init = function(){
      paper = Raphael("display", "100%", "100%");
      $(cabinette).on('render', render);
    };

    var calculate_canvas_dimensions = function(){
      canvas_width = paper.canvas.clientWidth;
      canvas_height = paper.canvas.clientHeight;
    };

    var draw_column_contents = function(column){
      var y = 2 * font_size + spacing;
      var node_height = column_width / 2;
      _.each(column.nodes, function(node){
        paper.rect(column.x + spacing/2, y, column_width - spacing, node_height, 5);
        paper.text(column.centre, y+ font_size, node.name);
        y += node_height + spacing;
      });
    };

    var draw_columns = function(node_groups){
      var column_space = canvas_width / Object.keys(node_groups).length;
      var x = 0;
      var y = spacing / 2;
      var column_height = canvas_height - spacing;
      column_width = column_space - spacing;
      var column_centre_offset = column_width / 2;

      _.each(node_groups, function(node_group, header){
        var column_centre = x + column_centre_offset;
        paper.rect(x, y, column_width, column_height, 10);
        paper.text(x + column_centre_offset, y + font_size, header);

        draw_column_contents({nodes: node_group, x: x, centre: column_centre});

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
