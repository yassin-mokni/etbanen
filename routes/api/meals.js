const express = require('express');
const router = express.Router();
const Meal = require('../../models/Meal');

router.get('/', async (req,res) => {
    let meals = await Meal.find({});
    res.json(meals);
});
//add meal
router.post('/', async (req,res) => {
    let mealData = req.body;
    console.log('mealData: ', mealData);
    let meal = new Meal(mealData);
    await meal.save()
    res.json(meal);
});
router.delete('/:id', async (req,res) => {
    try {
        let meal = await Meal.findById(req.params.id);
        await meal.remove();
        res.json({
            success:true
        });
    } catch (error) {
        res.status(404).json({
            success:false
        });
    }
});

module.exports = router;