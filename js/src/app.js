(function(){
  window.cabinette.App = function(){
    this.renderer = new cabinette.Renderer();
    this.reader = new cabinette.Reader();
    this.ui = new cabinette.UI();

    var draw_json = function(json){
      $(cabinette).trigger('render', {
        data: json,
        complete:function(rendered){
          console.log(rendered);
        }
      });
    };

    var find_names = function(json){
      //mocked for now
      return ['jim', 'bob', 'stuart'];
    };

    var fill_options = function(json){
      $(cabinette).trigger('populate_finder', {
        data: find_names(json),
        complete:function(options_markup){
          console.log(options_markup);
        }
      });
    };

    $(cabinette).trigger('fetch_json', function(json){
      fill_options(json);
      draw_json(json);
    });
  };
}());