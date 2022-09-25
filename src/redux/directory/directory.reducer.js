import f1Logo from '../../assets/F1_black.svg';

const INITIAL_STATE = {
  sections: [
    {
      title: 'TO BE MODIFIED',
      imageUrl: f1Logo,
      id: 1,
      linkUrl: 'shop/hats',
    },
    {
      title: 'TO BE MODIFIED',
      imageUrl: f1Logo,
      id: 2,
      linkUrl: 'shop/jackets',
    },
    {
      title: 'TO BE MODIFIED',
      imageUrl: f1Logo,
      id: 3,
      linkUrl: 'shop/sneakers',
    },
    {
      title: 'TO BE MODIFIED',
      imageUrl: f1Logo,
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens',
    },
    {
      title: 'TO BE MODIFIED',
      imageUrl: f1Logo,
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens',
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
