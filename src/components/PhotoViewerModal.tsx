import React, { useState, useEffect } from 'react';
import { SamsatDailyEntry } from '../types';
import { formatDateIndonesian } from '../utils/formatters';
import {
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Building2,
  Calendar,
  User,
  FileText,
  ImagePlus,
} from 'lucide-react';

interface PhotoViewerModalProps {
  entry: SamsatDailyEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onEditPhotos?: (entry: SamsatDailyEntry) => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  entry,
  isOpen,
  onClose,
  onEditPhotos,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const photos = entry?.fotoKegiatan || [];

  useEffect(() => {
    setActiveIndex(0);
  }, [entry?.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && photos.length > 1) {
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight' && photos.length > 1) {
        setActiveIndex((prev) => (prev + 1) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length, onClose]);

  if (!isOpen || !entry) return null;

  const currentPhoto = photos[activeIndex] || null;

  const handleDownloadPhoto = () => {
    if (!currentPhoto) return;
    const link = document.createElement('a');
    link.href = currentPhoto;
    const safeDesa = entry.kantorDesa.replace(/[^a-zA-Z0-9]+/g, '_');
    link.download = `Foto_Kegiatan_${safeDesa}_${entry.tanggal}_${activeIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="space-y-1">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-400" />
              <span>Dokumentasi Foto Kegiatan</span>
              {photos.length > 0 && (
                <span className="text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                  {photos.length} Foto
                </span>
              )}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-medium text-white">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                {entry.kantorDesa}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {formatDateIndonesian(entry.tanggal)}
              </span>
              {entry.petugas && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  {entry.petugas}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          {photos.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Camera className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Belum Ada Foto Kegiatan
                </p>
                <p className="text-xs text-slate-500 max-w-sm">
                  Dokumentasi foto kegiatan untuk pelayanan di {entry.kantorDesa} pada{' '}
                  {formatDateIndonesian(entry.tanggal)} belum diunggah.
                </p>
              </div>
              {onEditPhotos && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEditPhotos(entry);
                  }}
                  className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <ImagePlus className="w-4 h-4" />
                  <span>Tambah Foto Kegiatan Sekarang</span>
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Main Image Frame */}
              <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[280px] max-h-[55vh]">
                <img
                  src={currentPhoto || ''}
                  alt={`Kegiatan ${entry.kantorDesa} - Foto ${activeIndex + 1}`}
                  className="max-w-full max-h-[55vh] object-contain select-none"
                />

                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/15 transition-colors cursor-pointer shadow-lg"
                      title="Foto Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((prev) => (prev + 1) % photos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/15 transition-colors cursor-pointer shadow-lg"
                      title="Foto Berikutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 left-3 bg-slate-900/85 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/10">
                  Foto {activeIndex + 1} dari {photos.length}
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPhoto}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/15 transition-colors cursor-pointer"
                  title="Unduh Foto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Foto</span>
                </button>
              </div>

              {/* Thumbnail Strip when multiple photos */}
              {photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {photos.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === activeIndex
                          ? 'border-amber-500 ring-2 ring-amber-500/30'
                          : 'border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Activity Note */}
              {entry.catatan && (
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-700">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Catatan Kegiatan:</span>
                    <span>{entry.catatan}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
          {photos.length > 0 && onEditPhotos ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEditPhotos(entry);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              <span>Kelola / Tambah Foto</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
