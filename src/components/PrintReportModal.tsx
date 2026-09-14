import React from 'react';
import { SamsatDailyEntry } from '../types';
import { formatRupiah, formatNumber, getMonthName } from '../utils/formatters';
import { X, Printer } from 'lucide-react';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: SamsatDailyEntry[];
  selectedMonth: string;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  entries,
  selectedMonth
}) => {
  if (!isOpen) return null;

  // Filter entries
  const filtered = selectedMonth 
    ? entries.filter((e) => e.tanggal.startsWith(selectedMonth))
    : entries;

  // Calculate totals
  const totals = filtered.reduce(
    (acc, curr) => {
      const bUnit = curr.realisasiBangliNopol;
      const bRp = curr.realisasiBangliRp;
      const lUnit = curr.realisasiLuarNopol;
      const lRp = curr.realisasiLuarRp;

      return {
        bangliNopol: acc.bangliNopol + bUnit,
        bangliRp: acc.bangliRp + bRp,
        luarNopol: acc.luarNopol + lUnit,
        luarRp: acc.luarRp + lRp,
        jmlBangliUnit: acc.jmlBangliUnit + bUnit,
        jmlBangliRp: acc.jmlBangliRp + bRp,
        jmlLuarUnit: acc.jmlLuarUnit + lUnit,
        jmlLuarRp: acc.jmlLuarRp + lRp,
        totalUnit: acc.totalUnit + (bUnit + lUnit),
        totalRp: acc.totalRp + (bRp + lRp),
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

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Direct print failed, attempting popup print:', e);
      handlePrintPopup();
    }
  };

  const handlePrintPopup = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Gagal membuka jendela cetak. Izinkan popup di browser Anda.');
      return;
    }
    const tableElement = document.getElementById('printable-report-content');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Laporan Realisasi SAMSAT DESA UPTD Pelayanan Pajak Daerah Kab. Gianyar</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #000; }
            h3 { text-align: center; margin-bottom: 4px; text-transform: uppercase; text-decoration: underline; font-size: 16px; }
            p.sub { text-align: center; margin-top: 2px; font-size: 12px; color: #333; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th, td { border: 1px solid #000; padding: 5px; }
            th { background-color: #e2e8f0; text-align: center; font-weight: bold; }
            td.text-center { text-align: center; }
            td.text-right { text-align: right; }
            .font-bold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${tableElement ? tableElement.innerHTML : ''}
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-5xl my-6 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:my-0 print:rounded-none">
        
        {/* Modal Controls Bar (Hidden during window.print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold">Pratinjau Cetak Laporan Realisasi</h3>
              <p className="text-[11px] text-slate-400">Siap cetak atau simpan sebagai file PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang</span>
            </button>
            <button
              onClick={handlePrintPopup}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              title="Buka jendela baru untuk mencetak"
            >
              <span>Jendela Cetak Baru</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div 
          id="printable-report-content" 
          className="p-6 sm:p-8 overflow-y-auto bg-white text-slate-900 space-y-4 print:p-0 print:overflow-visible printable-area"
        >
          
          {/* DOCUMENT TITLE & METADATA (NO KOP SURAT AS REQUESTED) */}
          <div className="text-center space-y-1 mb-4">
            <h3 className="text-base sm:text-lg font-black uppercase underline decoration-2 underline-offset-4">
              LAPORAN REALISASI PENERIMAAN PAJAK SAMSAT DESA
            </h3>
            <p className="text-xs font-sans font-bold text-slate-800">
              UPTD PELAYANAN PAJAK DAERAH KAB. GIANYAR
            </p>
            <p className="text-xs font-sans font-semibold text-slate-700">
              {selectedMonth ? `PERIODE: BULAN ${getMonthName(selectedMonth).toUpperCase()}` : 'PERIODE: REKAPITULASI KESELURUHAN'}
            </p>
            <p className="text-[11px] font-sans text-slate-500">
              Kabupaten Gianyar, Provinsi Bali
            </p>
          </div>

          {/* TABLE STRUCTURE */}
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full text-[11px] border-collapse border border-slate-900 text-slate-900 font-sans">
              <thead>
                <tr className="bg-slate-200 text-slate-900 font-bold text-center border-b border-slate-900 uppercase">
                  <th rowSpan={2} className="border border-slate-900 p-1.5 w-8">NO</th>
                  <th rowSpan={2} className="border border-slate-900 p-1.5 whitespace-nowrap">TANGGAL</th>
                  <th rowSpan={2} className="border border-slate-900 p-1.5 text-left min-w-[150px]">KANTOR DESA</th>
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-300">REALISASI NOPOL BANGLI</th>
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-300">REALISASI NOPOL LUAR BANGLI</th>
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-200">JML BANGLI</th>
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-200">JML LUAR BANGLI</th>
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-300">TOTAL</th>
                </tr>
                <tr className="bg-slate-100 text-center font-semibold border-b border-slate-900">
                  <th className="border border-slate-900 p-1">Nopol</th>
                  <th className="border border-slate-900 p-1">Rp</th>
                  <th className="border border-slate-900 p-1">Nopol</th>
                  <th className="border border-slate-900 p-1">Rp</th>
                  <th className="border border-slate-900 p-1">Unit</th>
                  <th className="border border-slate-900 p-1">Rp</th>
                  <th className="border border-slate-900 p-1">Unit</th>
                  <th className="border border-slate-900 p-1">Rp</th>
                  <th className="border border-slate-900 p-1">Unit</th>
                  <th className="border border-slate-900 p-1">Rp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="p-4 text-center text-slate-500 font-semibold">
                      Tidak ada data realisasi.
                    </td>
                  </tr>
                ) : (
                  filtered.map((entry, idx) => {
                    const bUnit = entry.realisasiBangliNopol;
                    const bRp = entry.realisasiBangliRp;
                    const lUnit = entry.realisasiLuarNopol;
                    const lRp = entry.realisasiLuarRp;
                    const totUnit = bUnit + lUnit;
                    const totRp = bRp + lRp;

                    return (
                      <tr key={entry.id} className="border-b border-slate-400">
                        <td className="border border-slate-900 p-1.5 text-center font-bold">{idx + 1}</td>
                        <td className="border border-slate-900 p-1.5 text-center whitespace-nowrap">{entry.tanggal}</td>
                        <td className="border border-slate-900 p-1.5 font-semibold">{entry.kantorDesa}</td>
                        <td className="border border-slate-900 p-1.5 text-center">{formatNumber(bUnit)}</td>
                        <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(bRp)}</td>
                        <td className="border border-slate-900 p-1.5 text-center">{formatNumber(lUnit)}</td>
                        <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(lRp)}</td>
                        <td className="border border-slate-900 p-1.5 text-center">{formatNumber(bUnit)}</td>
                        <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(bRp)}</td>
                        <td className="border border-slate-900 p-1.5 text-center">{formatNumber(lUnit)}</td>
                        <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(lRp)}</td>
                        <td className="border border-slate-900 p-1.5 text-center font-bold">{formatNumber(totUnit)}</td>
                        <td className="border border-slate-900 p-1.5 text-right font-bold">{formatRupiah(totRp)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-200 text-slate-900 font-extrabold border-t-2 border-slate-900">
                  <td colSpan={3} className="border border-slate-900 p-2 text-center uppercase">JUMLAH KESELURUHAN</td>
                  <td className="border border-slate-900 p-1.5 text-center">{formatNumber(totals.bangliNopol)}</td>
                  <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(totals.bangliRp)}</td>
                  <td className="border border-slate-900 p-1.5 text-center">{formatNumber(totals.luarNopol)}</td>
                  <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(totals.luarRp)}</td>
                  <td className="border border-slate-900 p-1.5 text-center">{formatNumber(totals.jmlBangliUnit)}</td>
                  <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(totals.jmlBangliRp)}</td>
                  <td className="border border-slate-900 p-1.5 text-center">{formatNumber(totals.jmlLuarUnit)}</td>
                  <td className="border border-slate-900 p-1.5 text-right">{formatRupiah(totals.jmlLuarRp)}</td>
                  <td className="border border-slate-900 p-1.5 text-center">{formatNumber(totals.totalUnit)}</td>
                  <td className="border border-slate-900 p-1.5 text-right text-xs">{formatRupiah(totals.totalRp)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* SIGNATURE BLOCK REMOVED AS REQUESTED */}

        </div>

      </div>
    </div>
  );
};

