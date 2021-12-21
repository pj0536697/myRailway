import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { getReservation } from '../Services'

const Ticket = props => {

    let [reservation, setReservation] = useState()
    
    useEffect(() => {
        if (props.match && props.match.params) {
            getReservation(props.match.params.rid).then(res => {
                setReservation(res)
            }).catch(err => console.log(err))
        }
    }, [])

    return (
        <Row style={{ alignItems: 'center', justifyContent: 'center', width: '100%', margin:0 }}>
            {reservation &&
            <Row style={{width: '100%'}}>
                <Col>
                    <Card style={{padding: 10, marginTop: 10}}>
                        <Row>
                            <Col sm>Reference No : {reservation._id}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm>{reservation.date} {reservation.time}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>From <b>{reservation.from}</b> to <b>{reservation.to}</b></Col>
                        </Row>
                        <Row>
                            <Col>Train : {reservation.train}</Col>
                        </Row>
                        <Row>
                            <Col>Class : {reservation.trainClass}</Col>
                        </Row>
                        <Row>
                            <Col>Quantity : {reservation.qty}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>Payment Method : <b>{reservation.paymentMethod}</b></Col>
                        </Row>
                        <Row>
                            <Col sm>Amount : {reservation.amount.toFixed(2)}</Col>
                            <Col sm>Discount : {reservation.discount.toFixed(2)}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm><b>Total :</b> {reservation.total.toFixed(2)}</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            }
        </Row>
    )
}

export default Ticket