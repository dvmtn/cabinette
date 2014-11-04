(function(){
  window.cabinette.Reader = function(){
    var fetch_json = function(event, return_json){
      $.getJSON('/source_data/investment_links.json', function(json){
        return_json(json);
      });
    };
    $(cabinette).on('fetch_json', fetch_json);
  };
}());