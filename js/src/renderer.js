(function(){
  window.cabinette.Renderer = function(){
    var display, paper;

    var init = function(){
      display = $('#display');
      paper = Raphael('links', display.width(), display.height());
      $(cabinette).on('render', render);
    };

    var create_columns = function(columns){
      _.each(columns, function(column, heading){
        var col_id = heading.toLowerCase().trim().replace(/ /g, '_');
        column.div = $('<div class="column '+col_id+'"></div>');
        column.div.append('<h1>'+heading+'</h1>');
        _.each(column, function(cell){
          cell.div = $('<div class="cell">' + cell.name +'</div>');
          column.div.append(cell.div);
        });
        $(display).append(column.div);
      });
    };

    var create_links = function(links){
      debugger;
      _.each(links.investment, function(link){
        paper.path('M0,0 L250,250');
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
