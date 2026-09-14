import React, { useState, useMemo } from 'react';
import { SamsatDailyEntry } from '../types';
import { formatRupiah, formatNumber, formatDateIndonesian, exportToCSV } from '../utils/formatters';
import { 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  Calendar, 
  Building2, 
  Plus, 
  FileText,
  ChevronDown
} from 'lucide-react';

interface DailyTableProps {
  entries: SamsatDailyEntry[];
  onEditEntry: (entry: SamsatDailyEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddNewClick: () => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  listKantorDesa: string[];
}

export const DailyTable: React.FC<DailyTableProps> = ({
  entries,
  onEditEntry,
  onDeleteEntry,
  onAddNewClick,
  selectedMonth,
  setSelectedMonth,
  listKantorDesa
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesaFilter, setSelectedDesaFilter] = useState('');

  // Get available months from entries
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    entries.forEach((e) => {
      if (e.tanggal && e.tanggal.length >= 7) {
        months.add(e.tanggal.substring(0, 7)); // YYYY-MM
      }
    });
    return Array.from(months).sort().reverse();
  }, [entries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Month filter
      if (selectedMonth && !entry.tanggal.startsWith(selectedMonth)) {
        return false;
      }
      // Desa filter
      if (selectedDesaFilter && entry.kantorDesa !== selectedDesaFilter) {
        return false;
      }
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchDesa = entry.kantorDesa.toLowerCase().includes(query);
        const matchPetugas = (entry.petugas || '').toLowerCase().includes(query);
        const matchCatatan = (entry.catatan || '').toLowerCase().includes(query);
        const matchDate = formatDateIndonesian(entry.tanggal).toLowerCase().includes(query);
        return matchDesa || matchPetugas || matchCatatan || matchDate;
      }
      return true;
    });
  }, [entries, selectedMonth, selectedDesaFilter, searchTerm]);

  // Calculate Column Totals for the Summary Row
  const totals = useMemo(() => {
    return filteredEntries.reduce(
      (acc, curr) => {
        const jmlBangliUnit = curr.realisasiBangliNopol;
        const jmlBangliRp = curr.realisasiBangliRp;
        const jmlLuarUnit = curr.realisasiLuarNopol;
        const jmlLuarRp = curr.realisasiLuarRp;

        return {
          bangliNopol: acc.bangliNopol + curr.realisasiBangliNopol,
          bangliRp: acc.bangliRp + curr.realisasiBangliRp,
          luarNopol: acc.luarNopol + curr.realisasiLuarNopol,
          luarRp: acc.luarRp + curr.realisasiLuarRp,
          jmlBangliUnit: acc.jmlBangliUnit + jmlBangliUnit,
          jmlBangliRp: acc.jmlBangliRp + jmlBangliRp,
          jmlLuarUnit: acc.jmlLuarUnit + jmlLuarUnit,
          jmlLuarRp: acc.jmlLuarRp + jmlLuarRp,
          totalUnit: acc.totalUnit + (jmlBangliUnit + jmlLuarUnit),
          totalRp: acc.totalRp + (jmlBangliRp + jmlLuarRp),
        };
      },
      {
        bangliNopol: 0,
        bangliRp: 0,
        luarNopol: 0,
        luarRp: 0,
        jmlBangliUnit: 0,
        jmlBangliRp: 0,
        jmlLuarUnit: 0,
        jmlLuarRp: 0,
        totalUnit: 0,
        totalRp: 0,
      }
    );
  }, [filteredEntries]);

  // Handle Export to CSV
  const handleExportCSV = () => {
    const exportData = filteredEntries.map((e, idx) => {
      const jmlBangliUnit = e.realisasiBangliNopol;
      const jmlBangliRp = e.realisasiBangliRp;
      const jmlLuarUnit = e.realisasiLuarNopol;
      const jmlLuarRp = e.realisasiLuarRp;
      const totalUnit = jmlBangliUnit + jmlLuarUnit;
      const totalRp = jmlBangliRp + jmlLuarRp;

      return {
        'NO': idx + 1,
        'TANGGAL': e.tanggal,
        'KANTOR DESA': e.kantorDesa,
        'REALISASI GIANYAR (NOPOL)': e.realisasiBangliNopol,
        'REALISASI GIANYAR (RP)': e.realisasiBangliRp,
        'REALISASI LUAR GIANYAR (NOPOL)': e.realisasiLuarNopol,
        'REALISASI LUAR GIANYAR (RP)': e.realisasiLuarRp,
        'JML GIANYAR (UNIT)': jmlBangliUnit,
        'JML GIANYAR (RP)': jmlBangliRp,
        'JML LUAR GIANYAR (UNIT)': jmlLuarUnit,
        'JML LUAR GIANYAR (RP)': jmlLuarRp,
        'TOTAL (UNIT)': totalUnit,
        'TOTAL (RP)': totalRp,
        'PETUGAS': e.petugas || '-',
        'CATATAN': e.catatan || '-'
      };
    });

    exportToCSV(exportData, `Realisasi_Samsat_Desa_Gianyar_${selectedMonth || 'Semua'}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
      
      {/* Control Header & Filters */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>Pencatatan Realisasi SAMSAT DESA</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              UPTD Pelayanan Pajak Daerah Kab. Gianyar &bull; Tabel harian penerimaan pajak kendaraan
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export CSV/Excel</span>
            </button>

            <button
              onClick={onAddNewClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Input Data Baru</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Kantor Desa / Petugas / Catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Month Filter */}
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="">Semua Bulan (Tampilkan Semua)</option>
              {availableMonths.map((m) => {
                const [year, month] = m.split('-');
                const monthNames = [
                  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                ];
                const label = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                return (
                  <option key={m} value={m}>
                    Bulan {label}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Desa Filter */}
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedDesaFilter}
              onChange={(e) => setSelectedDesaFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="">Semua Kantor Desa</option>
              {listKantorDesa.map((desa) => (
                <option key={desa} value={desa}>
                  {desa}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Main Table Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-xs text-slate-800 border-collapse">
          
          {/* Header Rows */}
          <thead>
            {/* Top Level Group Headers */}
            <tr className="bg-slate-900 text-white font-semibold text-center border-b border-slate-800 uppercase tracking-wider">
              <th rowSpan={2} className="px-3 py-3 border-r border-slate-800 w-12 min-w-[48px]">
                NO
              </th>
              <th rowSpan={2} className="px-3 py-3 border-r border-slate-800 min-w-[110px]">
                TANGGAL
              </th>
              <th rowSpan={2} className="px-4 py-3 border-r border-slate-800 text-left min-w-[200px]">
                KANTOR DESA
              </th>
              <th colSpan={2} className="px-3 py-2 border-r border-slate-800 bg-sky-950 text-sky-200">
                REALISASI NOPOL GIANYAR
              </th>
              <th colSpan={2} className="px-3 py-2 border-r border-slate-800 bg-amber-950 text-amber-200">
                REALISASI NOPOL LUAR GIANYAR
              </th>
              <th colSpan={2} className="px-3 py-2 border-r border-slate-800 bg-slate-950 text-sky-300">
                JML GIANYAR
              </th>
              <th colSpan={2} className="px-3 py-2 border-r border-slate-800 bg-slate-950 text-amber-300">
                JML LUAR GIANYAR
              </th>
              <th colSpan={2} className="px-3 py-2 border-r border-slate-800 bg-emerald-950 text-emerald-200">
                TOTAL
              </th>
              <th rowSpan={2} className="px-3 py-3 w-20 min-w-[80px]">
                AKSI
              </th>
            </tr>

            {/* Sub-Header Columns */}
            <tr className="bg-slate-800 text-slate-200 font-medium text-center border-b border-slate-700">
              {/* Realisasi Gianyar */}
              <th className="px-2 py-2 border-r border-slate-700 bg-sky-900/60 min-w-[60px]">Nopol</th>
              <th className="px-3 py-2 border-r border-slate-700 bg-sky-900/60 min-w-[110px]">Rp</th>

              {/* Realisasi Luar Gianyar */}
              <th className="px-2 py-2 border-r border-slate-700 bg-amber-900/60 min-w-[60px]">Nopol</th>
              <th className="px-3 py-2 border-r border-slate-700 bg-amber-900/60 min-w-[110px]">Rp</th>

              {/* Jml Gianyar */}
              <th className="px-2 py-2 border-r border-slate-700 bg-slate-800 min-w-[60px]">Unit</th>
              <th className="px-3 py-2 border-r border-slate-700 bg-slate-800 min-w-[110px]">Rp</th>

              {/* Jml Luar Gianyar */}
              <th className="px-2 py-2 border-r border-slate-700 bg-slate-800 min-w-[60px]">Unit</th>
              <th className="px-3 py-2 border-r border-slate-700 bg-slate-800 min-w-[110px]">Rp</th>

              {/* Total */}
              <th className="px-2 py-2 border-r border-slate-700 bg-emerald-900/60 min-w-[65px]">Unit</th>
              <th className="px-3 py-2 border-r border-slate-700 bg-emerald-900/60 min-w-[125px]">Rp</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200">
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={14} className="px-4 py-12 text-center text-slate-400 bg-slate-50">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-slate-300" />
                    <span className="font-semibold text-slate-600">
                      {entries.length === 0 ? 'Belum Ada Data Realisasi Samsat Desa' : 'Tidak ada data realisasi yang sesuai dengan filter pencarian.'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {entries.length === 0 ? 'Silakan klik tombol "+ Input Realisasi Baru" di atas untuk mulai mencatat data transaksi.' : 'Coba ubah kata kunci atau filter pencarian Anda.'}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry, index) => {
                const jmlBangliUnit = entry.realisasiBangliNopol;
                const jmlBangliRp = entry.realisasiBangliRp;
                const jmlLuarUnit = entry.realisasiLuarNopol;
                const jmlLuarRp = entry.realisasiLuarRp;

                const totalUnit = jmlBangliUnit + jmlLuarUnit;
                const totalRp = jmlBangliRp + jmlLuarRp;

                return (
                  <tr
                    key={entry.id}
                    className="hover:bg-amber-50/50 transition-colors group"
                  >
                    {/* NO */}
                    <td className="px-3 py-2.5 text-center font-semibold text-slate-500 border-r border-slate-200 bg-slate-50/50">
                      {index + 1}
                    </td>

                    {/* TANGGAL */}
                    <td className="px-3 py-2.5 text-center font-medium text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {formatDateIndonesian(entry.tanggal)}
                    </td>

                    {/* KANTOR DESA */}
                    <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                      <div>{entry.kantorDesa}</div>
                      {entry.petugas && (
                        <div className="text-[10px] font-normal text-slate-400 mt-0.5">
                          Petugas: {entry.petugas}
                        </div>
                      )}
                    </td>

                    {/* REALISASI NOPOL BANGLI - Nopol */}
                    <td className="px-2 py-2.5 text-center font-bold text-sky-800 border-r border-slate-200 bg-sky-50/30">
                      {formatNumber(entry.realisasiBangliNopol)}
                    </td>

                    {/* REALISASI NOPOL BANGLI - Rp */}
                    <td className="px-3 py-2.5 text-right font-medium text-sky-900 border-r border-slate-200 bg-sky-50/30">
                      {formatRupiah(entry.realisasiBangliRp)}
                    </td>

                    {/* REALISASI NOPOL LUAR BANGLI - Nopol */}
                    <td className="px-2 py-2.5 text-center font-bold text-amber-800 border-r border-slate-200 bg-amber-50/30">
                      {formatNumber(entry.realisasiLuarNopol)}
                    </td>

                    {/* REALISASI NOPOL LUAR BANGLI - Rp */}
                    <td className="px-3 py-2.5 text-right font-medium text-amber-900 border-r border-slate-200 bg-amber-50/30">
                      {formatRupiah(entry.realisasiLuarRp)}
                    </td>

                    {/* JML BANGLI - Unit */}
                    <td className="px-2 py-2.5 text-center font-bold text-slate-800 border-r border-slate-200">
                      {formatNumber(jmlBangliUnit)}
                    </td>

                    {/* JML BANGLI - Rp */}
                    <td className="px-3 py-2.5 text-right font-semibold text-slate-800 border-r border-slate-200">
                      {formatRupiah(jmlBangliRp)}
                    </td>

                    {/* JML LUAR BANGLI - Unit */}
                    <td className="px-2 py-2.5 text-center font-bold text-slate-800 border-r border-slate-200">
                      {formatNumber(jmlLuarUnit)}
                    </td>

                    {/* JML LUAR BANGLI - Rp */}
                    <td className="px-3 py-2.5 text-right font-semibold text-slate-800 border-r border-slate-200">
                      {formatRupiah(jmlLuarRp)}
                    </td>

                    {/* TOTAL - Unit */}
                    <td className="px-2 py-2.5 text-center font-black text-emerald-900 border-r border-slate-200 bg-emerald-50/40">
                      {formatNumber(totalUnit)}
                    </td>

                    {/* TOTAL - Rp */}
                    <td className="px-3 py-2.5 text-right font-black text-emerald-950 border-r border-slate-200 bg-emerald-50/40">
                      {formatRupiah(totalRp)}
                    </td>

                    {/* AKSI */}
                    <td className="px-2 py-2.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditEntry(entry)}
                          className="p-1 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                          title="Edit Data"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteEntry(entry.id)}
                          className="p-1 rounded-md text-rose-600 hover:text-rose-800 hover:bg-rose-100 transition-colors cursor-pointer"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Table Footer - TOTAL SUMMARY ROW */}
          <tfoot>
            <tr className="bg-slate-900 text-white font-extrabold text-xs uppercase border-t-2 border-amber-500">
              <td colSpan={3} className="px-4 py-3 text-center border-r border-slate-800 bg-slate-950">
                JUMLAH
              </td>

              {/* Realisasi Bangli Totals */}
              <td className="px-2 py-3 text-center border-r border-slate-800 text-sky-300 bg-sky-950/80">
                {formatNumber(totals.bangliNopol)}
              </td>
              <td className="px-3 py-3 text-right border-r border-slate-800 text-sky-200 bg-sky-950/80">
                {formatRupiah(totals.bangliRp)}
              </td>

              {/* Realisasi Luar Bangli Totals */}
              <td className="px-2 py-3 text-center border-r border-slate-800 text-amber-300 bg-amber-950/80">
                {formatNumber(totals.luarNopol)}
              </td>
              <td className="px-3 py-3 text-right border-r border-slate-800 text-amber-200 bg-amber-950/80">
                {formatRupiah(totals.luarRp)}
              </td>

              {/* Jml Bangli Totals */}
              <td className="px-2 py-3 text-center border-r border-slate-800 text-slate-200">
                {formatNumber(totals.jmlBangliUnit)}
              </td>
              <td className="px-3 py-3 text-right border-r border-slate-800 text-slate-100">
                {formatRupiah(totals.jmlBangliRp)}
              </td>

              {/* Jml Luar Bangli Totals */}
              <td className="px-2 py-3 text-center border-r border-slate-800 text-slate-200">
                {formatNumber(totals.jmlLuarUnit)}
              </td>
              <td className="px-3 py-3 text-right border-r border-slate-800 text-slate-100">
                {formatRupiah(totals.jmlLuarRp)}
              </td>

              {/* TOTAL Grand Total */}
              <td className="px-2 py-3 text-center border-r border-slate-800 text-emerald-300 bg-emerald-950">
                {formatNumber(totals.totalUnit)}
              </td>
              <td className="px-3 py-3 text-right border-r border-slate-800 text-emerald-200 bg-emerald-950 text-sm">
                {formatRupiah(totals.totalRp)}
              </td>

              <td className="bg-slate-950"></td>
            </tr>
          </tfoot>

        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
        <span>Menampilkan {filteredEntries.length} dari total {entries.length} entri data.</span>
        <span>
          Catatan: JML GIANYAR &amp; JML LUAR GIANYAR dihitung otomatis dari kolom Realisasi Nopol.
        </span>
      </div>

    </div>
  );
};
