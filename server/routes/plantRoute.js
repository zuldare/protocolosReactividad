module.exports = (app, plant) => {
    const INTERNAL_ERROR = "An internal error has occurred";

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

    app.get("/api/eoloplants/", async(req, res) => {
        console.log("Getting all ");
        try {
            let plants = await plant.findAll();
            res.status(200).json(plants);
        } catch (e) {
            console.error(e);
            res.status(500).send(INTERNAL_ERROR + e);
        }
    });
}
