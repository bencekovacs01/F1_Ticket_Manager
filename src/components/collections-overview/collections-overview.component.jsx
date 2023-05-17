import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DatePicker from 'react-datepicker';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';
import 'react-datepicker/dist/react-datepicker.css';
import CustomButton from '../custom-button/custom-button.component';
import HighlightedTrack from './highlighted/highlighted.component';

const CollectionsOverview = ({ collections, history, match }) => {
  const [testDate, setTestDate] = useState(
    new Date(2022, new Date().getMonth(), new Date().getDate())
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const buttonRef = React.createRef();

  const getUpcomingTrack = start => {
    const actualDate = new Date(start);
    return testDate <= actualDate;
  };

  const upcomingCollection = collections.find(collection =>
    getUpcomingTrack(collection?.Date?.start)
  );

  return (
    <>
      <div className="highlighted">
        <div className={`date-selector ${loaded ? 'loaded' : ''}`}>
          <span>Date selector</span>
          <DatePicker
            closeOnScroll={true}
            selected={testDate}
            onChange={date => setTestDate(date)}
            customInput={
              <CustomButton ref={buttonRef}>
                {testDate.toLocaleDateString()}
              </CustomButton>
            }
          />
        </div>
      </div>
      {upcomingCollection && (
        <>
          <div className="highlighted">
            <div
              className={`upcoming ${loaded ? 'loaded' : ''}`}
              onClick={() =>
                history.push(`${match.url}/${upcomingCollection.round}`)
              }
            >
              <div className="upcoming-track">Upcoming Race {'>>>>'}</div>
              {collections.find(collection =>
                getUpcomingTrack(collection?.Date?.start)
              ) && (
                <div className="track">
                  <HighlightedTrack
                    CircuitName={upcomingCollection.CircuitName}
                    Country={upcomingCollection.Country}
                    StartDate={upcomingCollection.Date.start}
                    EndDate={upcomingCollection.Date.end}
                    ImageUrl={upcomingCollection.url}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <h1 className="all-tracks-title">
        {'>>>>'} Browse Tracks {'<<<<'}
      </h1>
      <div className="collections-overview">
        {collections.map(({ id, ...otherCollectionProps }, index) => (
          <CollectionPreview key={index} {...otherCollectionProps} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
