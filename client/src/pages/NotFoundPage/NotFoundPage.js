import React, { Component } from 'react';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>Page not found</h1>
        <div>
          <a style={{"fontSize": "1.5em"}} href="/">Go to Home</a>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
