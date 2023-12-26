import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './infor.css'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
const Infor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file,setFile] = useState();
  const {data, loading, error} = useFetch(`https://wanderest-api.onrender.com/api/users/${id}`);
  const [user, setUser] = useState({});
  // Kiểm tra user đã có ảnh hay chưa
  const [img,setImg] = useState();
  useEffect(()=>{
    const userimg = data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
    setImg(userimg);
  });
  // Xử lý nhập dữ liệu
  const inputChangeHandler = (e)=>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
    console.log(user);
  }
  // Xu ly khi bam nut update
  const handleClick = async(e)=>{
    e.preventDefault();
    const datafile = new FormData();
    datafile.append("file",file);
    datafile.append("upload_preset","upload");
    
    try{

      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/amiby/image/upload",datafile);
      console.log(uploadRes.data);
      const {url} = uploadRes.data;
      const newUser = {
        ...user,
        img:url
      }
      await axios.put(`https://wanderest-api.onrender.com/api/users/${id}`, newUser);
      navigate("/");
    }
    catch(err)
    {
      console.log(err);
    }
  }


  return (
      <div className="inforPage">
        <Navbar/>

        {loading ? "Loading" : (
        <div className='inforContainer'>

          <div className='imgContainer'>
            <img src={
                file
                  ? URL.createObjectURL(file)
                  : img
              }
               alt="" />
            <h1 className='name'>{data.username}</h1>
            <input
                  type="file"
                  id="file"
                  onChange={(e)=>setFile(e.target.files[0])}
            > 
            </input>
          </div>

          
          <div className='changeContainer'>
            <h2>Thay đổi thông tin</h2>
            <form className='changeInfo'>
              <div className='changeItem'>
                <label>Tên người dùng</label>
                <input type='text' disabled 
                placeholder={data.username}></input>
              </div>
              <div className='changeItem'>
                <label>Email</label>
                <input type='email' disabled 
                placeholder={data.email}></input>
              </div>
              <div className='changeItem'>
                <label>Địa chỉ</label>
                <input type='text' name="address"
                placeholder={data.address || ""} 
                onChange={inputChangeHandler}></input>
              </div>
              <div className='changeItem'>
                <label>SĐT</label>
                <input type='text' name="phoneNumber"
                placeholder={data.phoneNumber || ""} 
                onChange={inputChangeHandler}></input>
              </div>
              <div className='changeItem'>
                <label>Giới tính</label>
                <select name="GT" onChange={inputChangeHandler}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Không xác định">Không xác định</option>
                  </select>
              </div>
              <div className='changeItem'>
                <label>Ngày sinh</label>
                <input type='date' onChange={inputChangeHandler} name='Birth'></input>
              </div>
              <button onClick={handleClick}>Thay đổi thông tin</button>
            </form>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default Infor