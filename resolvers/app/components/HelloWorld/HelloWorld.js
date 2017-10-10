import React, { Component } from 'react';
import styles from './HelloWorld.pcss';
import BarComponent from './BarComponent/BarComponent';

class HelloWorld extends Component {
  render() {
    return (
      <div className={ styles.root }>
        <h1>Hello world</h1>
        <BarComponent />
      </div>
    );
  }
}

export default HelloWorld;