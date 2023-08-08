//Importando el archivo js del clima actual
import currentWeather from './current-weather.js'
import weeklyWeather from './weekly-weather.js'
import { viewportSize }  from './utils/viewport.js'
import './tabs.js'
//menu
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});


///
const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')
viewportSize($app)
viewportSize($loading)

currentWeather()
weeklyWeather()