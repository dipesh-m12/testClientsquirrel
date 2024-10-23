import React from 'react';
import '../Services/Services.css';
import NavBar from '../NavBar/NavBar';
import headerImage from '../../images/service.png'; // Replace with the actual header image path
import icon1 from '../../images/serIcon1.png'; // Replace with the actual icon paths
import icon2 from '../../images/serIcon2.png';
import icon3 from '../../images/serIcon3.png';
import icon4 from '../../images/serIcon4.png';
import SerCenterImage from '../../images/SerCenterImage.png';
import ContactUsCommon from '../ContactUsCommon/ContactUsCommon';

function Services() {
  return (
    <>
      <NavBar />
      <div className="services-section">
        {/* Header Image Section */}
        <div className="header-image">
          <img src={headerImage} alt="Service illustration" />
        </div>

        {/* Icon Section */}
        <div className="icon-section">

          <div className='offer-card99'>
            <div className="icon-card">
              <img src={icon1} alt="Icon 1" />
            </div>
          </div>

          <div className='offer-card99'>
            <div className="icon-card">
              <img src={icon2} alt="Icon 2" />
            </div>
          </div>

          <div className='offer-card99'>
            <div className="icon-card">
              <img src={icon3} alt="Icon 3" />
            </div>
          </div>

          <div className='offer-card99'>
            <div className="icon-card">
              <img src={icon4} alt="Icon 4" />
            </div>
          </div>

        </div>

        {/* Services Grid */}

        <div className="service-grid-container">
          <div className="service-item top-left">
            <div className='Ovalshape'>
              <h3>Patent Commercialization</h3>
            </div>
            <p>
              At SQUIRREL IP, we simplify patent commercialization by connecting innovators with industries through our specialized services. We're also creating a simple platform to speed up this process, helping new ideas get to market faster and more efficiently.
            </p>

          </div>

          <div className="service-item top-right">
            <div className='Ovalshape'>
              <h3>IP Filing</h3>
            </div>
            <p>
              Our IP Filing Services handle all the paperwork for patents, trademarks, and copyrights. We make sure your intellectual property is properly filed and protected, so you can focus on what matters most—bringing your ideas to life.
            </p>
          </div>

          <div className="center-icon">
            <img src={SerCenterImage} alt="Center Icon" className="center-image" />
          </div>

          <div className="service-item bottom-left">

            <p>
              We know some patents aren't ready for industry use. So, we offer custom patent solutions tailored to fit specific industry needs, making innovations practical and valuable for different sectors.
            </p>
            <div className='Ovalshape-bottom'>
              <h3>Patent Customization</h3>
            </div>
          </div>

          <div className="service-item bottom-right">

            <p>
              At SQUIRREL IP, we foster a vibrant community where scientists and innovators can collaborate on projects, and discuss the latest advancements in technology. Our platform connects like-minded individuals, facilitating partnerships and driving continuous innovation.
            </p>
            <div className='Ovalshape-bottom'>
              <h3>Community</h3>
            </div>
          </div>
        </div>

        <ContactUsCommon/>

      </div>
    </>
  );
};


export default Services;