const Character = require('../models/Character');

exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id)
        .select('-__v') // Exclude the __v field from the query result
        .lean()
        .exec();

        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }

        // Update the character description to reflect the correct type
        // This is crucial if the description is manually set or needs correction
        character.description = `${character.name} is a ${character.type === 'hero' ? 'noble hero' : 'nefarious villain'} whose special powers are ${character.powers.join(", ")}`;

        // Ensure the response correctly identifies the character as a hero
        if (req.baseUrl.includes("/heroes") && character.type !== "hero") {
            return res.status(404).json({ message: "Character not found in heroes" });
        } else if (req.baseUrl.includes("/villains") && character.type !== "villain") {
            return res.status(404).json({ message: "Character not found in villains" });
        }

        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving character", error: error.message });
    }
};


exports.getCharacters = async (req, res) => {
    const characterType = req.path.includes("/heroes") ? "hero" : "villain"; 
    
    // Optional challenge
    // const page = parseInt(req.query.page, 10) || 1;  
    // const limit = parseInt(req.query.limit, 10) || 10;
    // const skip = (page - 1) * limit;
    // const includeDescription = req.query.include_description === 'true';

    try {
        const characters = await Character.find({ type: characterType })
            .select("_id name")
            .lean()
            .exec();

            // Optional challenge
            // .select(includeDescription ? "_id name powers" : "_id name") 
            // .skip(skip)
            // .limit(limit)
            // .lean()
            // .exec();

            

            // const total = await Character.countDocuments({ type: characterType });
            // const pages = Math.ceil(total / limit);
    
            // const responseData = characters.map(character => {
            //     let response = {
            //         _id: character._id,
            //         name: character.name,
            //         links: [
            //             { rel: "self", method: "GET", href: `/api/v1/${characterType}s/${character._id}` }
            //         ]
            //     };
            //     if (includeDescription && character.powers) {
            //         response.description = `${character.name} is a ${characterType} whose special powers are ${character.powers.join(", ")}.`;
            //     }
            //     return response;
            // });
    
            // res.status(200).json({
            //     data: responseData,
            //     links: [
            //         ...(page > 1 ? [{ rel: "prev", method: "GET", href: `/api/v1/${characterType}s?page=${page - 1}&limit=${limit}` }] : []),
            //         ...(page < pages ? [{ rel: "next", method: "GET", href: `/api/v1/${characterType}s?page=${page + 1}&limit=${limit}` }] : [])
            //     ]
            // });    

        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: "Error fetching characters", error: error.message });
    }
};



exports.createCharacter = async (req, res) => {
    const characterType = req.path.includes("/heroes") ? "hero" : "villain";
    
    const newCharacter = new Character({
        ...req.body,
        type: characterType
    });

    try {
        const savedCharacter = await newCharacter.save();
        const resourceUrl = `/api/v1/${characterType}/${savedCharacter._id}`;

        const responseData = {
            name: savedCharacter.name,
            powers: savedCharacter.powers,
            type: savedCharacter.type,
            hp: savedCharacter.hp,
            _id: savedCharacter._id,
            __v: savedCharacter.__v,
            // links: [
            //     { rel: "self", method: "GET", href: `${resourceUrl}` },
            //     { rel: "update", method: "PUT", href: `${resourceUrl}` },
            //     { rel: "delete", method: "DELETE", href: `${resourceUrl}` }
            // ] // Optional challenge
        };



        res.status(201).json({
            url: resourceUrl,
            // data: savedCharacter
            data: responseData
        });
    } 
    // catch (error) {
    //     if (error.name === 'ValidationError') {
    //         return res.status(422).json({ message: "Validation Error", error: error.message });
    //     }
    //     res.status(500).json({ message: "Server Error", error: error.message });
    // } // Optional challenge
    
    
    catch (error) {
        res.status(500).json({ message: "Error creating character", error: error.message });
    }
};




