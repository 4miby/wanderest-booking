import React, { useState } from 'react'
import BackgrounSlider from '../Home/BackgrounSlider.jsx'
import './Reset.css'
import logo from '../../Resources/icons/hotel1.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Reset = () => {
  const imageslide = [
    "https://images.pexels.com/photos/14435439/pexels-photo-14435439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1602646994030-464f98de5e5c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1557770401-dabe8321c0c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
  const [email, setEmail] = useState("");
  const handleChange = (e)=>{
    setEmail((prev)=>({...prev, [e.target.id]:e.target.value}))
  }
  const handleSubmit = async(e)=>{
    try{
      await axios.post("https://wanderest-api.onrender.com/api/auth/reset",email)
      .then((respone)=>{
        toast.success(respone.data, {position:'top-right'});
      })
    }catch(err){
      console.log(err);
    }
  }
  return (  
    <div className='reset-page'>
      <div className="backgroundSlider">   
        <BackgrounSlider imageslide={imageslide}></BackgrounSlider>
      </div>
      <div className="resetContainer">
        <img src={logo}></img>
        <div className="resetInfoContainer">
          <h1>WandeRest</h1>
          <h3>Yêu cầu đổi mật khẩu</h3>
          <form className='resetInfo' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type='email' required 
            id="email"
            onChange={handleChange} 
            placeholder='Nhập email của bạn'></input>
            <button>Gửi</button>
          </form>
          <div className='LinktoLogin' >
              <p>Quay lại trang đăng nhập</p>
              <Link to={"/login"}>Đăng nhập</Link>
          </div>
          <div className='LinktoServices'>
            <Link>Điều khoản</Link>
            <Link>Chính sách</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reset
