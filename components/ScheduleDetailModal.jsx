"use client";
import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ScheduleDetailModal = ({ schedule, isOpen, onClose }) => {
  const [course, setCourse] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    notes: "",
  });

  useEffect(() => {
    if (schedule?.courseId) {
      // Fetch course details if not already included
      const fetchCourse = async () => {
        try {
          const response = await fetch(`/api/courses/${schedule.courseId}`);
          if (response.ok) {
            const data = await response.json();
            setCourse(data.data);
          }
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };

      if (!schedule.course) {
        fetchCourse();
      } else {
        setCourse(schedule.course);
      }
    }
  }, [schedule]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Reset form when modal opens
      setShowRegistration(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        notes: "",
      });
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Here you would typically send the registration data to your API
      // For now, we'll just show a success message
      alert("Pendaftaran berhasil! Kami akan menghubungi Anda segera.");
      onClose();
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (schedule) => {
    // Use status from backend, fallback to calculated status if not set
    const status = schedule.status || "OPEN";

    switch (status) {
      case "OPEN":
        return (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
          >
            Tersedia
          </span>
        );
      case "LIMITED":
        return (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "#FED7AA", color: "#EA580C" }}
          >
            Terbatas
          </span>
        );
      case "FULL":
        return (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
          >
            Penuh
          </span>
        );
      case "CLOSED":
        return (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
          >
            Ditutup
          </span>
        );
      case "CANCELLED":
        return (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
          >
            Dibatalkan
          </span>
        );
      default:
        // Fallback to calculated status based on availability
        const available = schedule.available;
        const total = schedule.seats;
        const percentage = (available / total) * 100;

        if (percentage === 0) {
          return (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
            >
              Penuh
            </span>
          );
        } else if (percentage <= 30) {
          return (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: "#FED7AA", color: "#EA580C" }}
            >
              Terbatas
            </span>
          );
        } else {
          return (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
            >
              Tersedia
            </span>
          );
        }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatPrice = (price) => {
    if (!price) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen || !schedule) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg ${
          showRegistration ? "max-w-2xl" : "max-w-md"
        } w-full max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            {showRegistration && (
              <button
                onClick={() => setShowRegistration(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {showRegistration
                ? "Form Pendaftaran"
                : course?.title ||
                  schedule.course?.title ||
                  "Program Pelatihan"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showRegistration ? (
          <>
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Date Range */}
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {formatDate(schedule.startDate)} -{" "}
                  {formatDate(schedule.endDate)}
                </span>
              </div>

              {/* Time */}
              {schedule.time && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{schedule.time} WIB</span>
                </div>
              )}

              {/* Location */}
              {schedule.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{schedule.location}</span>
                </div>
              )}

              {/* Participants */}
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {schedule.available} / {schedule.seats} peserta tersedia
                </span>
              </div>

              {/* Price */}
              {course?.price && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">
                    {formatPrice(course.price)}
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="pt-2">{getStatusBadge(schedule)}</div>

              {/* Course Description */}
              {course?.description && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Deskripsi Program
                  </h3>
                  <p className="text-gray-700 text-sm">{course.description}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Registration Form */
          <div className="p-6">
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="contoh@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="081234567890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Perusahaan</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Nama perusahaan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  placeholder="Jabatan di perusahaan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Catatan atau pertanyaan tambahan"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRegistration(false)}
                  className="flex-1"
                >
                  Kembali
                </Button>
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Mendaftar..." : "Daftar Sekarang"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleDetailModal;
