const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // seed user

  // Create admin user
  const hashedPassword = await bcrypt.hash("tuk123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@tuk.com" },
    update: {},
    create: {
      email: "admin@tuk.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", adminUser.email);

  // Seed courses

  // Create courses
  // const courses = await Promise.all([
  //   prisma.course.upsert({
  //     where: { shortTitle: "OPPP" },
  //     update: {},
  //     create: {
  //       title: "Operator Penyambungan Pipa Polyethylene",
  //       shortTitle: "OPPP",
  //       description:
  //         "Pelatihan untuk operator yang bertanggung jawab dalam penyambungan pipa polyethylene",
  //       duration: "3 Hari",
  //       category: "penyambungan",
  //       isActive: true,
  //     },
  //   }),
  //   prisma.course.upsert({
  //     where: { shortTitle: "ISPGB" },
  //     update: {},
  //     create: {
  //       title: "Inspeksi Stasiun Penyaluran Gas Bumi",
  //       shortTitle: "ISPGB",
  //       description:
  //         "Pelatihan inspeksi dan pemeliharaan stasiun penyaluran gas bumi",
  //       duration: "3 Hari",
  //       category: "inspeksi",
  //       isActive: true,
  //     },
  //   }),
  //   prisma.course.upsert({
  //     where: { shortTitle: "FW" },
  //     update: {},
  //     create: {
  //       title: "Floor Warden",
  //       shortTitle: "FW",
  //       description: "Pelatihan untuk petugas keselamatan dan evakuasi",
  //       duration: "3 Hari",
  //       category: "keselamatan",
  //       isActive: true,
  //     },
  //   }),
  // ]);
  // console.log("✅ Courses created:", courses.length);

  // Seed schedules

  //   // Create schedules
  //   const schedules = await Promise.all([
  //     prisma.schedule.create({
  //       data: {
  //         courseId: courses[0].id,
  //         startDate: new Date("2024-12-15"),
  //         endDate: new Date("2024-12-17"),
  //         time: "08:00 - 17:00 WIB",
  //         location: "Jakarta",
  //         seats: 20,
  //         available: 8,
  //         status: "OPEN",
  //         color: "#3B82F6",
  //         textColor: "#FFFFFF",
  //       },
  //     }),
  //     prisma.schedule.create({
  //       data: {
  //         courseId: courses[1].id,
  //         startDate: new Date("2024-12-20"),
  //         endDate: new Date("2024-12-22"),
  //         time: "08:00 - 17:00 WIB",
  //         location: "Jakarta",
  //         seats: 15,
  //         available: 12,
  //         status: "OPEN",
  //         color: "#10B981",
  //         textColor: "#FFFFFF",
  //       },
  //     }),
  //     prisma.schedule.create({
  //       data: {
  //         courseId: courses[2].id,
  //         startDate: new Date("2025-01-08"),
  //         endDate: new Date("2025-01-10"),
  //         time: "08:00 - 17:00 WIB",
  //         location: "Jakarta",
  //         seats: 25,
  //         available: 18,
  //         status: "OPEN",
  //         color: "#8B5CF6",
  //         textColor: "#FFFFFF",
  //       },
  //     }),
  //   ]);
  //   console.log("✅ Schedules created:", schedules.length);

  // Seed organizational structure

  //   // Create organizational structure (sequentially to handle parent-child relationships)
  //   const director = await prisma.organizationalStructure.upsert({
  //     where: { id: "director" },
  //     update: {},
  //     create: {
  //       id: "director",
  //       name: "John Doe",
  //       position: "Direktur Utama",
  //       department: "Direksi",
  //       level: 1,
  //       isActive: true,
  //     },
  //   });
  //   console.log("✅ Director created:", director.name);

  //   const manager = await prisma.organizationalStructure.upsert({
  //     where: { id: "manager" },
  //     update: {},
  //     create: {
  //       id: "manager",
  //       name: "Jane Smith",
  //       position: "Manager Operasional",
  //       department: "Operasional",
  //       level: 2,
  //       parentId: director.id,
  //       isActive: true,
  //     },
  //   });
  //   console.log("✅ Manager created:", manager.name);

  // Seed supervisor

  //   const supervisor = await prisma.organizationalStructure.upsert({
  //     where: { id: "supervisor" },
  //     update: {},
  //     create: {
  //       id: "supervisor",
  //       name: "Bob Johnson",
  //       position: "Supervisor Lapangan",
  //       department: "Operasional",
  //       level: 3,
  //       parentId: manager.id,
  //       isActive: true,
  //     },
  //   });
  //   console.log("✅ Supervisor created:", supervisor.name);

  //   console.log("✅ Organizational structure created: 3 members");

  //   console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
