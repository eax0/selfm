import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('test1 main page');
});

router.get('/:some', (req, res) => {
    res.send(`test1 ${req.params.some} page`);
});

export default router