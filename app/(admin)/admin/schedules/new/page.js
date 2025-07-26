import ScheduleForm from "@/components/admin/ScheduleForm";

export default function NewSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Jadwal Baru</h1>
      </div>

      <ScheduleForm />
    </div>
  );
}
