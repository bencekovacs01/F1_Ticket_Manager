import React, { useState } from 'react';

import './track-selector.styles.scss';

const TrackSelector = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = item => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
    onSelect(item.circuitId);
  };

  return (
    <div className="dropdown-selector">
      <button
        className="dropdown-selector__button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedItem ? (
          <>
            <img
              key={selectedItem.circuitId}
              className="dropdown-selector__image"
              src={selectedItem.image}
              alt={selectedItem.circuitId}
            />
            <span className="dropdown-selector__text">
              {selectedItem.circuitId}
            </span>
          </>
        ) : (
          <span key="select-item" className="dropdown-selector__text">
            Select Item
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-selector__dropdown">
          {items.map(item => (
            <a
              key={item.id}
              className="dropdown-selector__item"
              onClick={() => handleItemClick(item)}
            >
              <img
                className="dropdown-selector__image"
                src={item.image}
                alt={item.circuitId}
              />
              <span className="dropdown-selector__text">{item.circuitId}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackSelector;
