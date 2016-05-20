var React = require('react');

var Twitter = React.createClass({
  getInitialState: function() {
    return{ tweets: ""};
  },
  componentWillMount: function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        this.renderTweets(JSON.parse(xhttp.responseText));
      }
    }.bind(this);
    xhttp.open("GET", "http://" + window.location.hostname + ":8080", true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", window.location.href);
    xhttp.send();
  },
  renderTweets: function(props) {
    var rendTweets = props.statuses.map(function(item){
      return (
        <div key={item.id} className="user" >
          <img src={item.user.profile_image_url}></img>
          <h3>{item.user.name}</h3>
          <h4>@{item.user.screen_name}</h4>
        </div>
      )
    });
    this.setState({tweets : rendTweets});
  },
   render: function(){
    return (
      <div>
      <img className="tw-logo" src="public/media/twitterLogo.png" alt="twitter logo" />
      <div>
      {this.state.tweets}
      </div>
      </div>)
  }
});

module.exports = Twitter;
