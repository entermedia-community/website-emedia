// File for your custom JavaScript

$(document).ready(function () {
      var header = new HSHeader($("#header")).init();
      var megaMenu = new HSMegaMenu($(".js-mega-menu"), {
        desktop: {
          position: "left",
        },
      }).init();
      var unfold = new HSUnfold('.js-hs-unfold-invoker').init();
      $(".js-validate").each(function() {
        var validation = $.HSCore.components.HSValidation.init($(this));
      });
      $(".js-slick-carousel").each(function() {
        var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
      });
      $(".js-go-to").each(function() {
        var goTo = new HSGoTo($(this)).init();
      });
      $('.js-validate').each(function() {
        var validation = $.HSCore.components.HSValidation.init($(this));
      });
      $('.js-inline-video-player').each(function() {
        var videoPlayer = new HSVideoPlayer($(this)).init();
      });
      $(".up-login").click(function(){
	      $(this).parent().parent().find('.collapse').toggle(); // toggle collapse
	    });

      AOS.init({
        duration: 600,
        once: true,
      });
      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array.join("");
      }
      function animateOrganize() {
    	var orig = $("#organize").text();
        var orgArr = orig.split('');//["O", "r", "g", "a", "n", "i", "z", "e"];
        var int = setInterval(function() {
          $("#organize").text(shuffleArray(orgArr));
        }, 200);
        setTimeout(function() {
          clearInterval(int);
          $("#organize").text(orig);
        }, 1500);
      }
      animateOrganize();
      
    $("a.emdialog").on("click", function (event) {
		event.preventDefault();
    	emdialog($(this), event);
  	});
  
      emdialog = function (dialog, event) {
	    if (event) {
	      event.stopPropagation();
	    }
	    var dialog = dialog;
	    var hidescrolling = dialog.data("hidescrolling");
	
	    var width = dialog.data("width");
	    var maxwidth = dialog.data("maxwidth");
	    var id = dialog.data("dialogid");
	    if (!id) {
	      id = "modals";
	    }
	
	    var modaldialog = $("#" + id);
	    if (modaldialog.length == 0) {
	      jQuery("body").append(
	        '<div class="modal" tabindex="-1" id="' +
	          id +
	          '" style="display:none" ></div>'
	      );
	      modaldialog = jQuery("#" + id);
	    }
	    var options = dialog.data();
	    var link = dialog.attr("href");
	    
	    var openfrom = window.location.href;
	
	    $.ajax({
	        xhrFields: {
	          withCredentials: true,
	        },
	        crossDomain: true,
	        url: link,
	        data: options,
	        success: function (data) {

	            modaldialog.html(data);
	            
	            if (width) {
	              if (width > $(window).width()) {
	                width = $(window).width();
	              }
	
	              $(".modal-dialog", modaldialog).css("min-width", width + "px");
	            }
	            if (maxwidth) {
	              $(".modal-dialog", modaldialog).css("max-width", maxwidth + "px");
	            }
	
	            var modalkeyboard = false;
	            var modalbackdrop = true;
	            if ($(".modal-backdrop").length) {
	              modalbackdrop = false;
	            }
	
	            var modalinstance;
	            if (modalkeyboard) {
	              modalinstance = modaldialog.modal({
	                closeExisting: false,
	                show: true,
	                backdrop: modalbackdrop,
	              });
	            } else {
	              modalinstance = modaldialog.modal({
	                keyboard: false,
	                closeExisting: false,
	                show: true,
	                backdrop: modalbackdrop,
	              });
	            }
	
	            var firstform = $("form", modaldialog);
	            firstform.data("openedfrom", openfrom);
	            // fix submit button
	            var justok = dialog.data("cancelsubmit");
	            if (justok != null) {
	              $(".modal-footer #submitbutton", modaldialog).hide();
	            } else {
	              var id = $("form", modaldialog).attr("id");
	              $("#submitbutton", modaldialog).attr("form", id);
	            }
	            var hidetitle = dialog.data("hideheader");
	            if (hidetitle == null) {
	              var title = dialog.attr("title");
	              if (title == null) {
	                title = dialog.text();
	              }
	              $(".modal-title", modaldialog).text(title);
	            }
	            var hidefooter = dialog.data("hidefooter");
	            if (hidefooter != null) {
	              $(".modal-footer", modaldialog).hide();
	            }
	
	            if (
	              typeof global_updateurl !== "undefined" &&
	              global_updateurl == false
	            ) {
	              //globaly disabled updateurl
	            } else {
	              //backup url
	              var currenturl = window.location.href;
	              modalinstance.data("oldurlbar", currenturl);
	              //Update Address Bar
	              var updateurl = dialog.data("updateurl");
	              if (updateurl) {
	                var urlbar = dialog.data("urlbar");
	                if (!urlbar) {
	                  urlbar = link;
	                }
	
	                history.pushState($("#application").html(), null, urlbar);
	                window.scrollTo(0, 0);
	              }
	            }
	
	            //on success execute extra JS
	            if (dialog.data("onsuccess")) {
	              var onsuccess = dialog.data("onsuccess");
	              var fnc = window[onsuccess];
	              if (fnc && typeof fnc === "function") {
	                //make sure it exists and it is a function
	                fnc(dialog); //execute it
	              }
	            }
	
	          }
	      });
	    }//emdialog
    });