import React from 'react';
import { SamsatDailyEntry } from '../types';
import { formatRupiah, formatNumber } from '../utils/formatters';
import { Wallet, Car, MapPin, TrendingUp, Layers } from 'lucide-react';

interface SummaryCardsProps {
  entries: SamsatDailyEntry[];
  selectedMonth: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ entries, selectedMonth }) => {
  const totalBangliUnits = entries.reduce((acc, curr) => acc + curr.realisasiBangliNopol, 0);
  const totalBangliRp = entries.reduce((acc, curr) => acc + curr.realisasiBangliRp, 0);

  const totalLuarUnits = entries.reduce((acc, curr) => acc + curr.realisasiLuarNopol, 0);
  const totalLuarRp = entries.reduce((acc, curr) => acc + curr.realisasiLuarRp, 0);

  const grandTotalUnits = totalBangliUnits + totalLuarUnits;
  const grandTotalRp = totalBangliRp + totalLuarRp;

  const uniqueDesa = new Set(entries.map((e) => e.kantorDesa)).size;

  const bangliUnitPct = grandTotalUnits > 0 ? ((totalBangliUnits / grandTotalUnits) * 100).toFixed(1) : '0';
  const luarUnitPct = grandTotalUnits > 0 ? ((totalLuarUnits / grandTotalUnits) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {/* Total Realisasi Rp */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Realisasi Rp
          </span>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-black text-slate-900">
            {formatRupiah(grandTotalRp)}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Gabungan Gianyar &amp; Luar Gianyar</span>
          </div>
        </div>
      </div>

      {/* Realisasi Nopol Gianyar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Nopol Gianyar (DK...L*)
          </span>
          <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
            <Car className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold text-slate-900">
            {formatNumber(totalBangliUnits)} <span className="text-xs font-medium text-slate-500">Unit</span>
          </div>
          <div className="text-sm font-semibold text-sky-700 mt-0.5">
            {formatRupiah(totalBangliRp)}
          </div>
          <div className="mt-1.5 text-xs text-slate-500 flex justify-between">
            <span>Kontribusi Unit:</span>
            <span className="font-semibold text-sky-600">{bangliUnitPct}%</span>
          </div>
        </div>
      </div>

      {/* Realisasi Nopol Luar Gianyar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Nopol Luar Gianyar
          </span>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold text-slate-900">
            {formatNumber(totalLuarUnits)} <span className="text-xs font-medium text-slate-500">Unit</span>
          </div>
          <div className="text-sm font-semibold text-amber-700 mt-0.5">
            {formatRupiah(totalLuarRp)}
          </div>
          <div className="mt-1.5 text-xs text-slate-500 flex justify-between">
            <span>Kontribusi Unit:</span>
            <span className="font-semibold text-amber-600">{luarUnitPct}%</span>
          </div>
        </div>
      </div>

      {/* Total Unit & Desa Terlayani */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Kendaraan &amp; Desa
          </span>
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-extrabold text-indigo-950">
            {formatNumber(grandTotalUnits)} <span className="text-xs font-normal text-slate-500">Total Unit</span>
          </div>
          <div className="text-xs font-medium text-slate-600 mt-1">
            Tersebar di <span className="font-bold text-slate-900">{uniqueDesa} Kantor Desa</span>
          </div>
          <div className="mt-2 bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
            <div 
              className="bg-sky-500 h-full" 
              style={{ width: `${bangliUnitPct}%` }} 
              title={`Gianyar: ${bangliUnitPct}%`}
            />
            <div 
              className="bg-amber-500 h-full" 
              style={{ width: `${luarUnitPct}%` }} 
              title={`Luar Gianyar: ${luarUnitPct}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
