const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/userQueries");
const ResponseFactory = require("./ResponseFactory");

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.userGetByName(username);
        if (!user) {
            return res.status(403).json(
                ResponseFactory.fail("User does not exist")
            );
        }
        const isMath = await bcrypt.compare(password, user.password.password);
        if (!isMath) {
            return res.status(403).json(
                ResponseFactory.fail("Wrong Password")
            );
        }
        const payload = {user: {
            userId: user.userId,
            userName: user.userName,
            }}

        jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: "1d" },(err, token) => {
            if (err) {
                console.error("JWT sign error: ", err.message);
                return res.status(500).json(
                    ResponseFactory.fail("Server Error")
                );
            }
            return res.status(200).json(
                ResponseFactory.success({token: token})
            );
        })
    } catch (error) {
        console.error("User login error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}