const prisma = require('./prismaClient');

exports.likeGetCount = (postId) => {
    return prisma.like.count({
        where: {
            postId: postId,
        },
    });
}

exports.likeGetOne = (postId, userId) => {
    return prisma.like.findUnique({
        where: {
            postId_userId: {
                postId: postId,
                userId: userId,
            }
        },
    });
}

exports.likeAdd = (postId, userId) => {
    return prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        },
    });
}

exports.likeDelete = (postId, userId) => {
    return prisma.like.delete({
        where: {
            postId_userId: {
                postId: postId,
                userId: userId,
            },
        },
    });
}