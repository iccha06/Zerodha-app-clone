import React from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import LeftSec from './LeftSec';
import RightSec from './RightSec';
import Universe from './Universe';
import Footer from '../Footer';

function ProductsPage() {
    return (
        <>

            <Hero />

            <LeftSec
                image="src/images/kite.png"
                title="Kite"
                description="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
                tryDemo="Try demo →"
                learnMore="Learn more →"
            />

            <RightSec
                image="src/images/console.png"
                title="Console"
                description="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
                learnMore="Learn more →"
            />

            <LeftSec
                image="src/images/coin.png"
                title="Coin"
                description="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
                learnMore="Coin →"
            />

            <RightSec
                image="src/images/kiteconnect.png"
                title="Kite Connect API"
                description="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs."
                learnMore="Kite Connect →"
            />

            <Universe />
        </>
    );
}

export default ProductsPage;