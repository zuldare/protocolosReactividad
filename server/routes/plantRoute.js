module.exports = (app, plant) => {
    const INTERNAL_ERROR = "An internal error has occurred. ";

    // CREATE
    app.post("/api/eoloplants/", async(req, res) => {
        console.log("Creating a new plant");
        try {
            let newPlant = await plant.create({ city: req.body.city });
            console.log(newPlant);
            res.status(201).json(newPlant);
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR + e );
        }
    });

    // FIND ALL
    app.get("/api/eoloplants/", async(req, res) => {
        console.log("Getting all plants");
        try {
            let plants = await plant.findAll();
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
            let plantDeleted = await plant.destroy({where: {city: req.params.city}});
            res.status(200).json(plantDeleted);
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR +  e);
        }
    });

}
