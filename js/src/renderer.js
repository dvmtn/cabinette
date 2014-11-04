(function(){
  window.cabinette.Renderer = function(){
    var render = function(event, options){
      $('#display').html(options.data.length);
      options.complete(options.data);
    };
    $(cabinette).on('render', render);
  };
}());