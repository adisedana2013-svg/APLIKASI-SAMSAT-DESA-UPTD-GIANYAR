export interface SamsatDailyEntry {
  id: string;
  no: number;
  tanggal: string; // YYYY-MM-DD
  kantorDesa: string;
  realisasiBangliNopol: number; // Unit count
  realisasiBangliRp: number; // Amount in Rp
  realisasiLuarNopol: number; // Unit count
  realisasiLuarRp: number; // Amount in Rp
  catatan?: string;
  petugas?: string;
}

export interface VehicleTransaction {
  id: string;
  dailyEntryId?: string;
  tanggal: string;
  kantorDesa: string;
  platNomor: string; // e.g., DK 3412 PAB (Bangli) or DK 1829 FA (Badung)
  isBangli: boolean;
  namaPemilik: string;
  jenisKendaraan: 'R2' | 'R4' | 'R6+'; // Roda 2 (Motor), Roda 4 (Mobil), etc.
  merkModel: string;
  nominalPkb: number;
  nominalSwdkllj: number;
  nominalAdmin: number;
  totalBayar: number;
}

export interface MonthlyRecapSummary {
  bulanTahun: string; // "2026-07"
  namaBulan: string; // "Juli 2026"
  totalUnitBangli: number;
  totalRpBangli: number;
  totalUnitLuar: number;
  totalRpLuar: number;
  grandTotalUnit: number;
  grandTotalRp: number;
  targetRp: number;
  persentaseCapaian: number;
}

export interface DesaRecapSummary {
  kantorDesa: string;
  totalKegiatan: number;
  totalUnitBangli: number;
  totalRpBangli: number;
  totalUnitLuar: number;
  totalRpLuar: number;
  grandTotalUnit: number;
  grandTotalRp: number;
}

export type ViewTab = 'harian' | 'rekap-bulanan' | 'input' | 'transaksi-detail' | 'grafik';
