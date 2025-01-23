const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'team-member', // Default to 'team-member' if no role is provided
        });

        // Save the user in the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'secretKey', { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

        // Return the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email, role, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, role, password: hashedPassword });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Use req.params.id

        if (!user) {
            console.log(`User with ID ${req.params.id} not found`); // Log if user not found
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // User ID to update
            req.body, // New user data from the request body
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser); // Send the updated user back in the response
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Task routes (No authentication required)
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/tasks", async (req, res) => {
  const { project, budget, progress, users, comments } = req.body;
  try {
    const newTask = new Task({
      project,
      budget,
      status: progress < 100 ? "pending" : "completed",
      progress,
      users,
      comments,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});




router.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const { project, budget, progress, users } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            { project, budget, progress, status: progress < 100 ? 'pending' : 'completed', users },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    // Corrected model name to Task
    const task = await Task.findByIdAndDelete(req.params.id); // Use req.params.id

    if (!task) {
      console.log(`Task with ID ${req.params.id} not found`); // Log if task not found
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

router.get('/Profile', async (req, res) => {
  const { email } = req.query; // Assuming you're sending email as a query parameter

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude sensitive data like password
    const { password, ...userData } = user.toObject();

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// taskmaganet backhand code


 // Create a new work assignment
router.post('/work-assignments', async (req, res) => {
    const { projectId, workName, description, assignedTo, dueDate } = req.body;

    try {
        const newWorkAssignment = new WorkAssignment({
            projectId,
            workName,
            description,
            assignedTo,
            dueDate,
        });
        const savedWorkAssignment = await newWorkAssignment.save();
        res.status(201).json(savedWorkAssignment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating work assignment', error });
    }
});

// Update a work assignment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { projectId, workName, description, assignedTo, dueDate } = req.body;

    try {
        const updatedWorkAssignment = await WorkAssignment.findByIdAndUpdate(
            id,
            { projectId, workName, description, assignedTo, dueDate },
            { new: true }
        );
        res.json(updatedWorkAssignment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating work assignment', error });
    }
});

// Delete a work assignment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await WorkAssignment.findByIdAndDelete(id);
        res.json({ message: 'Work assignment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting work assignment', error });
    }
});




module.exports = router;
