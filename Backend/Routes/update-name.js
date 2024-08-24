const express = require("express");
const router = express.Router();
const { Usermodle } = require("../Mongodb.js");

router.patch("/name-update", async (req, res) => {
    const { id, name } = req.body;  // Destructure `id` and `emailn` from `req.body`

    console.log(id+"hii");
    console.log(name);

    if (!id || !name) {
        return res.status(400).json({ message: 'User ID and new email are required.' });
    }

    try {
        const updatedUser = await Usermodle.findByIdAndUpdate(
            id,  // Use the extracted `id` from the request body
            { name: name},  // Update the email field
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;  // Export the router