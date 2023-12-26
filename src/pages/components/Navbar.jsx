import React, { useContext, useState } from 'react'
import './navbar.css'
import logo from '../../Resources/icons/hotel.png'
import { Link, useNavigate } from 'react-router-dom'
import userpng from "../../Resources/icons/user.png"
import logout from '../../Resources/icons/log-out.png'
import question from '../../Resources/icons/question.png'
import reserve from "../../Resources/icons/reserve.png"
import DropDownItem from './Dropdownitem'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const Navbar = () => {
  const navigate = useNavigate();
  const [isDrop,setIsDrop]= useState(false);
  // sử dụng authcontext để lấy dữ liệu user đang đăng nhập
  const {user,dispatch} = useContext(AuthContext);

  // Xử lý khi bấm vào nút đăng nhập
  const handleSignIn =()=>{
      navigate("/login") // Điều hướng đến page login
  }

  // Xử lý khi bấm vào nút đăng xuất
  // BEGIN
  const handleSignOut = async ()=>{
    dispatch({type:"LOGOUT"}); // Thực hiện action là LOGOUT
    setIsDrop(false);
    await axios.get("/auth/logout"); // call api để xóa access_token ra khỏi cookie
    navigate("/"); // Điều hướng đến trang chủ
  }
  // END

  // Xử lý thả drop menu
  const onclickHandle = ()=>
  {
    setIsDrop(!isDrop); 
  }
 
  // Xử lý khi bấm vào nút Khám phá
  const ExploreClick = ()=>
  {
    // Lướt tới phần khám phá
    window.scrollTo( 
      {
        top:1200,
        behavior:'smooth'
      }
    )
  }

  // Xử lý khi bấm vào nút Phòng
  const RoomClick = ()=>
  { 
    // Lướt tới phần phòng 
    window.scrollTo(
      {
        top:2080,
        behavior:'smooth'
      }
    )
  }
  
  // Xử lý khi bấm vào nút Dịch vụ
  const ServiceClick = ()=>
  {
    // Lướt tới Footer
    window.scrollTo(
      {
        top: 2500,
        behavior:'smooth'
      }
    )
  }
  
  return (
    <div className='navbar'>
      <img src={logo}></img>
      <Link to="/" className='Home-link'>Trang Chủ</Link>
      <p onClick={ExploreClick}>Khám Phá</p>
      <h1>WandeRest</h1>
      <p onClick={RoomClick}>Phòng</p>
      <p onClick={ServiceClick}>Dịch Vụ</p>
      {!user &&<button onClick={handleSignIn}>Đăng nhập</button>}
      { user && (<div className='AccountButton'>
        <img src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} /> 
        <span onClick={onclickHandle}>{user.username}</span>
      </div>)
      }

      {user && (<div className={`DropDownMenu ${isDrop ? 'active' :'inactive'}`}>
      <DropDownItem text="Thông tin" img={userpng} path={`/infor/${user.username}`}></DropDownItem>
      <DropDownItem text="Đặt chỗ của tôi" img={reserve} path={`/mybooking/${user.username}`}></DropDownItem>
      <DropDownItem text="Về chúng tôi" img={question} path="/AboutUs"></DropDownItem>
      <div onClick={handleSignOut}>
        <DropDownItem text="Đăng xuất"  img={logout}></DropDownItem>
      </div>
      </div>)}
    </div>
  )
}

export default Navbar