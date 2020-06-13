const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
    '/',
    validateBody(Joi.object().keys({
        name: Joi.string().min(2).required().description('Pet name'),
        age: Joi.number().required().description('Pet age'),
        colour: Joi.string().min(3).required().description('Pet colour'),
    }),
    {
        stripUnknown: true,
    }),
    async (req, res, next) => {
        try {
            const newPet = new Pet(req.body);
            await newPet.save();
            res.status(201).json(newPet);
        } catch (e) {
            next(e);
        }
    }
);

router.get(
    "/:name",
    async (req, res, next) => {
    try {
        const result = await Pet.find({ name: req.params.name });
        if (result && result.length) {
            res.status(200).json(result);
        } else {
            res.status(204).send("No result found");
        }
    } catch (e) {
        next(e);
    }
  }
);

router.delete(
    "/:name",
    async (req, res, next) => {
    try {
        const result = await Pet.deleteMany({ name: req.params.name });
        if (result.deletedCount) {
            res.status(200).json("Pet deleted.");
        } else {
            res.status(204).json("No result found");
        }
    } catch (e) {
        next(e);
    }
  }
);

module.exports = router;