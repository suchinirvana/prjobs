import React from 'react'
import { Link } from 'react-router-dom'
const Image = (image) =>(
  <img src={image} width="1349" height="531" alt=""/>
)

function Banner({slider}) {
    const title = slider.title;
    const description = slider.description;
    const image = slider.image ? '/img/'+slider.image : '';
    const buttontitle = slider.button.title;
    const buttonurl = slider.button.url;
    return (
        <>
       <section className="main-banner flexslider1">
        <ul className="slides">
            <li> {image && Image(image)}
            <div className="caption">
                <div className="container">
                <div className="box">
                    
                    { title && <div className="heading">{title}</div>}
                    { description && <p>{description}</p>}
                    { buttonurl && <p className="btn-row"><Link to="" className="btn md-btn">{buttontitle}</Link></p>}
                   
                </div>
                </div>
            </div>
            </li>
        </ul>
        </section> 
        </>
    )
}

export default Banner

