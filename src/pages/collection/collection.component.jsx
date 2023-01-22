import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

// import { ReactComponent as Track } from './track.svg';

// import './styles.scss';

import Package from '../../components/packages/packages.component';

const CollectionPage = ({ circuit }) => {
  const { CircuitName, Country } = circuit;
  return (
    <div className="collection-page">
      <h2 className="title">{CircuitName}</h2>
      <h2 className="title">{Country}</h2>
      <Package {...circuit} />
      {/* <div className="rightsidemapbg">
        <Track className="track" />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  circuit: selectCollection(ownProps.match.params.round)(state),
});

export default connect(mapStateToProps)(CollectionPage);
