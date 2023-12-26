import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState} from 'react'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import './sale.css'
import useFetch from "../../hooks/useFetch"
import { currencyFormat } from '../../utils/CurrencyFormat'
import { CityFormat } from '../../utils/CityFormat'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
const Sale = () => {
  const navigate = useNavigate();
  //Fetch featured hotel data && limit =3 (chỉ gọi đúng 3 giá trị)
  const {data,loading,error} = useFetch("https://wanderest-api.onrender.com/api/hotels?featured=true&limit=3");
  const [destination, setDestination] = useState("");
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
  });
  const {dispatch} = useContext(SearchContext);
  const handleClick = (slug)=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate(`/hotels/${slug}`, {state:{destination, dates, options}})
  }
  return (
    <div className='sale-container'>
      <h1>Các nhà ở được yêu thích</h1>
      <p className='sale-description'>Các nhà ở được khách hàng yêu mến và đặt trọn niềm tin</p>
      <div className='sale-room-container'>
      {loading ? ("Loading"): 
      (<>{data.map(item=>(
            <div className='sale-room' key={item._id}
            onMouseOver={()=>setDestination(item.city)} 
            onClick={()=>handleClick(item.slug)}>
            <img alt="" src={item.photos[0]}></img>
            <div className='room-info'>
              <div className='roomTitleContainer'>
                <p className='typeTitle'>{item.type}</p>
                <h2>{item.name}</h2>
              </div>
                { item.rating && <button className='rating'>{item.rating}</button>}
            </div>

            <div className='address-container'>
            <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            <p>{item.address}, {CityFormat(item.city)}</p>
            </div>
            <p>{item.title}</p>
            <p className='price'>VNĐ {currencyFormat(item.cheapestPrice)} / Đêm</p>
            <p className='sale'></p>
        </div>
      ))} 
      </>)}
        
        
      </div>
    </div>
  )
}

export default Sale