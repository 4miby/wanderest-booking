import React, { useEffect, useState} from 'react'
import BackgrounSlider from '../Home/BackgrounSlider.jsx'
import './ResetPassword.css'
import logo from '../../Resources/icons/hotel1.png'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const ResetPassword = () => {
  const imageslide = [
    "https://images.pexels.com/photos/14435439/pexels-photo-14435439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1602646994030-464f98de5e5c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1557770401-dabe8321c0c5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]

  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  // Sử dụng location để lấy url
  const location = useLocation();
  // Tách query string từ URL
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị từ query string
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  // Đưa id và token vào req.body
  useEffect(()=>{
    setInfo({...info,id:id,token:token})
  },[])
  //Xử lý nhập liệu
  const handleChange = (e)=>{
    setInfo((prev)=>({...prev, [e.target.id]:e.target.value}))
  }
  //Xử lý nút gửi
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      // post data để yêu cầu reset pass
      await axios.post("https://wanderest-api.onrender.com/api/auth/resetPassword",info)
      .then((respone)=>{
        toast.success(respone.data, {position:'top-right'});
        navigate("/login");
      })
    }
    catch(err){
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
          <h3>Đổi lại mật khẩu</h3>
          <form className='resetInfo' onSubmit={handleSubmit}>
            <label>Mật khẩu mới</label>
            <input type='password' required 
            id="password"
            onChange={handleChange} 
            placeholder='Nhập mật khẩu mới của bạn'></input>
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

export default ResetPassword
