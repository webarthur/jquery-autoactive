
/*!
 * jQuery AutoActive Plugin v1
 * Add active class automatically when page scrolling
 * https://github.com/webarthur/jquery-autoactive
 *
* Copyleft 2015 Arthur Araújo
 * Released under the MIT license
 */
(function($) {
  $.fn.autoactive = function(options) {
    var body, scrolltop, selector, settings;
    settings = $.extend({
      diff: 0,
      "class": 'active',
      interval: 200,
      clickSleep: 0,
      noSaveData: 0
    }, options);
    scrolltop = $(document).scrollTop();
    selector = this.selector;
    body = $('body');
    if (body.data('autoactive_hold')) {
      return;
    }
    if (settings.noSaveData !== null) {
      body.data('autoactive_settings', settings);
    } else {
      settings = $('body').data('autoactive_settings');
    }
    if ($('body').data('autoactive_timer') !== null) {
      $('body').data('autoactive_timer', setInterval("jQuery('" + this.selector + "').autoactive({noSaveData:1});", settings.interval));
    }
    return this.each(function() {
      var diff, id, objectH, objecttop;
      if ($(this).attr('href').indexOf('#') > -1) {
        if (settings.clickSleep && !settings.noSaveData) {
          $(this).unbind('click.autoactive_hold');
          $(this).bind('click.autoactive_hold', function() {
            body.data('autoactive_hold', 1);
            clearTimeout(body.data('autoactive_hold_tout'));
            body.data('autoactive_hold_tout', setTimeout('jQuery("body").data("autoactive_hold", 0);', settings.clickSleep));
          });
        }
        id = $(this).attr('href');
        diff = settings.diff;
        objecttop = $(id).offset().top;
        objectH = $(id).height();
        if (scrolltop >= objecttop - diff && scrolltop < objecttop + objectH - diff) {
          $(selector).removeClass(settings["class"]);
          $('a[href^="' + id + '"]').addClass(settings["class"]);
        }
      }
    });
  };
})(jQuery);
