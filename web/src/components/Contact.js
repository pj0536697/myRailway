import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Col, Button, Form, Card, Row } from 'react-bootstrap'

import { contact } from '../Services'

const Contact = () => {

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')

    const handleChange = type => event => {
        let value = event
        if (event.target) value = event.target.value
        switch(type) {
            case 'fname':
                setFname(value)
              break
            case 'lname':
                setLname(value)
              break
            case 'phone':
                setPhone(value)
              break
            case 'email':
                setEmail(value)
              break
            case 'message':
                setMessage(value)
              break
            default:
                // console.log()
          }
    }

    const handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        contact({ fname, lname, phone, email, message })
            .then(res => {
                toast.success("Your message has been sent..")
                setFname('')
                setLname('')
                setPhone('')
                setEmail('')
                setMessage('')
            }).catch(err => console.log(err))
    }

    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Col>
                <Card style={{ padding: 20, margin: 10 }}>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control required type="username" placeholder="Enter first name" onChange={handleChange('fname')} value={fname} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control required type="username" placeholder="Enter last name" onChange={handleChange('lname')} value={lname} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="username" placeholder="Enter Phone Number" onChange={handleChange('phone')} value={phone} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="controlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control required as="textarea" rows="3" onChange={handleChange('message')} value={message} />
                        </Form.Group>
                        <Col style={{ paddingRight: 0 }} align='right'>
                            <Button variant="success" type="submit">
                                Send Message
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </Col>
            <Col>
                <Row style={{ alignItems: 'center', justifyContent: 'center', margin: 30 }}>
                    <Col>
                        <div id="page">
                            <p><strong><span style={{ textDecoration: 'underline' }}>General Information</span></strong></p>
                            <p><strong>Telephones : </strong>+91 98 7 6543210 <br /><strong>Fax Nos : </strong>+91 98 7 6543210<br /><strong>Email : </strong>
                                <a href="mailto:example@example.com">example@example.com</a>
                                <span style={{ display: 'none' }}>This e-mail address is being protected from spambots. You need JavaScript enabled to view it
                                    </span>
                            </p>
                            <p><strong>Railway Head Office Exchange Number</strong> : +91 98 7 6543210</p>
                            <p><strong>Fort Railway Station Inquiries</strong> : +91 98 7 6543210</p>
                            <p><strong>Deputy Operating Superintendent</strong> : +91 98 7 6543210</p>
                            <p className="MsoNormal"><strong>Assistant Transportation Superintendent (Operation)</strong> : +91 98 7 6543210</p>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Contact