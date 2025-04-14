// CoinOverview.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CoinOverview.css';
import Footer from "./Footer"; // Voeg de footer import toe
import Favo from "./Favo"; // Voeg de Favo import toe

function CoinOverview() {
    const [coins, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [favorite, setFavorite] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(`https://data-api.coindesk.com/asset/v1/top/list?page=${currentPage}&page_size=10`)
            .then((httpResponse) => httpResponse.json())
            .then((jsonResponse) => {
                setCoins(jsonResponse.Data.LIST);
                setTotalPages(Math.ceil(jsonResponse.Data.STATS.TOTAL_ASSETS / 10));
            });
    }, [currentPage]);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPriceChangeStyle = (percentageChange) => {
        return percentageChange > 0 ? "price-increase" : "price-decrease";
    };

    const addToFavorites = (coinName) => {
        if (!favorite.includes(coinName)) {
            setFavorite([...favorite, coinName]);
        }
    };

    const filteredCoins = coins.filter((coin) =>
        coin.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="coin-overview-container">
                <Favo favorite={favorite} addToFavorites={addToFavorites} />

                <input
                    type="text"
                    placeholder="Zoek naar een munt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />

                <h1>Crypto Overview</h1>

                {filteredCoins.length === 0 ? (
                    <p>Geen munten gevonden die overeenkomen met: "{searchQuery}"</p>
                ) : (
                    <div className="coins-list">
                        {filteredCoins.map((coin) => (
                            <div key={coin.URI} className="CoinName">
                                <Link to={"coin/" + coin.URI}>Details</Link>
                                <h2>{coin.NAME}</h2>
                                <div className="price">{parseFloat(coin.PRICE_USD).toFixed(2)} USD</div>
                                <div className={getPriceChangeStyle(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD)}>
                                    {coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2)}%
                                </div>
                                <button onClick={() => addToFavorites(coin.NAME)}>Add to Favorites</button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>

            <Footer /> {/* Footer toevoegen */}
        </>
    );
}

export default CoinOverview;
