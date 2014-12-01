(function(){
  window.cabinette.Renderer = function(){
    var utils;
    var display, links, nodes;

    var init = function(){
      utils = window.cabinette.utils;
      display = $('#display');
      $(cabinette).on('render', render);
      $(cabinette).on('resize', resize);
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

    var build_column_html = function(column, heading){
      var col_id = utils.string_to_id(heading);
      column.div = $('<div class="column" id="'+col_id+'"></div>');
      column.div.append('<h1>'+heading+'</h1>');
    };

    var id_for_cell = function(cell){
      if(cell.id){
        return utils.string_to_id(cell.id);
      }else{
        return utils.string_to_id(cell.name);
      }
    };

    var cell_examples_html = function(cell){
      var html_out = '';
      _.each(cell.examples, function(example){
        html_out += '<div class="example" id="'+ id_for_cell(example) +'">'+ example.name +'</div>';
      });
      return html_out;
    };

    var build_cell_html = function(cell, column){
      var cell_id = id_for_cell(cell);
      cell.div = $('<div class="cell '+ journey_classes_for_element(cell_id)+'" id="'+ cell_id +'">' + cell.name +'</div>');
      if(cell.examples){
        cell.div.append(cell_examples_html(cell));
      }
      column.div.append(cell.div);
    };

    var create_columns = function(){
      _.each(nodes, function(column, heading){
        build_column_html(column, heading);
        _.each(column, function(cell){
          build_cell_html(cell, column);
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
      var paper = $('#links svg');
      if(paper){
        paper.remove();
      }
    };

    var create_links = function(){
      destroy_links();
      var paper = Raphael('links', display.width(), display.height());
      _.each(links.investment, function(journey){
        var journey_id = journey.id;
        _.each(journey.links, function(link){
          var from = $(link.from);
          var to = $(link.to);
          var from_class = utils.string_to_id(link.from).replace(/#/,'');
          var start = element_coords(from);
          var end = element_coords(to);
          paper.path([
            'M', start.right, start.mid_y,
            'L', end.left, end.mid_y
          ]).node.setAttribute("class",'link journey_' + journey_id + ' from_' + from_class);
        });
      });
    };

    var render = function(event, options){
      links = options.links;
      nodes = options.nodes;
      create_columns();
      create_links();
      $(cabinette).trigger('rendered');
      options.complete(options.nodes, options.links);
    };

    var resize = function(event){
      if(links){
        var selected = $('.selected')[0];
        create_links();
        if(selected){
          $(cabinette).trigger('highlight', selected.id);
        }
      }
    };

    init();
  };
}());
