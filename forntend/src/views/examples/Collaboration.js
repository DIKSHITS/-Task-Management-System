import React, { useState } from 'react';
import {
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
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import Header from 'components/Headers/Header.js';

const Collaboration = () => {
    const [tasks, setTasks] = useState([
        {
            _id: '1',
            workName: 'Write unit tests for the API',
            comments: [{ user: 'Manager', text: 'Ensure coverage for edge cases.' }],
            files: [],
            status: 'In Progress',
        },
        {
            _id: '2',
            workName: 'Prepare a presentation for the client meeting',
            comments: [],
            files: [],
            status: 'In Progress',
        },
    ]);

    const [editingTask, setEditingTask] = useState(null);
    const [modal, setModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [file, setFile] = useState(null);

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) setEditingTask(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        toggleModal();
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setTasks(
                tasks.map((task) =>
                    task._id === editingTask._id
                        ? {
                              ...task,
                              comments: [...task.comments, { user: 'You', text: newComment }],
                          }
                        : task
                )
            );
            setNewComment('');
        }
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setTasks(
                tasks.map((task) =>
                    task._id === editingTask._id
                        ? {
                              ...task,
                              files: [...task.files, uploadedFile.name],
                          }
                        : task
                )
            );
            setFile(null);
        }
    };

    const handleUpdateStatus = () => {
        setTasks(
            tasks.map((task) =>
                task._id === editingTask._id
                    ? { ...task, status: 'Completed' }
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
                                <h3 className="mb-0 text-white">Collaboration</h3>
                            </CardHeader>
                            <Table responsive className="align-items-center table-dark table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Task Name</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task._id}>
                                            <td>{task.workName}</td>
                                            <td>{task.status}</td>
                                            <td className="text-right">
                                                <Button color="primary" size="sm" onClick={() => handleEditTask(task)}>
                                                    Collaborate
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
                <ModalHeader toggle={toggleModal}>Collaboration</ModalHeader>
                <ModalBody>
                    <h5>Comments</h5>
                    <ListGroup>
                        {editingTask?.comments.map((comment, index) => (
                            <ListGroupItem key={index} className="bg-light text-dark">
                                <strong>{comment.user}:</strong> {comment.text}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <FormGroup className="mt-3">
                        <Label for="newComment">Add a Comment</Label>
                        <Input
                            type="textarea"
                            id="newComment"
                            name="newComment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button color="primary" size="sm" className="mt-2" onClick={handleAddComment}>
                            Add Comment
                        </Button>
                    </FormGroup>

                    <h5 className="mt-4">Uploaded Files</h5>
                    <ListGroup>
                        {editingTask?.files.map((file, index) => (
                            <ListGroupItem key={index} className="bg-light text-dark">
                                {file}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <FormGroup className="mt-3">
                        <Label for="file">Upload File</Label>
                        <Input type="file" id="file" name="file" onChange={handleFileUpload} />
                    </FormGroup>

                    <Button color="success" className="mt-3" onClick={handleUpdateStatus}>
                        Mark as Completed
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Collaboration;
