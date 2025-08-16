import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import prisma from "@/lib/db";

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.role !== "ADMIN") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Admin user verification failed:", error);

    // If it's a connection error, return null to redirect to login
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      console.error("Database connection failed, redirecting to login");
      return null;
    }

    return null;
  }
}

export default async function AdminLayout({ children }) {
  const user = await getAdminUser();

  if (!user) {
    return (
      <html lang="id">
        <body className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Akses Ditolak
            </h1>
            <p className="text-gray-600 mb-6">
              Anda tidak memiliki akses ke halaman admin. Silakan login terlebih
              dahulu.
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </a>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50" suppressHydrationWarning>
        <div className="flex h-screen">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader user={user} />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
