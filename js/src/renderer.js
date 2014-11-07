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
          cell.div = $('<div class="cell" id="'+cell_id+'">' + cell.name +'</div>');
          column.div.append(cell.div);
        });
        $(display).append(column.div);
      });
    };

    var position_for_cell = function(element){
      var el_position = element.position();
      var par_position = element.parent().position();
      return {
        left: el_position.left + par_position.left + parseInt(element.css('margin-left')) + parseInt(element.parent().css('margin-left')),
        top: el_position.top + par_position.top + parseInt(element.css('margin-top')) + parseInt(element.parent().css('margin-top'))
      };
    }

    var create_links = function(links){
      var paper = Raphael('links', display.width(), display.height());
      _.each(links.investment, function(link){
        var from = $(link.from);
        var to = $(link.to);
        if(from && to){
          var start= position_for_cell(from);
          var start_x = start.left + from.outerWidth();
          var start_y = start.top + (from.outerHeight()/2);
          var end = position_for_cell(to);
          var end_x = end.left;
          var end_y = end.top + (to.outerHeight()/2);
          debugger;
          paper.path([
            'M', start_x, start_y,
            'L', end_x, end_y
          ]).node.setAttribute('class','link');
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
