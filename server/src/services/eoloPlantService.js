const EoloPlant = require('../models/eoloPlant.js');
const publishToQueue = require('../amqp/publisher.js');

function findAll() {
    return EoloPlant.findAll();
}

function findById(id) {
    return EoloPlant.findByPk(id);
}

function create(cityName) {
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    return EoloPlant.findOne({ where: { city: cityName } })
        .then(eoloPlant => {
            if (eoloPlant) {
                console.log(`City ${cityName} already exists`);
                return null;
            }
            return EoloPlant.create({
                city: cityName.charAt(0).toUpperCase() + cityName.slice(1),
                planning: null
            })
                .then(eoloPlant => {
                    console.log("Created eolo plant for city", eoloPlant.city, "with id", eoloPlant.id);
                    const data = '{"id":' + eoloPlant.id + ',"city": "' + eoloPlant.city + '"}';
                    publishToQueue(data)
                        .then(console.log("Published " + data))
                        .catch(error => console.error(error));
                    return eoloPlant;
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                });
        });

}

function remove(eoloPlantId) {
    return EoloPlant.findByPk(eoloPlantId)
        .then(eoloPlant => {
            if (!eoloPlant) {
                console.log("Not eolo plant found for id", eoloPlantId);
                return null;
            }

            return EoloPlant.destroy({
                where: { id: eoloPlantId }
            }).then(deletedElements => {
                console.log("Removed eolo plant with id", eoloPlant.id, "and city", eoloPlant.city);
                return eoloPlant;
            }).catch(error => {
                console.log(error);
                throw error;
            });
        });

}

function update(updatedEoloPlant) {
    return EoloPlant.findByPk(updatedEoloPlant.id)
        .then(eoloPlant => {
            if (!eoloPlant) {
                console.log("Not eolo plant found for id", updatedEoloPlant.id);
                return null;
            }

            return EoloPlant.update({ progress: updatedEoloPlant.progress, completed: updatedEoloPlant.completed, planning: updatedEoloPlant.planning }, {
                where: {
                    id: updatedEoloPlant.id
                }
            }).then(affectedRows => {
                console.log("Updated eolo plant with id", eoloPlant.id, "and city", eoloPlant.city);
                return eoloPlant;
            }).catch(error => {
                console.log(error);
                throw error;
            });

        });

}

module.exports = { findAll, findById, create, remove, update }