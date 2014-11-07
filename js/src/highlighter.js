(function(){
  window.cabinette.Highlighter = function(){
    var highlight = function(event, label){
      alert('Hi!' + label);
    };
    $(cabinette).on('highlight', highlight);
  };
}());
