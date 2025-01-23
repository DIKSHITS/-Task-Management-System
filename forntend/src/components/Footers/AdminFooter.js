/*!

=========================================================
* Task Management System - Footer Component
=========================================================

* Copyright 2024 Medha Kumari
* Licensed under MIT

=========================================================
*/
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()} {" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.taskmanagementsystem.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Task Management System
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.taskmanagementsystem.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.taskmanagementsystem.com/about"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.taskmanagementsystem.com/blog"
                rel="noopener noreferrer"
                target="_blank"
              >
                Blog
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.taskmanagementsystem.com/license"
                rel="noopener noreferrer"
                target="_blank"
              >
                MIT License
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
