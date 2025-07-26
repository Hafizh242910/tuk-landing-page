"use client";
import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

const CourseDetailModal = ({ course, isOpen, onClose }) => {
  const [competencies, setCompetencies] = useState([]);

  useEffect(() => {
    if (course?.competencies) {
      const comps = course.competencies
        .split("\n")
        .filter((item) => item.trim());
      setCompetencies(comps);
    }
  }, [course]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleDownloadBrochure = () => {
    if (course?.brochure) {
      const link = document.createElement("a");
      link.href = course.brochure;
      link.download = `brosur-${course.title
        .replace(/\s+/g, "-")
        .toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Detail Program Pelatihan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Course Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
          </div>

          {/* Brochure Section */}
          {course.brochure && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Brosur
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={course.brochure}
                    alt={`Brosur ${course.title}`}
                    className="max-w-full h-auto rounded-lg shadow-lg border"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
                <button
                  onClick={handleDownloadBrochure}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Brosur</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;
