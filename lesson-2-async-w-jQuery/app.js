/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
        Authorization: 'Client-ID 5572171bd679f13422c62001f8716094292ca883120bdbaad461e402a8f1bbef'
        }
        }).done(addImage).fail(function (err){
          requestError(err, 'image');
      });

        function addImage(data){
          let htmlContent = '';
          if (data && data.results && data.results[0]) {
          const firstImage = data.results[0];
          htmlContent = `<figure>
          <img src="${firstImage.urls.regular}" alt="${searchedForText}">
          </figure>`;
        } else {
          htmlContent = '<div class="error-no-image"> No images available </div>';
        }
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }
        $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e67c08323ba74dceb339e0c2ce28fc49`
      }).done(addArticles).fail(function (err){
        requestError(err, 'article');
      });
        function addArticles (data) {
          let htmlContent = '';
          console.log(data)
          if (data.response && data.response.docs && data.response.docs.length > 1) {
            htmlContent = '<ul>' + data.response.docs.map(article =>`<li class = "article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('') + '</ul>';
          } else {
            htmlContent = '<div class="error-no-articles"> No articles available </div>';
          }
          responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
        function requestError(e, part){
        console.log('Error loading ' + part);
        }
    });
})();
