###!
# jQuery AutoActive Plugin v1
# Add active class automatically when page scrolling
# https://github.com/webarthur/jquery-autoactive
#
* Copyleft 2015 Arthur Araújo
# Released under the MIT license
###

(($) ->

  $.fn.autoactive = (options) ->

    # Merge default options
    settings = $.extend({
      diff: 0
      class: 'active'
      interval: 200
      clickSleep: 0
      noSaveData: 0
    }, options)

    # Get scrolltop and menu selector
    scrolltop = $(document).scrollTop()
    selector = @selector
    body = $('body')

    # clickSleep function
    return if body.data('autoactive_hold')

    # Save settings
    if settings.noSaveData isnt null
      body.data 'autoactive_settings', settings
    else
      settings = $('body').data 'autoactive_settings'

    # Create timer/interval
    if $('body').data('autoactive_timer') isnt null
      $('body').data 'autoactive_timer', setInterval("jQuery('#{@selector}').autoactive({noSaveData:1});", settings.interval)

    # Return object
    @each ->

      # Check if link is ID
      if $(this).attr('href').indexOf('#') > -1

        # Add HOLD when menu is clicked (fix changing classes when page scroll by click)
        if settings.clickSleep and !settings.noSaveData

          # Unbind click to avoid duplicate click
          $(this).unbind 'click.autoactive_hold'

          # Add click to hold autoactive
          $(this).bind 'click.autoactive_hold', ->

            # Hold autoactive
            body.data 'autoactive_hold', 1

            # Clear timeout to avoid clear on second click
            clearTimeout body.data 'autoactive_hold_tout'

            # Register and run timeout
            body.data 'autoactive_hold_tout',
              setTimeout 'jQuery("body").data("autoactive_hold", 0);', settings.clickSleep
            return

        # Get section height
        # Get section ID
        id = $(this).attr 'href'
        diff = settings.diff
        objecttop = $(id).offset().top
        objectH = $(id).height()

        # Check scrolltop and sections
        if scrolltop >= objecttop - diff and scrolltop < objecttop + objectH - diff

          # Remove all active classes
          $(selector).removeClass settings.class

          # Add active class in the specific menu link
          $('a[href^="' + id + '"]').addClass settings.class

      return

  return
) jQuery
