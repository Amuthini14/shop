import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { array } from 'yup';

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {

                const ratingVal = i + 1;

                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingVal}
                            onClick={() => setRating(ratingVal)}
                        />
                        <FaStar
                            size={30}
                            color={ratingVal <=( hover || rating) ? "#ffc107" : "e4e5e9"}
                            className="star"
                            onMouseEnter={()=>setHover(ratingVal)}
                            onMouseLeave={()=>setHover(null)}
                        />
                    </label>
                   
                )
            })}
            
        </div>
    )
}

export default Rating;