(function(){
  window.cabinette.HashReader = function(){
    var emit_hash = function(hash){
      var trimmed_hash = hash.replace('#','');
      $(cabinette).trigger('highlight', trimmed_hash);
    };

    var test_hash = function(){
      if(window.location.hash){
        emit_hash(window.location.hash);
      }
    };

    var set_hash = function(event, name){
      window.location.hash = '#' + name;
    };

    $(cabinette).on('rendered', test_hash);
    $(cabinette).on('highlight', set_hash);
  };
}());
