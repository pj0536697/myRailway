import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import React, { Suspense, useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Route, Switch, useHistory } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Login from './components/Login'
import Ticket from './components/Ticket'
import Footer from './components/Footer'
import Payment from './components/Payment'
import Contact from './components/Contact'
import Register from './components/Register'
import NavBar from './components/commons/NavBar'
import Reservations from './components/Reservations'
import AccountSettings from './components/AccountSettings'

const App = () => {

  let [showLogin, setShowLogin] = useState(false)
  let [showRegister, setShowRegister] = useState(false)
  let history = useHistory()

  const handleLoginShow = () => setShowLogin(true)
  
  const handleLoginClose = () => setShowLogin(false)

  const handleRegisterShow = () => setShowRegister(true)

  const handleRegisterClose = () => setShowRegister(false)

  const handleLogout = () => {
    setShowLogin(false)
    setShowRegister(false)
    localStorage.clear()
    history.push('/')
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="main-container">
        <NavBar
          handleLoginShow={handleLoginShow}
          handleRegisterShow={handleRegisterShow}
          logout={handleLogout}
        />

        <Login
          showLogin={showLogin}
          handleShow={handleLoginShow}
          handleClose={handleLoginClose}
          handleRegisterShow={handleRegisterShow}
        />

        <Register
          showRegister={showRegister}
          handleShow={handleRegisterShow}
          handleClose={handleRegisterClose}
          handleLoginShow={handleLoginShow}
        />

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/reservations" component={Reservations} />
              <Route path="/payment" component={Payment} />
              <Route path="/account" component={AccountSettings} />
              <Route path="/ticket/:rid" component={Ticket} />
            </Switch>
          </Suspense>
      </div>

      <Footer />

      <ToastContainer autoClose={3000} position="bottom-right" />
    </>
  )
}

export default App
