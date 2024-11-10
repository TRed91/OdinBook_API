const prisma = require('./prismaClient');

exports.userCreate = (userName, password, email) => {
    return prisma.user.create({
        data: {
            userName: userName,
            password: password,
            email: email,
        }
    });
}

exports.userGetById = (userId) => {
    return prisma.user.findUnique({
        where: { userId: userId },
        select: {
            userId: true,
            userName: true,
            email: true,
        }
    });
}

exports.userGetByName = (userName) => {
    return prisma.user.findUnique({
        where: { userName: userName },
        select: {
            userId: true,
            userName: true,
            password: true,
        }
    });
}

exports.userUpdate = (userId, userName, email) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            userName: userName,
            email: email,
        }
    });
}

exports.userUpdateFollows = (userId, followId) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            following: {
                connect: {
                    userId: followId,
                },
            },
        },
    });
}

exports.userDelete = (userId) => {
    return prisma.user.delete({
        where: { userId: userId },
    })
}