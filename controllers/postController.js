const db = require('../db/postQueries');
const ResponseFactory = require("./ResponseFactory");

exports.createPost = async (req, res) => {
    const userId = parseInt(req.body.userId);
    const text = req.body.text;
    const commentedId = parseInt(req.body.commentedId) || null ;

    if (!text) {
        return res.status(400).json(
            ResponseFactory.fail("Post can't be empty")
        )
    }

    if (req.user.userId !== userId) {
        return res.status(401).json(
            ResponseFactory.fail("Unauthorized action")
        );
    }
    try {
        const result = await db.postCreate(userId, text, commentedId);
        return res.status(201).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Post create error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.getPost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await db.postGetOne(postId);
        if (!post) {
            return res.status(404).json(
                ResponseFactory.fail("Post not found")
            );
        }
        return res.status(200).json(
            ResponseFactory.success(post)
        );
    } catch (error) {
        console.error("Post get error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.getPostsByUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const posts = await  db.getPostsByUserId(userId);
        if (!posts) {
            return res.status(404).json(
                ResponseFactory.fail("No posts found")
            );
        }
        return res.status(200).json(
            ResponseFactory.success(posts)
        );
    } catch (error) {
        console.error("Posts get error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.getPostsByUserAndFollows = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (req.user.userId !== userId) {
        return res.status(401).json(
            ResponseFactory.fail("Unauthorized action")
        );
    }
    try {
        const posts = await db.postGetRecent(userId);
        if (!posts) {
            return res.status(404).json(
                ResponseFactory.fail("User not found")
            );
        }
        return res.status(200).json(
            ResponseFactory.success(posts)
        );
    } catch (error) {
        console.error("Posts get error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.updatePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await db.postGetOne(postId);
        if (!post) {
            return res.status(404).json(
                ResponseFactory.fail("Post not found")
            );
        }
        if  (req.user.userId !== post.userId) {
            return res.status(401).json(
                ResponseFactory.fail("Unauthorized action")
            );
        }
        const result = await db.postUpdate(postId, req.body.text);
        return res.status(200).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Post update error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}

exports.deletePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await db.postGetOne(postId);
        if (!post) {
            return res.status(404).json(
                ResponseFactory.fail("Post not found")
            );
        }
        if (req.user.userId !== post.userId) {
            return res.status(401).json(
                ResponseFactory.fail("Unauthorized action")
            );
        }
        const result = await db.postDelete(postId);
        return res.status(200).json(
            ResponseFactory.success(result)
        );
    } catch (error) {
        console.error("Post delete error: ", error.message);
        return res.status(500).json(
            ResponseFactory.fail("Server Error")
        );
    }
}