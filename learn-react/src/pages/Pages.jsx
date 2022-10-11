import React from 'react'
import Categories from '../components/mainpage/Categories'
import SlideCard from '../components/mainpage/SlideCard'

const Pages = () => {
  return (
    <>
        <section className='home'>
            <div className='container d_flex'>
                <Categories />
                <SlideCard />
            </div>
        </section>
    </>
  )
}

export default Pages