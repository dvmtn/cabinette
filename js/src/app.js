(function(){
  window.cabinette.App = function(){
    this.renderer = new cabinette.Renderer();
    this.reader = new cabinette.Reader();
    this.highlighter = new cabinette.Highlighter();
    this.ui = new cabinette.UI();
    this.hash_reader = new cabinette.HashReader();

    var draw_json = function(nodes_jsons, links_json, callback){
      $(cabinette).trigger('render', {
        nodes: nodes_jsons,
        links: links_json,
        complete:function(nodes, links){
          if(callback){ callback(nodes, links); }
        }
      });
    };

    var find_names = function(json){
      var output = [];
      _.each(json, function(group_members){
        _.each(group_members, function(item){
          if(item.name !== undefined){
            output.push(item.name);
          }
        });
      });
      return output.sort();
    };

    var fill_options = function(json, callback){
      $(cabinette).trigger('populate_finder', {
        data: find_names(json),
        complete:function(options_markup){
          if(callback){callback(options_markup);}
        }
      });
    };

    var setup_highlighter = function(links_json, callback){
      $(cabinette).trigger('populate_highlighter', {
        data: links_json,
        complete:function(options){
          if(callback){callback(options);}
        }
      });
    };

    var draw_diagram = function(json){
      if(json.nodes && json.links){
        fill_options(json.nodes);
        setup_highlighter(json.links);
        draw_json(json.nodes, json.links);
      }
    };

    var get_source_data = function(){
      var received_json = {};
      var files = ['nodes','links'];

      _.each(files, function(file){
        $(cabinette).trigger('fetch_json', {
          name: file,
          complete: function(json){
            received_json[file] = json;
            draw_diagram(received_json);
          }
        });
      });
    };

    get_source_data();
  };
}());
