import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]); // Task list
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create", "update", or "review"
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const [taskName, setTaskName] = useState("");
  const [taskBudget, setTaskBudget] = useState("");
  const [taskProgress, setTaskProgress] = useState("");
  const [taskComment, setTaskComment] = useState(""); // State for the comment

  const toggleModal = () => setModal(!modal);

  // Fetch tasks (API call)
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleCreateTask = () => {
    setModalType("create");
    setSelectedTask(null);
    setTaskName("");
    setTaskBudget("");
    setTaskProgress("");
    setTaskComment(""); // Reset the comment field
    toggleModal();
  };

  const handleUpdateTask = (task) => {
    setModalType("update");
    setSelectedTask(task);
    setTaskName(task.project);
    setTaskBudget(task.budget);
    setTaskProgress(task.progress);
    setTaskComment(""); // Reset the comment field
    toggleModal();
  };

  const handleReviewTask = (task) => {
    setModalType("review");
    setSelectedTask(task);
    setTaskProgress(task.progress);
    setTaskComment(task.comments || ""); // Set the existing comment if available
    toggleModal();
  };

  const handleDeletetask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id)); // Corrected to remove the task from the state
        console.log(`Task with ID ${id} removed from state`); // Log state update
      })
      .catch((error) => {
        console.error(
          `Error deleting task with ID ${id}:`,
          error.response?.data?.message || error.message
        ); // Log error
      });
  };

  const handleSaveTask = () => {
    const newTask = {
      project: taskName,
      budget: taskBudget,
      status: taskProgress < 100 ? "pending" : "completed",
      progress: parseInt(taskProgress),
      users: ["New User"],
    };

    if (modalType === "create") {
      fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks([...tasks, data]);
        })
        .catch((error) => console.error("Error creating task:", error));
    } else if (modalType === "update") {
      fetch(`http://localhost:5000/tasks/${selectedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks(
            tasks.map((task) =>
              task._id === selectedTask._id ? { ...task, ...data } : task
            )
          );
        })
        .catch((error) => console.error("Error updating task:", error));
    }

    toggleModal();
  };

  const handleSaveReview = () => {
    const updatedTask = {
      progress: parseInt(taskProgress),
      status: taskProgress < 100 ? "pending" : "completed",
      comments: taskComment, // Use the state for comments
    };

    fetch(`http://localhost:5000/tasks/${selectedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(
          tasks.map((task) =>
            task._id === selectedTask._id ? { ...task, ...data } : task
          )
        );
      })
      .catch((error) => console.error("Error reviewing task:", error));

    toggleModal();
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow bg-dark text-white">
              <CardHeader className="border-0 d-flex justify-content-between bg-dark text-white">
                <h3 className="mb-0 text-white">Manage Tasks</h3>
                <Button color="primary" onClick={handleCreateTask}>
                  Create Task
                </Button>
              </CardHeader>
              <Table className="align-items-center table-dark table-hover" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr key={task._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm">{task.project}</span>
                        </Media>
                      </th>
                      <td>{task.budget}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`bg-${task.status === "completed" ? "success" : "warning"}`}
                          />
                          {task.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {task.users.map((user, index) => (
                            <span
                              key={index}
                              className="avatar avatar-sm rounded-circle mr-2"
                              id={`tooltip-${task._id}-${index}`}
                              style={{ backgroundColor: "#5e72e4", color: "#fff", padding: "5px 10px" }}
                            >
                              {user[0]} {/* Displaying the first letter of the user's name */}
                            </span>
                          ))}
                          {task.users.length === 0 && <span>No Users</span>}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{task.progress}%</span>
                          <Progress
                            max="100"
                            value={task.progress}
                            barClassName={task.progress === 100 ? "bg-success" : "bg-danger"}
                          />
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateTask(task);
                              }}
                            >
                              Edit Task
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeletetask(task._id);
                              }}
                            >
                              Delete Task
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                handleReviewTask(task);
                              }}
                            >
                              Review Progress
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="pagination justify-content-end mb-0">
                {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
                  <PaginationItem key={index} active={currentPage === index + 1}>
                    <PaginationLink onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </Pagination>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Modal for Create/Update Task */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {modalType === "create" ? "Create Task" : modalType === "update" ? "Update Task" : "Review Task"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="taskName">Task Name</Label>
              <Input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskBudget">Budget</Label>
              <Input
                type="text"
                id="taskBudget"
                value={taskBudget}
                onChange={(e) => setTaskBudget(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskProgress">Progress</Label>
              <Input
                type="number"
                id="taskProgress"
                value={taskProgress}
                onChange={(e) => setTaskProgress(e.target.value)}
              />
            </FormGroup>
            {modalType === "review" && (
              <FormGroup>
                <Label for="reviewComments">Comments</Label>
                <Input
                  type="textarea"
                  id="reviewComments"
                  value={taskComment} // Use state for comments
                  onChange={(e) => setTaskComment(e.target.value)} // Update state on change
                />
              </FormGroup>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          {modalType === "create" || modalType === "update" ? (
            <Button color="primary" onClick={handleSaveTask}>
              Save Task
            </Button>
          ) : (
            <Button color="primary" onClick={handleSaveReview}>
              Save Review
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ManageTasks;
