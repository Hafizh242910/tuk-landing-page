"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ScheduleForm({ schedule = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(() => {
    const initialStatus = schedule?.status || "OPEN";
    const statusColor = {
      OPEN: { bg: "#22C55E", text: "#FFFFFF" },
      LIMITED: { bg: "#F97316", text: "#FFFFFF" },
      FULL: { bg: "#EF4444", text: "#FFFFFF" },
      CLOSED: { bg: "#6B7280", text: "#FFFFFF" },
      CANCELLED: { bg: "#DC2626", text: "#FFFFFF" },
    }[initialStatus] || { bg: "#22C55E", text: "#FFFFFF" };

    return {
      courseId: schedule?.courseId || "",
      startDate: schedule?.startDate
        ? new Date(schedule.startDate).toISOString().split("T")[0]
        : "",
      endDate: schedule?.endDate
        ? new Date(schedule.endDate).toISOString().split("T")[0]
        : "",
      time: schedule?.time || "",
      location: schedule?.location || "",
      seats: schedule?.seats ? parseInt(schedule.seats) : 25,
      available: schedule?.available ? parseInt(schedule.available) : 25,
      status: initialStatus,
      color: schedule?.color || statusColor.bg,
      textColor: schedule?.textColor || statusColor.text,
    };
  });

  useEffect(() => {
    // Fetch courses for dropdown
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();

    // Debug: Log initial form state
    console.log("=== INITIAL FORM STATE ===");
    console.log("Schedule prop:", schedule);
    console.log("Initial formData:", formData);
    console.log(
      "Seats in formData:",
      formData.seats,
      "Type:",
      typeof formData.seats
    );
    console.log(
      "Available in formData:",
      formData.available,
      "Type:",
      typeof formData.available
    );
  }, []);

  // Auto-update colors when status changes (if colors are not custom set)
  useEffect(() => {
    console.log("=== STATUS CHANGE DEBUG ===");
    console.log("Status changed to:", formData.status);
    console.log("Current formData:", formData);

    if (formData.status) {
      const statusColor = getStatusColor(formData.status);
      console.log("Status color for", formData.status, ":", statusColor);

      // Always update colors when status changes for new schedules
      if (!schedule) {
        console.log("New schedule - updating colors to:", statusColor);
        setFormData((prev) => {
          const updated = {
            ...prev,
            color: statusColor.bg,
            textColor: statusColor.text,
          };
          console.log("Updated formData:", updated);
          return updated;
        });
      } else {
        // For existing schedules, only update if colors are default
        const currentColorIsDefault =
          !formData.color || formData.color === "#3B82F6";
        const currentTextColorIsDefault =
          !formData.textColor || formData.textColor === "#FFFFFF";

        console.log("Existing schedule - current colors:", {
          color: formData.color,
          textColor: formData.textColor,
          isDefault: currentColorIsDefault && currentTextColorIsDefault,
        });

        if (currentColorIsDefault && currentTextColorIsDefault) {
          console.log("Updating colors for existing schedule to:", statusColor);
          setFormData((prev) => {
            const updated = {
              ...prev,
              color: statusColor.bg,
              textColor: statusColor.text,
            };
            console.log("Updated formData:", updated);
            return updated;
          });
        } else {
          console.log("Colors are custom, not updating automatically");
        }
      }
    }
  }, [formData.status]); // Remove schedule from dependency to prevent infinite loop

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return { bg: "#22C55E", text: "#FFFFFF", label: "Terbuka" };
      case "LIMITED":
        return { bg: "#F97316", text: "#FFFFFF", label: "Terbatas" };
      case "FULL":
        return { bg: "#EF4444", text: "#FFFFFF", label: "Penuh" };
      case "CLOSED":
        return { bg: "#6B7280", text: "#FFFFFF", label: "Ditutup" };
      case "CANCELLED":
        return { bg: "#DC2626", text: "#FFFFFF", label: "Dibatalkan" };
      default:
        return { bg: "#22C55E", text: "#FFFFFF", label: "Terbuka" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure we have valid data
      const seats = Number(formData.seats) || 25;
      const available = Number(formData.available) || 25;

      // Manual validation
      if (!formData.courseId) {
        alert("Program Pelatihan harus dipilih");
        setLoading(false);
        return;
      }
      if (!formData.startDate) {
        alert("Tanggal Mulai harus diisi");
        setLoading(false);
        return;
      }
      if (!formData.endDate) {
        alert("Tanggal Selesai harus diisi");
        setLoading(false);
        return;
      }
      if (seats <= 0) {
        alert("Total Kursi harus lebih dari 0");
        setLoading(false);
        return;
      }
      if (available < 0) {
        alert("Kursi Tersedia tidak boleh negatif");
        setLoading(false);
        return;
      }

      const url = schedule ? `/api/schedules/${schedule.id}` : "/api/schedules";
      const method = schedule ? "PUT" : "POST";

      // Create request data with explicit values
      const requestData = {
        courseId: formData.courseId,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        time: formData.time || "",
        location: formData.location || "",
        seats: seats,
        available: available,
        status: formData.status || "OPEN",
        color: formData.color || "#3B82F6",
        textColor: formData.textColor || "#FFFFFF",
      };

      // Debug logging
      console.log("=== FORM SUBMISSION DEBUG ===");
      console.log("Original formData:", formData);
      console.log("Processed requestData:", requestData);
      console.log("Seats:", seats, "Type:", typeof seats);
      console.log("Available:", available, "Type:", typeof available);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        router.push("/admin/schedules");
        router.refresh();
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        alert(error.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!schedule) return;

    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/schedules/${schedule.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/schedules");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.message || "Terjadi kesalahan saat menghapus");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setDeleting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    console.log(
      `Field ${name} changed to:`,
      newValue,
      "Type:",
      typeof newValue
    );

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };
      console.log("Updated formData:", updated);
      return updated;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{schedule ? "Edit Jadwal" : "Form Jadwal Baru"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="courseId">Program Pelatihan *</Label>
              <select
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih Program</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="space-y-3">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="OPEN">Terbuka</option>
                  <option value="LIMITED">Terbatas</option>
                  <option value="FULL">Penuh</option>
                  <option value="CLOSED">Ditutup</option>
                  <option value="CANCELLED">Dibatalkan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Selesai *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="time">Waktu</Label>
              <Input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Contoh: 09:00 - 17:00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Lokasi pelatihan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="seats">Total Kursi *</Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                value={formData.seats}
                onChange={handleChange}
                onBlur={(e) => {
                  console.log(
                    "Seats onBlur:",
                    e.target.value,
                    "Type:",
                    typeof e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    seats: parseInt(e.target.value) || 25,
                  }));
                }}
                placeholder="25"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="available">Kursi Tersedia *</Label>
              <Input
                id="available"
                name="available"
                type="number"
                value={formData.available}
                onChange={handleChange}
                onBlur={(e) => {
                  console.log(
                    "Available onBlur:",
                    e.target.value,
                    "Type:",
                    typeof e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    available: parseInt(e.target.value) || 25,
                  }));
                }}
                placeholder="25"
                min="0"
                max={formData.seats}
                required
              />
            </div>
          </div>

          <div className="flex justify-between">
            {schedule && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting || loading}
              >
                {deleting ? "Menghapus..." : "Hapus Jadwal"}
              </Button>
            )}

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading || deleting}>
                {loading
                  ? "Menyimpan..."
                  : schedule
                  ? "Update Jadwal"
                  : "Buat Jadwal"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
