import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { getHash } from './commons/Functions'
import { login, updateAccount, register } from '../Services'
import { Modal, Button, Form, Row } from 'react-bootstrap'

const Login = props => {

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    
    let modalErrMsg = "Incorrect username or password!!!"

    const handleChangeUsername = event => event.target && setUsername(event.target.value)

    const handleChangepassword = event => event.target && setPassword(event.target.value)

    const handleSubmit = event => {
        if (event.currentTarget.checkValidity() === true) {
            login({ username, password: getHash(password) })
                .then(res => {
                    if (res.enabled === false) {
                        if (res.loginCount === 0) {
                            toast.error("Please confirm your email !")
                        } else {
                            toast.error("Oh snap! Your account is disabled !")
                        }
                    } else {
                        localStorage.setItem('user', JSON.stringify(res))
                        incrementLoginCount(res)
                        props.handleClose()
                    }
                })
                .catch(err => {
                    console.log(err)
                    toast.error(modalErrMsg)
                })
        }
        event.preventDefault()
        event.stopPropagation()
    }

    const joinClick = () => {
        props.handleClose()
        props.handleRegisterShow()
    }

    const incrementLoginCount = user => {
        const newCount = user.loginCount + 1
        updateAccount({ ...user, loginCount: newCount }, user._id).then(res => {}).catch(err => {})
    }

    const responseGoogle = async response => {
        const profileObj = response.profileObj
        await register(profileObj).then(res => {
            profileObj._id = res._id
            profileObj.fname = profileObj.givenName
        }).catch(e => errResponseGoogle(e))
        localStorage.setItem('user', JSON.stringify(profileObj))
        props.handleClose()
    }

    const errResponseGoogle = response => toast.error("Unable to Sign in with Google !")

    useEffect(() => {
        return () => {  
            setUsername("")
            setPassword("")
        }
    }, [])

    return (
        <Modal show={props.showLogin} onHide={props.handleClose}>
            <Form onSubmit={e => handleSubmit(e)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <GoogleLogin
                            style={{ width: '100%' }}
                            clientId="142559740236-kl8af28rsfc12v2e4rulgg97ijhdla5d.apps.googleusercontent.com"
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={responseGoogle}
                            onFailure={errResponseGoogle}
                        />
                    </Row>
                    <hr />
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="username" placeholder="Enter email"
                            onChange={handleChangeUsername} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Enter Password"
                            onChange={handleChangepassword} />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Sign In
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" block onClick={joinClick}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default Login