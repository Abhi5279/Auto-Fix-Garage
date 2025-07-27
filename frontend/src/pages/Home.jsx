import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import OurServices from '../components/OurServices';

const Home = () => {

  const serviceRef = useRef(null);

  const scrollToServices = () => {
    serviceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero scrollToServices={scrollToServices} />
      <OurServices ref={serviceRef} />
    </div>
  );
};

export default Home;
