import express from 'express'
import {load, sync} from '../core/todos'

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
        res.send({success: true. syncedTodos})
    }, error => {
        res.send({success: false, error})
    });
});

/*router.post('/add', (req, res) => {
    const Todo = req.models.todo;
    const todo = new Todo(req.body.fields);

    todo.save().then(function () {
        res.send({success: true});
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

    Todo.findById(req.body.id)
        .then(todo => todo.destroy())
        .then(() => {
                res.send({success: true});
            }
        );
});*/

export default router