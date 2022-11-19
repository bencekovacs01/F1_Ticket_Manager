import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.containter';
import CollectionPageContainer from '../collection/collection.container';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // render={props => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={!selectIsCollectionsLoaded}
          //     {...props}
          //   />
          // )} /*component={CollectionsOverview}*/
        />
        <Route
          path={`${match.path}/:round`}
          component={CollectionPageContainer}
          // render={props => (
          //   <CollectionPageWithSpinner
          //     isLoading={!selectIsCollectionsLoaded}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
