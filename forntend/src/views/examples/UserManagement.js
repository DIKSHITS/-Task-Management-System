import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Media,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "team member" });
  const [editingUser, setEditingUser] = useState(null);
  const [modal, setModal] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Toggle modal
  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setNewUser({ name: "", email: "", role: "team member" });
      setEditingUser(null);
    }
  };

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    const newUserWithPassword = { ...newUser, password: "defaultPassword" }; // Add a password here
    axios
      .post("http://localhost:5000/users", newUserWithPassword)
      .then((response) => {
        setUsers([...users, response.data]);
        toggleModal();
      })
      .catch((error) => {
        console.error("Error adding user:", error.response?.data?.message || error.message);
      });
  };

  const handleDeleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(
          `Error deleting user with ID ${id}:`,
          error.response?.data?.message || error.message
        );
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role });
    toggleModal();
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:5000/users/${editingUser._id}`, newUser)
      .then((response) => {
        setUsers(users.map((user) => (user._id === editingUser._id ? response.data : user)));
        toggleModal();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow bg-dark text-white">
              <CardHeader className="border-0 d-flex justify-content-between bg-dark text-white">
                <h3 className="mb-0 text-white">User Management</h3>
                <Button color="primary" onClick={toggleModal}>
                  Add User
                </Button>
              </CardHeader>
              <Table responsive className="align-items-center table-dark table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm">{user.name}</span>
                        </Media>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className={`bg-${user.role === "admin" ? "success" : "warning"}`} />
                          {user.role}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button color="warning" size="sm" onClick={() => handleEditUser(user)}>
                          Edit
                        </Button>
                        <Button color="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Modal for Add/Edit User */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editingUser ? "Edit User" : "Add User"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                id="role"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="team member">Team Member</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary" onClick={editingUser ? handleUpdateUser : handleAddUser}>
            {editingUser ? "Update User" : "Add User"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserManagement;
