import React from 'react';
import { AlertTriangle, LogOut, Trash2, RotateCcw, Upload, CheckCircle2, X } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success';
  iconType?: 'logout' | 'delete' | 'reset' | 'restore' | 'info';
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  variant = 'warning',
  iconType = 'info',
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  const renderIcon = () => {
    switch (iconType) {
      case 'logout':
        return <LogOut className="w-6 h-6 text-amber-400" />;
      case 'delete':
        return <Trash2 className="w-6 h-6 text-rose-400" />;
      case 'reset':
        return <RotateCcw className="w-6 h-6 text-rose-400" />;
      case 'restore':
        return <Upload className="w-6 h-6 text-indigo-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
    }
  };

  const getConfirmBtnColor = () => {
    switch (variant) {
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/40';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-amber-950/40';
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-950/40';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-950/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative overflow-hidden animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 shrink-0">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-base font-bold text-white pr-6">{title}</h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed whitespace-pre-line">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${getConfirmBtnColor()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
