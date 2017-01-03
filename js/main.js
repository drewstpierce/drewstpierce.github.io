
//Global variables. 
/* I could probably merge some of the doubled
function specific local variables here, but I'd
rather play it safe for now, seeing as how I 
don't have any specific battle plan here. */
var scrollY = 0;
var distance = 40;
var speed = 30;
var x = document.getElementById("topNav");

/* Toggle navbar menu when on smaller screens/mobile devices
by changing its class from "navifation" to "responsive", since
the responsive class has the responsive properties.
This goes on our menu button, which is only present on 
said smaller screens. */
function navTransform() {
  if (x.className === "navigation") {
    x.className = "responsive";
  } else {
    x.className = "navigation";
  }
};

/* auto-scrolls to a specific div element BELOW 
our current position */
function autoScrollTo(el) {
  var currentY = window.pageYOffset;
  var targetY = document.getElementById(el).offsetTop;
  var bodyHeight = document.body.offsetHeight;
  var yPos = currentY + window.innerHeight;
  var animator = setTimeout('autoScrollTo(\''+el+'\')',24);
  if(yPos > bodyHeight) {
    clearTimeout(animator);
  } else if(currentY < targetY-distance) {
    /* if we're in responsive mode with the navbar
    down, move it back up after clicking */
        if (x.className === "responsive") {
          x.className = "navigation";
        }
        scrollY = currentY+distance;
        window.scroll(0, scrollY);
      } else {
        clearTimeout(animator);
      }
    };

/* auto-scrolls to a specific div element ABOVE 
our current position */
function autoScrollUp(el) {
  var currentY = window.pageYOffset;
  var targetY = document.getElementById(el).offsetTop;
  var animator = setTimeout('autoScrollUp(\''+el+'\')',24);
  if(currentY > targetY) {
    /* again, if we're in responsive mode with the navbar
    down, move it back up. */
    if (x.className === "responsive") {
          x.className = "navigation";
        }
  scrollY = currentY - distance;
  window.scroll(0, scrollY);
  } else {
    clearTimeout(animator)
    }
  };

/* essentially a "return home" function, which has been 
abandoned since adding the autoScrollUp function. Even
though bouncing around the page in a non-linear fashion
renders this function obsolete, I'm leaving it here in 
case I need it for something else later. */
function resetScroller(el) {
  var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
  var animator = setTimeout('resetScroller(\''+el+'\')',speed);
  if(currentY > targetY) {
    scrollY = currentY - distance;
    window.scroll(0, scrollY);
  } else {
    clearTimeout(animator);
    }
  };

  /* for the contact form */

  var message = "";

$("#sendMessage").on("click", function() {
    message = $("#contactform").serialize();
    $.ajax({
        url: "//formspree.io/bicandvlood@gmail.com", 
        method: "POST",
        data: {message: message},
        dataType: "json"
    });
    alert('Thanks for the message! I\'ll be in touch soon.');
    return false;
});