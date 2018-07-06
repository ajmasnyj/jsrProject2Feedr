// access Guardian api

var root = "https://content.guardianapis.com/search";
var key = "408332d9-b507-4a8a-a455-6f41236391a0";
var searchSection = "technology";


$.ajax({
  url: `${root}?section=${searchSection}&api-key=${key}`,
  method: "GET"
}).then(function(data){
  console.log(data);
  addToDOM(data);
});

// create function to add to DOM
function addToDOM(data){
  // results of search is response object
  var searchResults = data.response.results;
  // console.log(searchResults[0].webUrl);
  // var articleInfo = {
  //   id: [],
  //   url: [],
  // }

  var title = "abc";
  var sectionTitleName = "abc";
  // var template = `<article class="article">\
  //                   <section class="featuredImage">\
  //                     <img src="images/article_placeholder_1.jpg" alt="" />\
  //                   </section>\
  //                   <section class="articleContent">\
  //                     <a href="#"><h3>${title}</h3></a>\
  //                     <h6>${sectionTitleName}</h6>\
  //                   </section>\
  //                   <section class="impressions">\
  //                     526\
  //                   </section>\
  //                   <div class="clearfix"></div>\
  //                 </article>`;

  // console.log(template);
console.log(searchResults);
  // var articleElem = $('.article');
// loop through each article returned
  for (var i = 0; i < searchResults.length; i++){

    var title = searchResults[i].webTitle;
    console.log(searchResults[i].webTitle);
    var articleSelectUrl = searchResults[i].webUrl;
    console.log(searchResults[i].webUrl);
    var articlePubDate = searchResults[i].webPublicationDate

    // var articleDataAttrib = $(searchResults[i]).attr('data-article', `${data.id[i]}`);

    var sectionTitleName = searchResults[i].sectionName;

    var template = `<article class="article" data-url="${articleSelectUrl}">\
                      <section class="featuredImage">\
                        <img src="images/article_placeholder_1.jpg" alt="" />\
                      </section>\
                      <section class="articleContent">\
                        <a href="#"><h3>${title}</h3></a>\
                        <h6>${sectionTitleName}</h6>\
                        <h6>${articlePubDate}</h6>\
                      </section>\
                      <section class="impressions">\
                        526\
                      </section>\
                      <div class="clearfix"></div>\
                    </article>`;
// add id and url info to articleInfo array
    // articleInfo.id.push(searchResults[i].id);
    // articleInfo.url.push(searchResults[i].webUrl);
    // console.log(articleInfo.id);

    $("#main").append($(template));

// When the user selects an article's title show the `#popUp` overlay.
    $('.article h3').on('click',function(event) {
      event.preventDefault();
      // show modal
      $('#popUp').removeClass('loader hidden');
      // alert("hello");
      //show title of selected article
      // alert($(this).text());
      $('#popUp h1')[0].innerText = $(this).text();

// The content of the article must be inserted in the `.container` class inside `#popUp`.
// Make sure you remove the `.loader` class when toggling the article information in the pop-up.
      //var articleSelectId = this.id;
      // var articleSelectId = $(this).closest('.articleContent')[0];
      var articleSelectId = $(this).closest('.article')[0];
      console.log(articleSelectId);

      // var articleSelected = searchResults.articleSelectId;
      // console.log(articleSelected);
      // var articleBlurb = searchResults[i].body;
      // console.log(articleBlurb);
      // var articleBlurb = this.articleContent.str.substring(0,500) + "...";

      $('#popUp p')[0].innerHTML = $(this).parents('.article').attr("data-content");

// Change the link of the "Read more from source" button to that of the respective article.
      $('.popUpAction').attr("href", $(this).parents('.article').attr("data-url"));

    });

    $('.closePopUp').on('click', function(event) {
      event.preventDefault();
      $('#popUp').fadeOut();
    })

  }

}
