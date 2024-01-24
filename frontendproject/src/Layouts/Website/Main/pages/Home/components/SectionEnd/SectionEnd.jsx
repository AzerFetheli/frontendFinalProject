import React from 'react'
import "./sectionEnd.css"

export default function SectionEnd() {
    return (
        <section className="sectionEnd">
            <div className="sectionEndContainer">
                <div className="sectionEndDiv">
                    <div className="divIcon">
                        <i className="fa-solid fa-truck"></i>
                    </div>
                    <div className="divText">
                        <h4>Free Shipping</h4>
                        <p>Free shipping on all US order or order above $200</p>

                    </div>
                </div>
                <div className="sectionEndDiv">
                    <div className="divIcon">
                        <i className="fa-regular fa-life-ring"></i>
                    </div>
                    <div className="divText">
                        <h4>Support 24/7</h4>
                        <p>Contact us 24 hours a day, 7 days a week</p>
                    </div>
                </div>
                <div className="sectionEndDiv">
                    <div className="divIcon">
                        <i className="fa-solid fa-rotate-left"></i>
                    </div>
                    <div className="divText">
                        <h4>30 Days Return</h4>
                        <p>Simply return it within 30 days for an exchange</p>
                    </div>
                </div>
                <div className="sectionEndDiv">
                    <div className="divIcon">
                        <i className="fa-regular fa-credit-card"></i>
                    </div>
                    <div className="divText">
                        <h4>100% Payment Secure</h4>
                        <p>We ensure secure payment with PEV</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
