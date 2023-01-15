import React from 'react';
import Advertised from '../Advertised/Advertised';
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories/Categories';
import Guide from '../Guide/Guide';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Advertised></Advertised>
            <Categories></Categories>
            <Guide></Guide>
        </div>
    );
};

export default Home;