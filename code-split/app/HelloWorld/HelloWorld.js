import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
}

render(
  <HelloWorld/>,
  document.getElementById('world'),
);