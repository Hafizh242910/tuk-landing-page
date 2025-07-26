"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroScetion = () => {
  const [stats, setStats] = useState({
    totalParticipants: 500,
    totalPrograms: 15,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch courses and schedules to calculate stats
        const [coursesResponse, schedulesResponse] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/schedules"),
        ]);

        if (coursesResponse.ok && schedulesResponse.ok) {
          const coursesData = await coursesResponse.json();
          const schedulesData = await schedulesResponse.json();

          const activeCourses =
            coursesData.data?.filter((course) => course.isActive) || [];
          const totalParticipants =
            schedulesData.data?.reduce((total, schedule) => {
              return total + (schedule.seats - schedule.available);
            }, 0) || 500;

          setStats({
            totalParticipants: totalParticipants,
            totalPrograms: activeCourses.length || 15,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep default values if API fails
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="relative h-screen w-full pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg" // You'll need to add this image to public folder
          alt="PGAS Training Center"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              PGAS TRAINING CENTER / TUK
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Tingkatkan kemampuan dan keahlian Anda dengan program pelatihan
              profesional terbaik di bidang oil & gas
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/course"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Lihat Program Pelatihan
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center w-[35rem] mx-auto">
              <div className="bg-white border-2 border-blue-400 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {stats.totalParticipants}+
                </h3>
                <p className="text-gray-500">Peserta Terlatih</p>
              </div>
              <div className="bg-white border-2 border-blue-400 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {stats.totalPrograms}+
                </h3>
                <p className="text-gray-500">Program Pelatihan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScetion;
