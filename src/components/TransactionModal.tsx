import React, { useState, useEffect } from 'react';
import { SamsatDailyEntry, VehicleTransaction } from '../types';
import { formatRupiah } from '../utils/formatters';
import { X, Save, Building2, Calendar, User, FileText, Calculator, Car, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface InputVehicleItem {
  id: string;
  platNomor: string;
  nominalRp: number;
  namaPemilik: string;
  jenisKendaraan: 'R2' | 'R4' | 'R6+';
  isBangli: boolean;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Partial<SamsatDailyEntry>, vehicleItems?: VehicleTransaction[]) => void;
  initialData?: SamsatDailyEntry | null;
  listKantorDesa: string[];
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  listKantorDesa,
}) => {
  const todayStr = new Date().toISOString().substring(0, 10);
  const [tanggal, setTanggal] = useState(todayStr);
  const [kantorDesa, setKantorDesa] = useState(listKantorDesa[0] || 'Kantor Desa Lebih');
  const [customDesa, setCustomDesa] = useState('');
  const [isCustomDesa, setIsCustomDesa] = useState(false);

  // List of entered vehicle items for Bangli and Luar Bangli
  const [bangliVehicles, setBangliVehicles] = useState<InputVehicleItem[]>([]);
  const [luarVehicles, setLuarVehicles] = useState<InputVehicleItem[]>([]);

  // Form states for adding single vehicle item - Bangli
  const [tempBangliPlat, setTempBangliPlat] = useState('DK ');
  const [tempBangliRp, setTempBangliRp] = useState<number | ''>('');
  const [tempBangliNama, setTempBangliNama] = useState('');
  const [tempBangliJenis, setTempBangliJenis] = useState<'R2' | 'R4' | 'R6+'>('R2');

  // Form states for adding single vehicle item - Luar Bangli
  const [tempLuarPlat, setTempLuarPlat] = useState('DK ');
  const [tempLuarRp, setTempLuarRp] = useState<number | ''>('');
  const [tempLuarNama, setTempLuarNama] = useState('');
  const [tempLuarJenis, setTempLuarJenis] = useState<'R2' | 'R4' | 'R6+'>('R2');

  // Manual overriding totals if needed
  const [realisasiBangliNopol, setRealisasiBangliNopol] = useState<number | ''>(0);
  const [realisasiBangliRp, setRealisasiBangliRp] = useState<number | ''>(0);

  const [realisasiLuarNopol, setRealisasiLuarNopol] = useState<number | ''>(0);
  const [realisasiLuarRp, setRealisasiLuarRp] = useState<number | ''>(0);

  const [petugas, setPetugas] = useState('');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (initialData) {
      setTanggal(initialData.tanggal);
      if (listKantorDesa.includes(initialData.kantorDesa)) {
        setKantorDesa(initialData.kantorDesa);
        setIsCustomDesa(false);
      } else {
        setIsCustomDesa(true);
        setCustomDesa(initialData.kantorDesa);
      }
      setRealisasiBangliNopol(initialData.realisasiBangliNopol);
      setRealisasiBangliRp(initialData.realisasiBangliRp);
      setRealisasiLuarNopol(initialData.realisasiLuarNopol);
      setRealisasiLuarRp(initialData.realisasiLuarRp);
      setPetugas(initialData.petugas || '');
      setCatatan(initialData.catatan || '');
      setBangliVehicles([]);
      setLuarVehicles([]);
    } else {
      // Default new entry
      const today = new Date().toISOString().substring(0, 10);
      setTanggal(today);
      setKantorDesa(listKantorDesa[0] || 'Kantor Desa Batur Tengah');
      setIsCustomDesa(false);
      setCustomDesa('');
      setRealisasiBangliNopol('');
      setRealisasiBangliRp('');
      setRealisasiLuarNopol('');
      setRealisasiLuarRp('');
      setCatatan('');
      setBangliVehicles([]);
      setLuarVehicles([]);
    }
  }, [initialData, isOpen, listKantorDesa]);

  // Handle adding Bangli vehicle item
  const handleAddBangliVehicle = () => {
    if (!tempBangliPlat.trim() || tempBangliPlat.trim() === 'DK') {
      alert('Mohon isi Plat Nomor Bangli yang valid!');
      return;
    }
    const nominal = Number(tempBangliRp) || 0;
    const newItem: InputVehicleItem = {
      id: 'v-bangli-' + Date.now() + Math.random().toString(36).substr(2, 4),
      platNomor: tempBangliPlat.toUpperCase().trim(),
      nominalRp: nominal,
      namaPemilik: tempBangliNama.trim() || 'Wajib Pajak (Bangli)',
      jenisKendaraan: tempBangliJenis,
      isBangli: true
    };

    const newBangliList = [...bangliVehicles, newItem];
    setBangliVehicles(newBangliList);

    // Auto calculate totals
    setRealisasiBangliNopol(newBangliList.length);
    setRealisasiBangliRp(newBangliList.reduce((sum, v) => sum + v.nominalRp, 0));

    // Reset inputs
    setTempBangliPlat('DK ');
    setTempBangliRp(850000);
    setTempBangliNama('');
  };

  const handleRemoveBangliVehicle = (id: string) => {
    const newBangliList = bangliVehicles.filter(item => item.id !== id);
    setBangliVehicles(newBangliList);
    setRealisasiBangliNopol(newBangliList.length);
    setRealisasiBangliRp(newBangliList.reduce((sum, v) => sum + v.nominalRp, 0));
  };

  // Handle adding Luar Bangli vehicle item
  const handleAddLuarVehicle = () => {
    if (!tempLuarPlat.trim() || tempLuarPlat.trim() === 'DK') {
      alert('Mohon isi Plat Nomor Luar Bangli yang valid!');
      return;
    }
    const nominal = Number(tempLuarRp) || 0;
    const newItem: InputVehicleItem = {
      id: 'v-luar-' + Date.now() + Math.random().toString(36).substr(2, 4),
      platNomor: tempLuarPlat.toUpperCase().trim(),
      nominalRp: nominal,
      namaPemilik: tempLuarNama.trim() || 'Wajib Pajak (Luar Bangli)',
      jenisKendaraan: tempLuarJenis,
      isBangli: false
    };

    const newLuarList = [...luarVehicles, newItem];
    setLuarVehicles(newLuarList);

    // Auto calculate totals
    setRealisasiLuarNopol(newLuarList.length);
    setRealisasiLuarRp(newLuarList.reduce((sum, v) => sum + v.nominalRp, 0));

    // Reset inputs
    setTempLuarPlat('DK ');
    setTempLuarRp(800000);
    setTempLuarNama('');
  };

  const handleRemoveLuarVehicle = (id: string) => {
    const newLuarList = luarVehicles.filter(item => item.id !== id);
    setLuarVehicles(newLuarList);
    setRealisasiLuarNopol(newLuarList.length);
    setRealisasiLuarRp(newLuarList.reduce((sum, v) => sum + v.nominalRp, 0));
  };

  if (!isOpen) return null;

  // Computed previews
  const bangliUnitVal = Number(realisasiBangliNopol) || 0;
  const bangliRpVal = Number(realisasiBangliRp) || 0;
  const luarUnitVal = Number(realisasiLuarNopol) || 0;
  const luarRpVal = Number(realisasiLuarRp) || 0;

  const totalUnitVal = bangliUnitVal + luarUnitVal;
  const totalRpVal = bangliRpVal + luarRpVal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDesa = isCustomDesa ? customDesa : kantorDesa;
    if (!finalDesa.trim()) {
      alert('Mohon isi nama Kantor Desa!');
      return;
    }

    // Convert internal vehicle items to VehicleTransaction objects
    const finalDesaName = finalDesa.trim();
    const generatedVehicles: VehicleTransaction[] = [
      ...bangliVehicles.map((bv) => ({
        id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        tanggal,
        kantorDesa: finalDesaName,
        platNomor: bv.platNomor,
        isBangli: true,
        namaPemilik: bv.namaPemilik,
        jenisKendaraan: bv.jenisKendaraan,
        merkModel: 'Kendaraan ' + bv.jenisKendaraan,
        nominalPkb: Math.round(bv.nominalRp * 0.8),
        nominalSwdkllj: Math.round(bv.nominalRp * 0.12),
        nominalAdmin: Math.round(bv.nominalRp * 0.08),
        totalBayar: bv.nominalRp
      })),
      ...luarVehicles.map((lv) => ({
        id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        tanggal,
        kantorDesa: finalDesaName,
        platNomor: lv.platNomor,
        isBangli: false,
        namaPemilik: lv.namaPemilik,
        jenisKendaraan: lv.jenisKendaraan,
        merkModel: 'Kendaraan ' + lv.jenisKendaraan,
        nominalPkb: Math.round(lv.nominalRp * 0.8),
        nominalSwdkllj: Math.round(lv.nominalRp * 0.12),
        nominalAdmin: Math.round(lv.nominalRp * 0.08),
        totalBayar: lv.nominalRp
      }))
    ];

    onSave(
      {
        id: initialData?.id,
        tanggal,
        kantorDesa: finalDesaName,
        realisasiBangliNopol: bangliUnitVal,
        realisasiBangliRp: bangliRpVal,
        realisasiLuarNopol: luarUnitVal,
        realisasiLuarRp: luarRpVal,
        petugas,
        catatan
      },
      generatedVehicles
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>{initialData ? 'Edit Data Realisasi Samsat' : 'Input Data Realisasi Baru'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Input Nopol &amp; nominal bayar untuk otomatis masuk ke Rincian Kendaraan
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Row 1: Tanggal & Kantor Desa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tanggal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Tanggal Pelayanan *</span>
              </label>
              <input
                type="date"
                required
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {/* Kantor Desa */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Kantor Desa *</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomDesa(!isCustomDesa)}
                  className="text-[11px] text-amber-700 hover:underline font-semibold cursor-pointer"
                >
                  {isCustomDesa ? 'Pilih dari Daftar' : '+ Ketik Manual'}
                </button>
              </div>

              {isCustomDesa ? (
                <input
                  type="text"
                  placeholder="Contoh: Kantor Desa Terunyan"
                  value={customDesa}
                  onChange={(e) => setCustomDesa(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  required
                />
              ) : (
                <select
                  value={kantorDesa}
                  onChange={(e) => setKantorDesa(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white cursor-pointer"
                >
                  {listKantorDesa.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              )}
            </div>

          </div>

          {/* Section: Realisasi Nopol Bangli */}
          <div className="bg-sky-50/80 p-4 rounded-xl border border-sky-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky-600" />
                <span>REALISASI NOPOL BANGLI (Plat Kode Bangli)</span>
              </h4>
              <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-300">
                {bangliVehicles.length} Nopol Terinput
              </span>
            </div>

            {/* Sub-form input single Nopol Bangli */}
            <div className="bg-white p-3 rounded-lg border border-sky-200 space-y-2">
              <span className="text-[11px] font-bold text-sky-900 block">
                + Input Rincian Nopol Bangli (Otomatis masuk ke Rincian Kendaraan):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Plat Nomor (Nopol)</label>
                  <input
                    type="text"
                    placeholder="DK 3412 PAB"
                    value={tempBangliPlat}
                    onChange={(e) => setTempBangliPlat(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded font-mono font-bold uppercase"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Jumlah Nominal (Rp)</label>
                  <input
                    type="number"
                    min={0}
                    placeholder="850000"
                    value={tempBangliRp}
                    onChange={(e) => setTempBangliRp(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded font-bold text-slate-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Nama Wajib Pajak</label>
                  <input
                    type="text"
                    placeholder="Nama Pemilik"
                    value={tempBangliNama}
                    onChange={(e) => setTempBangliNama(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={handleAddBangliVehicle}
                    className="w-full py-1.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Nopol</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Added Bangli Vehicles Badge List */}
            {bangliVehicles.length > 0 && (
              <div className="bg-sky-100/60 p-2.5 rounded-lg border border-sky-200 space-y-1.5">
                <span className="text-[11px] font-bold text-sky-900 block">Daftar Nopol Bangli Terdaftar:</span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                  {bangliVehicles.map((item) => (
                    <div key={item.id} className="inline-flex items-center gap-1.5 bg-white border border-sky-300 px-2.5 py-1 rounded-md text-xs shadow-2xs">
                      <span className="font-mono font-black text-sky-950">{item.platNomor}</span>
                      <span className="text-slate-400">|</span>
                      <span className="font-bold text-sky-800">{formatRupiah(item.nominalRp)}</span>
                      {item.namaPemilik && <span className="text-[10px] text-slate-500">({item.namaPemilik})</span>}
                      <button
                        type="button"
                        onClick={() => handleRemoveBangliVehicle(item.id)}
                        className="p-0.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer ml-1"
                        title="Hapus Nopol"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Nopol Bangli (Unit) *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  value={realisasiBangliNopol}
                  onChange={(e) => setRealisasiBangliNopol(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-sky-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Realisasi Nominal Bangli (Rp) *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  value={realisasiBangliRp}
                  onChange={(e) => setRealisasiBangliRp(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-sky-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-bold"
                />
                <p className="text-[10px] text-sky-700 mt-0.5">
                  Format: {formatRupiah(bangliRpVal)}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Realisasi Nopol Luar Bangli */}
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-600" />
                <span>REALISASI NOPOL LUAR BANGLI (Plat Luar Bangli)</span>
              </h4>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                {luarVehicles.length} Nopol Terinput
              </span>
            </div>

            {/* Sub-form input single Nopol Luar Bangli */}
            <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-2">
              <span className="text-[11px] font-bold text-amber-900 block">
                + Input Rincian Nopol Luar Bangli (Otomatis masuk ke Rincian Kendaraan):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Plat Nomor (Nopol)</label>
                  <input
                    type="text"
                    placeholder="DK 1829 FA"
                    value={tempLuarPlat}
                    onChange={(e) => setTempLuarPlat(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded font-mono font-bold uppercase"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Jumlah Nominal (Rp)</label>
                  <input
                    type="number"
                    min={0}
                    placeholder="800000"
                    value={tempLuarRp}
                    onChange={(e) => setTempLuarRp(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded font-bold text-slate-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Nama Wajib Pajak</label>
                  <input
                    type="text"
                    placeholder="Nama Pemilik"
                    value={tempLuarNama}
                    onChange={(e) => setTempLuarNama(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={handleAddLuarVehicle}
                    className="w-full py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Nopol</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Added Luar Bangli Vehicles Badge List */}
            {luarVehicles.length > 0 && (
              <div className="bg-amber-100/60 p-2.5 rounded-lg border border-amber-200 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-900 block">Daftar Nopol Luar Bangli Terdaftar:</span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                  {luarVehicles.map((item) => (
                    <div key={item.id} className="inline-flex items-center gap-1.5 bg-white border border-amber-300 px-2.5 py-1 rounded-md text-xs shadow-2xs">
                      <span className="font-mono font-black text-amber-950">{item.platNomor}</span>
                      <span className="text-slate-400">|</span>
                      <span className="font-bold text-amber-800">{formatRupiah(item.nominalRp)}</span>
                      {item.namaPemilik && <span className="text-[10px] text-slate-500">({item.namaPemilik})</span>}
                      <button
                        type="button"
                        onClick={() => handleRemoveLuarVehicle(item.id)}
                        className="p-0.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer ml-1"
                        title="Hapus Nopol"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Nopol Luar Bangli (Unit) *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  value={realisasiLuarNopol}
                  onChange={(e) => setRealisasiLuarNopol(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Realisasi Nominal Luar Bangli (Rp) *
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  placeholder="0"
                  value={realisasiLuarRp}
                  onChange={(e) => setRealisasiLuarRp(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-bold"
                />
                <p className="text-[10px] text-amber-700 mt-0.5">
                  Format: {formatRupiah(luarRpVal)}
                </p>
              </div>
            </div>
          </div>

          {/* Automatic Calculation Preview Box */}
          <div className="bg-emerald-950 text-white p-4 rounded-xl space-y-2 border border-emerald-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Ringkasan Otomatis Row Tabel (TOTAL)</span>
              </div>
              {(bangliVehicles.length > 0 || luarVehicles.length > 0) && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {bangliVehicles.length + luarVehicles.length} Transaksi Otomatis Masuk Rincian Kendaraan
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="bg-emerald-900/60 p-2 rounded-lg">
                <span className="text-[10px] text-emerald-300 block">JML BANGLI</span>
                <span className="font-bold text-white">{bangliUnitVal} Unit</span>
                <span className="block text-[11px] text-emerald-200 mt-0.5">{formatRupiah(bangliRpVal)}</span>
              </div>

              <div className="bg-emerald-900/60 p-2 rounded-lg">
                <span className="text-[10px] text-emerald-300 block">JML LUAR BANGLI</span>
                <span className="font-bold text-white">{luarUnitVal} Unit</span>
                <span className="block text-[11px] text-emerald-200 mt-0.5">{formatRupiah(luarRpVal)}</span>
              </div>

              <div className="bg-emerald-800 p-2 rounded-lg ring-1 ring-emerald-400/40">
                <span className="text-[10px] text-amber-300 font-extrabold block">TOTAL KESELURUHAN</span>
                <span className="font-extrabold text-white text-sm">{totalUnitVal} Unit</span>
                <span className="block font-black text-amber-300 mt-0.5">{formatRupiah(totalRpVal)}</span>
              </div>
            </div>
          </div>

          {/* Row: Petugas & Catatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Petugas Pelaksana</span>
              </label>
              <input
                type="text"
                placeholder="Nama Petugas Samsat Desa"
                value={petugas}
                onChange={(e) => setPetugas(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Catatan Kegiatan</span>
              </label>
              <input
                type="text"
                placeholder="Misal: Bertempat di Balai Desa..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Data</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

