const express = require('express');
const router = express.Router();
const eoloPlantService = require('../services/eoloPlantService.js');
const linkEoloPlantToClient = require('../websocket.js').linkEoloPlantToClient;

// TODO improve using ASYNC / AWAIT in order to avoid DIAMOND-STRUCTURE

// ============> CREATE A NEW PLANT
router.post('/', async (req, res) => {
    // Check that city is send
    if (!req.body.city) {
        console.log("City is mandatory");
        return res.status(400).send({ "error": "City is mandatory" });
    }

    return eoloPlantService.create(req.body.city)
        .then(plant => {
            // Check if plant exists
            if (!plant) {
                console.log("City already exists");
                return res.status(409).send({ "error": "City already exists" });
            }

            // Link eoloPlant
            if (req.header("clientId")) {
                linkEoloPlantToClient(req.header("clientId"), plant.id);
            }

            // Response with json
            return res.json(plant);
        }).catch(e => {
            console.error(e);
            return res.status(500).send({ "error": e });
        });
});


// ============> GETTING ALL PLANTS
router.get('/', async (req, res) => {
    console.log('Getting all plants');
    return eoloPlantService.findAll()
        .then(allPlants => res.json(allPlants));
});


// ============> GETTING A PLANT ACCORDING TO ID
router.get('/:id', async (req, res) => {
    console.log('Getting plant with id: ' + req.params.id);
    return eoloPlantService.findById(req.params.id)
        .then(plant => {
            if (!plant) {
                console.log('Plant not found');
                return res.status(404).send({ "error": "Plant not found" });
            }
            res.json(plant);
        });
});

// ============> DELETING A PLANT ACCORDING TO ID
router.delete('/:id', async (req, res) => {
    console.log('Delete plant with id: ' + req.params.id);
    return eoloPlantService.remove(req.params.id)
        .then(plant => {
            if (!plant) {
                console.log('Plant not found with id ' + req.params.id);
                return res.status(404).send({ "error": "Plant not found" });
            }
            res.json(plant);
        }).catch(e => {
            console.log(e);
            res.status(500).send(e);
        });

});

module.exports = router;