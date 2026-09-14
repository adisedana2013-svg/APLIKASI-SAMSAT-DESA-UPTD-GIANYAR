import React, { useState, useMemo } from 'react';
import { SamsatDailyEntry } from '../types';
import { formatRupiah, formatNumber, getMonthName, exportToCSV } from '../utils/formatters';
import { 
  CalendarDays, 
  Building2, 
  Download, 
  CheckCircle2, 
  Award,
  ChevronRight,
  BarChart2
} from 'lucide-react';

interface MonthlyRecapProps {
  entries: SamsatDailyEntry[];
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  onOpenPrintModal: () => void;
}

export const MonthlyRecap: React.FC<MonthlyRecapProps> = ({
  entries,
  selectedMonth,
  setSelectedMonth,
  onOpenPrintModal
}) => {
  // Monthly Target (Standard Bapenda monthly target benchmark)
  const TARGET_BULANAN_RP = 200000000; // Rp 200 Juta per bulan

  // Get list of unique months
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    entries.forEach((e) => {
      if (e.tanggal && e.tanggal.length >= 7) {
        months.add(e.tanggal.substring(0, 7));
      }
    });
    return Array.from(months).sort().reverse();
  }, [entries]);

  // Set default selected month if empty
  const activeMonth = selectedMonth || (availableMonths.length > 0 ? availableMonths[0] : new Date().toISOString().substring(0, 7));

  // Filter entries for active month
  const monthlyEntries = useMemo(() => {
    return entries.filter((e) => e.tanggal.startsWith(activeMonth));
  }, [entries, activeMonth]);

  // Group by Kantor Desa for active month
  const villageSummaryList = useMemo(() => {
    const map = new Map<string, {
      frekuensi: number;
      bangliUnit: number;
      bangliRp: number;
      luarUnit: number;
      luarRp: number;
    }>();

    monthlyEntries.forEach((entry) => {
      const existing = map.get(entry.kantorDesa) || {
        frekuensi: 0,
        bangliUnit: 0,
        bangliRp: 0,
        luarUnit: 0,
        luarRp: 0,
      };

      map.set(entry.kantorDesa, {
        frekuensi: existing.frekuensi + 1,
        bangliUnit: existing.bangliUnit + entry.realisasiBangliNopol,
        bangliRp: existing.bangliRp + entry.realisasiBangliRp,
        luarUnit: existing.luarUnit + entry.realisasiLuarNopol,
        luarRp: existing.luarRp + entry.realisasiLuarRp,
      });
    });

    const result = Array.from(map.entries()).map(([kantorDesa, data]) => {
      const totalUnit = data.bangliUnit + data.luarUnit;
      const totalRp = data.bangliRp + data.luarRp;
      return {
        kantorDesa,
        frekuensi: data.frekuensi,
        bangliUnit: data.bangliUnit,
        bangliRp: data.bangliRp,
        luarUnit: data.luarUnit,
        luarRp: data.luarRp,
        totalUnit,
        totalRp,
      };
    });

    // Sort by Total Revenue descending
    return result.sort((a, b) => b.totalRp - a.totalRp);
  }, [monthlyEntries]);

  // Overall totals for active month
  const monthTotals = useMemo(() => {
    return villageSummaryList.reduce(
      (acc, curr) => ({
        frekuensi: acc.frekuensi + curr.frekuensi,
        bangliUnit: acc.bangliUnit + curr.bangliUnit,
        bangliRp: acc.bangliRp + curr.bangliRp,
        luarUnit: acc.luarUnit + curr.luarUnit,
        luarRp: acc.luarRp + curr.luarRp,
        totalUnit: acc.totalUnit + curr.totalUnit,
        totalRp: acc.totalRp + curr.totalRp,
      }),
      { frekuensi: 0, bangliUnit: 0, bangliRp: 0, luarUnit: 0, luarRp: 0, totalUnit: 0, totalRp: 0 }
    );
  }, [villageSummaryList]);

  // Target achievement percentage
  const achievementPct = monthTotals.totalRp > 0 
    ? Math.min(100, (monthTotals.totalRp / TARGET_BULANAN_RP) * 100).toFixed(1) 
    : '0';

  // Month-over-Month comparison table data
  const monthByMonthSummary = useMemo(() => {
    const map = new Map<string, { bangliUnit: number; bangliRp: number; luarUnit: number; luarRp: number; count: number }>();
    
    entries.forEach((e) => {
      const monthKey = e.tanggal.substring(0, 7);
      const existing = map.get(monthKey) || { bangliUnit: 0, bangliRp: 0, luarUnit: 0, luarRp: 0, count: 0 };
      map.set(monthKey, {
        bangliUnit: existing.bangliUnit + e.realisasiBangliNopol,
        bangliRp: existing.bangliRp + e.realisasiBangliRp,
        luarUnit: existing.luarUnit + e.realisasiLuarNopol,
        luarRp: existing.luarRp + e.realisasiLuarRp,
        count: existing.count + 1
      });
    });

    return Array.from(map.entries())
      .map(([mKey, val]) => {
        const totalUnit = val.bangliUnit + val.luarUnit;
        const totalRp = val.bangliRp + val.luarRp;
        return {
          monthKey: mKey,
          monthName: getMonthName(mKey),
          count: val.count,
          bangliUnit: val.bangliUnit,
          bangliRp: val.bangliRp,
          luarUnit: val.luarUnit,
          luarRp: val.luarRp,
          totalUnit,
          totalRp,
          capaianPct: ((totalRp / TARGET_BULANAN_RP) * 100).toFixed(1)
        };
      })
      .sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [entries]);

  // Export Rekap Bulanan to CSV
  const handleExportMonthlyCSV = () => {
    const exportData = villageSummaryList.map((row, index) => {
      const kontribusi = monthTotals.totalRp > 0 
        ? ((row.totalRp / monthTotals.totalRp) * 100).toFixed(2) + '%' 
        : '0%';
      return {
        'RANK': index + 1,
        'BULAN': getMonthName(activeMonth),
        'KANTOR DESA': row.kantorDesa,
        'FREKUANSI PELAYANAN': row.frekuensi,
        'NOPOL BANGLI (UNIT)': row.bangliUnit,
        'NOPOL BANGLI (RP)': row.bangliRp,
        'NOPOL LUAR BANGLI (UNIT)': row.luarUnit,
        'NOPOL LUAR BANGLI (RP)': row.luarRp,
        'TOTAL REKAP (UNIT)': row.totalUnit,
        'TOTAL REKAP (RP)': row.totalRp,
        'KONTRIBUSI (%)': kontribusi
      };
    });

    exportToCSV(exportData, `Rekap_Bulanan_Desa_${activeMonth}`);
  };

  return (
    <div className="space-y-6 my-6">
      
      {/* Month Selector Bar & Performance Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
              <CalendarDays className="w-4 h-4" />
              <span>Laporan Rekapitulasi Penerimaan Bulanan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Rekap Bulan {getMonthName(activeMonth)}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Ringkasan realisasi penerimaan SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar.
            </p>
          </div>

          {/* Controls: Month Selector & Export */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-800 p-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
              <span className="text-xs font-medium text-slate-300 pl-2">Pilih Bulan:</span>
              <select
                value={activeMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-900 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {availableMonths.length === 0 ? (
                  <option value={activeMonth}>{getMonthName(activeMonth)}</option>
                ) : (
                  availableMonths.map((m) => (
                    <option key={m} value={m}>
                      {getMonthName(m)}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              onClick={handleExportMonthlyCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Rekap</span>
            </button>

            <button
              onClick={onOpenPrintModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer font-bold"
            >
              <span>Cetak Rekap Resmi</span>
            </button>
          </div>

        </div>

        {/* Target Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Total Realisasi Bulan Ini</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {formatRupiah(monthTotals.totalRp)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Dari <span className="font-semibold text-slate-200">{monthTotals.totalUnit} Unit</span> Kendaraan
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Target Penerimaan Bulanan</span>
            <div className="text-2xl font-black text-slate-200 mt-1">
              {formatRupiah(TARGET_BULANAN_RP)}
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
              <span>Capaian Target:</span>
              <span className="font-bold text-emerald-400">{achievementPct}%</span>
            </div>
            <div className="mt-2 bg-slate-900 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, parseFloat(achievementPct))}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Komposisi Nopol Bangli vs Luar</span>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="text-xs text-sky-400 font-bold">Bangli (P*)</div>
                <div className="text-base font-extrabold text-white">{formatNumber(monthTotals.bangliUnit)} Unit</div>
                <div className="text-[11px] text-slate-400">{formatRupiah(monthTotals.bangliRp)}</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-700" />
              <div>
                <div className="text-xs text-amber-400 font-bold">Luar Bangli</div>
                <div className="text-base font-extrabold text-white">{formatNumber(monthTotals.luarUnit)} Unit</div>
                <div className="text-[11px] text-slate-400">{formatRupiah(monthTotals.luarRp)}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabel Rekapitulasi Per Kantor Desa */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              <span>Rekapitulasi Penerimaan per Kantor Desa - {getMonthName(activeMonth)}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Diurutkan berdasarkan kontribusi penerimaan tertinggi
            </p>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-3 py-1 rounded-full border border-amber-200">
            {villageSummaryList.length} Kantor Desa Terlayani
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs text-slate-800 border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-center border-b border-slate-800 uppercase tracking-wider">
                <th className="px-3 py-3 border-r border-slate-800 w-12">RANK</th>
                <th className="px-4 py-3 border-r border-slate-800 text-left min-w-[200px]">KANTOR DESA</th>
                <th className="px-3 py-3 border-r border-slate-800 w-24">FREKUENSI</th>
                <th className="px-3 py-3 border-r border-slate-800 bg-sky-950 text-sky-200" colSpan={2}>REALISASI BANGLI</th>
                <th className="px-3 py-3 border-r border-slate-800 bg-amber-950 text-amber-200" colSpan={2}>REALISASI LUAR BANGLI</th>
                <th className="px-3 py-3 border-r border-slate-800 bg-emerald-950 text-emerald-200" colSpan={2}>TOTAL REKAP DESA</th>
                <th className="px-3 py-3 w-28">KONTRIBUSI</th>
              </tr>
              <tr className="bg-slate-800 text-slate-200 text-center font-medium border-b border-slate-700">
                <th colSpan={3} className="border-r border-slate-700"></th>
                <th className="px-2 py-1.5 border-r border-slate-700 bg-sky-900/50">Unit</th>
                <th className="px-3 py-1.5 border-r border-slate-700 bg-sky-900/50">Rp</th>
                <th className="px-2 py-1.5 border-r border-slate-700 bg-amber-900/50">Unit</th>
                <th className="px-3 py-1.5 border-r border-slate-700 bg-amber-900/50">Rp</th>
                <th className="px-2 py-1.5 border-r border-slate-700 bg-emerald-900/50">Unit</th>
                <th className="px-3 py-1.5 border-r border-slate-700 bg-emerald-900/50">Rp</th>
                <th>% Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {villageSummaryList.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                    Belum ada data kegiatan untuk bulan ini.
                  </td>
                </tr>
              ) : (
                villageSummaryList.map((row, idx) => {
                  const pct = monthTotals.totalRp > 0 
                    ? ((row.totalRp / monthTotals.totalRp) * 100).toFixed(1) 
                    : '0';

                  return (
                    <tr key={row.kantorDesa} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2.5 text-center font-extrabold text-slate-500 border-r border-slate-200">
                        {idx === 0 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold ring-1 ring-amber-300">
                            1
                          </span>
                        ) : (
                          idx + 1
                        )}
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-900 border-r border-slate-200">
                        {row.kantorDesa}
                      </td>
                      <td className="px-3 py-2.5 text-center font-semibold text-slate-600 border-r border-slate-200">
                        {row.frekuensi} Hari
                      </td>
                      <td className="px-2 py-2.5 text-center font-bold text-sky-800 border-r border-slate-200 bg-sky-50/30">
                        {formatNumber(row.bangliUnit)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-medium text-sky-900 border-r border-slate-200 bg-sky-50/30">
                        {formatRupiah(row.bangliRp)}
                      </td>
                      <td className="px-2 py-2.5 text-center font-bold text-amber-800 border-r border-slate-200 bg-amber-50/30">
                        {formatNumber(row.luarUnit)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-medium text-amber-900 border-r border-slate-200 bg-amber-50/30">
                        {formatRupiah(row.luarRp)}
                      </td>
                      <td className="px-2 py-2.5 text-center font-black text-emerald-900 border-r border-slate-200 bg-emerald-50/40">
                        {formatNumber(row.totalUnit)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-black text-emerald-950 border-r border-slate-200 bg-emerald-50/40">
                        {formatRupiah(row.totalRp)}
                      </td>
                      <td className="px-3 py-2.5 text-center font-bold text-slate-700">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px]">
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-black text-xs uppercase border-t-2 border-amber-500">
                <td colSpan={2} className="px-4 py-3 text-center border-r border-slate-800">
                  TOTAL KESELURUHAN
                </td>
                <td className="px-3 py-3 text-center border-r border-slate-800 text-amber-300">
                  {monthTotals.frekuensi} Hari
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-800 text-sky-300 bg-sky-950">
                  {formatNumber(monthTotals.bangliUnit)}
                </td>
                <td className="px-3 py-3 text-right border-r border-slate-800 text-sky-200 bg-sky-950">
                  {formatRupiah(monthTotals.bangliRp)}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-800 text-amber-300 bg-amber-950">
                  {formatNumber(monthTotals.luarUnit)}
                </td>
                <td className="px-3 py-3 text-right border-r border-slate-800 text-amber-200 bg-amber-950">
                  {formatRupiah(monthTotals.luarRp)}
                </td>
                <td className="px-2 py-3 text-center border-r border-slate-800 text-emerald-300 bg-emerald-950">
                  {formatNumber(monthTotals.totalUnit)}
                </td>
                <td className="px-3 py-3 text-right border-r border-slate-800 text-emerald-200 bg-emerald-950 text-sm">
                  {formatRupiah(monthTotals.totalRp)}
                </td>
                <td className="px-3 py-3 text-center text-amber-400">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Tabel Perbandingan Antar Bulan */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span>Rekapitulasi Perbandingan Antar Bulan (Tahun 2026)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tren realisasi penerimaan bulanan SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs text-slate-800">
            <thead>
              <tr className="bg-slate-800 text-white font-semibold text-center uppercase tracking-wider">
                <th className="px-4 py-3 text-left">BULAN &amp; TAHUN</th>
                <th className="px-3 py-3">JUMLAH PELAYANAN</th>
                <th className="px-3 py-3">BANGLI (UNIT)</th>
                <th className="px-3 py-3">BANGLI (RP)</th>
                <th className="px-3 py-3">LUAR BANGLI (UNIT)</th>
                <th className="px-3 py-3">LUAR BANGLI (RP)</th>
                <th className="px-3 py-3 bg-emerald-950 text-emerald-200">TOTAL UNIT</th>
                <th className="px-3 py-3 bg-emerald-950 text-emerald-200">TOTAL REALISASI RP</th>
                <th className="px-3 py-3">CAPAIAN TARGET</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {monthByMonthSummary.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                    Belum ada data perbandingan bulanan.
                  </td>
                </tr>
              ) : (
                monthByMonthSummary.map((m) => (
                  <tr 
                    key={m.monthKey} 
                    className={`hover:bg-amber-50/50 transition-colors ${
                      m.monthKey === activeMonth ? 'bg-amber-50/70 font-semibold' : ''
                    }`}
                  >
                  <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-2">
                    {m.monthKey === activeMonth && (
                      <ChevronRight className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{m.monthName}</span>
                  </td>
                  <td className="px-3 py-3 text-center">{m.count} Lokasi</td>
                  <td className="px-3 py-3 text-center font-medium text-sky-800">{formatNumber(m.bangliUnit)}</td>
                  <td className="px-3 py-3 text-right font-medium text-sky-900">{formatRupiah(m.bangliRp)}</td>
                  <td className="px-3 py-3 text-center font-medium text-amber-800">{formatNumber(m.luarUnit)}</td>
                  <td className="px-3 py-3 text-right font-medium text-amber-900">{formatRupiah(m.luarRp)}</td>
                  <td className="px-3 py-3 text-center font-bold text-emerald-900 bg-emerald-50/40">{formatNumber(m.totalUnit)}</td>
                  <td className="px-3 py-3 text-right font-extrabold text-emerald-950 bg-emerald-50/40">{formatRupiah(m.totalRp)}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {m.capaianPct}%
                    </span>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
