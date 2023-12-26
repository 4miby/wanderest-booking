import React from 'react'
import { Link } from 'react-router-dom'
import './SearchItem.css'
import { currencyFormat } from '../../utils/CurrencyFormat'
import { CityFormat } from '../../utils/CityFormat'
const SearchItem = ({item}) => {
  return (
    <div className='Search-Item'>
      <img src={item.photos[0]} 
      alt=""
      className='siImg'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siAddress'>{item.address}, {CityFormat(item.city)}</span>
        <span className='siDistance'>Cách xa Trung Tâm thành phố {item.distance}</span>
        <span className='siSubtitle'>
          Phòng có điều hòa, rộng 21 m vuông và có 2 giường ngủ
        </span>
      </div>
      <div className='siDetails'>
        {item.rating && <div className='siRating'>
          <span>Tuyệt vời</span>
          <button>{item.rating}</button>
        </div>}
        
        <div className='siDetailTexts'>
            <span className='siPrice'>VNĐ {currencyFormat(item.cheapestPrice)}</span>
            <span className='siTaxOp'>Đã bao gồm thuế</span>
            <Link to={item.slug}><button className='siCheckButton'>Xem Phòng</button></Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem