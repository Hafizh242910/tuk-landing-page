import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Shield,
  Mail,
  Database,
  Info,
  Save,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Pengaturan Umum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Aplikasi
              </label>
              <input
                type="text"
                defaultValue="Mega Citra Wisata"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                defaultValue="Platform pelatihan dan sertifikasi profesional"
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Zona Waktu
              </label>
              <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Keamanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Durasi Session (menit)
              </label>
              <input
                type="number"
                defaultValue={30}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Maksimal Login Gagal
              </label>
              <input
                type="number"
                defaultValue={5}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="twoFactor"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="twoFactor"
                className="text-sm font-medium text-gray-700"
              >
                Aktifkan Two-Factor Authentication
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="passwordPolicy"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="passwordPolicy"
                className="text-sm font-medium text-gray-700"
              >
                Kebijakan Password Kuat
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Pengaturan Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                SMTP Host
              </label>
              <input
                type="text"
                defaultValue="smtp.gmail.com"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                SMTP Port
              </label>
              <input
                type="number"
                defaultValue={587}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Pengirim
              </label>
              <input
                type="email"
                defaultValue="noreply@megacitrawisata.com"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Pengirim
              </label>
              <input
                type="text"
                defaultValue="Mega Citra Wisata"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Tipe Database
              </label>
              <div className="mt-1">
                <Badge variant="outline">MySQL</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Versi Database
              </label>
              <div className="mt-1">
                <Badge variant="outline">8.0.33</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Ukuran Database
              </label>
              <div className="mt-1">
                <Badge variant="outline">2.5 MB</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Backup Database
              </Button>
              <Button variant="outline" size="sm">
                Optimize Database
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Informasi Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">Versi Aplikasi</h4>
                <p className="text-sm text-gray-600">1.0.0</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Node.js Version</h4>
                <p className="text-sm text-gray-600">18.17.0</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Next.js Version</h4>
                <p className="text-sm text-gray-600">15.0.0</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Prisma Version</h4>
                <p className="text-sm text-gray-600">5.0.0</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Environment</h4>
                <p className="text-sm text-gray-600">Development</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Last Updated</h4>
                <p className="text-sm text-gray-600">27 Juli 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
