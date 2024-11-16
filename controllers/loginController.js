const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/userQueries");
const ResponseFactory = require("./ResponseFactory");

exports.loginPost = async (req, res) => {
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

        const userRes = await db.userGetById(user.userId);

        jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: "1d" },(err, token) => {
            if (err) {
                console.error("JWT sign error: ", err.message);
                return res.status(500).json(
                    ResponseFactory.fail("Server Error")
                );
            }
            return res.status(200).json(
                ResponseFactory.success({
                    token: token,
                    user: userRes,
                })
            );
        })
    } catch (error) {
        console.error("User login error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.checkToken = async (req, res) => {
    try {
        const user = await db.userGetById(req.user.userId);
        if (!user) {
            return res.status(401).json(
                ResponseFactory.fail("User does not found")
            )
        }
        return res.status(200).json(
            ResponseFactory.success(user)
        );
    } catch (error) {
        console.error("User token authentication error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}