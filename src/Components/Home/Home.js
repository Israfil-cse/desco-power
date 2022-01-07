import React from 'react';
import Billing from '../Billing/Billing';
import BilingsManager from '../Shared/BilingsManager/BilingsManager';
import Header from '../Shared/Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <BilingsManager></BilingsManager>
            <Billing></Billing>
        </div>
    );
};

export default Home;