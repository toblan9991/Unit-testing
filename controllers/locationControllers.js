const Location = require('../models/Location'); 

// Handler for GET /api/v1/locations - List all locations
exports.getLocations = (req, res) => {
    Location.find({}).exec()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


// Handler for GET /api/v1/locations/:id - Get a single location by ID
exports.getLocationById = (req, res) => {
    Location.findOne({"_id": req.params.id}).exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: "Location not found" });
            }
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


exports.createLocation = async (req, res) => {
    let location = new Location({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const result = await location.save();
        // Construct the URL for the newly created location
        const resourceUrl = `/api/v1/locations/${result._id}`;

        // Correctly format the response to include the URL and data
        res.status(201).json({
            url: resourceUrl, // Provide the URL to access the newly created location
            data: result // Include the location data within a data object
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



