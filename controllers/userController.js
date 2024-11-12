const { validationResult } = require('express-validator');
const { validationCreate, validationUpdate } = require('./validation');
const bcrypt = require('bcrypt');
const db = require("../db/userQueries");
const ResponseFactory = require("./ResponseFactory");

let response;

exports.userAdd = [
    validationCreate,
    (req, res) => {
        const { username, email, password } = req.body;
        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            response = ResponseFactory.fail(errorMessages)
            return res.status(400).json(response);
        }

        bcrypt.hash(password, 10, async (error, hash) => {
            if (error) {
                console.error("Hashing Error: ", error.message);
                response = ResponseFactory.fail("Server Error");
                return res.status(500).json(response);
            }
            try {
                let user = await db.userGetByName(username);
                if (user) {
                    return res.status(400).json(
                        ResponseFactory.fail(`Username already exists`)
                    );
                }
                user = await db.userGetByEmail(email);
                if (user) {
                    return res.status(400).json(
                        ResponseFactory.fail(`Email already exists`)
                    );
                }
                const result = await db.userCreate(username, hash, email);
                console.log("User created: ", result);
                response = ResponseFactory.success(result);
                return res.status(201).json(response);
            } catch (error) {
                console.error("User create error: ", error.message);
                response = ResponseFactory.fail("Internal Error");
                return res.status(500).json(response);
            }
        });
    }
]

exports.userGetOne = async (req, res) => {
    try {
        const user = await db.userGetById(parseInt(req.params.userId));
        if (!user) {
            response = ResponseFactory.fail("User not found");
            return res.status(404).json(response);
        }
        response = ResponseFactory.success(user);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error retrieving user: ", error.message);
        response = ResponseFactory.fail("Server Error");
        return res.status(500).json(response);
    }
}

exports.userUpdate = [
    validationUpdate,
    async (req, res) => {
        const userId = parseInt(req.params.userId);
        if (req.user.userId !== userId){
            response = ResponseFactory.fail("Unauthorized");
            return res.status(401).json(response);
        }
        const { username, email } = req.body;
        const errors = validationResult(req);
        const errorMessages = errors.array().map(e => e.msg);

        if (!errors.isEmpty()) {
            response = ResponseFactory.fail(errorMessages)
            return res.status(400).json(response);
        }
        try {
            const result = await db.userUpdate(userId, username, email)
            console.log("User Updates: ", result);
            response = ResponseFactory.success(result);
            return res.status(201).json(response);
        } catch (error) {
            console.error("User create error: ", error.message);
            response = ResponseFactory.fail("Username or Email already exist");
            return res.status(500).json(response);
        }
    }
];

exports.userAddFollow = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const followId = parseInt(req.params.followId);
    if (req.user.userId !== userId){
        return res.status(401).json(
            ResponseFactory.fail("Unauthorized action")
        );
    }
    if (userId === followId){
        return res.status(400).json(
            ResponseFactory.fail("Attempting to follow self")
        );
    }
    try {
        const result = await db.userUpdateFollows(userId, followId);
        return res.status(200).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Connect follow error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.userDelete = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        if (req.user.userId !== userId){
            response = ResponseFactory.fail("Unauthorized");
            return res.status(401).json(response);
        }
        const result = await db.userDelete(userId);
        response = ResponseFactory.success(result);
        return res.status(200).json(response);
    } catch (error) {
        console.error("User delete error: ", error.message);
        response = ResponseFactory.fail("Server Error");
        return res.status(500).json(response);
    }
}