const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/', async(req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ error: 'Title required' });
        const task = await Task.create({ title, description });
        return res.status(201).json(task);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/', async(req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const tasks = await Task.findAll({
        where: { completed: false },
        order: [
            ['created_at', 'DESC']
        ],
        limit,
    });
    res.json(tasks);
});

router.post('/:id/complete', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    task.completed = true;
    await task.save();
    res.json({ success: true });
});

module.exports = router;