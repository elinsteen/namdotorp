(function() {
  'use strict';

//testar git


var menyknapp = document.getElementById('burgare');
var respmeny = document.getElementsByClassName('respmeny');
var sidor = document.getElementsByClassName('page');
var navlinks = document.getElementsByClassName('navlink');
var i = null;
var dropdown = document.getElementsByClassName('dropdown-content');
var torp;
var ettavtorpen = document.getElementById('ettavtorpen');
var barnen = dropdown[0].getElementsByTagName('a');
var soflink = document.getElementById('soflink');
var torpknapp = document.getElementById('torpbutton')

var torplinks = [];
var torplinks2 = [];
var torplinks3 = [soflink];
// var torplinks4 = [torpknapp];
// console.log(torplinks3[0]);
var torplinkhash;
var torpsida = document.getElementById('torplista');

window.scrollbars = true;

//hide jquery mobile loading message
$(document).on("pageshow", "[data-role='page']", function () {
 $('div.ui-loader').hide();
});



//reading a json file into the variable torp
$.ajax({
        url: "json/torp.json",
        // contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            torp = data;
            // console.log('great success!');
            // console.log(torp.items[3]);

            // Look for matches in json-file torp.json and display contents in subpage-div 'ettavtorpen'
            function gototorpsida(objekt) {
              objekt.items.forEach(function(row){

              if (torplinkhash === row.id) {

                  for (i = 0; i < sidor.length; i++) {
                  hide(sidor[i]);
                }
                ettavtorpen.innerHTML = row.title;
                if (row.bild != undefined) {
                  ettavtorpen.innerHTML += row.bild;
                }
                ettavtorpen.innerHTML += row.content;
                ettavtorpen.innerHTML += "<a href='#torp' id='torpbutton'><span class='centertext'>&#8617<span></a>";
                ettavtorpen.style.display = "block";
                var torpknapp = document.getElementById('torpbutton');
                // var torpknapplista = [torpknapp];
                // addtorplinkclick(torpknapplista, 0);
                torpknapp.addEventListener('click', function() {
                  for (i = 0; i < sidor.length; i++) {
                  hide(sidor[i]);
                }
                var torpsida = document.getElementById('torp');
                torpsida.style.display = "block";
                })

              }
            });
            }


            // Function to add click event to items in array of links
            function addtorplinkclick(array, item) {
              array[item].addEventListener("click", function() {
                  console.log("hash är" + this.hash);
                  torplinkhash = this.hash.substr(1);
                      gototorpsida(torp);
                  });
              }

            //loop a list of links, add clicks and navigate
            for (i = 0; i < torplinks.length; i++) {
              torplinks[i].classList.add("torplinks");
              addtorplinkclick(torplinks, i);
              // console.log(torplinks[i]);
              addtorplinkclick(torplinks2, i);
            }
            //add click to single link
            addtorplinkclick(torplinks3, 0);
            // addtorplinkclick(torplinks4, 0);



        },
        error: function (/* request, error */) {
            console.log('Network error has occurred please try again!');
        }
        });



//extracting only the links from the children of dropdown-content
for (i = 0; i < barnen.length; i++) {
  if (barnen[i].tagName == "A") {
      torplinks.push(barnen[i]);
      }
    }


//Cloning links and adding them on the "torp" page
for (i = 0; i < torplinks.length; i++) {
  var li_node = document.createElement("LI");
  var cln = torplinks[i].cloneNode(true);
  li_node.appendChild(cln);
  cln.classList.add("flexbarn");
  torplinks2.push(cln);
  torpsida.appendChild(li_node);
}



// //loop a list of links, add clicks and navigate
// for (i = 0; i < torplinks.length; i++) {
//   torplinks[i].classList.add("torplinks");
//   addtorplinkclick(torplinks, i);
//   addtorplinkclick(torplinks2, i);
// }
// //add click to single link
// addtorplinkclick(torplinks3, 0);

// // Function to add click event to items in array of links
// function addtorplinkclick(array, item) {
//   array[item].addEventListener("click", function() {
//       console.log("hash är" + this.hash);
//       torplinkhash = this.hash.substr(1);
//           gototorpsida(torp);
//       });
//   }

// // Look for matches in json-file torp.json and display contents in subpage-div 'ettavtorpen'
// function gototorpsida(objekt) {
//   objekt.items.forEach(function(row){
//   if (torplinkhash === row.id) {
//       for (i = 0; i < sidor.length; i++) {
//       hide(sidor[i]);
//     }
//     ettavtorpen.innerHTML = row.title + row.content;
//     ettavtorpen.style.display = "block";
//   }
// });
// }



// add click events to navlinks
function addnavclick(element) {
  element.addEventListener("click", function(){
    //Loop through the pages and hide them
    for (i = 0; i < sidor.length; i++) {
      hide(sidor[i]);
      //check if a clicked link matches id of a page div, then show it
      if (this.hash.substr(1) === sidor[i].id) {
        sidor[i].style.display = 'block';
        if (window.innerWidth < 599) {
            hide(respmeny[0]);
        }
      }
    }
  });
}

//Loop through navlinks to add click event
for (i = 0; i < navlinks.length; i++) {
  addnavclick(navlinks[i]);
}

//hide elements
function hide (element){
  element.style.display = "none";
}


// bind toggle visibility function to menu symbol
menyknapp.onclick = function() {
  hideshow(respmeny[0]);
};

// toggle visibility of menu
function hideshow (element){
    if (element.style.display === "none" || element.style.display === "")
    {
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}

//show menu on big screen, hide on mobile
window.onresize = function() {
  // console.log('screen width ' + window.innerWidth);
  if (window.innerWidth > 599) {
    respmeny[0].style.display = "block";
  }
  else {
    respmeny[0].style.display = "none";
  }
};


// bildspel
var leftbutton = document.getElementById('leftbutton');
var rightbutton = document.getElementById('rightbutton');
var slideIndex = 1;

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[slideIndex-1].style.display = "block";
}


//Adding click events to slideshow-buttons
leftbutton.addEventListener('click', function() {
  plusDivs(-1);
});
rightbutton.addEventListener('click', function() {
  plusDivs(+1);
});

//Adding slide events for slideshow-buttons
$(".mySlides").on("swipeleft", function() {
  plusDivs(-1);
});

$(".mySlides").on("swiperight", function() {
  plusDivs(+1);
});

})();
