import './Home.scss';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import React from 'react'
import { About, Footer, Header } from './container';
import { Navbar } from './components'
import Login from './components/About/about';
import Upload from './components/Upload/Upload';
import Verify from './components/Verify/Verify';
import Share from './components/Share/Share';
import { DrizzleContext } from "@drizzle/react-plugin";
import {useEffect} from 'react'


// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      if (!initialized) {
        return "Loading...";
      }
      return (
        <BrowserRouter>
          <Router>
            <div className='app'>
              <Navbar />
              <Switch>
                <Route exact path="/upload">
                  <Upload drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route exact path="/verify">
                  <Verify drizzle={drizzle} drizzleState={drizzleState}  />
                </Route>
                <Route exact path="/share">
                  <Share drizzle={drizzle} drizzleState={drizzleState}  />
                </Route>
                <Route exact path="/about">
                  <Login drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route path="/">
                  <Header />
                  <About />
                  {/* <Footer /> */}
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </Route>
              </Switch>
            </div>
          </Router>
        </BrowserRouter>
      );
    }}
  </DrizzleContext.Consumer>
)


// function Home(props) {
//   const {drizzle} = props;
//   console.log(drizzle)
//   return (
    // <BrowserRouter>
    //   <Router>
    //     <div className='app'>
    //         <Navbar/>
    //             <Switch>
    //                 <Route exact path="/upload">
    //                       <Upload />
    //                 </Route>
    //                 <Route exact path="/verify">
    //                       <Verify />
    //                 </Route>
    //                 <Route exact path="/share">
    //                       <Share/>
    //                 </Route>
    //                 <Route exact path="/login">
    //                       <Login drizzle = {props}/>
    //                 </Route>
    //                 <Route path="/">
    //                     <Header/>
    //                     <About/>
    //                     <Footer/>
    //                 </Route>
    //             </Switch>
    //     </div>
    //   </Router>
    // </BrowserRouter>
//   )
// }

// export default Home;
