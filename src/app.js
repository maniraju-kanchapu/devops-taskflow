const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "TaskFlow API is running",
        version: "1.0.0"
    });
});

app.get("/tasks", (req, res) => {
    res.json([
        {
            id: 1,
            title: "Learn Docker",
            completed: false
        },
        {
            id: 2,
            title: "Learn Jenkins",
            completed: false
        }
    ]);
});

app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    res.status(201).json(task);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`TaskFlow API running on http://localhost:${PORT}`);
    });
}

module.exports = app;