import React, { useMemo } from 'react';
import { SamsatDailyEntry } from '../types';
import { formatRupiah, formatNumber, formatDateIndonesian, getMonthName } from '../utils/formatters';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

interface AnalyticsChartsProps {
  entries: SamsatDailyEntry[];
  selectedMonth: string;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ entries, selectedMonth }) => {

  // Filter entries for selected month if specified
  const filteredEntries = useMemo(() => {
    if (!selectedMonth) return entries;
    return entries.filter((e) => e.tanggal.startsWith(selectedMonth));
  }, [entries, selectedMonth]);

  // Village Revenue Data for Bar Chart
  const villageBarData = useMemo(() => {
    const map = new Map<string, { bangliRp: number; luarRp: number; totalRp: number }>();
    filteredEntries.forEach((e) => {
      // Shorten village name for cleaner axis labels
      const shortDesa = e.kantorDesa.replace('Kantor Desa ', '');
      const existing = map.get(shortDesa) || { bangliRp: 0, luarRp: 0, totalRp: 0 };
      map.set(shortDesa, {
        bangliRp: existing.bangliRp + e.realisasiBangliRp,
        luarRp: existing.luarRp + e.realisasiLuarRp,
        totalRp: existing.totalRp + e.realisasiBangliRp + e.realisasiLuarRp,
      });
    });

    return Array.from(map.entries())
      .map(([namaDesa, val]) => ({
        namaDesa,
        'Bangli (Rp)': val.bangliRp,
        'Luar Bangli (Rp)': val.luarRp,
        totalRp: val.totalRp,
      }))
      .sort((a, b) => b.totalRp - a.totalRp)
      .slice(0, 10); // Top 10 villages
  }, [filteredEntries]);

  // Bangli vs Luar Bangli Pie Data
  const pieData = useMemo(() => {
    let bangliUnits = 0;
    let luarUnits = 0;
    filteredEntries.forEach((e) => {
      bangliUnits += e.realisasiBangliNopol;
      luarUnits += e.realisasiLuarNopol;
    });

    return [
      { name: 'Nopol Bangli (P*)', value: bangliUnits, color: '#0284c7' }, // Sky blue
      { name: 'Nopol Luar Bangli', value: luarUnits, color: '#f59e0b' },  // Amber
    ];
  }, [filteredEntries]);

  // Timeline Data for Line Chart
  const lineTrendData = useMemo(() => {
    // Sort chronological
    const sorted = [...filteredEntries].sort((a, b) => a.tanggal.localeCompare(b.tanggal));
    return sorted.map((e) => ({
      tanggal: formatDateIndonesian(e.tanggal),
      shortDate: e.tanggal.substring(8, 10) + '/' + e.tanggal.substring(5, 7),
      desa: e.kantorDesa.replace('Kantor Desa ', ''),
      'Realisasi Rp': e.realisasiBangliRp + e.realisasiLuarRp,
      'Unit Terlayani': e.realisasiBangliNopol + e.realisasiLuarNopol,
    }));
  }, [filteredEntries]);

  const PIE_COLORS = ['#0284c7', '#f59e0b'];

  if (filteredEntries.length === 0) {
    return (
      <div className="space-y-6 my-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-600" />
            <span>Visualisasi Grafis Realisasi SAMSAT DESA</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Analisis perbandingan penerimaan per desa dan tren kegiatan UPTD Pelayanan Pajak Daerah Kab. Gianyar.
          </p>
        </div>
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm text-slate-400">
          <BarChart3 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-600">Belum Ada Data Realisasi</p>
          <p className="text-xs text-slate-400 mt-1">Visualisasi grafik akan ditampilkan otomatis setelah ada data realisasi baru yang diinput.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-6">
      
      {/* Chart Header */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-600" />
          <span>Visualisasi Grafis Realisasi SAMSAT DESA</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Analisis perbandingan penerimaan per desa dan tren kegiatan UPTD Pelayanan Pajak Daerah Kab. Gianyar {selectedMonth ? `Bulan ${getMonthName(selectedMonth)}` : 'Semua Periode'}.
        </p>
      </div>

      {/* Grid: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart: Realisasi per Desa */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Realisasi Penerimaan Rp per Kantor Desa (Top 10)</span>
              </h3>
              <p className="text-xs text-slate-500">Perbandingan penerimaan Nopol Bangli vs Luar Bangli</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={villageBarData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="namaDesa" 
                  tick={{ fontSize: 10, fill: '#64748b' }} 
                  interval={0} 
                  angle={-20} 
                  textAnchor="end"
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`}
                />
                <Tooltip 
                  formatter={(value: any) => [formatRupiah(Number(value)), '']}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Bangli (Rp)" fill="#0284c7" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="Luar Bangli (Rp)" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Proporsi Unit */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
              <PieChartIcon className="w-4 h-4 text-amber-600" />
              <span>Proporsi Unit Kendaraan</span>
            </h3>
            <p className="text-xs text-slate-500">Perbandingan asal pendaftaran plat nomor</p>
          </div>

          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${formatNumber(Number(value))} Unit`, 'Jumlah']}
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">
                {formatNumber(pieData[0].value + pieData[1].value)}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Total Unit</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            {pieData.map((item, idx) => {
              const total = pieData[0].value + pieData[1].value;
              const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatNumber(item.value)} Unit ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Line Chart: Tren Penerimaan Harian */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Tren Realisasi Penerimaan Harian (Rp)</span>
            </h3>
            <p className="text-xs text-slate-500">Perkembangan hasil penerimaan dari setiap lokasi pelayanan</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="shortDate" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`}
              />
              <Tooltip 
                formatter={(value: any, name: any) => [
                  name === 'Realisasi Rp' ? formatRupiah(Number(value)) : `${value} Unit`,
                  name
                ]}
                labelFormatter={(label: any, items: any) => {
                  if (items && items.length > 0) {
                    return `${items[0].payload.tanggal} - ${items[0].payload.desa}`;
                  }
                  return label;
                }}
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="Realisasi Rp" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#059669' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
