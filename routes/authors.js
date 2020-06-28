const express = require('express');
const authorRouter = express.Router();

const authorModel = require('../models/author');

authorRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        next();
    })
    .get(async (req, res) => {
        const allAuthors = await new Promise((resolve, reject) => {
            authorModel.find({}, (err, authors) => {
                resolve(authors);
            })
        });
        console.log(allAuthors);
        res.send(allAuthors);
    })
    .put((req, res) => {
        res.status(405).send();
    })
    .patch((req, res) => {
        res.status(405).send();
    })
    .delete((req, res) => {
        res.status(405).send();
    })
    .post(async (req, res) => {
        console.log(req.body);
        const author = await authorModel.create({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
        });
        res.status(201).send(author);
    });

authorRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        next();
    })
    .get(async (req, res) => {
        const author = await new Promise((resolve, reject) => {
            authorModel.findOne({ _id: req.params.id }, (err, authors) => {
                resolve(authors);
            });
        });
        if (author) {
            res.send(author);
        }
        else {
            res.status(404).send();
        }
    })
    .put(async (req, res) => {
        let author = await new Promise((resolve, reject) => {
            authorModel.findOne({_id: req.params.id}, (err, document) => {
                resolve(document);
            });
        });
        // TODO:
        await author.save();
        res.status(200).send();
    })
    .patch(async (req, res) => {
        let author = await new Promise((resolve, reject) => {
            authorModel.findOne({_id: req.params.id}, (err, document) => {
                resolve(document);
            });
        });
        author = Object.assign(author, req.body);
        await author.save();
        res.status(200).send();
    })
    .delete(async (req, res) => {
        await new Promise((resolve, reject) => {
            authorModel.find({ _id: req.params.id }).remove().exec((err, res) => {
                resolve(res);
            });
        });
        res.send();
    })
    .post(async (req, res) => {
        res.status(405).send();
    });

module.exports = authorRouter;
