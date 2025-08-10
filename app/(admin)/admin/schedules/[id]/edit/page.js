import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ScheduleForm from "@/components/admin/ScheduleForm";

async function getSchedule(id) {
  const schedule = await prisma.schedule.findUnique({
    where: { id },
  });

  if (!schedule) {
    notFound();
  }

  return schedule;
}

export default async function EditSchedulePage({ params }) {
  const { id } = await params;
  const schedule = await getSchedule(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Edit Jadwal</h1>
      </div>

      <ScheduleForm schedule={schedule} />
    </div>
  );
}
