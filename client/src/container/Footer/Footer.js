import React from 'react'
import './Footer.scss'
import {images} from "../../constants"

function Footer() {
  return (
    <>
     <h2 className="head-text">Have a coffee <span> and chat with us!</span></h2>
     <div className="app__footer-cards">
      <div className="app__footer-card ">
        <img src={images.email} alt="email" />
        <a href="mailto:hello@micael.com" className="p-text">hello@micael.com</a>
      </div>x
      <div className="app__footer-card">
        <img src={images.mobile} alt="phone" />
        <a href="tel:+1 (123) 456-7890" className="p-text">+1 (123) 456-7890</a>
      </div>
    </div>
    </>
  )
}

export default Footer