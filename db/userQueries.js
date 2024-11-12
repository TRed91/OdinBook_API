const prisma = require('./prismaClient');

exports.userCreate = (userName, password, email, avatarUrl) => {
    return prisma.user.create({
        data: {
            userName: userName,
            email: email,
            avatarUrl: avatarUrl,
            password: {
                create: {
                    password: password,
                }
            }
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
            avatarUrl: true,
        }
    });
}

exports.userGetByName = (userName) => {
    return prisma.user.findUnique({
        where: { userName: userName },
        select: {
            userId: true,
            userName: true,
            email: true,
            avatarUrl: true,
            password: true,
        }
    });
}

exports.userGetByEmail = email => {
    return prisma.user.findUnique({
        where: { email: email },
        select: {
            userId: true,
            userName: true,
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

exports.userRemoveFollows = (userId, followId) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            following: {
                disconnect: {
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