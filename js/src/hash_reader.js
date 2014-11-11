(function(){
  window.cabinette.HashReader = function(){
    var prefix = 'showing-';

    var emit_hash = function(hash){
      var trimmed_hash = hash.replace('#' + prefix ,'');
      $(cabinette).trigger('highlight', trimmed_hash);
    };

    var test_hash = function(){
      if(window.location.hash){
        emit_hash(window.location.hash);
      }
    };

    var set_hash = function(event, name){
      window.location.hash = '#' + prefix + name;
    };

    $(cabinette).on('rendered', test_hash);
    $(cabinette).on('highlight', set_hash);
  };
}());
