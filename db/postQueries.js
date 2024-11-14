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
                    avatarUrl: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                    comments: true,
                }
            }
        },
    });
}

exports.postGetRecent = (userId) => {
    return prisma.user.findUnique({
        where: { userId: userId },
        select: {
            posts: {
                include: {
                    user: {
                        select: {
                            userName: true,
                            avatarUrl: true,
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                },
                orderBy: { time: "desc" },
            },
            following: {
                select: {
                    posts: {
                        include: {
                            user: {
                                select: {
                                    userName: true,
                                    avatarUrl: true,
                                },
                            },
                            _count: {
                                select: {
                                    likes: true,
                                    comments: true,
                                },
                            },
                        },
                        orderBy: { time: "desc" },
                    },
                },
            },
        },
    });
}

exports.getPostsByUserId = async (userId) => {
    return prisma.post.findMany({
        where: { userId: userId },
        include: {
            user: true,
            _count: {
                select: {
                    likes: true,
                    comments: true,
                },
            },
        },
        orderBy: { time: "desc" },
        take: 5,
    })
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