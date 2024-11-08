import Vehicle from "../components/Vehicle";
import { useState } from "react";
import {Link} from "react-router-dom";


function Home(){

    const [count, setCount] = useState(0)

  //react hooks - useStage hook
  const [username, setUsername] = useState<string>("");

  
  function handleInputChange(event: any){
    setUsername(event.target.value);
  }

  function increaseCount() {
setCount(count + 1);

  }

  return (
    <div>
      <h1>Hello {username}</h1>

      <Link to="/profile">Profile</Link>

      <label>Enter username</label>
      <input type ="text" onChange={handleInputChange}/>

      <h1>Count: {count}</h1>
      <button onClick={increaseCount}>Increase</button>

      <h2>Vehicale</h2>
      <Vehicle title="Toyota Coralla" description="Total coralla is the highest vehical in the world"/>
      <Vehicle title="Toyota Landcruiser" description="The landcruizer is a reliable car"/>
      </div>
  )

}

export default Home;