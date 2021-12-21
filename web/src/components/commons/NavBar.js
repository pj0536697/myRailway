import React from 'react'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'

const NavBar = props => {

    let user = localStorage.getItem('user')
    if (user) {
        user = JSON.parse(user)
    }
    return (
        <>
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="/">
                    myRailway
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {user ?
                            <>
                                <Nav.Link href="/reservations">My Reservations</Nav.Link>
                                <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                    <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={props.logout}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                                {(user.imageUrl) ? <Image src={user.imageUrl} width={40}/> :
                                    <Image src={require("../../images/login.png")} width={40}/>}
                            </>
                            :
                            <>
                                <Nav.Link href="" onClick={props.handleLoginShow}>Sign In</Nav.Link>
                                <Nav.Link href="" onClick={props.handleRegisterShow}>Sign Up</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Navbar style={{justifyContent: 'space-between'}} bg="dark" variant="dark" expand="sm">
                <Navbar.Brand href="/"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" data-collapsed="false">
                    <Nav className="mx-auto">
                        <Nav.Link href="/">{'Home'}</Nav.Link>
                        <Nav.Link href="/contact">{'Contact Us'}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar