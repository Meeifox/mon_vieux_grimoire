const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
// Champ email de type String, obligatoire et unique dans la collection
  email: { 
    type: String, 
    required: true, 
    unique: true },
// Champ password de type String, obligatoire
  password: { 
    type: String, 
    required: true }
});
// Ajout du plugings uniqueValidator pour le schéma
userSchema.plugin(uniqueValidator);

// Exporte le modèle User créé à partir du schéma
module.exports = mongoose.model('User', userSchema);
