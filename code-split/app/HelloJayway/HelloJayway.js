import React, { Component } from 'react';
import { render } from 'react-dom';

class HelloJayway extends Component {
  render() {
    return (
      <div>
        <h1>Hello Jayway</h1>
      </div>
    );
  }
}

render(
  <HelloJayway/>,
  document.getElementById('jayway'),
);
