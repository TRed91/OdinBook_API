const prisma = require('./prismaClient');

exports.likeGetCount = (postId) => {
    return prisma.like.count({
        where: {
            postId: postId,
        },
    });
}

exports.likeAdd = (postId, userId) => {
    return prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        }
    })
}