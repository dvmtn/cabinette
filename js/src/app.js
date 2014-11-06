(function(){
  window.cabinette.App = function(){
    this.renderer = new cabinette.Renderer();
    this.reader = new cabinette.Reader();
    this.ui = new cabinette.UI();

    var draw_json = function(nodes_jsons, links_json, callback){
      $(cabinette).trigger('render', {
        nodes: nodes_jsons,
        links: links_json,
        complete:function(nodes, links){
          if(callback){callback(nodes, links)};
        }
      });
    };

    var find_names = function(json){
      var output = [];
      _.each(json, function(group_members){
        _.each(group_members, function(item){
          if(item.name !== undefined){
            output.push(item.name);
          };
        });
      });
      return output;
    };

    var fill_options = function(json, callback){
      $(cabinette).trigger('populate_finder', {
        data: find_names(json),
        complete:function(options_markup){
          if(callback){callback(options_markup)};
        }
      });
    };

    var draw_diagram = function(jsons){
      if(jsons.nodes && jsons.links){
        fill_options(jsons.nodes);
        draw_json(jsons.nodes, jsons.links);
      }
    }

    var get_source_data = function(){
      var received_json = {};
      var files = ['nodes','links'];

      _.each(files, function(file){
        $(cabinette).trigger('fetch_json', {
          name: file,
          complete: function(json){
            received_json[file] = json
            draw_diagram(received_json); 
          }
        });
      });
    };

    get_source_data();
  };
}());
