/*!

=========================================================
* Task Management System - User Header Component
=========================================================

* Copyright 2024 Medha Kumari
* Licensed under MIT

=========================================================
*/

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(/mnt/data/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-primary opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Welcome to Task Management System</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. Here, you can track your progress, manage tasks, and collaborate with your team effectively.
              </p>
              <Button
                color="info"
                href="#edit-profile"
                onClick={(e) => e.preventDefault()}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
