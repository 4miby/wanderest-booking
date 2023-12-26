import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import React, { useContext, useState } from 'react'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { currencyFormat } from "../../utils/CurrencyFormat";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, hotelId, hotelName, hotelAddress, hotelCity, userId, photo }) => {
  const navigate = useNavigate();
  // Biến xử lý id khi chọn phòng
  const [selectedRooms, setSelectedRooms] = useState([]);
  // Fetch data về tất cả phòng trong 1 hotel
  const {data,loading,error} = useFetch(`https://wanderest-api.onrender.com/api/hotels/room/${hotelId}`)
  // xử dụng SearchContext để lấy dữ liệu truyền từ trang chủ vào
  const {dates,options} = useContext(SearchContext);
  // Object sẽ được đẩy vào reservation database
  const [reserve, setReserve] = useState({
    hotelName: hotelName,
    address: hotelAddress,
    city: hotelCity,
    startDate: dates[0].startDate,
    endDate: dates[0].endDate,
    people: options.adult + options.children,
    img:photo
  });
  // Biến xử lý số phòng khi chọn phòng
  const [rooms, setRooms] = useState([]);
  // Biến xử lý giá tiền khi chọn phòng
  const [totalPrice, settotalPrice] = useState(0);
  // Hàm lấy các ngày giữa 2 ngày
  const getDatesInRange = (startDay,endDay)=>{
    const start = new Date(startDay);
    const end = new Date(endDay);
    const date = new Date(start.getTime());
    let list =[]
    while(date<= end)
    {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1);
    }
    return list
  };
  
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // Hàm kiểm tra xem phòng còn trống hay không
  const isAvailable = (roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some((date) =>
    allDates.includes(new Date(date).getTime())
  );
    return !isFound;
    
  }
  // Xử lý khi chọn phòng
  const handleSelect=(e)=>{
      const checked = e.target.checked;
      const value = e.target.value;
      const roomNumber = e.target.getAttribute('data-room-number')
      const price = e.target.getAttribute('data-price')
      // Ép kiểu sang int
      const numberValue = parseInt(price, 10) || 0;
      // Xử lý id để add dô unavailableday
      setSelectedRooms(checked ? [...selectedRooms,value]: selectedRooms.filter((item)=>item !== value));
      // Xử lý số phòng để add dô reservation
      setRooms(checked ? [...rooms,roomNumber]: rooms.filter((item)=>item !== roomNumber))
      // Xử lý giá tiền để add dô reservation
      settotalPrice(checked ? totalPrice + numberValue : totalPrice - numberValue);
  }
  //Xử lý khi đặt phòng
  const handleClick = async()=>{
    try{
     // Thực hiện post ngày vào từng id của room đã chọn
      await Promise.all(selectedRooms.map(roomId=>{
        const res = axios.put(`https://wanderest-api.onrender.com/api/rooms/availability/${roomId}`
        ,{dates:allDates});
    //    return res.data;
      }))
      const newReserv = {
        ...reserve,
        roomNumbers: rooms,
        price: totalPrice
      }
      await axios.post(`https://wanderest-api.onrender.com/api/reservations/${userId}`, newReserv)
      .then((respone)=>{
        toast.success(respone.data, {position:'top-right'});
        navigate("/");
      })
    }
    catch(err)
    {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
        <span>Select your rooms:</span>
        {data.map(item=>(
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle"> {item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max People: 
                <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{currencyFormat(item.price)} VNĐ</div>
              </div>
              <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber)=>(
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox"
                  data-room-number = {roomNumber.number}
                  data-price = {item.price} 
                  value={roomNumber._id}
                  disabled={!isAvailable(roomNumber)} 
                  onChange={handleSelect}/>
                </div>
              ))}
              </div>
            </div>
        ))}
        <button className="rButton" onClick={handleClick}>Đặt ngay</button>
      </div>
    </div>
  )
}

export default Reserve