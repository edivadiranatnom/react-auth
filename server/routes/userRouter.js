const keys = require('../keys')
const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});

router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, displayName } = req.body;
        if (!email || !password || !passwordCheck) {
            console.log("\n\nError 400: Not all fields have been entered.\n\n");
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (password.length < 5) {
            console.log("\n\nError 400: Pwd too short.\n\n");
            return res.status(400).json({ msg: "Pwd too short." });
        }
        if (password !== passwordCheck) {
            console.log("\n\nError 400: Enter the same pwd.\n\n");
            return res.status(400).json({ msg: "Enter the same pwd." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("\n\nError 400: User already exists.\n\n");
            res.status(400).json({ msg: "User already exists." })
        }

        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        console.log(`\n\nError 500: ${err.message}.\n\n`);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ msg: "No user with this email." })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, keys.JWT_PWD);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, keys.JWT_PWD);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;