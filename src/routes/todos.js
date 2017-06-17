import express from 'express'
import {load, sync, add, update, remove} from '../core/todos'

const router = express.Router();

router.get('/load', (req, res) => {
    load(req.models.todo).then((todos) => {
        res.send(todos);    
    });
});

router.post('/sync', (req, res) => {
    const Todo  = req.models.todo;
    const todos = req.todos;
    
    sync(Todo, todos).then(syncedTodos => {
        res.send({success: true, syncedTodos})
    }, error => {
        res.send({success: false, error})
    });
});

router.post('/add', (req, res) => {
    const Todo = req.models.todo;

    add(Todo, req.body.fields).then(success => {
        res.send({success})
    });
});

router.post('/update', (req, res) => {
    const Todo = req.models.todo;

    update(Todo, req.body.id, req.body.fields).then(() => {
            res.send({success: true});
        }
    );
});

router.post('/remove', (req, res) => {
    const Todo = req.models.todo;

    remove(Todo, req.body.id, req.body.fields).then((success) => {
            res.send({success});
        }
    );
});

export default router