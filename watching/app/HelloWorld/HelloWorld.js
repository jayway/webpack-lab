import React, { Component } from 'react';
import styles from './HelloWorld.pcss';

class HelloWorld extends Component {
  render() {
    return (
      <div className={ styles.root }>
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default HelloWorld;