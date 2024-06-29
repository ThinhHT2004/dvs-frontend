import React from 'react'
import Navbar from '../Navbar/Navbar'
import Reviews from './CardComponent.jsx';
import Assistance from './AssistanceComponent.jsx';
import Footer from '../footer/Footer.jsx'
import Banner from './BannerComponent.jsx'
import Guider from './GuiderComponent.jsx'

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Assistance></Assistance>
      <Reviews></Reviews>
      <Guider></Guider>
      <Footer></Footer>
    </div>
  )
}

export default HomePage;


