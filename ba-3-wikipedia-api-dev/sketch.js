let debug = true;

let welcomeText = "HELLO!\nYou are seeing a beta experiment which might not always work. If you'd like to help me, disable your adblock, so I see what you enjoy.\n\nHOW TO USE:\nType a search term and hit ENTER.";

let searchUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
let parseUrl = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=';

let userInput;
let term;
let title;
let title_;
let header;
let resultDiv;
let ready = true;

// 500
let maxAccuracy = 0.8;
let minAccuracy = 0.7;

let counter = 0;

function findSentenceWith(text, word) {
  // let regex = new RegExp("[^.?!]*(?<=[.?\\s!])" + word + "(?=[\\s.?!])[^.?!]*[.?!]", "gi");
  let regex = new RegExp("(?![{}])[^.?!]*(?<=[.?\\s!])" + word + "(?=[\\s.?!])[^.?!]*[.?!]", "gi");
  return text.match(regex);
}

function setDomText(field, text) {
  field.innerText = text;
}

function parsedTime() {
  let d = new Date();
  return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}

function writeStatistics(txt) {
  let string = "";

  for (var i = 0; i < txt.length; i++) {
    string += txt[i];
    string += ",";
  }

  // remove ; and add \n
  string = string.substring(string.length - 1, 0);
  string += "\n";

  if (debug) {
    console.log(string);
  } else {
    var data = new FormData();
    data.append("data", txt);
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.open('post', 'http://michaelschoenenberger.ch/wiki-api-v1/receiver.php', true);
    xhr.send(data);
  }
}

function setup() {
  noCanvas();
  userInput = select('#userinput');

  header = document.getElementById('title');
  link = document.getElementById('link');
  resultDiv = document.getElementById('resultDiv');
  // userInput.changed(startSearch);

  $('#userinput').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13' && ready) {
      term = userInput.value();
      startSearch(term);
    } else if (keycode == '13' && !ready) {
      alert('Please wait! The algorithm is working.');
    }
  });

  //goWiki(userInput.value());

  function startSearch(term) {
    ready = false;
    counter = 0;
    setDomText(header, "Please Wait");
    setDomText(resultDiv, "");
    // goWiki(term);
    goWiki500(term);
  }

  // function goWiki(term) {
  //
  //   if (counter < 1) {
  //     counter = counter + 1;
  //     //let term = userInput.value();
  //     let url = searchUrl + term;
  //     loadJSON(url, gotSearch);
  //   }
  // }

  // function gotSearch(data) {
  //   let len = data[1].length;
  //   let index = floor(random(len));
  //   title = data[1][index];
  //   console.log("title:");
  //   console.log(title);
  //   setDomText(header, title);
  //   // console.log(random(data[1]));
  //   createDiv(title);
  //   title = title.replace(/\s+/g, '_');
  //   console.log('Querying: ' + title);
  //   let url = contentUrl + title;
  //   loadJSON(url, gotContent);
  // }

  function goWiki500(term) {
    counter++;
    let url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=500&srsearch=" + term + "&utf8=&format=json";
    loadJSON(url, gotSearch500);
  }

  function gotSearch500(data) {

    // console.log(data);
    // let len = data[1].length;
    // let index = floor(random(len));
    // let title = data[1][index];

    if (data.query.search.length <= 0){
      console.log('no results');
      setDomText(header, 'No results. Sorry!');
      ready = true;

    } else {
      let index = data.query.search.length - floor(random(minAccuracy, maxAccuracy) * data.query.search.length) - counter;
      // let index = floor(random(minAccuracy,maxAccuracy)*data.query.search.length) + counter;
      title = data.query.search[index].title;
      // title = "Cloud";
      // // console.log(random(data[1]));

      setDomText(header, title);
      console.log('Loaded Article ' + index + ' of ' + data.query.search.length);
      title = title.replace(/\s+/g, '_');
      link.href = "https://en.wikipedia.org/wiki/" + title;

      console.log('Querying: ' + title);
      let url = parseUrl + title;
      // console.log("URL = "+url);
      //  writeStatistics([parsedTime(),term,link]); -----------DEV MODE
      loadJSON(url, gotParsed);
    }
  }



  function gotParsed(data) {
    let txt = data.parse.text['*'];
    // console.log(txt);
    // console.log('The text is loaded');

    // txt = markTerm(txt, term);

    $('#resultDiv').html(txt).promise().done(applyStyle);

    ready = true;
  }

  function applyStyle() {
    //fix wiki links
    $(this).find('a').each(function(index, el) {
      let a_link = $(this).attr('href');
      if (a_link) {
        // original code
        // if (a_link.substring(0, 5) == '/wiki') {
        //   a_link = 'https://en.wikipedia.org' + a_link;
        //   $(this).attr('href', a_link);
        // }


        //"stay on site" code
        if (a_link.substring(0, 5) == '/wiki') {
          $(this).attr('href', '#');
          $(this).click(function(event) {
            if ($(this).attr('title')) {
              setDomText(header, $(this).attr('title'));
              let x = $(this).attr('title').replace(/\s+/g, '_');
              link.href = "https://en.wikipedia.org/wiki/" + x;
              console.log(x);
              loadJSON(parseUrl + x, gotParsed);
            }
          });
        }
      }
    });

    //remove all style html elements
    $(this).find('style').remove();

    //remove empty elements
    $(this).find('.mw-empty-elt').remove();

    //loop each element
    $(this).find('*').each(function(index, el) {
      if ($(this).css('display') == 'none') {
        //delete if invisible
        $(this).remove();
      }

      //delete bg color attribute and other styles
      $(this).removeAttr("bgcolor");
      $(this).removeAttr("style");

    });

    //
    $(this).find('img').removeAttr("width").removeAttr("height");

    // mark terms
    $(this).add('#title').mark(term, {
      'element': 'span',
      'className': 'term'
    });

    //add left lane div
    $(this).prepend('<div class="left-lane"></div>');

    //add content to left div
    $(this).find('.infobox').appendTo('.left-lane');
    $(this).find('.toc').appendTo('.left-lane');

    //mark first p (mostly short description)
    $(this).find('p:first').addClass('first-p');
  }

  // function markTerm(text, targetWord) {
  //
  //   var wordList = targetWord.split(" ");
  //   // console.log(wordList);
  //
  //   for (var i = 0; i < wordList.length; i++) {
  //     let regex = new RegExp(wordList[i], "gi");
  //     let highlighted = '<span class="term">' + wordList[i] + '</span>';
  //     text = text.replace(regex, highlighted);
  //   }
  //
  //   return text;
  // }

  // function markTermInDOM(targetWord) {
  //
  //   var wordList = targetWord.split(" ");
  //   // console.log(wordList);
  //
  //   $('*', $('#resultDiv')).each(function() {
  //     let text = $(this).text();
  //
  //     for (var i = 0; i < wordList.length; i++) {
  //       let regex = new RegExp(wordList[i], "gi");
  //       let highlighted = '<span class="term">' + wordList[i] + '</span>';
  //
  //       text = text.replace(regex, highlighted);
  //     }
  //
  //     $(this).html(text);
  //   });
  // }

  // function gotContent(data) {
  //   let page = data.query.pages;
  //   let pageId = Object.keys(data.query.pages)[0];
  //   // console.log(pageId);
  //   let content = page[pageId].revisions[0]['*'];
  //
  //   // find sentences
  //   displaySentences(content, term);
  //
  //   // rankWords
  //   // let wordRegex = /\b\w{4,}\b/g;
  //   // let words = content.match(wordRegex);
  //   // rankWords(words);
  //
  //   // repeat?
  //   // let word = random(words);
  //   // goWiki(word);
  //   // console.log(word);
  // }

  // function displaySentences(content, term) {
  //   console.log("looking for " + term);
  //   let result = findSentenceWith(content, term);
  //   let msg = "";
  //   if (result) {
  //     console.log(result);
  //     for (var i = 0; i < result.length; i++) {
  //       msg += result[i];
  //       msg += "\n\n";
  //     }
  //     counter = 0;
  //     setDomText(resultDiv, msg);
  //   } else {
  //     console.log("No " + term + " found in any sentence...");
  //     console.log("\nDoing it again:");
  //     goWiki500(term);
  //   }
  // }

  //   function rankWords(words) {
  //     let wordlist = {};
  //
  //     for (var i = 0; i < words.length; i++) {
  //       if (wordlist[words[i]] >= 1) {
  //         wordlist[words[i]]++;
  //       } else {
  //         wordlist[words[i]] = 1;
  //       }
  //     }
  //
  //     let wordRanking = Object.keys(wordlist).sort(function(a, b) {
  //       return wordlist[b] - wordlist[a]
  //     });
  //     console.log("Word number one is: " + wordRanking[0]);
  //   }
}

// alert(welcomeText);

// RESIZING OF SEARCH BOX
$.fn.textWidth = function(text, font) {

  if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);

  $.fn.textWidth.fakeEl.text(text || this.val().replace(/[ \t]+$/g, ".") || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));

  return $.fn.textWidth.fakeEl.width();
};

$('.width-dynamic').on('input', function() {
  var inputWidth = $(this).textWidth();
  $(this).css({
    width: inputWidth
  })
}).trigger('input');

function inputWidth(elem, minW, maxW) {
  elem = $(this);
  // console.log(elem)
}

var targetElem = $('.width-dynamic');

inputWidth(targetElem);
// ------------------



// let titleAnimation;
// let p = 0;
// const docTitle = document.title;
//
// function pageTitleAnimation() {
//   let n = 8
//   if (p + n > docTitle.length) {
//     let dif = p + n - docTitle.length;
//     document.title = docTitle.substring(p, p + n) + ' ' + docTitle.substring(0, dif - 1);
//   } else {
//     document.title = docTitle.substring(p, p + n);
//   }
//   p++;
//   if (p >= document.title.length) {
//     p = 0;
//   }
// }
//
// // Change page title on blur
// $(window).blur(function() {
//     titleAnimation = setInterval(pageTitleAnimation, 1000);
// });
//
// // Change page title back on focus
// $(window).focus(function() {
//     clearInterval(titleAnimation);
//     document.title = docTitle;
// });
