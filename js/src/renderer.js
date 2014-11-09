(function(){
  window.cabinette.Renderer = function(){
    var display, links, nodes;

    var init = function(){
      display = $('#display');
      $(cabinette).on('render', render);
      $(cabinette).on('resize', resize);
    };

    //TODO: Extract this
    var name_to_id = function(name){
        return name
          .toLowerCase()
          .trim()
          .replace(/ /g, '_')
          .replace(/&/g, 'and');
    };

    var journies_for_element = function(element_id){
      var output = [];
      _.each(links.investment, function(journey){
        _.each(journey.links, function(link){
          if((link.from == '#'+element_id) || (link.to == '#'+element_id)){
            output.push(journey.id);
          }
        });
      });
      return _.uniq(output);
    };

    var journey_classes_for_element = function(element_id){
      var journies = journies_for_element(element_id);
      var output = "";
      _.each(journies, function(journey_id){
        output += "journey_" + journey_id+' ';
      });
      return output.trim();
    };

    var create_columns = function(){
      _.each(nodes, function(column, heading){
        var col_id = name_to_id(heading);
        column.div = $('<div class="column" id="'+col_id+'"></div>');
        column.div.append('<h1>'+heading+'</h1>');
        _.each(column, function(cell){
          var cell_id = name_to_id(cell.name);
          cell.div = $('<div class="cell '+cell_id+' '+journey_classes_for_element(cell_id)+'" id="'+cell_id+'">' + cell.name +'</div>');
          column.div.append(cell.div);
        });
        $(display).append(column.div);
      });
    };

    var element_coords = function(element){
      var el_position = element.position();
      var par_position = element.parent().position();

      var left = el_position.left + par_position.left + parseInt(element.css('margin-left')) + parseInt(element.parent().css('margin-left'));
      var top = el_position.top + par_position.top + parseInt(element.css('margin-top')) + parseInt(element.parent().css('margin-top'));
      var right = left + element.outerWidth();
      var mid_y = top + (element.outerHeight()/2);
      return {left: left, right: right, top: top, mid_y: mid_y};
    };

    var destroy_links = function(){
      var paper = $('links')[0];
      if(paper){
        paper.remove();
      }
    };

    var create_links = function(){
      var paper = Raphael('links', display.width(), display.height());
      _.each(links.investment, function(journey){
        var journey_id = journey.id;
        _.each(journey.links, function(link){
          var from = $(link.from);
          var to = $(link.to);
          if(from && to){
            var start = element_coords(from);
            var end = element_coords(to);
            paper.path([
              'M', start.right, start.mid_y,
              'L', end.left, end.mid_y
            ]).node.setAttribute("class",'link journey_' + journey_id);
          }
        });
      });
    };

    var render = function(event, options){
      links = options.links;
      nodes = options.nodes;
      create_columns();
      create_links();

      options.complete(options.nodes, options.links);
    };

    var resize = function(event, options){
      if(links){
        var old_paper = destroy_links();
        create_links();
      }
    };

    init();
  };
}());
