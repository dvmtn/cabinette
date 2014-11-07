(function(){
  window.cabinette.Highlighter = function(){

    var unset_active = function(){
      $('.cell.active').removeClass('active');
      $('path').attr('class', function(index, classNames) {
        return classNames.replace('active', '');
      });
    };

    var set_active = function(element_id){
      $('.cell.' + element_id).addClass('active');
      $('path.' + element_id).attr('class', function(index, classNames) {
        return classNames + ' active';
      });
    };

    var highlight = function(event, element_id){
      unset_active();
      set_active(element_id);
    };

    $(cabinette).on('highlight', highlight);
  };
}());
