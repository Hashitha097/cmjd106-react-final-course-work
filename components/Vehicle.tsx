import VehicleType from "../types/VehicleTypes";

//child component
function Vehicle(props: VehicleType){
    return(
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    )
  }

  export default Vehicle;