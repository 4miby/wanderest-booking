import React from 'react'
import './Dropdownitem.css'
import { Link } from 'react-router-dom';

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img alt="" src={props.img}></img>
      <Link to={props.path}>{props.text}</Link>
    </li>
  );
}

export default DropdownItem 