import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import { Link } from 'react-router-dom'
function JobCategory() {
    const options = {
        margin: 15,
        responsiveClass: true,
        nav: true,
        autoplay: false,
        navText: ["Prev", "Next"],
        smartSpeed: 1000,
        dots:false,
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            600: {
                items: 3,
            },
            700: {
                items: 4,
            },
            1000: {
                items: 6,
            }
        },
      };
    return (
        <section className="categories-wrap">
        <div className="container">
            <h2>Popular Job Categories</h2>
            <p>Choose from the most popular job categories</p>
            <OwlCarousel className='categories-slider owl-carousel top-nav' {...options}>
           <Link to='' className="categories-box"> <i className="icon flaticon-settings"></i>
            <h3>Automotive</h3>
            <p>(70) Jobs </p>
            </Link> 
           <Link to='' className="categories-box"> <i className="icon flaticon-safety"></i>
            <h3>Construction</h3>
            <p>(70) Jobs </p>
            </Link><Link to='' className="categories-box"> <i className="icon flaticon-first-aid-kit"></i>
            <h3>Health Care </h3>
            <p>(70) Jobs </p>
            </Link><Link to='' className="categories-box"> <i className="icon flaticon-reception"></i>
            <h3>Hospitality</h3>
            <p>(70) Jobs </p>
            </Link><Link to='' className="categories-box"> <i className="icon flaticon-delivery-truck"></i>
            <h3>Logistics</h3>
            <p>(70) Jobs </p>
            </Link><Link to='' className="categories-box"> <i className="icon flaticon-manufacturer"></i>
            <h3>Manufacturing</h3>
            <p>(70) Jobs </p>
            </Link>

            </OwlCarousel>
        </div>
        </section>
    )
}

export default JobCategory

