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
} from 'reactstrap';
import Header from 'components/Headers/Header.js';

const WorkAssignment = () => {
    // Static data for projects and team members
    const [projects] = useState(['Project A', 'Project B', 'Project C']);
    const [teamMembers] = useState([
        { _id: '1', name: 'John Doe' },
        { _id: '2', name: 'Jane Smith' },
        { _id: '3', name: 'Robert Brown' },
    ]);
    const [workAssignments, setWorkAssignments] = useState([]);
    const [newWork, setNewWork] = useState({
        projectId: '',
        workName: '',
        description: '',
        assignedTo: '',
        dueDate: ''
    });
    const [editingWork, setEditingWork] = useState(null);
    const [modal, setModal] = useState(false);

    // Toggle modal
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setNewWork({
                projectId: '',
                workName: '',
                description: '',
                assignedTo: '',
                dueDate: ''
            });
            setEditingWork(null);
        }
    };

    // Handle input changes for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWork({ ...newWork, [name]: value });
    };

    // Handle adding a work assignment
    const handleAddWork = () => {
        setWorkAssignments([...workAssignments, { ...newWork, _id: Date.now().toString() }]);
        toggleModal();
    };

    // Handle deleting a work assignment
    const handleDeleteWork = (id) => {
        if (!window.confirm('Are you sure you want to delete this work assignment?')) return;
        setWorkAssignments(workAssignments.filter((work) => work._id !== id));
    };

    // Handle editing a work assignment
    const handleEditWork = (work) => {
        setEditingWork(work);
        setNewWork({
            projectId: work.projectId,
            workName: work.workName,
            description: work.description,
            assignedTo: work.assignedTo,
            dueDate: work.dueDate
        });
        toggleModal();
    };

    // Handle updating a work assignment
    const handleUpdateWork = () => {
        setWorkAssignments(workAssignments.map((work) => (work._id === editingWork._id ? newWork : work)));
        toggleModal();
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow bg-dark text-white">
                            <CardHeader className="border-0 d-flex justify-content-between bg-dark text-white">
                                <h3 className="mb-0 text-white">Work Assignment</h3>
                                <Button color="primary" onClick={toggleModal}>
                                    Add Work Assignment
                                </Button>
                            </CardHeader>
                            <Table responsive className="align-items-center table-dark table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Work Name</th>
                                        <th scope="col">Project</th>
                                        <th scope="col">Assigned To</th>
                                        <th scope="col">Due Date</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {workAssignments.map((work) => (
                                        <tr key={work._id}>
                                            <td>{work.workName}</td>
                                            <td>{projects.find((project) => project === work.projectId) || 'N/A'}</td>
                                            <td>{teamMembers.find((tm) => tm._id === work.assignedTo)?.name || 'N/A'}</td>
                                            <td>{work.dueDate}</td>
                                            <td className="text-right">
                                                <Button color="warning" size="sm" onClick={() => handleEditWork(work)}>
                                                    Edit
                                                </Button>
                                                <Button color="danger" size="sm" onClick={() => handleDeleteWork(work._id)}>
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

            {/* Modal for Add/Edit Work Assignment */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    {editingWork ? 'Edit Work Assignment' : 'Add Work Assignment'}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="workName">Work Name</Label>
                            <Input
                                type="text"
                                id="workName"
                                name="workName"
                                value={newWork.workName}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="projectId">Project</Label>
                            <Input
                                type="select"
                                id="projectId"
                                name="projectId"
                                value={newWork.projectId}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a project</option>
                                {projects.map((project, index) => (
                                    <option key={index} value={project}>
                                        {project}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                id="description"
                                name="description"
                                value={newWork.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="assignedTo">Assign To</Label>
                            <Input
                                type="select"
                                id="assignedTo"
                                name="assignedTo"
                                value={newWork.assignedTo}
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
                            <Label for="dueDate">Due Date</Label>
                            <Input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={newWork.dueDate}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button color="primary" onClick={editingWork ? handleUpdateWork : handleAddWork}>
                        {editingWork ? 'Update Work Assignment' : 'Add Work Assignment'}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default WorkAssignment;
