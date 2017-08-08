import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Boat from '../Boat';

import { getResults } from 'selectors/ResultSelectors';
import { connect } from 'react-redux';

import styles from './styles.css';

const Results = ({ results }) =>
  <div className={styles.results}>
    {results.map((player, playerId) =>
      <div
        className={styles.player}
        key={playerId}
        dir={playerId === 0 ? 'ltr' : 'rtl'}
      >
        {player
          .sort((a, b) => (playerId === 0 ? a < b : a > b))
          .map((playerResults, id) => {
            const [size, score] = playerResults;

            return <Boat key={id} size={size} score={score} />;
          })}
      </div>
    )}
  </div>;

Results.propTypes = {
  results: PropTypes.instanceOf(List)
};

const mapStateToProps = state => ({
  results: getResults(state)
});

export default connect(mapStateToProps)(Results);
