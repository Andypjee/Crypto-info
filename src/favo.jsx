// Favo.jsx
import React from 'react';

function Favo({ favorite, addToFavorites }) {
    return (
        <div>
            <h1>Favorites</h1>
            {favorite.length === 0 ? (
                <p></p>
            ) : (
                favorite.map((favoCoin, index) => (
                    <h2 key={index}>{favoCoin}</h2>
                ))
            )}
        </div>
    );
}

export default Favo;
