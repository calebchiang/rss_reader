const User = require('../models/user');

exports.getUsername = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the username", error: error.message });
    }
};