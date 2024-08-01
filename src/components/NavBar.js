import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/img/navbar-logo.png';
import { useState } from 'react';


export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    
    const onUpdateActiveLink = (newActiveLink) => {
        setActiveLink(newActiveLink);
    };

    return (
    <Navbar expand="lg" className="navbar-bx">
      <Container>
        <Navbar.Brand href="#home" className='brand'><img src={logo} className='big' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className='navbar-toggler-icon'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='me-auto'>
            <Nav.Link href="#home" className={activeLink === 'home' ? 'navbar-link active': 'navbar-link'} onClick={() => onUpdateActiveLink('home')} >Home</Nav.Link>
            <Nav.Link href="#about_me" className={activeLink === 'about_me' ? 'navbar-link active': 'navbar-link'} onClick={() => onUpdateActiveLink('about_me')}>About me</Nav.Link>
            <Nav.Link href="#skills" className={activeLink === 'skills' ? 'navbar-link active': 'navbar-link'} onClick={() => onUpdateActiveLink('skills')} >Skills</Nav.Link>
            <Nav.Link href='#projects' className={activeLink === 'projects' ? 'navbar-link active': 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className='navbar-text'>
            <a href='#contact-and-question'>
              <button className='contact_us'><span>Contact us</span></button>
            </a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
      }
        

  
    