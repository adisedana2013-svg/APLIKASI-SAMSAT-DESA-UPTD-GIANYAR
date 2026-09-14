import React, { useState, useMemo } from 'react';
import { VehicleTransaction } from '../types';
import { formatRupiah, formatDateIndonesian } from '../utils/formatters';
import { Search, Plus, Car, User, Trash2, Filter, Shield, Calendar, Building2 } from 'lucide-react';

interface VehicleDetailTableProps {
  vehicles: VehicleTransaction[];
  onAddVehicle: (vehicle: VehicleTransaction) => void;
  onDeleteVehicle: (id: string) => void;
  listKantorDesa: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export const VehicleDetailTable: React.FC<VehicleDetailTableProps> = ({
  vehicles,
  onAddVehicle,
  onDeleteVehicle,
  listKantorDesa,
  selectedMonth,
  setSelectedMonth
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesaFilter, setSelectedDesaFilter] = useState('');
  const [platFilter, setPlatFilter] = useState<'all' | 'bangli' | 'luar'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination states
  const [pageSize, setPageSize] = useState<number | 'all'>(50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Available months
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    vehicles.forEach((v) => {
      if (v.tanggal && v.tanggal.length >= 7) {
        months.add(v.tanggal.substring(0, 7));
      }
    });
    return Array.from(months).sort().reverse();
  }, [vehicles]);

  // Form State
  const todayStr = new Date().toISOString().substring(0, 10);
  const [tanggal, setTanggal] = useState(todayStr);
  const [kantorDesa, setKantorDesa] = useState(listKantorDesa[0] || 'Kantor Desa Lebih');
  const [platNomor, setPlatNomor] = useState('DK ');
  const [namaPemilik, setNamaPemilik] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState<'R2' | 'R4' | 'R6+'>('R2');
  const [merkModel, setMerkModel] = useState('Honda Vario');
  const [nominalTotal, setNominalTotal] = useState<number | ''>('');

  // Auto detect if Gianyar plate (Bali region code for Gianyar is L)
  const isBangliDetected = platNomor.toUpperCase().includes(' L') || platNomor.toUpperCase().endsWith('L') || platNomor.toUpperCase().includes(' P') || platNomor.toUpperCase().endsWith('P');

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedMonth && !v.tanggal.startsWith(selectedMonth)) {
        return false;
      }
      if (selectedDesaFilter && v.kantorDesa !== selectedDesaFilter) {
        return false;
      }
      if (platFilter === 'bangli' && !v.isBangli) return false;
      if (platFilter === 'luar' && v.isBangli) return false;

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          v.platNomor.toLowerCase().includes(q) ||
          v.namaPemilik.toLowerCase().includes(q) ||
          v.kantorDesa.toLowerCase().includes(q) ||
          v.merkModel.toLowerCase().includes(q) ||
          formatDateIndonesian(v.tanggal).toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vehicles, selectedMonth, selectedDesaFilter, platFilter, searchTerm]);

  // Stats
  const bangliCount = useMemo(() => filteredVehicles.filter(v => v.isBangli).length, [filteredVehicles]);
  const luarCount = useMemo(() => filteredVehicles.filter(v => !v.isBangli).length, [filteredVehicles]);
  const grandTotalBayar = useMemo(() => filteredVehicles.reduce((acc, c) => acc + c.totalBayar, 0), [filteredVehicles]);

  // Pagination calculation
  const totalPages = useMemo(() => {
    if (pageSize === 'all') return 1;
    return Math.max(1, Math.ceil(filteredVehicles.length / (pageSize as number)));
  }, [filteredVehicles.length, pageSize]);

  const displayedVehicles = useMemo(() => {
    if (pageSize === 'all') return filteredVehicles;
    const size = pageSize as number;
    const start = (currentPage - 1) * size;
    return filteredVehicles.slice(start, start + size);
  }, [filteredVehicles, pageSize, currentPage]);

  // Reset to page 1 when filters change
  const handleMonthChange = (m: string) => {
    setSelectedMonth(m);
    setCurrentPage(1);
  };

  const handleDesaChange = (d: string) => {
    setSelectedDesaFilter(d);
    setCurrentPage(1);
  };

  const handlePlatChange = (p: 'all' | 'bangli' | 'luar') => {
    setPlatFilter(p);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchTerm(q);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedMonth('');
    setSelectedDesaFilter('');
    setPlatFilter('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSubmitNewVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platNomor.trim() || !namaPemilik.trim()) {
      alert('Mohon isi Plat Nomor dan Nama Pemilik!');
      return;
    }

    const total = Number(nominalTotal) || 0;
    const pkb = Math.round(total * 0.8);
    const swd = Math.round(total * 0.12);
    const adm = Math.round(total * 0.08);

    const newVehicle: VehicleTransaction = {
      id: 'tx-' + Date.now(),
      tanggal,
      kantorDesa,
      platNomor: platNomor.toUpperCase().trim(),
      isBangli: isBangliDetected,
      namaPemilik,
      jenisKendaraan,
      merkModel,
      nominalPkb: pkb,
      nominalSwdkllj: swd,
      nominalAdmin: adm,
      totalBayar: total
    };

    onAddVehicle(newVehicle);
    setIsModalOpen(false);
    // Reset
    setPlatNomor('DK ');
    setNamaPemilik('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
      
      {/* Header & Filters */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-indigo-600" />
              <span>Rincian Transaksi Kendaraan Bermotor</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar per unit kendaraan di SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Transaksi</span>
          </button>
        </div>

        {/* Summary Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <div className="bg-slate-900 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
            <span>Total Transaksi:</span>
            <span className="text-amber-400 font-extrabold">{filteredVehicles.length} Unit</span>
          </div>
          <div className="bg-sky-100 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
            <span>Plat Gianyar:</span>
            <span className="text-sky-700 font-black">{bangliCount} Unit</span>
          </div>
          <div className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
            <span>Plat Luar Gianyar:</span>
            <span className="text-amber-700 font-black">{luarCount} Unit</span>
          </div>
          <div className="bg-emerald-100 text-emerald-950 border border-emerald-200 px-3 py-1 rounded-lg font-black ml-auto">
            <span>Total Realisasi: </span>
            <span className="text-emerald-800">{formatRupiah(grandTotalBayar)}</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Bulan */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg shadow-2xs text-xs">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-semibold text-slate-600">Bulan:</span>
              <select
                value={selectedMonth}
                onChange={(e) => handleMonthChange(e.target.value)}
                className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                <option value="">Semua Bulan</option>
                {availableMonths.map((m) => {
                  const [yyyy, mm] = m.split('-');
                  const monthNames = [
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                  ];
                  const label = `${monthNames[parseInt(mm, 10) - 1]} ${yyyy}`;
                  return (
                    <option key={m} value={m}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Filter Desa */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg shadow-2xs text-xs">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-semibold text-slate-600">Desa:</span>
              <select
                value={selectedDesaFilter}
                onChange={(e) => handleDesaChange(e.target.value)}
                className="bg-transparent font-semibold text-slate-900 focus:outline-hidden max-w-[160px] truncate cursor-pointer"
              >
                <option value="">Semua Desa</option>
                {listKantorDesa.map((desa) => (
                  <option key={desa} value={desa}>
                    {desa}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Asal Plat */}
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg shadow-2xs text-xs">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-semibold text-slate-600">Asal Plat:</span>
              <select
                value={platFilter}
                onChange={(e) => handlePlatChange(e.target.value as any)}
                className="bg-transparent font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                <option value="all">Semua Plat</option>
                <option value="bangli">Gianyar (DK..L*)</option>
                <option value="luar">Luar Gianyar</option>
              </select>
            </div>

            {(selectedMonth || selectedDesaFilter || platFilter !== 'all' || searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Plat / Nama / Merk..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-xs text-slate-800">
          <thead>
            <tr className="bg-slate-900 text-white font-semibold text-center border-b border-slate-800 uppercase tracking-wider">
              <th className="px-3 py-3 w-10">NO</th>
              <th className="px-3 py-3 text-left">TANGGAL</th>
              <th className="px-4 py-3 text-left">KANTOR DESA</th>
              <th className="px-3 py-3 text-left">PLAT NOMOR</th>
              <th className="px-3 py-3">ASAL PLAT</th>
              <th className="px-4 py-3 text-left">NAMA PEMILIK</th>
              <th className="px-3 py-3">JENIS &amp; MERK</th>
              <th className="px-4 py-3 text-right bg-emerald-950 text-emerald-200">JUMLAH RP (TOTAL BAYAR)</th>
              <th className="px-2 py-3 w-12">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {displayedVehicles.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data transaksi kendaraan.
                </td>
              </tr>
            ) : (
              displayedVehicles.map((v, idx) => {
                const globalIndex = pageSize === 'all' 
                  ? idx + 1 
                  : (currentPage - 1) * (pageSize as number) + idx + 1;

                return (
                  <tr key={v.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="px-3 py-2.5 text-center font-bold text-slate-500">{globalIndex}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">{formatDateIndonesian(v.tanggal)}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-900">{v.kantorDesa}</td>
                    <td className="px-3 py-2.5 font-black text-slate-900 tracking-wider">
                      <span className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded border border-slate-300 font-mono">
                        {v.platNomor}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {v.isBangli ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200">
                          GIANYAR (DK..L*)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                          LUAR GIANYAR
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{v.namaPemilik}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="font-bold text-slate-700">{v.jenisKendaraan}</span>
                      <span className="text-slate-400 block text-[10px]">{v.merkModel}</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-black text-emerald-950 bg-emerald-50/50">
                      {formatRupiah(v.totalBayar)}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <button
                        onClick={() => onDeleteVehicle(v.id)}
                        className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded transition-colors cursor-pointer"
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900 text-white font-extrabold text-xs uppercase border-t-2 border-indigo-500">
              <td colSpan={7} className="px-4 py-3 text-center">TOTAL DARI {filteredVehicles.length} TRANSAKSI</td>
              <td className="px-4 py-3 text-right text-emerald-300 bg-emerald-950 text-sm">{formatRupiah(grandTotalBayar)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredVehicles.length > 0 && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Tampilkan per halaman:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setPageSize(val);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-slate-800 cursor-pointer"
            >
              <option value={25}>25 Data</option>
              <option value={50}>50 Data</option>
              <option value={100}>100 Data</option>
              <option value={200}>200 Data</option>
              <option value="all">Semua Data ({filteredVehicles.length})</option>
            </select>

            <span className="text-slate-500 ml-2">
              {pageSize === 'all' ? (
                `Menampilkan semua ${filteredVehicles.length} data`
              ) : (
                `Menampilkan ${(currentPage - 1) * (pageSize as number) + 1} - ${Math.min(
                  currentPage * (pageSize as number),
                  filteredVehicles.length
                )} dari ${filteredVehicles.length} data`
              )}
            </span>
          </div>

          {pageSize !== 'all' && totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold hover:bg-slate-100 cursor-pointer"
              >
                &laquo; Prev
              </button>

              <span className="px-3 py-1 font-bold text-slate-800">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Next &raquo;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal Input Transaksi Kendaraan Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Car className="w-5 h-5 text-indigo-400" />
                <span>Input Kendaraan Bermotor Baru</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewVehicle} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kantor Desa</label>
                  <select
                    value={kantorDesa}
                    onChange={(e) => setKantorDesa(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  >
                    {listKantorDesa.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plat Nomor (DK...)</label>
                  <input
                    type="text"
                    required
                    placeholder="DK 3812 LA"
                    value={platNomor}
                    onChange={(e) => setPlatNomor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono font-bold uppercase"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {isBangliDetected ? '✓ Terdeteksi Plat Gianyar' : 'ℹ Terdeteksi Plat Luar Gianyar'}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Wajib Pajak</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Pemilik Kendaraan"
                    value={namaPemilik}
                    onChange={(e) => setNamaPemilik(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Kendaraan</label>
                  <select
                    value={jenisKendaraan}
                    onChange={(e) => setJenisKendaraan(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                  >
                    <option value="R2">Roda 2 (Sepeda Motor)</option>
                    <option value="R4">Roda 4 (Mobil Passenger)</option>
                    <option value="R6+">Roda 6+ (Truck/Bus)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Merk &amp; Tipe</label>
                  <input
                    type="text"
                    placeholder="Honda Vario / Toyota Avanza"
                    value={merkModel}
                    onChange={(e) => setMerkModel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Nominal Bayar (Rp)</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={nominalTotal}
                  onChange={(e) => setNominalTotal(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-slate-900 bg-slate-50"
                  placeholder="850000"
                />
              </div>

              <div className="p-3 bg-emerald-900 text-white rounded-lg flex items-center justify-between font-bold">
                <span>Total Bayar:</span>
                <span className="text-amber-300 text-sm">
                  {formatRupiah(Number(nominalTotal) || 0)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg cursor-pointer"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
