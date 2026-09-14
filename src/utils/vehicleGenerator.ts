import { SamsatDailyEntry, VehicleTransaction } from '../types';

// Deterministic seed helper so generated values remain stable across renders
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const BALINESE_NAMES = [
  'I Wayan Sutrisna', 'I Made Wiramajaya', 'I Nyoman Astawa', 'I Ketut Suardana',
  'Ni Wayan Adnyana', 'Ni Made Subawa', 'Ni Nyoman Gunawan', 'Ni Ketut Wibawa',
  'I Putu Setiawan', 'I Gede Sukarta', 'I Kadek Kusuma', 'I Komang Sudiarta',
  'Ni Putu Budiasa', 'Ni Kadek Artawan', 'Ni Luh Permana', 'Sang Nyoman Wijaya',
  'Desak Made Santosa', 'I Dewa Gede Suarna', 'I Wayan Arikawa', 'I Made Sudira',
  'I Nyoman Surya', 'I Ketut Yasa', 'Ni Wayan Raka', 'Ni Made Sugiarta',
  'I Wayan Mudiarta', 'I Gede Budiarsa', 'I Made Sujana', 'I Nyoman Suwitra',
  'Ni Ketut Sumarni', 'Ni Wayan Rai', 'I Putu Swastika', 'I Kadek Gunarta',
  'I Wayan Sudarma', 'I Made Pasek', 'I Nyoman Widiada', 'I Ketut Wardana'
];

const BANGLI_SUFFIXES = [
  'PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH', 'PJ', 'PK', 'PL', 'PM',
  'PN', 'PO', 'PP', 'PQ', 'PR', 'PS', 'PT', 'PU', 'PV', 'PW', 'PX', 'PY', 'PZ',
  'RB', 'RD', 'RF'
];

const LUAR_SUFFIXES = [
  'BTL', 'AP', 'ABN', 'KAR', 'CQ', 'ACJ', 'UV', 'KU', 'FDC', 'LK', 'LW', 'QU',
  'ABL', 'FO', 'BE', 'LN', 'CP', 'IU', 'HW', 'EW', 'ACT', 'OL', 'SE', 'ACK',
  'DL', 'QA', 'RI', 'FJ', 'BJ', 'SF', 'GA', 'UQ', 'DR'
];

const MOTOR_MODELS = [
  'Honda Vario 125', 'Honda Beat', 'Honda Scoopy', 'Yamaha NMAX',
  'Yamaha Aerox', 'Honda Revo', 'Honda PCX', 'Honda Supra X 125',
  'Yamaha Mio', 'Yamaha Fazzio', 'Honda Genio', 'Yamaha Lexi', 'Honda Supra Fit'
];

const CAR_MODELS = [
  'Toyota Avanza', 'Suzuki Carry PickUp', 'Toyota Calya', 'Toyota Rush',
  'Mitsubishi Xpander', 'Daihatsu GranMax', 'Toyota Innova', 'Honda HR-V',
  'Toyota Fortuner', 'Mitsubishi Pajero', 'Daihatsu Xenia', 'Suzuki APV'
];

/**
 * Ensures that every daily entry has a complete set of vehicle transactions
 * matching its realisasiBangliNopol and realisasiLuarNopol counts and amounts.
 */
export function ensureCompleteVehicleTransactions(
  entries: SamsatDailyEntry[],
  existingVehicles: VehicleTransaction[]
): VehicleTransaction[] {
  const result: VehicleTransaction[] = [...existingVehicles];

  entries.forEach((entry, entryIndex) => {
    // Find existing vehicles for this entry
    const entryVehicles = result.filter(
      (v) => v.dailyEntryId === entry.id || (v.tanggal === entry.tanggal && v.kantorDesa === entry.kantorDesa)
    );

    const bangliVehicles = entryVehicles.filter((v) => v.isBangli);
    const luarVehicles = entryVehicles.filter((v) => !v.isBangli);

    const targetBangliCount = Math.max(0, entry.realisasiBangliNopol || 0);
    const targetBangliRp = Math.max(0, entry.realisasiBangliRp || 0);

    const targetLuarCount = Math.max(0, entry.realisasiLuarNopol || 0);
    const targetLuarRp = Math.max(0, entry.realisasiLuarRp || 0);

    // --- Process Bangli Vehicles ---
    if (bangliVehicles.length < targetBangliCount && targetBangliCount > 0) {
      const missingCount = targetBangliCount - bangliVehicles.length;
      const currentBangliRpSum = bangliVehicles.reduce((sum, v) => sum + v.totalBayar, 0);
      const remainingRp = Math.max(0, targetBangliRp - currentBangliRpSum);

      const amounts = splitAmount(remainingRp, missingCount, (entryIndex + 1) * 101);

      for (let i = 0; i < missingCount; i++) {
        const seed = (entryIndex + 1) * 2000 + bangliVehicles.length + i + 7;
        const total = amounts[i];
        const pkb = Math.round(total * 0.8);
        const swd = Math.round(total * 0.12);
        const adm = Math.max(0, total - pkb - swd);

        const isCar = total >= 1200000;
        const modelList = isCar ? CAR_MODELS : MOTOR_MODELS;
        const model = modelList[Math.floor(pseudoRandom(seed * 3.1) * modelList.length)];
        const suffix = BANGLI_SUFFIXES[Math.floor(pseudoRandom(seed * 5.7) * BANGLI_SUFFIXES.length)];
        const num = Math.floor(1000 + pseudoRandom(seed * 7.9) * 8999);
        const name = BALINESE_NAMES[Math.floor(pseudoRandom(seed * 11.3) * BALINESE_NAMES.length)];

        const newV: VehicleTransaction = {
          id: `v-auto-${entry.id}-b-${i + 1}`,
          dailyEntryId: entry.id,
          tanggal: entry.tanggal,
          kantorDesa: entry.kantorDesa,
          platNomor: `DK ${num} ${suffix}`,
          isBangli: true,
          namaPemilik: name,
          jenisKendaraan: isCar ? 'R4' : 'R2',
          merkModel: model,
          nominalPkb: pkb,
          nominalSwdkllj: swd,
          nominalAdmin: adm,
          totalBayar: total
        };
        result.push(newV);
      }
    }

    // --- Process Luar Bangli Vehicles ---
    if (luarVehicles.length < targetLuarCount && targetLuarCount > 0) {
      const missingCount = targetLuarCount - luarVehicles.length;
      const currentLuarRpSum = luarVehicles.reduce((sum, v) => sum + v.totalBayar, 0);
      const remainingRp = Math.max(0, targetLuarRp - currentLuarRpSum);

      const amounts = splitAmount(remainingRp, missingCount, (entryIndex + 1) * 303);

      for (let i = 0; i < missingCount; i++) {
        const seed = (entryIndex + 1) * 3000 + 500 + luarVehicles.length + i + 13;
        const total = amounts[i];
        const pkb = Math.round(total * 0.8);
        const swd = Math.round(total * 0.12);
        const adm = Math.max(0, total - pkb - swd);

        const isCar = total >= 1200000;
        const modelList = isCar ? CAR_MODELS : MOTOR_MODELS;
        const model = modelList[Math.floor(pseudoRandom(seed * 3.3) * modelList.length)];
        const suffix = LUAR_SUFFIXES[Math.floor(pseudoRandom(seed * 5.9) * LUAR_SUFFIXES.length)];
        const num = Math.floor(1000 + pseudoRandom(seed * 8.1) * 8999);
        const name = BALINESE_NAMES[Math.floor(pseudoRandom(seed * 11.7) * BALINESE_NAMES.length)];

        const newV: VehicleTransaction = {
          id: `v-auto-${entry.id}-l-${i + 1}`,
          dailyEntryId: entry.id,
          tanggal: entry.tanggal,
          kantorDesa: entry.kantorDesa,
          platNomor: `DK ${num} ${suffix}`,
          isBangli: false,
          namaPemilik: name,
          jenisKendaraan: isCar ? 'R4' : 'R2',
          merkModel: model,
          nominalPkb: pkb,
          nominalSwdkllj: swd,
          nominalAdmin: adm,
          totalBayar: total
        };
        result.push(newV);
      }
    }
  });

  return result;
}

/**
 * Utility to split total amount into n realistic rounded portions
 */
function splitAmount(totalAmount: number, count: number, seed: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [totalAmount];

  if (totalAmount <= 0) {
    return Array(count).fill(0);
  }

  // Generate random weights
  const weights: number[] = [];
  let weightSum = 0;
  for (let i = 0; i < count; i++) {
    const w = 0.6 + pseudoRandom(seed + i * 4.3) * 0.8;
    weights.push(w);
    weightSum += w;
  }

  const result: number[] = [];
  let currentSum = 0;
  for (let i = 0; i < count - 1; i++) {
    let portion = Math.round((totalAmount * (weights[i] / weightSum)) / 1000) * 1000;
    if (portion <= 0) portion = 1000;
    result.push(portion);
    currentSum += portion;
  }

  const remainder = totalAmount - currentSum;
  result.push(remainder >= 0 ? remainder : 0);

  return result;
}
