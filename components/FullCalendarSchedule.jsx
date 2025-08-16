"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, List, Grid } from "lucide-react";
import ScheduleDetailModal from "./ScheduleDetailModal";

const FullCalendarSchedule = ({ schedules = [] }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("dayGridMonth");

  console.log("FullCalendarSchedule received schedules:", schedules);

  // Convert schedules to FullCalendar events format
  const events = schedules.map((schedule) => {
    const available = schedule.available;
    const total = schedule.seats;
    console.log("Processing schedule:", schedule);

    // Use status from backend, fallback to calculated status if not set
    let status = schedule.status || "OPEN";
    let backgroundColor = "#22C55E"; // Default green
    let textColor = "#FFFFFF";

    // Map backend status to colors
    switch (status) {
      case "OPEN":
        status = "Tersedia";
        backgroundColor = "#22C55E"; // Green
        break;
      case "LIMITED":
        status = "Terbatas";
        backgroundColor = "#fcf400"; // Orange
        break;
      case "FULL":
        status = "Penuh";
        backgroundColor = "#EF4444"; // Red
        break;
      case "CLOSED":
        status = "Ditutup";
        backgroundColor = "#6B7280"; // Gray
        break;
      case "CANCELLED":
        status = "Dibatalkan";
        backgroundColor = "#fc7a00"; // Dark red
        break;
      default:
        // Fallback to calculated status based on availability
        backgroundColor = schedule.color;
    }

    const event = {
      id: schedule.id,
      title: `${
        schedule.course?.shortTitle || schedule.course?.title
      } (${available}/${total})`,
      start: schedule.startDate,
      end: schedule.endDate,
      extendedProps: {
        schedule: schedule,
        status: status,
        available: available,
        total: total,
        backendStatus: schedule.status,
      },
      backgroundColor: backgroundColor,
      textColor: textColor,
      borderColor: backgroundColor,
    };

    console.log("Created event:", event);
    return event;
  });

  console.log("Final events array:", events);

  const handleEventClick = (clickInfo) => {
    const schedule = clickInfo.event.extendedProps.schedule;
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: viewMode,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    locale: "id",
    buttonText: {
      today: "Hari Ini",
      month: "Bulan",
      week: "Minggu",
      day: "Hari",
    },
    dayHeaderFormat: { weekday: "short" },
    height: "auto",
    events: events,
    eventClick: handleEventClick,
    eventDisplay: "block",
    displayEventTime: false,
    dayMaxEvents: true,
    moreLinkClick: "popover",
    eventDidMount: (info) => {
      // Add custom styling for events
      const eventEl = info.el;
      const status = info.event.extendedProps.status;

      // Add status badge
      const badge = document.createElement("div");
      badge.className = "fc-event-status-badge";
      badge.textContent = status;
      badge.style.cssText = `
        position: absolute;
        top: 2px;
        right: 2px;
        font-size: 10px;
        padding: 1px 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.9);
        color: #333;
        font-weight: bold;
      `;
      eventEl.appendChild(badge);
    },
  };

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Jadwal Pelatihan</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Status Legend */}
          <div className="flex items-center justify-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg flex-wrap">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#22C55E" }}
              ></div>
              <span className="text-sm text-gray-600">Tersedia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#fcf400" }}
              ></div>
              <span className="text-sm text-gray-600">Terbatas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#EF4444" }}
              ></div>
              <span className="text-sm text-gray-600">Penuh</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#6B7280" }}
              ></div>
              <span className="text-sm text-gray-600">Ditutup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: "#fc7a00" }}
              ></div>
              <span className="text-sm text-gray-600">Dibatalkan</span>
            </div>
          </div>

          {/* FullCalendar Component */}
          <div className="fullcalendar-container">
            <FullCalendar {...calendarOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Schedule Detail Modal */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Custom CSS for FullCalendar */}
      <style jsx global>{`
        .fullcalendar-container .fc {
          font-family: inherit;
        }

        .fullcalendar-container .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .fullcalendar-container .fc-button {
          background-color: #3b82f6;
          border-color: #3b82f6;
          font-weight: 500;
        }

        .fullcalendar-container .fc-button:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .fullcalendar-container .fc-button:focus {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        .fullcalendar-container
          .fc-button-primary:not(:disabled).fc-button-active,
        .fullcalendar-container .fc-button-primary:not(:disabled):active {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
        }

        .fullcalendar-container .fc-event {
          cursor: pointer;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .fullcalendar-container .fc-event:hover {
          opacity: 0.9;
        }

        .fullcalendar-container .fc-daygrid-event {
          white-space: nowrap;
          border-radius: 4px;
        }

        .fullcalendar-container .fc-timegrid-event {
          border-radius: 4px;
        }

        .fullcalendar-container .fc-day-today {
          background-color: rgba(59, 130, 246, 0.1);
        }

        .fullcalendar-container .fc-highlight {
          background-color: rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default FullCalendarSchedule;
