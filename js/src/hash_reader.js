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
    $(cabinette).on('rendered', test_hash);
  };
}());
