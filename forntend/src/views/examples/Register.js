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

const Register = () => {
  const [name, setName] = useState(""); // Store name
  const [email, setEmail] = useState(""); // Store email
  const [password, setPassword] = useState(""); // Store password
  const [role, setRole] = useState(""); // Store role
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(false); // Store loading state
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Make a POST request to the backend API
      const response = await axios.post("https://task-management-system-1k23.onrender.com/register", {
        name,
        email,
        password,
        role, // Include role in the request
      });

      // Show success message
      alert("Registration successful! Redirecting to login...");

      // Navigate to the login page
      navigate("/auth/login");
    } catch (err) {
      // Handle errors (e.g., email already exists)
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-4">
            <small>Sign up with</small>
          </div>
          <div className="text-center">
            <Button
              className="btn-neutral btn-icon mr-4"
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
            <small>Or sign up with credentials</small>
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
          <Form role="form" onSubmit={handleRegister}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name state
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
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
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-briefcase-24" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)} // Update role state
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="team-member">Team Member</option>
                </Input>
              </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic">
              <small>
                password strength:{" "}
                <span className="text-success font-weight-700">strong</span>
              </small>
            </div>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckRegister"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckRegister"
                  >
                    <span className="text-muted">
                      I agree with the{" "}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
