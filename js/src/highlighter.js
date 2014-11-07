(function(){
  window.cabinette.Highlighter = function(){
    var highlight = function(event, element_id){
      $('.cell.active').removeClass('active');
      $('path').attr('class', function(index, classNames) {
        return classNames.replace('active', '');
      });

      $('.cell.' + element_id).addClass('active');
      $('path.' + element_id).attr('class', function(index, classNames) {
        return classNames + ' active';
      });
    };
    $(cabinette).on('highlight', highlight);
  };
}());
