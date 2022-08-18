const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', async (req, res) => {
    try {
        if (!req.query.limit || req.query.page < 1) {
            return res.status(400).send({message: "Invalid query. limit and page number required"});
        }
        let limit = req.query.limit;
        let page = req.query.page -= 1;
        let search = req.query.searchText;
        let filter = {};
        if (search) {
            filter = {
                name: {$regex: search, $options: 'i'}
            };
        }
        //request for query count
        const count = User.count(filter);
        const users = User.find(filter)
                                        .skip(parseInt(limit) * parseInt(page))
                                        .limit(parseInt(limit));
        const results = await Promise.all([count, users]);
        if (results[1].length > 0) {
            return res.status(200).send(results);
        }
        return res.status(404).send({message: "No users could be found"});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;