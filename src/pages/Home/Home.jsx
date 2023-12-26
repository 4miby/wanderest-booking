import React from 'react'
import BackgrounSlider from './BackgrounSlider'
import './home.css'
import Searchbar from './Searchbar'
import Explore from './Explore'
import Sale from './Sale'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Home = () => {
  const imageslide = ['https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];
  return (
    <div className='home-page'>
      <Navbar/>
      <div className='background-slide'>
          <BackgrounSlider imageslide={imageslide}/>
      </div>
      <Searchbar/>
      <Explore/>
      <Sale/>
      <Footer></Footer>
    </div>
    
  )
}

export default Home