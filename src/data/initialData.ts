import { SamsatDailyEntry, VehicleTransaction } from '../types';

export const INITIAL_DAILY_ENTRIES: SamsatDailyEntry[] = [
  // ==========================================
  // BULAN JANUARI 2026
  // ==========================================
  { id: 'smd-2026-01-01', no: 1, tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Abuan Susut', realisasiBangliNopol: 3, realisasiBangliRp: 25647000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-02', no: 2, tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 8, realisasiLuarRp: 7485000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-03', no: 3, tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Pinggan', realisasiBangliNopol: 1, realisasiBangliRp: 261000, realisasiLuarNopol: 2, realisasiLuarRp: 2100000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-04', no: 4, tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Mangguh', realisasiBangliNopol: 6, realisasiBangliRp: 6000000, realisasiLuarNopol: 2, realisasiLuarRp: 1100000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-05', no: 5, tanggal: '2026-01-08', kantorDesa: 'Kantor Desa Bayung', realisasiBangliNopol: 10, realisasiBangliRp: 12387000, realisasiLuarNopol: 4, realisasiLuarRp: 3750000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-06', no: 6, tanggal: '2026-01-08', kantorDesa: 'Kantor Desa Pengotan', realisasiBangliNopol: 1, realisasiBangliRp: 680000, realisasiLuarNopol: 1, realisasiLuarRp: 750000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-07', no: 7, tanggal: '2026-01-20', kantorDesa: 'Kantor Desa Apuan', realisasiBangliNopol: 6, realisasiBangliRp: 3500000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-08', no: 8, tanggal: '2026-01-20', kantorDesa: 'Kantor Desa Dausa', realisasiBangliNopol: 5, realisasiBangliRp: 5960000, realisasiLuarNopol: 8, realisasiLuarRp: 4820000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-09', no: 9, tanggal: '2026-01-20', kantorDesa: 'Kantor Desa Suter', realisasiBangliNopol: 1, realisasiBangliRp: 640000, realisasiLuarNopol: 3, realisasiLuarRp: 2805000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-10', no: 10, tanggal: '2026-01-21', kantorDesa: 'Kantor Desa Tiga Susut', realisasiBangliNopol: 7, realisasiBangliRp: 17178000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-11', no: 11, tanggal: '2026-01-21', kantorDesa: 'Kantor Desa Kedisan', realisasiBangliNopol: 3, realisasiBangliRp: 2890000, realisasiLuarNopol: 1, realisasiLuarRp: 1600000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-12', no: 12, tanggal: '2026-01-21', kantorDesa: 'Kantor Desa Bunutin', realisasiBangliNopol: 1, realisasiBangliRp: 281000, realisasiLuarNopol: 3, realisasiLuarRp: 1375000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-13', no: 13, tanggal: '2026-01-21', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 2, realisasiBangliRp: 600000, realisasiLuarNopol: 4, realisasiLuarRp: 3440000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-14', no: 14, tanggal: '2026-01-21', kantorDesa: 'Kantor Desa Sekaan', realisasiBangliNopol: 3, realisasiBangliRp: 2250000, realisasiLuarNopol: 3, realisasiLuarRp: 2452500, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-15', no: 15, tanggal: '2026-01-29', kantorDesa: 'Kantor Desa Selat Peken', realisasiBangliNopol: 6, realisasiBangliRp: 2010000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-16', no: 16, tanggal: '2026-01-29', kantorDesa: 'Kantor Desa Mengani', realisasiBangliNopol: 1, realisasiBangliRp: 2361000, realisasiLuarNopol: 1, realisasiLuarRp: 488000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-17', no: 17, tanggal: '2026-01-29', kantorDesa: 'Kantor Desa Abang Songan', realisasiBangliNopol: 2, realisasiBangliRp: 500000, realisasiLuarNopol: 2, realisasiLuarRp: 1850000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-18', no: 18, tanggal: '2026-01-29', kantorDesa: 'Kantor Desa Banua', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Tidak ada realisasi' },
  { id: 'smd-2026-01-19', no: 19, tanggal: '2026-01-30', kantorDesa: 'Kantor Desa Penglumbaran', realisasiBangliNopol: 1, realisasiBangliRp: 230000, realisasiLuarNopol: 1, realisasiLuarRp: 400000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-20', no: 20, tanggal: '2026-01-30', kantorDesa: 'Kantor Desa Peninjoan', realisasiBangliNopol: 2, realisasiBangliRp: 500000, realisasiLuarNopol: 1, realisasiLuarRp: 367000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },
  { id: 'smd-2026-01-21', no: 21, tanggal: '2026-01-30', kantorDesa: 'Kantor Desa Batur Selatan', realisasiBangliNopol: 3, realisasiBangliRp: 2601000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Januari 2026' },

  // ==========================================
  // BULAN PEBRUARI 2026
  // ==========================================
  { id: 'smd-2026-02-01', no: 1, tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Landih', realisasiBangliNopol: 1, realisasiBangliRp: 270000, realisasiLuarNopol: 1, realisasiLuarRp: 435000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-02', no: 2, tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 5, realisasiBangliRp: 2950000, realisasiLuarNopol: 1, realisasiLuarRp: 750000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-03', no: 3, tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Sukawana', realisasiBangliNopol: 1, realisasiBangliRp: 400000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-04', no: 4, tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Langgahan', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 4, realisasiLuarRp: 1566000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-05', no: 5, tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 1, realisasiLuarRp: 3050000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-06', no: 6, tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Tiga Susut', realisasiBangliNopol: 1, realisasiBangliRp: 220000, realisasiLuarNopol: 1, realisasiLuarRp: 545000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-07', no: 7, tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', realisasiBangliNopol: 3, realisasiBangliRp: 5705000, realisasiLuarNopol: 4, realisasiLuarRp: 5180000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-08', no: 8, tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Katung', realisasiBangliNopol: 2, realisasiBangliRp: 760000, realisasiLuarNopol: 1, realisasiLuarRp: 500000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-09', no: 9, tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Daup', realisasiBangliNopol: 4, realisasiBangliRp: 4450000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },
  { id: 'smd-2026-02-10', no: 10, tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 4, realisasiBangliRp: 4242000, realisasiLuarNopol: 4, realisasiLuarRp: 6270000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Februari 2026' },

  // ==========================================
  // BULAN MARET 2026
  // ==========================================
  { id: 'smd-2026-03-01', no: 1, tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', realisasiBangliNopol: 4, realisasiBangliRp: 1260000, realisasiLuarNopol: 1, realisasiLuarRp: 400000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Maret 2026' },
  { id: 'smd-2026-03-02', no: 2, tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Bunutin', realisasiBangliNopol: 2, realisasiBangliRp: 2080000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Maret 2026' },

  // ==========================================
  // BULAN APRIL 2026
  // ==========================================
  { id: 'smd-2026-04-01', no: 1, tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 2, realisasiBangliRp: 1665000, realisasiLuarNopol: 4, realisasiLuarRp: 1955000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-02', no: 2, tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Dausa', realisasiBangliNopol: 1, realisasiBangliRp: 2666000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-03', no: 3, tanggal: '2026-04-16', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 8, realisasiBangliRp: 5835000, realisasiLuarNopol: 2, realisasiLuarRp: 1755000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-04', no: 4, tanggal: '2026-04-16', kantorDesa: 'Kantor Desa Tiga Susut', realisasiBangliNopol: 1, realisasiBangliRp: 300000, realisasiLuarNopol: 1, realisasiLuarRp: 350000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-05', no: 5, tanggal: '2026-04-16', kantorDesa: 'Kantor Desa Bunutin', realisasiBangliNopol: 9, realisasiBangliRp: 11951000, realisasiLuarNopol: 1, realisasiLuarRp: 1457000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-06', no: 6, tanggal: '2026-04-17', kantorDesa: 'Kantor Desa Langgahan', realisasiBangliNopol: 1, realisasiBangliRp: 330000, realisasiLuarNopol: 4, realisasiLuarRp: 5607000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-07', no: 7, tanggal: '2026-04-17', kantorDesa: 'Kantor Desa Peninjoan', realisasiBangliNopol: 3, realisasiBangliRp: 810000, realisasiLuarNopol: 2, realisasiLuarRp: 2700000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-08', no: 8, tanggal: '2026-04-17', kantorDesa: 'Kantor Desa Selat Peken', realisasiBangliNopol: 2, realisasiBangliRp: 1050000, realisasiLuarNopol: 1, realisasiLuarRp: 1800000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-09', no: 9, tanggal: '2026-04-17', kantorDesa: 'Kantor Desa Bayung Gede', realisasiBangliNopol: 4, realisasiBangliRp: 665000, realisasiLuarNopol: 2, realisasiLuarRp: 1150000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-10', no: 10, tanggal: '2026-04-27', kantorDesa: 'Kantor Desa Tiga Susut', realisasiBangliNopol: 14, realisasiBangliRp: 1848000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-11', no: 11, tanggal: '2026-04-27', kantorDesa: 'Kantor Desa Abuan Susut', realisasiBangliNopol: 10, realisasiBangliRp: 1400000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-12', no: 12, tanggal: '2026-04-29', kantorDesa: 'Kantor Desa Pinggan', realisasiBangliNopol: 2, realisasiBangliRp: 707600, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-13', no: 13, tanggal: '2026-04-29', kantorDesa: 'Kantor Desa Sukawana', realisasiBangliNopol: 1, realisasiBangliRp: 400000, realisasiLuarNopol: 3, realisasiLuarRp: 3150000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-14', no: 14, tanggal: '2026-04-30', kantorDesa: 'Kantor Desa Catur', realisasiBangliNopol: 2, realisasiBangliRp: 502000, realisasiLuarNopol: 2, realisasiLuarRp: 1180000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-15', no: 15, tanggal: '2026-04-30', kantorDesa: 'Kantor Desa Mangguh', realisasiBangliNopol: 2, realisasiBangliRp: 600000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },
  { id: 'smd-2026-04-16', no: 16, tanggal: '2026-04-30', kantorDesa: 'Kantor Desa Songan B', realisasiBangliNopol: 2, realisasiBangliRp: 554000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan April 2026' },

  // ==========================================
  // BULAN MEI 2026
  // ==========================================
  { id: 'smd-2026-05-01', no: 1, tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Tiga Susut', realisasiBangliNopol: 3, realisasiBangliRp: 855000, realisasiLuarNopol: 1, realisasiLuarRp: 382000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-02', no: 2, tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 4, realisasiBangliRp: 1581000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-03', no: 3, tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Serai', realisasiBangliNopol: 5, realisasiBangliRp: 3207000, realisasiLuarNopol: 3, realisasiLuarRp: 1462000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-04', no: 4, tanggal: '2026-05-21', kantorDesa: 'Kantor Desa Apuan', realisasiBangliNopol: 5, realisasiBangliRp: 863000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-05', no: 5, tanggal: '2026-05-21', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 2, realisasiBangliRp: 1950000, realisasiLuarNopol: 2, realisasiLuarRp: 1520000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-06', no: 6, tanggal: '2026-05-21', kantorDesa: 'Kantor Desa Daup', realisasiBangliNopol: 2, realisasiBangliRp: 1122000, realisasiLuarNopol: 3, realisasiLuarRp: 2453000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-07', no: 7, tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Selat Peken', realisasiBangliNopol: 4, realisasiBangliRp: 1866000, realisasiLuarNopol: 1, realisasiLuarRp: 705000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-08', no: 8, tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Batur Selatan', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 3, realisasiLuarRp: 3200000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-09', no: 9, tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Bayung Gede', realisasiBangliNopol: 4, realisasiBangliRp: 4335000, realisasiLuarNopol: 3, realisasiLuarRp: 2590000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },
  { id: 'smd-2026-05-10', no: 10, tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Abang Songan', realisasiBangliNopol: 7, realisasiBangliRp: 9922000, realisasiLuarNopol: 2, realisasiLuarRp: 1860000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Mei 2026' },

  // ==========================================
  // BULAN JUNI 2026
  // ==========================================
  { id: 'smd-2026-06-01', no: 1, tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Abang Songan', realisasiBangliNopol: 4, realisasiBangliRp: 3170000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-02', no: 2, tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 6, realisasiBangliRp: 26745000, realisasiLuarNopol: 3, realisasiLuarRp: 2400000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-03', no: 3, tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Bunutin', realisasiBangliNopol: 2, realisasiBangliRp: 620000, realisasiLuarNopol: 1, realisasiLuarRp: 1700000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-04', no: 4, tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Langgahan', realisasiBangliNopol: 3, realisasiBangliRp: 1035000, realisasiLuarNopol: 2, realisasiLuarRp: 1820000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-05', no: 5, tanggal: '2026-06-24', kantorDesa: 'Kantor Desa Banua', realisasiBangliNopol: 1, realisasiBangliRp: 670000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-06', no: 6, tanggal: '2026-06-24', kantorDesa: 'Kantor Desa Selat Peken', realisasiBangliNopol: 1, realisasiBangliRp: 300000, realisasiLuarNopol: 1, realisasiLuarRp: 1415000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-07', no: 7, tanggal: '2026-06-24', kantorDesa: 'Kantor Desa Bayung Gede', realisasiBangliNopol: 2, realisasiBangliRp: 1510000, realisasiLuarNopol: 5, realisasiLuarRp: 15470000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-08', no: 8, tanggal: '2026-06-25', kantorDesa: 'Kantor Desa Abuan Susut', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 1, realisasiLuarRp: 400000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-09', no: 9, tanggal: '2026-06-25', kantorDesa: 'Kantor Desa Buahan', realisasiBangliNopol: 8, realisasiBangliRp: 4250000, realisasiLuarNopol: 3, realisasiLuarRp: 4450000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-10', no: 10, tanggal: '2026-06-30', kantorDesa: 'Kantor Desa Bayung Gede', realisasiBangliNopol: 2, realisasiBangliRp: 810000, realisasiLuarNopol: 2, realisasiLuarRp: 4800000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },
  { id: 'smd-2026-06-11', no: 11, tanggal: '2026-06-30', kantorDesa: 'Kantor Desa Bunutin', realisasiBangliNopol: 5, realisasiBangliRp: 3110000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juni 2026' },

  // ==========================================
  // BULAN JULI 2026
  // ==========================================
  { id: 'smd-2026-07-01', no: 1, tanggal: '2026-07-14', kantorDesa: 'Kantor Desa Sekardadi', realisasiBangliNopol: 5, realisasiBangliRp: 9105000, realisasiLuarNopol: 4, realisasiLuarRp: 7950000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-02', no: 2, tanggal: '2026-07-15', kantorDesa: 'Kantor Desa Sekaan', realisasiBangliNopol: 6, realisasiBangliRp: 1751000, realisasiLuarNopol: 1, realisasiLuarRp: 400000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-03', no: 3, tanggal: '2026-07-15', kantorDesa: 'Kantor Desa Kedisan', realisasiBangliNopol: 8, realisasiBangliRp: 7782000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-04', no: 4, tanggal: '2026-07-15', kantorDesa: 'Kantor Desa Batur Tengah', realisasiBangliNopol: 1, realisasiBangliRp: 300000, realisasiLuarNopol: 6, realisasiLuarRp: 4410000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-05', no: 5, tanggal: '2026-07-15', kantorDesa: 'Kantor Desa Lembean', realisasiBangliNopol: 3, realisasiBangliRp: 1636000, realisasiLuarNopol: 8, realisasiLuarRp: 4926000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-06', no: 6, tanggal: '2026-07-16', kantorDesa: 'Kantor Desa Mangguh', realisasiBangliNopol: 4, realisasiBangliRp: 811000, realisasiLuarNopol: 1, realisasiLuarRp: 3064000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-07', no: 7, tanggal: '2026-07-16', kantorDesa: 'Kantor Desa Catur', realisasiBangliNopol: 6, realisasiBangliRp: 2336000, realisasiLuarNopol: 3, realisasiLuarRp: 3847000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-08', no: 8, tanggal: '2026-07-16', kantorDesa: 'Kantor Desa Belancan', realisasiBangliNopol: 2, realisasiBangliRp: 740000, realisasiLuarNopol: 2, realisasiLuarRp: 2729000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-09', no: 9, tanggal: '2026-07-16', kantorDesa: 'Kantor Desa Abang Songan', realisasiBangliNopol: 2, realisasiBangliRp: 3015000, realisasiLuarNopol: 0, realisasiLuarRp: 0, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-10', no: 10, tanggal: '2026-07-17', kantorDesa: 'Kantor Desa Pinggan', realisasiBangliNopol: 1, realisasiBangliRp: 305000, realisasiLuarNopol: 2, realisasiLuarRp: 422000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-11', no: 11, tanggal: '2026-07-17', kantorDesa: 'Kantor Desa Sukawana', realisasiBangliNopol: 0, realisasiBangliRp: 0, realisasiLuarNopol: 3, realisasiLuarRp: 5270000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-12', no: 12, tanggal: '2026-07-21', kantorDesa: 'Kantor Desa Manikliyu', realisasiBangliNopol: 9, realisasiBangliRp: 6429000, realisasiLuarNopol: 8, realisasiLuarRp: 10906000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-13', no: 13, tanggal: '2026-07-27', kantorDesa: 'Kantor Desa Selat Peken', realisasiBangliNopol: 5, realisasiBangliRp: 800000, realisasiLuarNopol: 1, realisasiLuarRp: 1324000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' },
  { id: 'smd-2026-07-14', no: 14, tanggal: '2026-07-29', kantorDesa: 'Kantor Desa Katung', realisasiBangliNopol: 6, realisasiBangliRp: 2892000, realisasiLuarNopol: 3, realisasiLuarRp: 6147000, petugas: 'Sang Nyoman Wiramajaya', catatan: 'Pelayanan Juli 2026' }
];

export const INITIAL_VEHICLE_TRANSACTIONS: VehicleTransaction[] = [
  // ==========================================
  // JANUARI 2026
  // ==========================================
  { id: 'v-jan-001', dailyEntryId: 'smd-2026-01-01', tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Abuan Susut', platNomor: 'DK 3812 PA', isBangli: true, namaPemilik: 'Wajib Pajak Abuan', jenisKendaraan: 'R2', merkModel: 'Sepeda Motor', nominalPkb: 360000, nominalSwdkllj: 54000, nominalAdmin: 36000, totalBayar: 450000 },
  { id: 'v-jan-002', dailyEntryId: 'smd-2026-01-01', tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Abuan Susut', platNomor: 'DK 6112 PA', isBangli: true, namaPemilik: 'Wajib Pajak Abuan', jenisKendaraan: 'R4', merkModel: 'Toyota Avanza', nominalPkb: 20000000, nominalSwdkllj: 3000000, nominalAdmin: 2197000, totalBayar: 25197000 },
  { id: 'v-jan-003', dailyEntryId: 'smd-2026-01-02', tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 9912 BTL', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R4', merkModel: 'Mobil Passenger', nominalPkb: 5988000, nominalSwdkllj: 898200, nominalAdmin: 598800, totalBayar: 7485000 },
  { id: 'v-jan-004', dailyEntryId: 'smd-2026-01-03', tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Pinggan', platNomor: 'DK 6482 PQ', isBangli: true, namaPemilik: 'Wajib Pajak Pinggan', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 208800, nominalSwdkllj: 31320, nominalAdmin: 20880, totalBayar: 261000 },
  { id: 'v-jan-005', dailyEntryId: 'smd-2026-01-03', tanggal: '2026-01-07', kantorDesa: 'Kantor Desa Pinggan', platNomor: 'DK 4381 AP', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Yamaha NMAX', nominalPkb: 1680000, nominalSwdkllj: 252000, nominalAdmin: 168000, totalBayar: 2100000 },

  // ==========================================
  // FEBRUARI 2026
  // ==========================================
  { id: 'v-feb-001', dailyEntryId: 'smd-2026-02-01', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Landih', platNomor: 'DK 2516 PU', isBangli: true, namaPemilik: 'Wajib Pajak Landih', jenisKendaraan: 'R2', merkModel: 'Sepeda Motor', nominalPkb: 216000, nominalSwdkllj: 32400, nominalAdmin: 21600, totalBayar: 270000 },
  { id: 'v-feb-002', dailyEntryId: 'smd-2026-02-01', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Landih', platNomor: 'DK 2527 TL', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Sepeda Motor', nominalPkb: 348000, nominalSwdkllj: 52200, nominalAdmin: 34800, totalBayar: 435000 },
  { id: 'v-feb-003', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 6519 PB', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R2', merkModel: 'Honda Scoopy', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-feb-004', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 6520 PB', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-feb-005', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 5250 PT', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R2', merkModel: 'Honda Revo', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-feb-006', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 8969 PV', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R4', merkModel: 'Suzuki Carry', nominalPkb: 1080000, nominalSwdkllj: 162000, nominalAdmin: 108000, totalBayar: 1350000 },
  { id: 'v-feb-007', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 4855 RB', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R2', merkModel: 'Yamaha Mio', nominalPkb: 360000, nominalSwdkllj: 54000, nominalAdmin: 36000, totalBayar: 450000 },
  { id: 'v-feb-008', dailyEntryId: 'smd-2026-02-02', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 5501 FAZ', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Yamaha Fazzio', nominalPkb: 600000, nominalSwdkllj: 90000, nominalAdmin: 60000, totalBayar: 750000 },
  { id: 'v-feb-009', dailyEntryId: 'smd-2026-02-03', tanggal: '2026-02-06', kantorDesa: 'Kantor Desa Sukawana', platNomor: 'DK 2572 RF', isBangli: true, namaPemilik: 'Wajib Pajak Sukawana', jenisKendaraan: 'R2', merkModel: 'Honda Supra X', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-feb-010', dailyEntryId: 'smd-2026-02-04', tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Langgahan', platNomor: 'DK 3396 ABN', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 208000, nominalSwdkllj: 31200, nominalAdmin: 20800, totalBayar: 260000 },
  { id: 'v-feb-011', dailyEntryId: 'smd-2026-02-04', tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Langgahan', platNomor: 'DK 2912 KAR', isBangli: false, namaPemilik: 'Wajib Pajak Karangasem', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 324800, nominalSwdkllj: 48720, nominalAdmin: 32480, totalBayar: 406000 },
  { id: 'v-feb-012', dailyEntryId: 'smd-2026-02-04', tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Langgahan', platNomor: 'DK 6643 FS', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Yamaha Jupiter', nominalPkb: 312000, nominalSwdkllj: 46800, nominalAdmin: 31200, totalBayar: 390000 },
  { id: 'v-feb-013', dailyEntryId: 'smd-2026-02-04', tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Langgahan', platNomor: 'DK 5726 ABN', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda CB150R', nominalPkb: 408000, nominalSwdkllj: 61200, nominalAdmin: 40800, totalBayar: 510000 },
  { id: 'v-feb-014', dailyEntryId: 'smd-2026-02-05', tanggal: '2026-02-07', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 1180 CQ', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R4', merkModel: 'Toyota Innova', nominalPkb: 2440000, nominalSwdkllj: 366000, nominalAdmin: 244000, totalBayar: 3050000 },
  { id: 'v-feb-015', dailyEntryId: 'smd-2026-02-06', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 3374 PQ', isBangli: true, namaPemilik: 'Wajib Pajak Tiga', jenisKendaraan: 'R2', merkModel: 'Honda Supra', nominalPkb: 176000, nominalSwdkllj: 26400, nominalAdmin: 17600, totalBayar: 220000 },
  { id: 'v-feb-016', dailyEntryId: 'smd-2026-02-06', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 3161 ACJ', isBangli: false, namaPemilik: 'Wajib Pajak Gianyar', jenisKendaraan: 'R2', merkModel: 'Yamaha Vixion', nominalPkb: 436000, nominalSwdkllj: 65400, nominalAdmin: 43600, totalBayar: 545000 },
  { id: 'v-feb-017', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 8984 PB', isBangli: true, namaPemilik: 'Wajib Pajak Bayung Gede', jenisKendaraan: 'R4', merkModel: 'Mitsubishi Pajero', nominalPkb: 4200000, nominalSwdkllj: 630000, nominalAdmin: 420000, totalBayar: 5250000 },
  { id: 'v-feb-018', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 4569 PY', isBangli: true, namaPemilik: 'Wajib Pajak Bayung Gede', jenisKendaraan: 'R2', merkModel: 'Honda Grand', nominalPkb: 160000, nominalSwdkllj: 24000, nominalAdmin: 16000, totalBayar: 200000 },
  { id: 'v-feb-019', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 5390 PW', isBangli: true, namaPemilik: 'Wajib Pajak Bayung Gede', jenisKendaraan: 'R2', merkModel: 'Honda Supra 125', nominalPkb: 204000, nominalSwdkllj: 30600, nominalAdmin: 20400, totalBayar: 255000 },
  { id: 'v-feb-020', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 5384 UV', isBangli: false, namaPemilik: 'Wajib Pajak Badung', jenisKendaraan: 'R2', merkModel: 'Yamaha Mio', nominalPkb: 248000, nominalSwdkllj: 37200, nominalAdmin: 24800, totalBayar: 310000 },
  { id: 'v-feb-021', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 2222 KU', isBangli: false, namaPemilik: 'Wajib Pajak Tabanan', jenisKendaraan: 'R2', merkModel: 'Honda PCX', nominalPkb: 840000, nominalSwdkllj: 126000, nominalAdmin: 84000, totalBayar: 1050000 },
  { id: 'v-feb-022', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 4914 FDC', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R2', merkModel: 'Honda Genio', nominalPkb: 400000, nominalSwdkllj: 60000, nominalAdmin: 40000, totalBayar: 500000 },
  { id: 'v-feb-023', dailyEntryId: 'smd-2026-02-07', tanggal: '2026-02-19', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 1902 LK', isBangli: false, namaPemilik: 'Wajib Pajak Badung', jenisKendaraan: 'R4', merkModel: 'Honda HR-V', nominalPkb: 2656000, nominalSwdkllj: 398400, nominalAdmin: 265600, totalBayar: 3320000 },
  { id: 'v-feb-024', dailyEntryId: 'smd-2026-02-08', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Katung', platNomor: 'DK 2104 RF', isBangli: true, namaPemilik: 'Wajib Pajak Katung', jenisKendaraan: 'R2', merkModel: 'Honda Vario 160', nominalPkb: 400000, nominalSwdkllj: 60000, nominalAdmin: 40000, totalBayar: 500000 },
  { id: 'v-feb-025', dailyEntryId: 'smd-2026-02-08', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Katung', platNomor: 'DK 5443 PS', isBangli: true, namaPemilik: 'Wajib Pajak Katung', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 208000, nominalSwdkllj: 31200, nominalAdmin: 20800, totalBayar: 260000 },
  { id: 'v-feb-026', dailyEntryId: 'smd-2026-02-08', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Katung', platNomor: 'DK 4385 LW', isBangli: false, namaPemilik: 'Wajib Pajak Gianyar', jenisKendaraan: 'R2', merkModel: 'Yamaha Aerox', nominalPkb: 400000, nominalSwdkllj: 60000, nominalAdmin: 40000, totalBayar: 500000 },
  { id: 'v-feb-027', dailyEntryId: 'smd-2026-02-09', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Daup', platNomor: 'DK 8698 PZ', isBangli: true, namaPemilik: 'Wajib Pajak Daup', jenisKendaraan: 'R4', merkModel: 'Daihatsu Xenia', nominalPkb: 1880000, nominalSwdkllj: 282000, nominalAdmin: 188000, totalBayar: 2350000 },
  { id: 'v-feb-028', dailyEntryId: 'smd-2026-02-09', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Daup', platNomor: 'DK 8076 PW', isBangli: true, namaPemilik: 'Wajib Pajak Daup', jenisKendaraan: 'R4', merkModel: 'Suzuki APV', nominalPkb: 1223200, nominalSwdkllj: 183480, nominalAdmin: 122320, totalBayar: 1529000 },
  { id: 'v-feb-029', dailyEntryId: 'smd-2026-02-09', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Daup', platNomor: 'DK 5598 RB', isBangli: true, namaPemilik: 'Wajib Pajak Daup', jenisKendaraan: 'R2', merkModel: 'Honda Revo', nominalPkb: 214400, nominalSwdkllj: 32160, nominalAdmin: 21440, totalBayar: 268000 },
  { id: 'v-feb-030', dailyEntryId: 'smd-2026-02-09', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Daup', platNomor: 'DK 6438 RD', isBangli: true, namaPemilik: 'Wajib Pajak Daup', jenisKendaraan: 'R2', merkModel: 'Yamaha Vega', nominalPkb: 242400, nominalSwdkllj: 36360, nominalAdmin: 24240, totalBayar: 303000 },
  { id: 'v-feb-031', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 2731 PO', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-feb-032', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 2735 PO', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R2', merkModel: 'Honda Vario 125', nominalPkb: 329600, nominalSwdkllj: 49440, nominalAdmin: 32960, totalBayar: 412000 },
  { id: 'v-feb-033', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 5585 PO', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R2', merkModel: 'Honda Supra', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-feb-034', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1110 PE', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R4', merkModel: 'Toyota Rush', nominalPkb: 2504000, nominalSwdkllj: 375600, nominalAdmin: 250400, totalBayar: 3130000 },
  { id: 'v-feb-035', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 8709 QU', isBangli: false, namaPemilik: 'Wajib Pajak Buleleng', jenisKendaraan: 'R4', merkModel: 'Suzuki Carry PickUp', nominalPkb: 1216000, nominalSwdkllj: 182400, nominalAdmin: 121600, totalBayar: 1520000 },
  { id: 'v-feb-036', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 5822 ABL', isBangli: false, namaPemilik: 'Wajib Pajak Badung', jenisKendaraan: 'R2', merkModel: 'Yamaha Lexi', nominalPkb: 480000, nominalSwdkllj: 72000, nominalAdmin: 48000, totalBayar: 600000 },
  { id: 'v-feb-037', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1858 FO', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R4', merkModel: 'Mitsubishi Xpander', nominalPkb: 2560000, nominalSwdkllj: 384000, nominalAdmin: 256000, totalBayar: 3200000 },
  { id: 'v-feb-038', dailyEntryId: 'smd-2026-02-10', tanggal: '2026-02-20', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1329 BE', isBangli: false, namaPemilik: 'Wajib Pajak Tabanan', jenisKendaraan: 'R2', merkModel: 'Honda CBR250', nominalPkb: 760000, nominalSwdkllj: 114000, nominalAdmin: 76000, totalBayar: 950000 },

  // ==========================================
  // MARET 2026
  // ==========================================
  { id: 'v-mar-001', dailyEntryId: 'smd-2026-03-01', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', platNomor: 'DK 5409 PU', isBangli: true, namaPemilik: 'Wajib Pajak Apuan', jenisKendaraan: 'R2', merkModel: 'Honda Revo', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-mar-002', dailyEntryId: 'smd-2026-03-01', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', platNomor: 'DK 5282 PZ', isBangli: true, namaPemilik: 'Wajib Pajak Apuan', jenisKendaraan: 'R2', merkModel: 'Honda Scoopy', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-mar-003', dailyEntryId: 'smd-2026-03-01', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', platNomor: 'DK 5429 PW', isBangli: true, namaPemilik: 'Wajib Pajak Apuan', jenisKendaraan: 'R2', merkModel: 'Honda Vario 125', nominalPkb: 328000, nominalSwdkllj: 49200, nominalAdmin: 32800, totalBayar: 410000 },
  { id: 'v-mar-004', dailyEntryId: 'smd-2026-03-01', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', platNomor: 'DK 4368 PK', isBangli: true, namaPemilik: 'Wajib Pajak Apuan', jenisKendaraan: 'R2', merkModel: 'Yamaha Mio', nominalPkb: 200000, nominalSwdkllj: 30000, nominalAdmin: 20000, totalBayar: 250000 },
  { id: 'v-mar-005', dailyEntryId: 'smd-2026-03-01', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Apuan', platNomor: 'DK 2432 LN', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-mar-006', dailyEntryId: 'smd-2026-03-02', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Bunutin', platNomor: 'DK 6750 RB', isBangli: true, namaPemilik: 'Wajib Pajak Bunutin', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 224000, nominalSwdkllj: 33600, nominalAdmin: 22400, totalBayar: 280000 },
  { id: 'v-mar-007', dailyEntryId: 'smd-2026-03-02', tanggal: '2026-03-06', kantorDesa: 'Kantor Desa Bunutin', platNomor: 'DK 8550 PG', isBangli: true, namaPemilik: 'Wajib Pajak Bunutin', jenisKendaraan: 'R4', merkModel: 'Suzuki Carry', nominalPkb: 1440000, nominalSwdkllj: 216000, nominalAdmin: 144000, totalBayar: 1800000 },

  // ==========================================
  // APRIL 2026
  // ==========================================
  { id: 'v-apr-001', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 1965 JP', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R4', merkModel: 'Suzuki Carry PickUp', nominalPkb: 1120000, nominalSwdkllj: 168000, nominalAdmin: 112000, totalBayar: 1400000 },
  { id: 'v-apr-002', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 5730 PZ', isBangli: true, namaPemilik: 'Wajib Pajak Belancan', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 212000, nominalSwdkllj: 31800, nominalAdmin: 21200, totalBayar: 265000 },
  { id: 'v-apr-003', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 5419 CP', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 320000, nominalSwdkllj: 48000, nominalAdmin: 32000, totalBayar: 400000 },
  { id: 'v-apr-004', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 3063 IU', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Yamaha Jupiter', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-apr-005', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 4990 HW', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda PCX', nominalPkb: 680000, nominalSwdkllj: 102000, nominalAdmin: 68000, totalBayar: 850000 },
  { id: 'v-apr-006', dailyEntryId: 'smd-2026-04-01', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Belancan', platNomor: 'DK 6608 EW', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda Scoopy', nominalPkb: 324000, nominalSwdkllj: 48600, nominalAdmin: 32400, totalBayar: 405000 },
  { id: 'v-apr-007', dailyEntryId: 'smd-2026-04-02', tanggal: '2026-04-15', kantorDesa: 'Kantor Desa Dausa', platNomor: 'DK 8793 PB', isBangli: true, namaPemilik: 'Wajib Pajak Dausa', jenisKendaraan: 'R4', merkModel: 'Toyota Calya', nominalPkb: 2132800, nominalSwdkllj: 319920, nominalAdmin: 213280, totalBayar: 2666000 },
  { id: 'v-apr-008', dailyEntryId: 'smd-2026-04-03', tanggal: '2026-04-16', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1662 PH', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R4', merkModel: 'Toyota Veloz', nominalPkb: 2524000, nominalSwdkllj: 378600, nominalAdmin: 252400, totalBayar: 3155000 },
  { id: 'v-apr-009', dailyEntryId: 'smd-2026-04-03', tanggal: '2026-04-16', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 4262 ACT', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Honda NMAX', nominalPkb: 804000, nominalSwdkllj: 120600, nominalAdmin: 80400, totalBayar: 1005000 },

  // ==========================================
  // MEI 2026
  // ==========================================
  { id: 'v-mei-001', dailyEntryId: 'smd-2026-05-01', tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 3740 PZ', isBangli: true, namaPemilik: 'Wajib Pajak Tiga', jenisKendaraan: 'R2', merkModel: 'Sepeda Motor', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-mei-002', dailyEntryId: 'smd-2026-05-01', tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 6568 PQ', isBangli: true, namaPemilik: 'Wajib Pajak Tiga', jenisKendaraan: 'R2', merkModel: 'Honda Beat', nominalPkb: 204000, nominalSwdkllj: 30600, nominalAdmin: 20400, totalBayar: 255000 },
  { id: 'v-mei-003', dailyEntryId: 'smd-2026-05-01', tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 5032 PS', isBangli: true, namaPemilik: 'Wajib Pajak Tiga', jenisKendaraan: 'R2', merkModel: 'Honda Vario', nominalPkb: 240000, nominalSwdkllj: 36000, nominalAdmin: 24000, totalBayar: 300000 },
  { id: 'v-mei-004', dailyEntryId: 'smd-2026-05-01', tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Tiga Susut', platNomor: 'DK 3209 OL', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R2', merkModel: 'Sepeda Motor', nominalPkb: 305600, nominalSwdkllj: 45840, nominalAdmin: 30560, totalBayar: 382000 },
  { id: 'v-mei-005', dailyEntryId: 'smd-2026-05-03', tanggal: '2026-05-20', kantorDesa: 'Kantor Desa Serai', platNomor: 'DK 8664 PP', isBangli: true, namaPemilik: 'Wajib Pajak Serai', jenisKendaraan: 'R4', merkModel: 'Suzuki Carry PickUp', nominalPkb: 1336000, nominalSwdkllj: 200400, nominalAdmin: 133600, totalBayar: 1670000 },
  { id: 'v-mei-006', dailyEntryId: 'smd-2026-05-08', tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Batur Selatan', platNomor: 'B 1977 LJ', isBangli: false, namaPemilik: 'Wajib Pajak Jakarta', jenisKendaraan: 'R4', merkModel: 'Honda Brio', nominalPkb: 1588800, nominalSwdkllj: 238320, nominalAdmin: 158880, totalBayar: 1986000 },
  { id: 'v-mei-007', dailyEntryId: 'smd-2026-05-10', tanggal: '2026-05-22', kantorDesa: 'Kantor Desa Abang Songan', platNomor: 'DK 8763 PA', isBangli: true, namaPemilik: 'Wajib Pajak Abang Songan', jenisKendaraan: 'R4', merkModel: 'Toyota Fortuner', nominalPkb: 2880000, nominalSwdkllj: 432000, nominalAdmin: 288000, totalBayar: 3600000 },

  // ==========================================
  // JUNI 2026
  // ==========================================
  { id: 'v-jun-001', dailyEntryId: 'smd-2026-06-02', tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1708 PY', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R4', merkModel: 'Kendaraan R4 Heavy', nominalPkb: 20000000, nominalSwdkllj: 3000000, nominalAdmin: 2000000, totalBayar: 25000000 },
  { id: 'v-jun-002', dailyEntryId: 'smd-2026-06-02', tanggal: '2026-06-23', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 4654 ACT', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R4', merkModel: 'Toyota Avanza', nominalPkb: 960000, nominalSwdkllj: 144000, nominalAdmin: 96000, totalBayar: 1200000 },
  { id: 'v-jun-003', dailyEntryId: 'smd-2026-06-07', tanggal: '2026-06-24', kantorDesa: 'Kantor Desa Bayung Gede', platNomor: 'DK 1783 SE', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R4', merkModel: 'Mitsubishi Fuso Truck', nominalPkb: 7120000, nominalSwdkllj: 1068000, nominalAdmin: 712000, totalBayar: 8900000 },
  { id: 'v-jun-004', dailyEntryId: 'smd-2026-06-09', tanggal: '2026-06-25', kantorDesa: 'Kantor Desa Buahan', platNomor: 'DK 1305 ACK', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R4', merkModel: 'Honda CR-V', nominalPkb: 2760000, nominalSwdkllj: 414000, nominalAdmin: 276000, totalBayar: 3450000 },

  // ==========================================
  // JULI 2026
  // ==========================================
  { id: 'v-jul-001', dailyEntryId: 'smd-2026-07-01', tanggal: '2026-07-14', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 8965 PP', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R4', merkModel: 'Kendaraan R4', nominalPkb: 4000000, nominalSwdkllj: 600000, nominalAdmin: 400000, totalBayar: 5000000 },
  { id: 'v-jul-002', dailyEntryId: 'smd-2026-07-01', tanggal: '2026-07-14', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1638 DL', isBangli: false, namaPemilik: 'Wajib Pajak Luar', jenisKendaraan: 'R4', merkModel: 'Kendaraan R4', nominalPkb: 2560000, nominalSwdkllj: 384000, nominalAdmin: 256000, totalBayar: 3200000 },
  { id: 'v-jul-003', dailyEntryId: 'smd-2026-07-01', tanggal: '2026-07-14', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1495 PB', isBangli: true, namaPemilik: 'Wajib Pajak Sekardadi', jenisKendaraan: 'R4', merkModel: 'Toyota Rush', nominalPkb: 1600000, nominalSwdkllj: 240000, nominalAdmin: 160000, totalBayar: 2000000 },
  { id: 'v-jul-004', dailyEntryId: 'smd-2026-07-01', tanggal: '2026-07-14', kantorDesa: 'Kantor Desa Sekardadi', platNomor: 'DK 1504 QA', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R4', merkModel: 'Suzuki Ertiga', nominalPkb: 2240000, nominalSwdkllj: 336000, nominalAdmin: 224000, totalBayar: 2800000 },
  { id: 'v-jul-005', dailyEntryId: 'smd-2026-07-03', tanggal: '2026-07-15', kantorDesa: 'Kantor Desa Kedisan', platNomor: 'DK 544 RI', isBangli: true, namaPemilik: 'Wajib Pajak Kedisan', jenisKendaraan: 'R4', merkModel: 'Toyota Hilux', nominalPkb: 2897600, nominalSwdkllj: 434640, nominalAdmin: 289760, totalBayar: 3622000 },
  { id: 'v-jul-006', dailyEntryId: 'smd-2026-07-06', tanggal: '2026-07-16', kantorDesa: 'Kantor Desa Mangguh', platNomor: 'DK 1897 FJ', isBangli: false, namaPemilik: 'Wajib Pajak Badung', jenisKendaraan: 'R4', merkModel: 'Mitsubishi L300', nominalPkb: 2451200, nominalSwdkllj: 367680, nominalAdmin: 245120, totalBayar: 3064000 },
  { id: 'v-jul-007', dailyEntryId: 'smd-2026-07-12', tanggal: '2026-07-21', kantorDesa: 'Kantor Desa Manikliyu', platNomor: 'DK 8344 PB', isBangli: true, namaPemilik: 'Wajib Pajak Manikliyu', jenisKendaraan: 'R4', merkModel: 'Daihatsu GranMax', nominalPkb: 2400000, nominalSwdkllj: 360000, nominalAdmin: 240000, totalBayar: 3000000 },
  { id: 'v-jul-008', dailyEntryId: 'smd-2026-07-12', tanggal: '2026-07-21', kantorDesa: 'Kantor Desa Manikliyu', platNomor: 'DK 8190 BJ', isBangli: false, namaPemilik: 'Wajib Pajak Gianyar', jenisKendaraan: 'R4', merkModel: 'Toyota Avanza', nominalPkb: 2280000, nominalSwdkllj: 342000, nominalAdmin: 228000, totalBayar: 2850000 },
  { id: 'v-jul-009', dailyEntryId: 'smd-2026-07-14', tanggal: '2026-07-29', kantorDesa: 'Kantor Desa Katung', platNomor: 'DK 1243 SF', isBangli: false, namaPemilik: 'Wajib Pajak Denpasar', jenisKendaraan: 'R4', merkModel: 'Toyota Fortuner', nominalPkb: 4400000, nominalSwdkllj: 660000, nominalAdmin: 440000, totalBayar: 5500000 }
];

export const LIST_KANTOR_DESA = [
  'Kantor Desa Abuan Susut',
  'Kantor Desa Belancan',
  'Kantor Desa Pinggan',
  'Kantor Desa Mangguh',
  'Kantor Desa Bayung',
  'Kantor Desa Bayung Gede',
  'Kantor Desa Pengotan',
  'Kantor Desa Apuan',
  'Kantor Desa Dausa',
  'Kantor Desa Suter',
  'Kantor Desa Tiga Susut',
  'Kantor Desa Kedisan',
  'Kantor Desa Bunutin',
  'Kantor Desa Sekardadi',
  'Kantor Desa Sekaan',
  'Kantor Desa Selat Peken',
  'Kantor Desa Mengani',
  'Kantor Desa Abang Songan',
  'Kantor Desa Banua',
  'Kantor Desa Penglumbaran',
  'Kantor Desa Peninjoan',
  'Kantor Desa Batur Selatan',
  'Kantor Desa Batur Tengah',
  'Kantor Desa Kintamani',
  'Kantor Desa Songan A',
  'Kantor Desa Songan B',
  'Kantor Desa Landih',
  'Kantor Desa Sukawana',
  'Kantor Desa Langgahan',
  'Kantor Desa Katung',
  'Kantor Desa Daup',
  'Kantor Desa Serai',
  'Kantor Desa Catur',
  'Kantor Desa Lembean',
  'Kantor Desa Manikliyu',
  'Kantor Desa Buahan'
];
