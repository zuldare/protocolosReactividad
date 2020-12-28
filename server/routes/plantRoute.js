module.exports = (app, Plant) => {

    // GET ALL
    app.get("/api/eoloplants/", async (req, res) => {
        console.log("Getting all eolic plants")
        let plants = await Plant.findAll();
        return res.json(plants);
    });

    // CREATE A PLANT
    app.post("/api/eoloplants/", async (req, res) => {
       console.log("Creating a new plant");

       let newPlant = await Plant.create({ city: req.body.city });
       res.json({
           id: newPlant.id,
           city: newPlant.city,
           progress: newPlant.progress,
           completed: newPlant.completed,
           planning:  newPlant.planning
       })
    });
}