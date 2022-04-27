import React from 'react'
import './Login.scss'
import { images } from "../../constants"

import { DrizzleContext } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;


function Login() {
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

    <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;      
      if (!initialized) {
        return "Loading...";
      }
      return (
        <div>
        <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3}/>
        <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Certificate" method="test"/>
        {/* <ContractForm drizzle={drizzle} contract="Hello" method="set" /> */}
        </div>
      )
    }}
    </DrizzleContext.Consumer>
  )
}

export default Login