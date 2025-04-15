import React, { useEffect, useState } from "react";
import Header from "./header.jsx";
import {Route, Routes, Link} from "react-router-dom";
import CoinOverview  from "./CoinOverview.jsx";
import Contact from "./Contact.jsx";
import CoinDetail from "./CoinDetail.jsx";


function App() {

    return (
        <>
            <Header />



          <div>
              <Routes>
                  <Route path="/" element={<CoinOverview />} />
                  <Route path={"Contact"} element={<Contact />} />
                  <Route path={"coin/:id"} element={<CoinDetail />} />
              </Routes>


            </div>


        </>
    );
}

export default App;
