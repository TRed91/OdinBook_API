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
            incomingRequest: true,
            outgoingRequest: true,
            following: true,
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

exports.userGetMany = () => {
    return prisma.user.findMany();
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

exports.addRequest = (userId, followId) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            outgoingRequest: {
                connect: {
                    userId: followId,
                },
            },
        },
    });
}

exports.removeRequest = (userId, requestId) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            incomingRequest: {
                disconnect: {
                    userId: requestId,
                },
            },
        },
    });
}

exports.userUpdateFollows = (userId, followId) => {
    return prisma.user.update({
        where: { userId: userId },
        data: {
            followedBy: {
                connect: {
                    userId: followId,
                },
            },
            incomingRequest: {
                disconnect: {
                    userId: followId,
                }
            }
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

exports.userGetFollowing = (userId) => {
    return prisma.user.findUnique({
        where: { userId: userId },
        select: {
            following: {
                select: {
                    userId: true,
                },
            },
        },
    });
}