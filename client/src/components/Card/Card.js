import { useEffect, useState } from 'react';
import { studentCardData, teacherCardData } from '../../data/data';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { setHomeData } from '../../store/Slices/homeDataSlice';

const Card = () => {
    const { cardData } = useSelector((state) => {
        return state.homeData;
    });
    return (
        <div className='cards'>
            {cardData.map((card) => {
                return (
                    <div className='card' key={card.id}>
                        <div className='card-heading-icon'>
                            <img src={card.icon} alt={card.alt} />
                        </div>
                        <div className='card-heading-txt'>
                            <div className='card-heading'>{card.title}</div>
                            <div className='card-txt'>{card.data}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Card;
