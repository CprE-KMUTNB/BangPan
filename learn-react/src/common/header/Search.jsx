import React from 'react'
import logo from '../assets/images/Bangpan.svg'
import { Link } from 'react-router-dom'

const Search = () => {
  window.addEventListener('scroll', function() {
    const search = document.querySelector('.search')
    search.classList.toggle('active', window.scrollY > 100)
  })
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='ค้นหา...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            <div className='user'>
              <Link to='/profile'> {/* มาเปลี่ยน path ด้วย */}
                <i className='fa fa-user icon-circle'></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search