import express from 'express'
import {loadTasks, sync, addTask, updateTask, removeTask, loadFullProject} from '../core/tm'

const router = express.Router();

router.get('/load-tasks', (req, res) => {
    loadTasks({parent_id: req.query.parent_id, depth: {$gt: 1}}, true).then((tasks) => {
        res.send(tasks);
    }, err => {
        res.send(err.message)
    });
});

router.get('/load-projects', (req, res) => {
    loadTasks({depth: 1}).then((tasks) => {
        res.send(tasks);
    }, err => {
        res.send(err.message)
    });
});

router.get('/load-full-project', (req, res) => {
    loadFullProject(req.query.id).then((project) => {
        res.send(project);
    }, err => {
        res.send(err.message)
    });
});

router.post('/update-project', (req, res) => {
    updateTask(req.body.id, req.body.fields).then((task) => {
            res.send(task);
        }
    );
});

router.post('/sync', (req, res) => {
    const tasks = req.tasks;
    
    sync(tasks).then(syncedTasks => {
        res.send({success: true, syncedTasks})
    }, error => {
        res.send({success: false, error})
    });
});

router.post('/add', (req, res) => {
    addTask(req.body).then(task => {
        res.send(task)
    });
});

router.post('/update', (req, res) => {
    updateTask(req.body.id, req.body.fields).then((task) => {
            res.send(task);
        }
    );
});

router.post('/remove', (req, res) => {
    removeTask(req.body.id).then((success) => {
            res.send({success});
        }
    );
});

export default router