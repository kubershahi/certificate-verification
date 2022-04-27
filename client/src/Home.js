import './Home.scss';
import { BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import React from 'react'
import {About, Footer, Header} from './container';
import {Navbar} from './components'
import Login from './components/Login/Login';
import Upload from './components/Upload/Upload';
import Verify from './components/Verify/Verify';
import Share from './components/Share/Share';

function Home() {
  return (
    <>
    <BrowserRouter>
      <Router>
        <div className='app'>
            <Navbar/>
                <Switch>
                    <Route exact path="/upload">
                          <Upload/>
                    </Route>
                    <Route exact path="/verify">
                          <Verify/>
                    </Route>
                    <Route exact path="/share">
                          <Share/>
                    </Route>
                    <Route exact path="/login">
                          <Login/>
                    </Route>
                    <Route path="/">
                        <Header/>
                        <About/>
                        <Footer/>
                    </Route>
                </Switch>
        </div>
      </Router>
    </BrowserRouter>
    </>
  )
}

export default Home
