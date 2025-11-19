import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

function TaskCard({ task, onDone }) {
    return ( <
        div className = "card" >
        <
        div className = "card-title" > { task.title } < /div> <
        div className = "card-desc" > { task.description } < /div> <
        button onClick = {
            () => onDone(task.id) } > Done < /button> <
        /div>
    );
}

function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    async function fetchTasks() {
        const res = await axios.get(`${API}/tasks?limit=5`);
        setTasks(res.data);
    }

    useEffect(() => { fetchTasks(); }, []);

    async function createTask(e) {
        e.preventDefault();
        if (!title) return alert('Title required');
        await axios.post(`${API}/tasks`, { title, description });
        setTitle('');
        setDescription('');
        fetchTasks();
    }

    async function markDone(id) {
        await axios.post(`${API}/tasks/${id}/complete`);
        setTasks(t => t.filter(x => x.id !== id));
    }

    return ( <
        div className = "container" >
        <
        div className = "left" >
        <
        h3 > Add a Task < /h3> <
        form onSubmit = { createTask } >
        <
        input value = { title }
        onChange = { e => setTitle(e.target.value) }
        placeholder = "Title" /
        >
        <
        textarea value = { description }
        onChange = { e => setDescription(e.target.value) }
        placeholder = "Description" /
        >
        <
        button type = "submit" > Add < /button> <
        /form> <
        /div> <
        div className = "divider" / >
        <
        div className = "right" > {
            tasks.map(t => ( <
                TaskCard key = { t.id }
                task = { t }
                onDone = { markDone }
                />
            ))
        } <
        /div> <
        /div>
    );
}

export default App;