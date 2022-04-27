import React from 'react'
import './Login.scss'
import { images } from "../../constants"

function Login(drizzle) {
  console.log(drizzle.drizzle)
  var state = drizzle.drizzle.store.getState()
  console.log(state.drizzleStatus.initialized)
  return (

    // <div className="app__header app__flex">
    //   <div className="app__header-badge">
    //     <div className="badge-cmp app__flex">
    //       <div style={{ marginLeft: 20 }}>
    //         <p className="p-text">Login</p>
    //         <h1 className="head-texter">We make it possible!</h1>
    //       </div>
    //     </div>

    //     <div className="tag-cmp app__flex">
    //       <p className="p-text">See below</p>
    //     </div>
    //   </div>
  
    // <img src={images.git} alt="profile_bg" /> 
    // </div>

    // <DrizzleContext.Consumer>
    // {drizzleContext => {
    //   const { drizzle, drizzleState, initialized } = drizzleContext;      
    //   if (!initialized) {
    //     return "Loading...";
    //   }
    //   return (
    //     <div>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //       <br></br>
    //     <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3}/>
    //     <ContractForm drizzle={drizzle} drizzleState={drizzleState} contract="Certificate" method="addroot"/>
    //     {/* <ContractForm drizzle={drizzle} contract="Hello" method="set" /> */}
    //     </div>
    //   )
    // }}
    // </DrizzleContext.Consumer>
    <h1>hello</h1>
  )
}

export default Login