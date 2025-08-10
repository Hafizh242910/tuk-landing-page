"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, FileText } from "lucide-react";

export default function CourseForm({ course = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [brochureFile, setBrochureFile] = useState(null);
  const [brochurePreview, setBrochurePreview] = useState(
    course?.brochure || null
  );
  const [formData, setFormData] = useState({
    title: course?.title || "",
    shortTitle: course?.shortTitle || "",
    description: course?.description || "",
    duration: course?.duration || "",
    price: course?.price || "",
    competencies: course?.competencies || "",
    category: course?.category || "TRAINING",
    isActive: course?.isActive !== undefined ? course.isActive : true,
  });

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar");
        return;
      }

      // Validate file size (max 10MB for brochure)
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file maksimal 10MB");
        return;
      }

      setBrochureFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrochurePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBrochure = () => {
    setBrochureFile(null);
    setBrochurePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let brochureUrl = course?.brochure || null;

      // Upload brochure if there's a new file
      if (brochureFile) {
        const formDataBrochure = new FormData();
        formDataBrochure.append("photo", brochureFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataBrochure,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          brochureUrl = uploadResult.url;
        } else {
          throw new Error("Gagal upload brosur");
        }
      }

      const url = course ? `/api/courses/${course.id}` : "/api/courses";
      const method = course ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseInt(formData.price) : null,
          brochure: brochureUrl,
        }),
      });

      if (response.ok) {
        router.push("/admin/courses");
        router.refresh();
      } else {
        const error = await response.json();
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
    if (!course) return;

    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus kursus ini? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/courses/${course.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin/courses");
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course ? "Edit Kursus" : "Form Kursus Baru"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kursus *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Judul kursus"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortTitle">Judul Singkat</Label>
              <Input
                id="shortTitle"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                placeholder="Judul singkat"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="competencies">Kompetensi yang Dicapai</Label>
            <Textarea
              id="competencies"
              name="competencies"
              value={formData.competencies}
              onChange={handleChange}
              placeholder="Masukkan kompetensi yang akan dicapai (satu per baris)"
              rows={6}
            />
            <p className="text-sm text-gray-500">
              Masukkan setiap kompetensi dalam baris terpisah
            </p>
          </div>

          {/* Brochure Upload Section */}
          <div className="space-y-4">
            <Label>Brosur</Label>
            <div className="flex items-center space-x-4">
              {brochurePreview ? (
                <div className="relative">
                  <img
                    src={brochurePreview}
                    alt="Brochure Preview"
                    className="w-32 h-40 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeBrochure}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-400 text-center">
                    Brosur
                  </span>
                </div>
              )}

              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleBrochureChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Format: JPG, PNG, GIF. Maksimal 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Sertifikasi-dan-Pelatihan">Sertifikasi</option>
                <option value="Refreshment-dan-Resertifikasi">
                  Resertifikasi
                </option>
                <option value="Pelatihan">Pelatihan</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="isActive">Aktif</Label>
          </div>

          <div className="flex justify-between">
            {course && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting || loading}
              >
                {deleting ? "Menghapus..." : "Hapus Kursus"}
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
                  : course
                  ? "Update Kursus"
                  : "Buat Kursus"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
