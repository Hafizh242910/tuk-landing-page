import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import CourseForm from "@/components/admin/CourseForm";

async function getCourse(id) {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    notFound();
  }

  return course;
}

export default async function EditCoursePage({ params }) {
  const { id } = await params;
  const course = await getCourse(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Edit Kursus</h1>
      </div>

      <CourseForm course={course} />
    </div>
  );
}
