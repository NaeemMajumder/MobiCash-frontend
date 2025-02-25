import React from 'react';
import HeroSlider from '../../header/HeroSlider';
import Services from './services/Services';
import Marquees from './marquee/Marquee';
import Banner from './banner/Banner';
import FAQ from './faq/FAQ';

const Main = () => {
    return (
        <>
            <section className='mb-4'>
                <HeroSlider/>
            </section>
            <section className='mb-28'>
                <Marquees/>
            </section>
            <section className='bg-[#F2F6FE] py-20 mb-28'>
                <Services/>
            </section>
            <section className='mb-28'>
                <Banner/>
            </section>
            <section className='width pb-28'>
                <FAQ/>
            </section>
        </>
    );
};

export default Main;