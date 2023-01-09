import React from 'react';
import Advertised from '../Advertised/Advertised';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories/Categories';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Advertised></Advertised>
            <Categories></Categories>
        </div>
    );
};

export default Home;