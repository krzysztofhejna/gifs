var prefix = "https://cors-anywhere.herokuapp.com/";
var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'EXWUiPgclsIBQDCZxdoceNfovlyag8xm'
var ourUrl = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(ourUrl + searchingText) 
      .then((resp) => {
        this.setState({
          loading: false,
          gif:resp,
          searchingText,
        })
      }
    );
  },

  getGif: function(url) {
    return new Promise(
      function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (this.status === 200) {
            var data = JSON.parse(xhr.responseText).data;
            resolve(data);
          } else {
            reject(new Error(this.statusText));
          }
        };
        xhr.onerror = function () {
          reject(new Error(
            `XMLHttpRequest Error: ${this.statusText}`)
          );
        };
        xhr.open('GET', url);
        xhr.send();
      }
    );
  },

  render: function() {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%',
      display: 'flex',
      display: '-webkit-flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div style={styles}>
        <h1>Find your GIF!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search 
          onSearch={this.handleSearch}
        />
        <Gif 
          loading={this.state.loading}
          url={this.state.gif.image_url} 
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
