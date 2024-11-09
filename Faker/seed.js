const { faker } = require('@faker-js/faker');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding...");

    await prisma.$connect();
    await prisma.user.deleteMany();

    const data = []

    faker.seed(69);
    for (let i = 0; i < 100; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const userName = lastName + firstName;
        const email = faker.internet.email({ firstName: firstName, lastName: lastName });
        const password = faker.internet.password();
        data.push({ userName, email, password });
    }

    await prisma.user.createMany({
        data: data,
        skipDuplicates: true,
    });
}

main()
    .then(res => console.log("Seeding Done!"))
    .catch(error => console.log(error))
    .finally(() => prisma.$disconnect());