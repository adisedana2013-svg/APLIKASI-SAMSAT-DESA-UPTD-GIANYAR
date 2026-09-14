import React, { useState } from 'react';
import { Building2, ShieldCheck, Lock, User, LogIn, Eye, EyeOff, KeyRound, MapPin } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }

    // Accept flexible valid admin logins for smooth experience
    if (
      (username.toLowerCase() === 'admin' || username.toLowerCase() === 'operator' || username.toLowerCase() === 'samsat') &&
      (password === 'admin' || password === 'samsat2026' || password === '123456')
    ) {
      onLogin(username);
    } else {
      setError('Username atau password tidak sesuai. Gunakan admin / admin atau samsat2026.');
    }
  };

  const handleQuickDemoLogin = () => {
    onLogin('Petugas Admin Samsat');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="mb-6 text-center max-w-md w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Sistem Informasi Terpadu Pemprov Bali</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-950/50 ring-2 ring-amber-400/40">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              SAMSAT DESA
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" /> UPTD Pelayanan Pajak Daerah Kab. Gianyar
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative z-10 backdrop-blur-md">
        <div className="mb-6 pb-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <span>Masuk ke Dashboard Official</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Silakan masukkan kredensial petugas operator untuk mengakses sistem.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-semibold flex items-start gap-2">
            <span className="shrink-0 text-rose-400">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username Operator
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username (contoh: admin)"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Kata Sandi / Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Dashboard System</span>
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2.5">
            Petugas atau Tamu? Gunakan Akses Cepat Demo:
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Masuk Langsung (Tanpa Ketik Pass)</span>
          </button>

          <div className="mt-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 text-left space-y-1">
            <p className="font-bold text-slate-300">🔑 Informas Kredensial Default:</p>
            <p className="font-mono text-amber-400">Username: admin &nbsp;|&nbsp; Pass: admin / samsat2026</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-slate-500 text-xs">
        <p>&copy; 2026 Badan Pendapatan Daerah Provinsi Bali &bull; Kab. Bangli</p>
        <p className="text-[10px] text-slate-600 mt-0.5">Sistem Terverifikasi &amp; Aman</p>
      </footer>
    </div>
  );
};
