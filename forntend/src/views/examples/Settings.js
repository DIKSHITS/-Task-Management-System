import { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Progress,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("tasks"); // Tracks the active tab
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    teamMembers: [],
    milestones: "",
  });
  const [settings, setSettings] = useState({
    reminders: false,
    reminderFrequency: "daily",
    reminderType: "email",
    reminderMessage: "",
    permissions: "user",
    notifications: "email",
    updateFrequency: "daily",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission

  // Handle changes in project structure setup
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // Handle project structure setup submission
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    alert("Project structure saved successfully!");
    setIsFormSubmitted(true); // Hide the form after submission
  };

  // Handle settings changes
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle settings submission
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    setIsFormSubmitted(true); // Hide the form after submission
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="12">
            <div className="d-flex justify-content-around mb-4">
              <Button
                color={activeTab === "tasks" ? "primary" : "secondary"}
                onClick={() => setActiveTab("tasks")}
              >
                Task Progress
              </Button>
              <Button
                color={activeTab === "project" ? "primary" : "secondary"}
                onClick={() => setActiveTab("project")}
              >
                Project Structure
              </Button>
              <Button
                color={activeTab === "settings" ? "primary" : "secondary"}
                onClick={() => setActiveTab("settings")}
              >
                System Settings
              </Button>
            </div>
          </Col>
        </Row>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "tasks" && (
          <Row>
            <Col lg="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Task Progress</h3>
                </CardHeader>
                <CardBody>
                  <Row className="mb-4">
                    <Col lg="8" md="6">
                      <h5>Task 1</h5>
                      <p>Task 1 description</p>
                    </Col>
                    <Col lg="4" md="6">
                      <Progress value={40} max={100} color="info">
                        40%
                      </Progress>
                      <p className="mt-2">Deadline: 2025-01-15</p>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col lg="8" md="6">
                      <h5>Task 2</h5>
                      <p>Task 2 description</p>
                    </Col>
                    <Col lg="4" md="6">
                      <Progress value={70} max={100} color="info">
                        70%
                      </Progress>
                      <p className="mt-2">Deadline: 2025-01-20</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === "project" && (
          <Row>
            <Col lg="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Project Structure Setup</h3>
                </CardHeader>
                <CardBody>
                  {/* Show the form only if it hasn't been submitted */}
                  {!isFormSubmitted ? (
                    <>
                      <FormGroup>
                        <Label for="projectName">Project Name</Label>
                        <Input
                          type="text"
                          name="projectName"
                          id="projectName"
                          value={project.projectName}
                          onChange={handleProjectChange}
                          placeholder="Enter Project Name"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="projectDescription">Project Description</Label>
                        <Input
                          type="textarea"
                          name="projectDescription"
                          id="projectDescription"
                          value={project.projectDescription}
                          onChange={handleProjectChange}
                          placeholder="Enter Project Description"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="milestones">Project Milestones</Label>
                        <Input
                          type="text"
                          name="milestones"
                          id="milestones"
                          value={project.milestones}
                          onChange={handleProjectChange}
                          placeholder="Enter Milestones (comma separated)"
                        />
                      </FormGroup>

                      <Button color="primary" onClick={handleProjectSubmit}>
                        Save Project Structure
                      </Button>
                    </>
                  ) : (
                    <div>
                      <h5>Project Structure Saved Successfully!</h5>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        {activeTab === "settings" && (
          <Row>
            <Col lg="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h3 className="mb-0">System Settings</h3>
                </CardHeader>
                <CardBody>
                  {/* Show the form only if it hasn't been submitted */}
                  {!isFormSubmitted ? (
                    <>
                      {/* Reminder Settings */}
                      <h4>Reminder Settings</h4>
                      <FormGroup>
                        <Label for="reminderFrequency">Reminder Frequency</Label>
                        <Input
                          type="select"
                          name="reminderFrequency"
                          id="reminderFrequency"
                          value={settings.reminderFrequency}
                          onChange={handleSettingsChange}
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="custom">Custom</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="reminderType">Reminder Type</Label>
                        <Input
                          type="select"
                          name="reminderType"
                          id="reminderType"
                          value={settings.reminderType}
                          onChange={handleSettingsChange}
                        >
                          <option value="email">Email</option>
                          <option value="push">Push Notification</option>
                          <option value="sms">SMS</option>
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="reminderMessage">Reminder Message</Label>
                        <Input
                          type="textarea"
                          name="reminderMessage"
                          id="reminderMessage"
                          value={settings.reminderMessage}
                          onChange={handleSettingsChange}
                          placeholder="Enter custom reminder message"
                        />
                      </FormGroup>

                      {/* Permissions Settings */}
                      <h4>Permissions and Role-Based Access</h4>
                      <FormGroup>
                        <Label for="permissions">Permissions</Label>
                        <Input
                          type="select"
                          name="permissions"
                          id="permissions"
                          value={settings.permissions}
                          onChange={handleSettingsChange}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                        </Input>
                      </FormGroup>

                      {/* Notification Preferences */}
                      <h4>Notification Preferences</h4>
                      <FormGroup>
                        <Label for="notifications">Notification Preference</Label>
                        <Input
                          type="select"
                          name="notifications"
                          id="notifications"
                          value={settings.notifications}
                          onChange={handleSettingsChange}
                        >
                          <option value="email">Email</option>
                          <option value="sms">SMS</option>
                          <option value="push">Push Notification</option>
                        </Input>
                      </FormGroup>

                      <Button color="primary" onClick={handleSettingsSubmit}>
                        Save Settings
                      </Button>
                    </>
                  ) : (
                    <div>
                      <h5>Settings Saved Successfully!</h5>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Settings;
