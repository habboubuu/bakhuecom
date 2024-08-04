import service1 from './../../Assets/services/service-icon-1.svg';
import service2 from './../../Assets/services/service-icon-2.svg';
import service3 from './../../Assets/services/service-icon-3.svg';
import service4 from './../../Assets/services/service-icon-4.svg';
import React from 'react';
import './Services.css';

const detaServices = [
    {
        id: 1,
        image: service1,
        title: "Free Shipping",
        subtitle: "On All Order Over $599",
    },
    {
        id: 2,
        image: service2,
        title: "Easy Returns",
        subtitle: "30 Day Returns Policy",
    },
    {
        id: 3,
        image: service3,
        title: "Secure Payment",
        subtitle: "100% Secure Gaurantee",
    },
    {
        id: 4,
        image: service4,
        title: "Special Support",
        subtitle: "24/7 Dedicated Support",
    },
]

const dataShow = detaServices.map((item, key) => (
    <div key={key} className='service-itmx'>
      <div className='itmxser'>
        <img src={item.image} />
        <div className='source-services'>
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
        </div>
      </div>
    </div>
));



const ServicesData = () => {
  return (
    <>
        {dataShow}
    </>
  )
}

export default ServicesData
