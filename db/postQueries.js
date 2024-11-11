const prisma = require('./prismaClient');

exports.postCreate = (userId, text, commentedId) => {
    return prisma.post.create({
        data: {
            userId: userId,
            text: text,
            commentedId: commentedId || null,
        },
    });
}

exports.postGetOne = (postId) => {
    return prisma.post.findUnique({
        where: { postId: postId },
        include: {
            comments: true,
            user: {
                select: {
                    userId: true,
                    userName: true,
                    email: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                }
            }
        },
    });
}

exports.postGetMany = (userId) => {
    return prisma.user.findUnique({
        where: { userId: userId },
        select: {
            posts: {
                include: {
                    _count: {
                        select: {
                            likes: true
                        },
                    },
                },
            },
            followedBy: {
                select: {
                    userName: true,
                    posts: {
                        include: {
                            _count: {
                                select: {
                                    likes: true
                                },
                            },
                        },
                    }
                },
            },
        },
    });
}

exports.postUpdate = (postId, text) => {
    return prisma.post.update({
        where: { postId: postId },
        data: { text: text },
    });
}

exports.postDelete = (postId) => {
    return prisma.post.delete({
        where: { postId: postId },
    })
}