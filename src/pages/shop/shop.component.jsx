import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.containter';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = props => {
  const { match } = props;

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:round`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default ShopPage;
