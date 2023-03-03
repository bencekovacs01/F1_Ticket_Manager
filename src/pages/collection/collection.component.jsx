import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

import BackgroundImage from '../../assets/bg2.avif';

import Package from '../../components/packages/packages.component';

const CollectionPage = ({ circuit }) => {
  const { CircuitName, Country } = circuit;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`collection-page ${loaded ? 'loaded' : ''}`}>
      <div className="collection-header">
        <div
          className="header-text"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <h2 className="title">{CircuitName}</h2>
          <h2 className="title">{Country}</h2>
        </div>
        <div
          className="image-container"
          style={{ backgroundImage: `url(${circuit.url})` }}
        ></div>
      </div>
      <Package {...circuit} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  circuit: selectCollection(ownProps.match.params.round)(state),
});

export default connect(mapStateToProps)(CollectionPage);
