import React, { Component } from 'react';
import styles from './BarComponent.pcss';
import footil from '../../../utils/footil';
import TextField from '../../../elements/TextField';
import { FOO } from '../../../../shared/constants/foostant';

class BarComponent extends Component {
  render() {
    return (
      <div className={ styles.root }>
        <h1>Hello { footil() } { FOO }</h1>
        <TextField />
      </div>
    );
  }
}

export default BarComponent;