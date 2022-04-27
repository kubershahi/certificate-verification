import React, { useEffect } from 'react'
import './Login.scss'
import { images } from "../../constants"

function Login(props) {

  // useEffect(() => {
  //   if (props) {
  //     // do something
  //   }
  // }, []);

  if (!props.drizzleState) return "Waiting for State Initialization";
  const { drizzle, drizzleState } = props

  // console.log(drizzleState)
  // console.log(drizzle)

  // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
  if (drizzleState.drizzleStatus.initialized) {
    const contract = drizzle.contracts.Certificate;

    // Declare this call to be cached and synchronized. We'll receive the store key for recall.
    const dataKey = contract.methods.addRoot.cacheSend(("u","u"),{from: '0x96...'} )
    

    // Use the dataKey to display data from the store.
    // if(!drizzleState.contracts.Certificate.getOwner[dataKey]) return "Waiting"
    // console.log(drizzleState.contracts.Certificate.getOwner[dataKey].value)
  }


  // componentDidMount() => {
  //   const { drizzle } = this.props;
  //   const contract = drizzle.contracts.SimpleStorage;

  //   // get and save the key for the variable we are interested in
  //   const dataKey = contract.methods["storedData"].cacheCall();
  //   this.setState({ dataKey });
  // }

  // console.log("props",props)
  // console.log(props.contracts)
  // console.log(props.contractList)
  // console.log(drizzle.drizzle)
  // console.log(drizzle.drizzle.contractList)
  // var state = drizzle.store.getState()
  // console.log(state.drizzleStatus.initialized)
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