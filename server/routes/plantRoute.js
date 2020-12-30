module.exports = (app, Plant, queue) => {
    const INTERNAL_ERROR = "An internal error has occurred. ";
    const ALREADY_EXISTS = "City already exists. "

    // CREATE
    app.post("/api/eoloplants/", async(req, res) => {
        console.log("Creating a new plant");
        try {
            let rows = await Plant.findAll({where: {city: req.body.city}});

            if (rows.length === 0){
                let newPlant = await Plant.create({ city: req.body.city });
                console.log(newPlant);
                // set response
                res.status(201).json(newPlant);

                // Send message to queue
                queue.sendMessage(JSON.stringify({id: newPlant.id, city: newPlant.city}))

            } else {
                console.error(req.body.city + ALREADY_EXISTS);
                res.status(400).send(ALREADY_EXISTS);
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR + e );
        }
    });

    // FIND ALL
    app.get("/api/eoloplants/", async(req, res) => {
        console.log("Getting all plants");
        try {
            let plants = await Plant.findAll();
            res.status(200).json(plants);
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR + e);
        }
    });

    // DELETE BY CITY
    app.delete("/api/eoloplants/:city", async(req, res) => {
        try {
            console.log("Deleting eolic plant from city: " + req.params.city);
            let plantDeleted = await Plant.destroy({where: {city: req.params.city}});
            res.status(200).json(plantDeleted);
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR +  e);
        }
    });




}
