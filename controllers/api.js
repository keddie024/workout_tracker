const router = require('express').Router();
const Workout = require('../models/WorkoutSchema');

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then(allWorkouts => {
            res.json(allWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then((newWorkout) => {
            res.json(newWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then((updatedWorkout) => {
            res.json(updatedWorkout);
        })
        .catch((err) => {
            res.json(err);
        })

});

module.exports = router;