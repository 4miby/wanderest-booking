import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer-container'>
      <h1>WandeRest</h1>
      <div className='service-container'>
        <div className='services'>
          <Link>Về chúng tôi</Link>
          <Link>Liên hệ</Link>
          <Link>Địa điểm</Link>
        </div>
        <div className='services'>
          <Link>Hỗ trợ</Link>
          <Link>Điều khoản</Link>
          <Link>Chính sách</Link>
        </div>
        <div className='services'>
          <Link>Cơ sở vật chất</Link>
          <Link>Dịch vụ</Link>
          <Link>Hướng dẫn</Link>
        </div>
      </div>
     <hr></hr>
     <p>© Copyright Booking Hotels. All rigt reserved.</p>
    </div>
  )
}

export default Footer