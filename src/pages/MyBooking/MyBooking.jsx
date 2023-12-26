import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { currencyFormat } from '../../utils/CurrencyFormat'
import { CityFormat } from '../../utils/CityFormat'
import './mybooking.css'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { format} from 'date-fns'  
const MyBooking = () => {
  const {id} = useParams();
  const {data, loading, error} = useFetch(`https://wanderest-api.onrender.com/api/users/reservations/${id}`);
  console.log(data);
  return (
    <div className='mybooking-page'>
      <Navbar/>
      <h2>Đặt chỗ của bạn</h2>
      {loading  ? "Loading" : (
          <div className="bookingContainer">
            {data.map((reservation)=>(
              <div className="bookingItem">
              <img src={reservation.img || ""} alt="" />
              <div className="bookingInfo">
                  <h3>{reservation.hotelName}</h3>
                  <span>{reservation.address}, {CityFormat(reservation.city)}</span>
                  <span>Số phòng:  
                    {reservation.roomNumbers.map((room)=>(<span> {room} </span>))}
                  </span>
                  <span>{`Ngày nhận phòng : ${format(new Date(reservation.startDate),"dd/MM/yyyy")}`}</span>
                  <span>{`Ngày trả phòng : ${format(new Date(reservation.endDate),"dd/MM/yyyy")}`}</span>
                  <span>Số người: {reservation.people}</span>
              </div>
              <div className="bookingPrice">
                <span>Tuyệt vời</span>
                {reservation.rating && <button>{reservation.rating}</button>}
                <span className='siPrice'>VNĐ {currencyFormat(reservation.price)}</span>
              </div>
            </div>
            ))}
          </div>
      )}
      <Footer/>
    </div>
  )
}

export default MyBooking