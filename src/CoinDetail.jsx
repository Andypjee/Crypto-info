import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CoinDetail() {
    const params = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then((httpResponse) => httpResponse.json())
            .then((jsonResponse) => {
                const found = jsonResponse.Data.LIST.find(c => c.URI === params.id);
                setCoin(found);
            });
    }, [params.id]);

    if (!coin) return <p>Loading...</p>;

    return (
        <div>
            <h1>{coin.NAME}</h1>
            {coin.LOGO_URL && (
                <img src={coin.LOGO_URL} alt={`${coin.NAME} logo`} width="100" />
            )}
            <p>Symbol: {coin.SYMBOL}</p>
            <p>Price: ${parseFloat(coin.PRICE_USD).toFixed(2)}</p>
            <p>Change 24h: {coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2)}%</p>

            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default CoinDetail;
