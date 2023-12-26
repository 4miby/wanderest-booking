import React, { useContext } from 'react'
import './searchbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
const Searchbar = () => {
  const navigate = useNavigate();
  const [openDate, setopenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult:1,
    children:0,
    room:1
  })
  const handleOpenDate = ()=>
  {
    setopenDate(!openDate);
  }
  const handleOption = (name,operation)=>
  {
    setOptions(prev=>{return{
      ...prev, 
      [name]: operation === "i" ? options[name] + 1 : options[name] -1,
    }})
  }
  const handleOpenOptions = ()=>
  {
    setOpenOptions(!openOptions);
  }

  const {dispatch} = useContext(SearchContext);
  //Sử dụng SearchContext để khởi tạo dữ liệu tìm kiếm và gửi sang page khác
  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
    navigate("/hotels", {state:{destination, dates, options}})
  }
  return (
    <div className='search-bar-container'>
      <h1>Đặt Phòng</h1>
      <h3>Khám phá không gian phù hợp với bạn</h3>

      <div className='search-bar'>
        <div className='Search-item-container'>
          <p>Địa điểm</p>
          <div className='search-item'>
            <FontAwesomeIcon icon={faBed}></FontAwesomeIcon>
            <input type='text' placeholder='Tìm kiếm nơi muốn đến' 
            onChange={e=>setDestination(e.target.value)}></input>
          </div>
        </div>

        <div className='Search-item-container'>
          <p>Số lượng</p>
          <div className='search-item'>
            <FontAwesomeIcon icon={faPerson}></FontAwesomeIcon>
            <span className='SearchText'
                  onClick={handleOpenOptions}>
                {`${options.adult} Người lớn · ${options.children} Trẻ nhỏ · ${options.room} Phòng`}
            </span>
            {openOptions && (<div className='options'>
              <div className='optionItem'>
                <span className='optionText'>Người lớn</span>
                <div className='OptionCounter'>
                  <button className='optionCounterButton'
                   disabled={options.adult <=1}  
                  onClick={()=>handleOption("adult","d")}>-</button>
                  <span className='optionCounterNumber'>{options.adult}</span>
                  <button className='optionCounterButton'
                  onClick={()=>handleOption("adult","i")}>+</button>
                </div>
             
              </div>
              <div className='optionItem'>
                <span className='optionText'>Trẻ nhỏ</span>
                <div className='OptionCounter'>
                  <button className='optionCounterButton'
                    disabled={options.children <=1}  
                  onClick={()=>handleOption("children","d")}>-</button>
                  <span className='optionCounterNumber'>{options.children}</span>
                  <button className='optionCounterButton'
                  onClick={()=>handleOption("children","i")}>+</button>
                </div>
              </div>
              <div className='optionItem'>
                <span className='optionText'>Phòng</span>
                <div className='OptionCounter'>
                  <button className='optionCounterButton'
                    disabled={options.room <=1} 
                  onClick={()=>handleOption("room","d")}>-</button>
                  <span className='optionCounterNumber'>{options.room}</span>
                  <button className='optionCounterButton'
                  onClick={()=>handleOption("room","i")}>+</button>
                </div>
              </div>
            </div>)}
          </div>
        </div>

        <div className='Search-item-container'>
          <p>Ngày đặt phòng</p>
          <div className='search-item'>
            <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
            <span onClick={handleOpenDate}
            className='SearchText'>{`${format(dates[0].startDate,"dd/MM/yyyy")} tới ${format(dates[0].endDate,"dd/MM/yyyy")}` }</span>
            {openDate &&  <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className='date'
            />}
          </div>
        </div>  
      </div>

      <button className='booking-button' onClick={handleSearch}>ĐẶT NGAY</button>

    </div>
  )
}

export default Searchbar