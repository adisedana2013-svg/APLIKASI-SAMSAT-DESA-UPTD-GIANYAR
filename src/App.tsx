import React, { useState, useEffect } from 'react';
import { ViewTab, SamsatDailyEntry, VehicleTransaction } from './types';
import { 
  INITIAL_DAILY_ENTRIES, 
  INITIAL_VEHICLE_TRANSACTIONS, 
  LIST_KANTOR_DESA 
} from './data/initialData';
import { ensureCompleteVehicleTransactions } from './utils/vehicleGenerator';
import { Navbar } from './components/Navbar';
import { SummaryCards } from './components/SummaryCards';
import { DailyTable } from './components/DailyTable';
import { MonthlyRecap } from './components/MonthlyRecap';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { VehicleDetailTable } from './components/VehicleDetailTable';
import { TransactionModal } from './components/TransactionModal';
import { PrintReportModal } from './components/PrintReportModal';
import { LoginPage } from './components/LoginPage';
import { ConfirmModal } from './components/ConfirmModal';

const STORAGE_KEY_ENTRIES = 'samsat_metulung_entries_v3';
const STORAGE_KEY_VEHICLES = 'samsat_metulung_vehicles_v3';
const STORAGE_KEY_AUTH = 'samsat_user_auth_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH);
    } catch (e) {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<ViewTab>('harian');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // Confirmation Modal State
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    iconType?: 'logout' | 'delete' | 'reset' | 'restore' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Handle Login & Logout
  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem(STORAGE_KEY_AUTH, username);
  };

  const handleLogout = () => {
    setConfirmModalState({
      isOpen: true,
      title: 'Konfirmasi Logout',
      message: 'Apakah Anda yakin ingin keluar dari sistem SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar?',
      confirmText: 'Ya, Logout Sekarang',
      cancelText: 'Batal',
      variant: 'warning',
      iconType: 'logout',
      onConfirm: () => {
        setCurrentUser(null);
        localStorage.removeItem(STORAGE_KEY_AUTH);
      },
    });
  };

  // Entries State with LocalStorage
  const [entries, setEntries] = useState<SamsatDailyEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_DAILY_ENTRIES.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading entries from localStorage', e);
    }
    return INITIAL_DAILY_ENTRIES;
  });

  // Vehicle Transactions State with LocalStorage
  const [vehicles, setVehicles] = useState<VehicleTransaction[]>(() => {
    let baseVehicles: VehicleTransaction[] = INITIAL_VEHICLE_TRANSACTIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VEHICLES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          baseVehicles = parsed;
        }
      }
    } catch (e) {
      console.error('Error loading vehicles from localStorage', e);
    }
    return ensureCompleteVehicleTransactions(INITIAL_DAILY_ENTRIES, baseVehicles);
  });

  // Modals
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<SamsatDailyEntry | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Sync entries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save entries to localStorage', e);
    }
  }, [entries]);

  // Sync vehicles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(vehicles));
    } catch (e) {
      console.error('Failed to save vehicles to localStorage', e);
    }
  }, [vehicles]);

  // Backup Data to JSON
  const handleBackupData = () => {
    const dataToBackup = {
      appName: 'SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar',
      exportedAt: new Date().toISOString(),
      version: '1.0',
      totalEntries: entries.length,
      totalVehicles: vehicles.length,
      entries: entries,
      vehicles: vehicles,
    };

    const jsonString = JSON.stringify(dataToBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date().toISOString().substring(0, 10);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Samsat_Desa_Gianyar_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Restore Data from JSON
  const handleRestoreData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        let restoredEntries: SamsatDailyEntry[] = [];
        let restoredVehicles: VehicleTransaction[] = [];

        if (Array.isArray(parsed)) {
          restoredEntries = parsed;
        } else if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.entries)) {
            restoredEntries = parsed.entries;
          }
          if (Array.isArray(parsed.vehicles)) {
            restoredVehicles = parsed.vehicles;
          }
        }

        if (restoredEntries.length === 0 && restoredVehicles.length === 0) {
          setConfirmModalState({
            isOpen: true,
            title: 'File JSON Tidak Valid',
            message: 'File JSON yang diunggah tidak berisi data SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar.',
            confirmText: 'Mengerti',
            cancelText: 'Tutup',
            variant: 'danger',
            iconType: 'info',
            onConfirm: () => {},
          });
          return;
        }

        const confirmMsg = `Ditemukan ${restoredEntries.length} data harian dan ${restoredVehicles.length} rincian kendaraan dalam file backup.\n\nApakah Anda yakin ingin memulihkan (restore) data ini? Data saat ini akan diperbarui.`;

        setConfirmModalState({
          isOpen: true,
          title: 'Konfirmasi Restore Data',
          message: confirmMsg,
          confirmText: 'Ya, Restore Data',
          cancelText: 'Batal',
          variant: 'warning',
          iconType: 'restore',
          onConfirm: () => {
            if (restoredEntries.length > 0) {
              setEntries(restoredEntries);
              localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(restoredEntries));
            }
            if (restoredVehicles.length > 0) {
              setVehicles(restoredVehicles);
              localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(restoredVehicles));
            } else if (restoredEntries.length > 0) {
              const generatedVehicles = ensureCompleteVehicleTransactions(restoredEntries, []);
              setVehicles(generatedVehicles);
              localStorage.setItem(STORAGE_KEY_VEHICLES, JSON.stringify(generatedVehicles));
            }
          },
        });
      } catch (err) {
        console.error('Failed to parse JSON file', err);
        setConfirmModalState({
          isOpen: true,
          title: 'Gagal Membaca File',
          message: 'Gagal membaca file JSON. Pastikan format file sesuai.',
          confirmText: 'Mengerti',
          cancelText: 'Tutup',
          variant: 'danger',
          iconType: 'info',
          onConfirm: () => {},
        });
      }
    };
    reader.readAsText(file);
  };

  // Handle Save (Add or Update) Entry
  const handleSaveEntry = (data: Partial<SamsatDailyEntry>, vehicleItems?: VehicleTransaction[]) => {
    let entryId = data.id;

    if (data.id) {
      // Edit
      setEntries((prev) =>
        prev.map((e) => (e.id === data.id ? ({ ...e, ...data } as SamsatDailyEntry) : e))
      );
    } else {
      // Add New
      entryId = 'smd-' + Date.now();
      const newEntry: SamsatDailyEntry = {
        id: entryId,
        no: entries.length + 1,
        tanggal: data.tanggal || new Date().toISOString().substring(0, 10),
        kantorDesa: data.kantorDesa || 'Kantor Desa Batur Tengah',
        realisasiBangliNopol: data.realisasiBangliNopol || 0,
        realisasiBangliRp: data.realisasiBangliRp || 0,
        realisasiLuarNopol: data.realisasiLuarNopol || 0,
        realisasiLuarRp: data.realisasiLuarRp || 0,
        petugas: data.petugas || 'Petugas Samsat',
        catatan: data.catatan || ''
      };
      setEntries((prev) => [newEntry, ...prev]);
    }

    // Automatically append generated vehicle items into Rincian Kendaraan
    if (vehicleItems && vehicleItems.length > 0) {
      const updatedVehiclesWithEntryId = vehicleItems.map(v => ({
        ...v,
        dailyEntryId: entryId
      }));
      setVehicles((prev) => [...updatedVehiclesWithEntryId, ...prev]);
    }

    setEditingEntry(null);
  };

  // Handle Delete Entry
  const handleDeleteEntry = (id: string) => {
    const entryToDelete = entries.find((e) => e.id === id);
    const label = entryToDelete
      ? `tanggal ${entryToDelete.tanggal} (${entryToDelete.kantorDesa})`
      : '';

    setConfirmModalState({
      isOpen: true,
      title: 'Hapus Data Realisasi Harian',
      message: `Apakah Anda yakin ingin menghapus data realisasi ${label}? Data rincian kendaraan terkait juga akan dihapus.`,
      confirmText: 'Ya, Hapus Data',
      cancelText: 'Batal',
      variant: 'danger',
      iconType: 'delete',
      onConfirm: () => {
        setEntries((prev) => prev.filter((e) => e.id !== id));
        if (entryToDelete) {
          setVehicles((prev) =>
            prev.filter(
              (v) =>
                v.dailyEntryId !== id &&
                !(v.tanggal === entryToDelete.tanggal && v.kantorDesa === entryToDelete.kantorDesa)
            )
          );
        }
      },
    });
  };

  // Handle Add Vehicle Transaction
  const handleAddVehicle = (newVehicle: VehicleTransaction) => {
    setVehicles((prev) => [newVehicle, ...prev]);

    // Optionally update daily tally if entry exists or create auto entry
    const matchingEntryIndex = entries.findIndex(
      (e) => e.tanggal === newVehicle.tanggal && e.kantorDesa === newVehicle.kantorDesa
    );

    if (matchingEntryIndex >= 0) {
      const updated = [...entries];
      const target = { ...updated[matchingEntryIndex] };
      if (newVehicle.isBangli) {
        target.realisasiBangliNopol += 1;
        target.realisasiBangliRp += newVehicle.totalBayar;
      } else {
        target.realisasiLuarNopol += 1;
        target.realisasiLuarRp += newVehicle.totalBayar;
      }
      updated[matchingEntryIndex] = target;
      setEntries(updated);
    }
  };

  // Handle Delete Vehicle Transaction
  const handleDeleteVehicle = (id: string) => {
    const vehicleToDelete = vehicles.find((v) => v.id === id);
    if (!vehicleToDelete) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      return;
    }

    setConfirmModalState({
      isOpen: true,
      title: 'Hapus Transaksi Kendaraan',
      message: `Apakah Anda yakin ingin menghapus transaksi kendaraan plat ${vehicleToDelete.platNomor} (${vehicleToDelete.namaPemilik})?`,
      confirmText: 'Ya, Hapus Transaksi',
      cancelText: 'Batal',
      variant: 'danger',
      iconType: 'delete',
      onConfirm: () => {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        setEntries((prevEntries) =>
          prevEntries.map((entry) => {
            if (
              entry.id === vehicleToDelete.dailyEntryId ||
              (entry.tanggal === vehicleToDelete.tanggal && entry.kantorDesa === vehicleToDelete.kantorDesa)
            ) {
              if (vehicleToDelete.isBangli) {
                return {
                  ...entry,
                  realisasiBangliNopol: Math.max(0, entry.realisasiBangliNopol - 1),
                  realisasiBangliRp: Math.max(0, entry.realisasiBangliRp - vehicleToDelete.totalBayar),
                };
              } else {
                return {
                  ...entry,
                  realisasiLuarNopol: Math.max(0, entry.realisasiLuarNopol - 1),
                  realisasiLuarRp: Math.max(0, entry.realisasiLuarRp - vehicleToDelete.totalBayar),
                };
              }
            }
            return entry;
          })
        );
      },
    });
  };

  // Clear or reset all data
  const handleResetData = () => {
    setConfirmModalState({
      isOpen: true,
      title: 'Kosongkan Semua Data',
      message: 'Apakah Anda yakin ingin mengosongkan semua data transaksi dan realisasi? Seluruh data yang tersimpan di browser akan dihapus.',
      confirmText: 'Ya, Kosongkan Semua',
      cancelText: 'Batal',
      variant: 'danger',
      iconType: 'reset',
      onConfirm: () => {
        setEntries([]);
        setVehicles([]);
        localStorage.removeItem(STORAGE_KEY_ENTRIES);
        localStorage.removeItem(STORAGE_KEY_VEHICLES);
      },
    });
  };

  // Filtered entries for active view
  const currentViewEntries = selectedMonth
    ? entries.filter((e) => e.tanggal.startsWith(selectedMonth))
    : entries;

  // Render Login Page if user is not logged in
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetData={handleResetData}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        totalEntriesCount={entries.length}
        user={currentUser}
        onLogout={handleLogout}
        onBackupData={handleBackupData}
        onRestoreData={handleRestoreData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* KPI Summary Cards */}
        <SummaryCards 
          entries={currentViewEntries} 
          selectedMonth={selectedMonth} 
        />

        {/* View Switcher Content */}
        {activeTab === 'harian' && (
          <DailyTable
            entries={entries}
            onEditEntry={(entry) => {
              setEditingEntry(entry);
              setIsInputModalOpen(true);
            }}
            onDeleteEntry={handleDeleteEntry}
            onAddNewClick={() => {
              setEditingEntry(null);
              setIsInputModalOpen(true);
            }}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            listKantorDesa={LIST_KANTOR_DESA}
          />
        )}

        {activeTab === 'rekap-bulanan' && (
          <MonthlyRecap
            entries={entries}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {activeTab === 'grafik' && (
          <AnalyticsCharts
            entries={entries}
            selectedMonth={selectedMonth}
          />
        )}

        {activeTab === 'transaksi-detail' && (
          <VehicleDetailTable
            vehicles={vehicles}
            onAddVehicle={handleAddVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            listKantorDesa={LIST_KANTOR_DESA}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        )}

        {activeTab === 'input' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 my-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Input Data Realisasi Baru</h2>
            <p className="text-xs text-slate-500 mb-6">
              Silakan isi formulir di bawah ini untuk mencatat kegiatan SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar di Kantor Desa.
            </p>

            <button
              onClick={() => {
                setEditingEntry(null);
                setIsInputModalOpen(true);
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
            >
              + Buka Form Pencatatan Harian
            </button>
          </div>
        )}

      </main>

      {/* Modals */}
      <TransactionModal
        isOpen={isInputModalOpen}
        onClose={() => {
          setIsInputModalOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSaveEntry}
        initialData={editingEntry}
        listKantorDesa={LIST_KANTOR_DESA}
      />

      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        entries={entries}
        selectedMonth={selectedMonth}
      />

      <ConfirmModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        confirmText={confirmModalState.confirmText}
        cancelText={confirmModalState.cancelText}
        variant={confirmModalState.variant}
        iconType={confirmModalState.iconType}
        onConfirm={confirmModalState.onConfirm}
        onClose={() => setConfirmModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-amber-400">SAMSAT DESA</span> &bull; UPTD Pelayanan Pajak Daerah Kab. Gianyar &copy; 2026
          </div>
          <div className="text-slate-500">
            Badan Pendapatan Daerah Provinsi Bali &bull; Kabupaten Gianyar
          </div>
        </div>
      </footer>

    </div>
  );
}
