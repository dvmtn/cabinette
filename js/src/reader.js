(function(){
  window.cabinette.Reader = function(){

    var sources = {
      nodes: 'source_data/nodes.json',
      links: 'source_data/links.json'
    };

    var lookup = function(key){
      return sources[key];
    };

    var request = function(name, complete){
      $.getJSON(lookup(name), complete);
    };

    var fetch_json = function(event, options){
      request(options.name, options.complete);
    };

    $(cabinette).on('fetch_json', fetch_json);
  };
}());
