import React from 'react';

import Synonyms from './synonyms.js';

const Favorites = ({ favorites, addFav }) => {
  console.log('made it to fav component');
  return (
    <div>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((word, idx) => {
          console.log(word);
          return <Synonyms addFav={addFav} word={word} key={++idx} />;
        })}
      </ul>
    </div>
  );
};

export default Favorites;
