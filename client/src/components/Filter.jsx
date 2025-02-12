import React from 'react'
import { assets } from '../assets/assets'

const Filter = () => {
  return (
    <div className='flex  items-center justify-between  py-4'>
        <div className='flex gap-2 items-center'>
            <span><img src={assets.logo} alt="" /></span>
            <span className='hidden md:block text-gray-400 text-sm'>| Copyright @GreatStack.dev | All right reserved.</span>
        </div>
        <div className='flex gap-2'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Filter