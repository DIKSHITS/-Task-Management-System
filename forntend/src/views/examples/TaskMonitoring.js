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

const TaskMonitoring = () => {
    // Static data for team members
    const [teamMembers] = useState([
        { _id: '1', name: 'John Doe' },
        { _id: '2', name: 'Jane Smith' },
        { _id: '3', name: 'Robert Brown' },
    ]);

    const [tasks, setTasks] = useState([
        {
            _id: '1',
            workName: 'Design Homepage',
            assignedTo: '1',
            priority: 'High',
            progress: 50,
            dueDate: '2025-01-30',
        },
        {
            _id: '2',
            workName: 'Backend API Setup',
            assignedTo: '2',
            priority: 'Medium',
            progress: 70,
            dueDate: '2025-02-10',
        },
    ]);

    const [editingTask, setEditingTask] = useState(null);
    const [modal, setModal] = useState(false);
    const [taskUpdates, setTaskUpdates] = useState({});

    // Toggle modal
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) setEditingTask(null);
    };

    // Handle input changes for editing tasks
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskUpdates({ ...taskUpdates, [name]: value });
    };

    // Handle editing a task
    const handleEditTask = (task) => {
        setEditingTask(task);
        setTaskUpdates({
            assignedTo: task.assignedTo,
            priority: task.priority,
            progress: task.progress,
        });
        toggleModal();
    };

    // Handle updating a task
    const handleUpdateTask = () => {
        setTasks(
            tasks.map((task) =>
                task._id === editingTask._id
                    ? { ...task, ...taskUpdates, progress: parseInt(taskUpdates.progress, 10) }
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
                                <h3 className="mb-0 text-white">Task Monitoring</h3>
                            </CardHeader>
                            <Table responsive className="align-items-center table-dark table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Task Name</th>
                                        <th scope="col">Assigned To</th>
                                        <th scope="col">Priority</th>
                                        <th scope="col">Progress</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task._id}>
                                            <td>{task.workName}</td>
                                            <td>{teamMembers.find((tm) => tm._id === task.assignedTo)?.name || 'N/A'}</td>
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
                                            <td>{task.dueDate}</td>
                                            <td className="text-right">
                                                <Button color="warning" size="sm" onClick={() => handleEditTask(task)}>
                                                    Edit
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

            {/* Modal for Edit Task */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Task</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="assignedTo">Reassign To</Label>
                            <Input
                                type="select"
                                id="assignedTo"
                                name="assignedTo"
                                value={taskUpdates.assignedTo}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a team member</option>
                                {teamMembers.map((member) => (
                                    <option key={member._id} value={member._id}>
                                        {member.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="priority">Priority</Label>
                            <Input
                                type="select"
                                id="priority"
                                name="priority"
                                value={taskUpdates.priority}
                                onChange={handleInputChange}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="progress">Progress (%)</Label>
                            <Input
                                type="number"
                                id="progress"
                                name="progress"
                                value={taskUpdates.progress}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button color="primary" onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default TaskMonitoring;
