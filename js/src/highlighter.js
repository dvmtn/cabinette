(function(){
  window.cabinette.Highlighter = function(){
    var links = {};

    var init = function(){
      $(cabinette).on('highlight', highlight);
    };

    var unset_active = function(){
      $('.cell.selected').removeClass('selected');
      $('.cell.active').removeClass('active');
      $('path').attr('class', function(index, classNames) {
        return classNames.replace('active', '');
      });
    };

    var selectors_for_journies = function(prefix, journies){
      var selectors = [];
      _.each(journies, function(journey){
        selectors.push(prefix + '.' + journey);
      });
      return selectors.join(', ');
    };

    var set_active = function(selected){
      selected.addClass('selected');
      var classes = selected.attr('class').split(/\s+/);
      var journies = _.select(classes, function(klass){
        return (klass.match(/journey_/));
      });

      $(selectors_for_journies('.cell', journies)).addClass('active');
      $(selectors_for_journies('path', journies)).attr('class', function(index, classNames) {
        return classNames + ' active';
      });
    };

    var highlight = function(event, element_id){
      var selected = $('#' + element_id);
      unset_active();
      set_active(selected);
    };

    init();
  };
}());
