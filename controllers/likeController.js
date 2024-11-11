const db = require('../db/likeQueries');
const ResponseFactory = require("./ResponseFactory");

exports.getLikes = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const likes = await db.likeGetCount(postId);
        return res.status(200).json(
            ResponseFactory.success(likes)
        );
    } catch (error) {
        console.error("Read likes from db error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.getLikeOne = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.params.userId);
    try {
        const like = await db.likeGetOne(postId, userId);
        if (!like) {
            return res.status(200).json(
                ResponseFactory.success(false)
            )
        }
        return res.status(200).json(
            ResponseFactory.success(true)
        );
    } catch (error) {
        console.error("Read likes from db error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.addLike = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.body.userId);
    if (req.user.userId !== userId){
        return res.status(401).json(
            ResponseFactory.fail("Unauthorized action")
        );
    }
    try {
        const result = await db.likeAdd(postId, userId);
        return res.status(201).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Connect like error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.removeLike = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.body.userId);
    if (req.user.userId !== userId){
        return res.status(401).json(
            ResponseFactory.fail("Unauthorized action")
        );
    }
    try {
        const result = await db.likeDelete(postId, userId);
        return res.status(200).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Delete like error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}