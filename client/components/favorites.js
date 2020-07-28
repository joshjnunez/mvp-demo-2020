import React from 'react';

import Synonyms from './synonyms.js';

const Favorites = ({ favorites, addFav, heardIt }) => {
  console.log('made it to fav component');

  return (
    <div>
      <h3>Favorites</h3>
      Keep track of when you hear your favorite words in public.
      <ul>
        {favorites.map((word, idx) => (
          <div>
            <li
              addFav={addFav}
              word={word}
              id={idx++}
              onClick={(e, id = idx - 1) => {
                return heardIt(e, id);
              }}
            >
              {word}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
