import React from 'react';
import Advertised from '../Advertised/Advertised';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories/Categories';
import Guide from '../Guide/Guide';
import Mockup from '../Mockup/Mockup';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Advertised></Advertised>
            <Categories></Categories>
            {/* <Mockup></Mockup> */}
            <Guide></Guide>
        </div>
    );
};

export default Home;