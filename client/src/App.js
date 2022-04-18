import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
const { AccountData, ContractData, ContractForm } = newContextComponents;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;      
      if (!initialized) {
        return "Loading...";
      }
      return (
        <div>
        <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex={0} units="ether" precision={3}/>
        <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="Hello" method="get"/>
        <ContractForm drizzle={drizzle} contract="Hello" method="set" />
        </div>
      )
    }}
  </DrizzleContext.Consumer>
)
