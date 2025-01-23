import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Login = () => {
  const [email, setEmail] = useState(""); // Store email
  const [password, setPassword] = useState(""); // Store password
  const [error, setError] = useState(""); // Store error message
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      const response = await axios.post("https://task-management-system-1k23.onrender.com/login", {
        email,
       
        password,
      });
      const { token, role } = response.data;
      // If login is successful, store the JWT token and user data in sessionStorage
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("token", response.data.token); // Store JWT token

      // Log session data to the console
      console.log("Session Data:");
      console.log("Email:", sessionStorage.getItem("email"));
      console.log("role:", sessionStorage.getItem("role"));
      console.log("Token:", sessionStorage.getItem("token"));

      // Navigate to the dashboard or another page
      navigate("/admin/*");
    } catch (err) {
      // Handle errors (e.g., incorrect credentials)
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div className="btn-wrapper text-center">
            <Button
              className="btn-neutral btn-icon"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon">
                <img
                  alt="..."
                  src={require("../../assets/img/icons/common/github.svg").default}
                />
              </span>
              <span className="btn-inner--text">Github</span>
            </Button>
            <Button
              className="btn-neutral btn-icon"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon">
                <img
                  alt="..."
                  src={require("../../assets/img/icons/common/google.svg").default}
                />
              </span>
              <span className="btn-inner--text">Google</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
          <Form role="form" onSubmit={handleLogin}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </InputGroup>
            </FormGroup>
            <div className="custom-control custom-control-alternative custom-checkbox">
              <input
                className="custom-control-input"
                id="customCheckLogin"
                type="checkbox"
              />
              <label className="custom-control-label" htmlFor="customCheckLogin">
                <span className="text-muted">Remember me</span>
              </label>
            </div>
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <small>Forgot password?</small>
          </a>
        </Col>
        <Col className="text-right" xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/auth/register");
            }}
          >
            <small>Create new account</small>
          </a>
        </Col>
      </Row>
    </Col>
  );
};

export default Login;
