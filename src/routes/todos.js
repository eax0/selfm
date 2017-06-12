import express from 'express'

const router = express.Router();

router.get('/load', (req, res) => {
    req.models.todo.findAll({raw: true, order: [['order', 'asc']]}).then(r => {
        res.send(r);
    });
});

router.post('/add', (req, res) => {
    const Todo = req.models.todo;
    const todo = new Todo(req.body.fields);

    todo.save().then(function () {
        res.send({success: true});
    });
});

router.post('/update', (req, res) => {
    const Todo = req.models.todo;
    Todo.findById(req.body.id)
        .then(todo => todo.update(req.body.fields))
        .then(() => {
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
});

export default router