import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Spinner } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';
import axios from 'axios'; // Import axios for making HTTP requests

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');
      const email = sessionStorage.getItem('email'); // Corrected to get email from sessionStorage

      console.log('Token from sessionStorage:', token); // Log token to check if it exists

      if (!token || !email) {  // Ensure both token and email are available
        setError('No token or email found, please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/Profile', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          },
          params: { email }, // Pass the email as a query parameter
        });

        console.log('User data:', response.data); // Log the user data to check the response
        setUser(response.data); // Set the user data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching user data:', err); // Log the error for debugging
        setError('Error fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // Empty dependency array to run once when the component mounts

  // Show a loading spinner while user data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner color="primary" />
      </div>
    );
  }

  // Show error message if no user data is found
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={user.profileImage || require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{user.friendsCount || 0}</span>
                        <span className="description"> working</span>
                      </div>
                      <div>
                        <span className="heading">{user.photosCount || 0}</span>
                        <span className="description">project</span>
                      </div>
                      <div>
                        <span className="heading">{user.commentsCount || 0}</span>
                        <span className="description"> complete</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user.name} 
                
                  </h3>
                  <div className="h5 font-weight-300">
                  <span className="font-weight-light"> {user.role}</span>
                  </div>
                  <hr className="my-4" />
                
                
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={user.name} // Assuming the field is "username"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={user.email}
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* Add more fields here as needed */}
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
