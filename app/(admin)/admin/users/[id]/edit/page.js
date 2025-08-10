import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import UserForm from "@/components/admin/UserForm";

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export default async function EditUserPage({ params }) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Edit Pengguna</h1>
      </div>

      <UserForm user={user} />
    </div>
  );
}
