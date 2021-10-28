import React from 'react';
import PropTypes from 'prop-types';

export default function Weather(props) {
    return (
        <div className = "container text-light">
            {/* <h1>Weather App</h1> */}
            <div className="container ">
                <div className="cards pt-4">
                    <h1 className = "py-3">{props.city}</h1>
                    <h5 className="py-3"> <i className= {`wi ${props.icon} display-1`}></i> </h5>

                    {/* <h1 className="py-2">{props.celsius}&deg;</h1> */}
                    {props.celsius ? <h1 className="py-2">{props.celsius}&deg;</h1> : null}


                    {/* Showing max and min Temperature */}
                    {minMaxTemp(props.temp_min,props.temp_max)}

                    <h4 className="py-4">{props.description}</h4>
                </div>
            </div>
        </div>
    );
}


const minMaxTemp = (min,max) => {

    if(min, max){
        return(
            <h3>
                <span className="px-4">Min: {min}&deg;</span>
                <span className="px-4">Max: {max}&deg;</span>
            </h3>
            );
    }
    
}

Weather.propTypes = {
    city: PropTypes.string,
    country: PropTypes.string,
    description: PropTypes.string,
    temp_max: PropTypes.any,
    temp_min: PropTypes.any
}

// Weather.defaultProps = {
//     city: 'london',
//   country: 'uk'
//   description: '',
// }

