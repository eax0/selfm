import express from 'express'
import {load, sync, add, update, remove} from '../core/todos'

const router = express.Router();

router.get('/load', (req, res) => {
    load().then((todos) => {
        res.send(todos);
    }, err => {
        res.send(err.message)
    });
});

router.post('/sync', (req, res) => {
    const todos = req.todos;
    
    sync(todos).then(syncedTodos => {
        res.send({success: true, syncedTodos})
    }, error => {
        res.send({success: false, error})
    });
});

router.post('/add', (req, res) => {
    add(req.body.fields).then(success => {
        res.send({success})
    });
});

router.post('/update', (req, res) => {
    update(req.body.id, req.body.fields).then(() => {
            res.send({success: true});
        }
    );
});

router.post('/remove', (req, res) => {
    remove(req.body.id).then((success) => {
            res.send({success});
        }
    );
});

export default router