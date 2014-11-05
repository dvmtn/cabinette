(function(){
  window.cabinette.App = function(){
    this.renderer = new cabinette.Renderer();
    this.reader = new cabinette.Reader();
    this.ui = new cabinette.UI();

    var draw_json = function(json, callback){
      $(cabinette).trigger('render', {
        data: json,
        complete:function(rendered){
          if(callback) callback(rendered);
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
          if(callback) callback(options_markup);
        }
      });
    };

    $(cabinette).trigger('fetch_json', function(json){
      fill_options(json);
      draw_json(json);
    });
  };
}());
