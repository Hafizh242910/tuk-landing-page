import UserForm from "@/components/admin/UserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Tambah Pengguna Baru
        </h1>
      </div>

      <UserForm />
    </div>
  );
}
