import React from 'react'
import iphone from "../../../assets/iphone-14-pro.webp";
import mac from '../../../assets/mac-system-cut.jfif'
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <HeroSection title="Buy iPhone 14 Pro" subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever." link="/product/668e9e6c361140d9641b0d25" image={iphone}/>
      
      <FeaturedProducts />

      <HeroSection title="Build the ultimate setup"
       subtitle="You can add Studio Display and colour-Magic accessories to you bag after cofigure your Mac mini." link="/product/668e9e6c361140d9641b0d2d" image={mac}/>
    </div>
  )
}

export default HomePage
