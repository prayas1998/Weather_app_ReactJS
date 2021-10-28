import React from "react";
import "./FormStyle.css";

function Form(props) {
    return (
        <div>
            <div className="container h-100">
                <div>{props.error?error():null}</div>
                <form action="" onSubmit={props.getWeather}>
                    <div className="row">

                        <div className="col-md-3 offset-md-2"> 
                        <input className="form-control" type="text" name="city" placeholder="Enter City.."  autoComplete="off" /> 
                        </div>

                        <div className="col-md-3"> 
                        <input className="form-control" type="text" name="country" placeholder="Enter Country.." autoComplete="off"  /> 
                        </div>

                        <div className="col-md-3 mt-md-0 text-md-left"> 
                        <button className="btn btn-warning"> Get Weather </button> 
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

const error = () => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country...!
      </div>
    );
  };



export default Form
