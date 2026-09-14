import React, { useRef } from 'react';
import { ViewTab } from '../types';
import { 
  Building2, 
  CalendarDays, 
  BarChart3, 
  PlusCircle, 
  FileSpreadsheet, 
  Car, 
  Printer, 
  RotateCcw,
  ShieldCheck,
  MapPin,
  LogOut,
  Download,
  Upload,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onResetData: () => void;
  onOpenPrintModal: () => void;
  totalEntriesCount: number;
  user: string;
  onLogout: () => void;
  onBackupData: () => void;
  onRestoreData: (file: File) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onResetData,
  onOpenPrintModal,
  totalEntriesCount,
  user,
  onLogout,
  onBackupData,
  onRestoreData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onRestoreData(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg border-b border-slate-800">
      {/* Hidden File Input for JSON Restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Top Bar Banner */}
      <div className="bg-amber-600 px-4 py-1.5 text-xs font-medium text-amber-95 flex flex-wrap justify-between items-center gap-2 border-b border-amber-500/30">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-100 shrink-0" />
          <span className="hidden md:inline">BADAN PENDAPATAN DAERAH PROVINSI BALI &bull; </span>
          <span>UPTD PELAYANAN PAJAK DAERAH KAB. GIANYAR</span>
        </div>
        <div className="flex items-center gap-3 text-amber-100">
          <span className="flex items-center gap-1 font-semibold bg-amber-700/60 px-2 py-0.5 rounded border border-amber-500/40">
            <UserCheck className="w-3.5 h-3.5 text-amber-200" />
            <span>Petugas: <strong className="text-white">{user}</strong></span>
          </span>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-700/60 transition-colors font-bold cursor-pointer"
            title="Keluar dari sistem"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-900/40 ring-2 ring-amber-400/30 shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  SAMSAT DESA
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-amber-500/30">
                  Kab. Gianyar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                UPTD Pelayanan Pajak Daerah Kab. Gianyar &bull; Realisasi Penerimaan PKB
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenPrintModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Cetak Laporan Resmi KOP Surat"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Laporan</span>
            </button>

            <button
              onClick={() => setActiveTab('input')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-xs font-bold cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Data</span>
            </button>

            {/* Backup JSON Button */}
            <button
              onClick={onBackupData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-sky-900/80 hover:bg-sky-800 text-sky-100 border border-sky-700/70 transition-colors shadow-xs cursor-pointer"
              title="Unduh/Backup Data ke File JSON"
            >
              <Download className="w-3.5 h-3.5 text-sky-300" />
              <span>Backup JSON</span>
            </button>

            {/* Restore JSON Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 border border-indigo-700/70 transition-colors shadow-xs cursor-pointer"
              title="Upload & Restore Data dari File JSON"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-300" />
              <span>Restore JSON</span>
            </button>

            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 transition-colors cursor-pointer"
              title="Kosongkan Semua Data Transaksi"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kosongkan</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 mt-5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800 pt-3">
          <button
            onClick={() => setActiveTab('harian')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'harian'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Tabel Harian ({totalEntriesCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('rekap-bulanan')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'rekap-bulanan'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Rekap Bulanan</span>
          </button>

          <button
            onClick={() => setActiveTab('grafik')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'grafik'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Grafik &amp; Analisis</span>
          </button>

          <button
            onClick={() => setActiveTab('transaksi-detail')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'transaksi-detail'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-950/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Rincian Kendaraan</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
