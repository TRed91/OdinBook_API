const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(401).json({ ok: false, data: null, message: 'Unauthorized' });
});

module.exports = router;