import React from 'react'
import Sdata from './Sdata'

const SlideCard = () => {
  return (
    <>
      {Sdata.map((value, index) => {
        return (
          <div className='box d_flex top' key={index}>
            <div className='left'>
              <h1>{value.title}</h1>
              <p>{value.desc}</p>
              <button className='btn-primary'>Visit Collections</button>
            </div>
            <div className='right'>
              <img src={value.cover} alt="" />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SlideCard