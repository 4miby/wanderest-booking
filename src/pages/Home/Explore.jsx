import React, { useContext, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Hanoi from '../../Resources/pictures/Hanoi.png'
import DaNang from '../../Resources/pictures/DaNang.png'
import HCM from '../../Resources/pictures/HoChiMinh.png'
import NhaTrang from '../../Resources/pictures/Nha Trang.png'
import DaLat from '../../Resources/pictures/DaLat.png'
import './explore.css'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
const Explore = () => {
  const navigate = useNavigate();
  const [destination,setDestination] = useState("");
  // Lấy dữ liệu số lượng dịch vụ ở các thành phố
  const {data,loading, error} = useFetch("https://wanderest-api.onrender.com/api/hotels/countbycity?cities=HaNoi,HCM,DaNang,NhaTrang,DaLat");
  
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [options, setOptions] = useState({
    adult:1,
    children:0,
    room:1
  })
  
  const {dispatch} = useContext(SearchContext);
  const handleClick = ()=>{ 
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate("/hotels", {state:{destination, dates, options}})
  }
  return (
    <div className='explore-container'>
      <h1 className='explore-title'>Khám phá</h1>
      <div className='row-image'>
        <div className='exploreItem' onMouseOver={()=>setDestination("HaNoi")} onClick={handleClick}>
            <img src={Hanoi}  alt=""></img>
            <h1>Hà Nội</h1>
            <h2>{data[0]} Dịch vụ</h2>
        </div>
        <div className='column-image'>
          <div className='exploreItem' onMouseOver={()=>setDestination("HCM")} onClick={handleClick}>
            <img src={HCM} alt=""></img>
            <h1>Hồ Chí Minh</h1>
            <h2>{data[1]} Dịch vụ</h2>
          </div>
          <div className='exploreItem' onMouseOver={()=>setDestination("DaNang")} onClick={handleClick}>
            <img src={DaNang} alt=""></img>
            <h1>Đà Nẵng</h1>
            <h2>{data[2]} Dịch vụ</h2>
          </div>
        </div>
        <div className='column-image'>
          <div className='exploreItem'onMouseOver={()=>setDestination("NhaTrang")} onClick={handleClick}>
            <img src={NhaTrang} alt=""></img>
            <h1>Nha Trang</h1>
            <h2>{data[3]} Dịch vụ</h2>
          </div>
          <div className='exploreItem' onMouseOver={()=>setDestination("DaLat")} onClick={handleClick}>   
            <img src={DaLat} alt=""></img>
            <h1>Đà Lạt</h1>
            <h2>{data[4]} Dịch vụ</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore