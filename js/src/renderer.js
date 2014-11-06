(function(){
  window.cabinette.Renderer = function(){
    var display;

    var init = function(){
      display = $('#display');
      $(cabinette).on('render', render);
    };

    var name_to_id = function(name){
        return name
          .toLowerCase()
          .trim()
          .replace(/ /g, '_')
          .replace(/&/g, 'and');
    };

    var create_columns = function(columns){
      _.each(columns, function(column, heading){
        var col_id = name_to_id(heading);
        column.div = $('<div class="column" id="'+col_id+'"></div>');
        column.div.append('<h1>'+heading+'</h1>');
        _.each(column, function(cell){
          var cell_id = name_to_id(cell.name);
          cell.div = $('<div class="cell", id="'+cell_id+'">' + cell.name +'</div>');
          column.div.append(cell.div);
        });
        $(display).append(column.div);
      });
    };

    var create_links = function(links){
      var paper = Raphael('links', display.width(), display.height());
      _.each(links.investment, function(link){
        var from = $('#'+name_to_id(link.from));
        var to = $('#'+name_to_id(link.to));
        if(from && to){
          var start_x = 12 + from.position().left + from.width();
          var start_y = from.position().top + (from.height()/2);
          var end_x = 12 + to.position().left;
          var end_y = to.position().top + (to.height()/2);
          paper.path([
            'M', start_x, start_y,
            'L', end_x, end_y
          ]).attr({
            'stroke-width': 2,
            'stroke': '#6593C5',
            'arrow-end': 'block-midium-midium',
            'arrow-start': 'oval-narrow-short'
          });
        }
      });
    };

    var render = function(event, options){
      create_columns(options.nodes);
      create_links(options.links);

      options.complete(options.nodes, options.links);
    };

    init();
  };
}());
