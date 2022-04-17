import React from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin";

const {useDrizzleState} = drizzleReactHooks;

function LoadingContainer({childern}){
    const drizzleStatus = useDrizzleState(state =>state.drizzleStatus);
    if (drizzleStatus === false){
        return "loading...";
    }
    else {
        console.log("hello")
        return {childern};
    }
}

export default LoadingContainer;