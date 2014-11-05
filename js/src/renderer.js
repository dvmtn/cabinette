(function(){
  window.cabinette.Renderer = function(){
    var font_size = 12;
    var spacing = 4;
    var columns = {};
    var paper, canvas_width, canvas_height;

    var init = function(){
      paper = Raphael("display", "100%", "100%");
      $(cabinette).on('render', render);
    };

    var calculate_canvas_dimensions = function(){
      canvas_width = paper.canvas.clientWidth;
      canvas_height = paper.canvas.clientHeight;
    };

    var calculate_column_coords = function(node_groups){
      columns.space = canvas_width / Object.keys(node_groups).length;
      columns.coords = [];
      var height = canvas_height - spacing;
      var width = columns.space - spacing;
      var x = 0;
      _.each(node_groups, function(node_group, header){
        centre = x + (width/2);
        columns.coords.push(
          {
            x: x,
            centre: centre,
            height: height,
            width: width,
            heading: { x: centre, y: spacing + font_size},
            node: {
              x: x + spacing/2,
              centre: centre,
              width: width - spacing,
              height: width /2
            }
          }
        );
        x += columns.space;
      });
    };

    var draw_column_contents = function(node_group, column){
      var y = 2 * font_size + spacing;
      _.each(node_group, function(node){
        paper.rect(column.node.x, y, column.node.width, column.node.height, 5);
        paper.text(column.centre, y+ font_size, node.name);
        y += column.node.height + spacing;
      });
    };

    var draw_columns = function(node_groups){
      var y = spacing / 2;
      var c_index = 0;

      _.each(node_groups, function(node_group, header){
        var col = columns.coords[c_index];
        paper.rect(col.x, y, col.width, col.height, 5);
        paper.text(col.heading.x, col.heading.y, header);
        draw_column_contents(node_group, col);
        c_index++;
      });
    };

    var render = function(event, options){
      calculate_canvas_dimensions();
      calculate_column_coords(options.data);
      draw_columns(options.data);
      options.complete(options.data);
    };

    init();
  };
}());
