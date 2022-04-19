import './Home.scss';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import React from 'react'
import {About, Footer, Header} from './container';
import {Navbar} from './components'
function Home() {
  return (
    <>
    <div className='app'>
        <Navbar/>
        <Switch>
          <Route path="/home">
            <Header/>
            <About/>
          </Route>
        </Switch>
        <Footer/>
    </div>
    </>
  )
}

export default Home
