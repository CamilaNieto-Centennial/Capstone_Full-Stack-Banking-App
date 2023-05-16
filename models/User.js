const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    balance: { type: Number, required: true, default: 0 },
    accountNumber: { type: String, required: true, unique: true, default: generateAccountNumber },
    created_at: { type: Date, default: Date.now },
});

function generateAccountNumber() {
    // Generate a random account number
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return randomNumber.toString();
}

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;