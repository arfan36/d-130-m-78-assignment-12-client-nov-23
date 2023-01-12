import React from 'react';
import Advertised from '../Advertised/Advertised';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories/Categories';
import Mockup from '../Mockup/Mockup';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Advertised></Advertised>
            <Categories></Categories>
            <Mockup></Mockup>
        </div>
    );
};

export default Home;