import React, { useState } from 'react';
import {
    Badge,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
    Progress,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import Header from 'components/Headers/Header.js';

const TaskExecution = () => {
    const [tasks, setTasks] = useState([
        {
            _id: '1',
            workName: 'Design Homepage',
            assignedTo: '1',
            priority: 'High',
            progress: 50,
            status: 'In Progress',
            comments: '',
            dueDate: '2025-01-30',
        },
        {
            _id: '2',
            workName: 'Backend API Setup',
            assignedTo: '2',
            priority: 'Medium',
            progress: 70,
            status: 'In Progress',
            comments: '',
            dueDate: '2025-02-10',
        },
    ]);

    const [currentUserId] = useState('1'); // Simulating logged-in user ID
    const [editingTask, setEditingTask] = useState(null);
    const [modal, setModal] = useState(false);
    const [taskUpdates, setTaskUpdates] = useState({});

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) setEditingTask(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskUpdates({ ...taskUpdates, [name]: value });
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setTaskUpdates({
            status: task.status,
            comments: task.comments,
        });
        toggleModal();
    };

    const handleUpdateTask = () => {
        setTasks(
            tasks.map((task) =>
                task._id === editingTask._id
                    ? { ...task, ...taskUpdates }
                    : task
            )
        );
        toggleModal();
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow bg-dark text-white">
                            <CardHeader className="border-0 bg-dark text-white">
                                <h3 className="mb-0 text-white">My Tasks</h3>
                            </CardHeader>
                            <Table responsive className="align-items-center table-dark table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Task Name</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Progress</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks
                                        .filter((task) => task.assignedTo === currentUserId)
                                        .map((task) => (
                                            <tr key={task._id}>
                                                <td>{task.workName}</td>
                                                <td>
                                                    <Badge color={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'}>
                                                        {task.priority}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Progress value={task.progress} color={task.progress === 100 ? 'success' : 'info'}>
                                                        {task.progress}%
                                                    </Progress>
                                                </td>
                                                <td>{task.status}</td>
                                                <td>{task.dueDate}</td>
                                                <td className="text-right">
                                                    <Button color="warning" size="sm" onClick={() => handleEditTask(task)}>
                                                        Update
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

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Update Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input
                                type="select"
                                id="status"
                                name="status"
                                value={taskUpdates.status}
                                onChange={handleInputChange}
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="comments">Comments</Label>
                            <Input
                                type="textarea"
                                id="comments"
                                name="comments"
                                value={taskUpdates.comments}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button color="primary" onClick={handleUpdateTask}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default TaskExecution;
