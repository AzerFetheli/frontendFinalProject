import React from 'react'
import "./Footer.css"

export default function Footer() {
    return (
        <footer>
            <div className="footerContainer">
                <div className='topFooter'>
                    <div className='topText'>
                        <img src="https://boyka-demo.myshopify.com/cdn/shop/files/logo_footer_300x300.png?v=1613792581" />
                        <p><i className="fa-solid fa-house"></i><span>123 Main Street, Anytown, CA 12345 - USA.</span></p>
                        <p><i className="fa-solid fa-phone"></i><span> 123 456 789</span></p>
                        <p><i className="fa-solid fa-envelope-open"><span> info@domain.com</span></i></p>
                        <p>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-solid fa-rss"></i>
                            <i className="fa-brands fa-google-plus-g"></i>
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-youtube"></i>
                        </p>
                    </div>
                    <div className='topText'>
                        <h3>Products</h3>
                        <p>Prices drop</p>
                        <p>New products</p>
                        <p>Best sales</p>
                        <p>Contact us</p>
                    </div>
                    <div className='topText'>
                        <h3>Our company</h3>
                        <p>Delivery</p>
                        <p>About us</p>
                        <p>Wishlist</p>
                        <p>Sitemap</p>
                        <p>Stores</p>
                    </div>
                    <div className='topText'>
                        <h3>Join Our Newsletter Now</h3>
                        <input type="email" placeholder='email@example.com' />
                        <p>Get E-mail updates about our latest shop and</p>
                        <p>special offers.</p>
                    </div>
                </div>
                <div className='bottomFooter'>
                    <p>Copyright © 2021 HasThemes | Built with Boyka by HasThemes.</p>
                    <img src="https://boyka-demo.myshopify.com/cdn/shop/files/1.png?v=1613792537" alt="" />
                </div>
            </div>
        </footer>
    )
}
