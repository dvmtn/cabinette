(function(){
  window.cabinette.UI = function(){
    var utils;

    var init = function(){
      utils = window.cabinette.utils;

      $('body').on({
        change: find
      }, '.finder');

      $('#display').on({
        click: cell_clicked
      }, '.cell');

      $(cabinette).on('populate_finder', populate_finder);

      $(window).bind('resize', _.debounce(
        function() {
          $(cabinette).trigger('resize');
        }, 50)
      );
    };

    var cell_clicked = function(event){
      var cell = $(event.currentTarget);
      var id = cell.prop('id');
      $(cabinette).trigger('highlight', id);
    };

    var find = function(event){
      var company_name = $(event.currentTarget).val();
      console.log(company_name);
      $(cabinette).trigger('highlight', company_name);
    };

    var value_to_option = function(value){
      return '<option value="' + utils.string_to_id(value) + '">' + value + '</option>';
    };

    var populate_finder = function(event, options){
      var options_string = _.map(options.data, value_to_option).join("\n");
      $('.finder').html(options_string);
      options.complete(options_string);
    };

    init();
  };
}());
