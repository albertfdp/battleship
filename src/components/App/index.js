import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const App = ({ children }) =>
  <div className={styles.app}>
    {children}
  </div>;

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
