const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the setter function for the powers field to handle string input and convert it to an array
function stringToArray(powerString) {
    if (!powerString) return [];
    return powerString.split(',').map(power => power.trim());
}

const CharacterSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    powers: { type: [String], default: ["Super strength"], set: stringToArray },
    type: { type: String, enum: ['hero', 'villain'], required: true },
    hp: { type: Number, default: 1 },
}, {
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON
    toObject: { virtuals: true } // Ensure virtuals are included when converting to objects
});

// Virtual for character's description
CharacterSchema.virtual('description').get(function () {
    // Check if 'powers' is defined to prevent "Cannot read properties of undefined (reading 'join')" error
    const powersDescription = this.powers && this.powers.length > 0 ? this.powers.join(", ") : "no special powers";
    return `${this.name} is a ${this.type} whose special powers are ${powersDescription}.`;
});

// Static method to find characters by type
CharacterSchema.statics.findByType = function (type) {
    return this.find({ type: type });
};

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
























