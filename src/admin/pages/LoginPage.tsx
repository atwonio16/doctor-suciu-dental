import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

// Logo component
const ClinicLogo = () => (
  <div className="flex flex-col items-center justify-center leading-tight text-center">
    <span className="font-bold text-lg tracking-tight whitespace-nowrap" style={{ color: '#0F172A' }}>DOCTOR SUCIU</span>
    <span className="text-[9px] tracking-[0.2em] font-medium mt-0.5" style={{ color: '#64748B' }}>DENTAL CLINIC</span>
  </div>
);

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLockoutTime(0);
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Completează toate câmpurile');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/admin', { replace: true });
      } else {
        setError('Username sau parolă incorecte');
      }
    } catch (err: any) {
      if (err.message && err.message.includes('minute')) {
        // Extract remaining time from error message
        const match = err.message.match(/(\d+)/);
        if (match) setLockoutTime(parseInt(match[1]));
      }
      setError(err.message || 'A apărut o eroare. Încearcă din nou.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] p-8 text-center">
            <div className="mb-5">
              <ClinicLogo />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Panou de Administrare</h1>
            <p className="text-gray-500 text-sm">Acces securizat - Autorizați necesari</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Autentificare</h2>
            <p className="text-sm text-gray-500 mb-6">Introdu datele de acces</p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-sm text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{error}</p>
                  {lockoutTime > 0 && (
                    <p className="text-xs mt-1 text-red-500">
                      Încearcă din nou în {lockoutTime} minute pentru siguranța contului.
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all outline-none"
                    placeholder="Introdu username-ul"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Parolă
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#1e3a5f] text-white font-semibold rounded-xl hover:bg-[#1e3a5f]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Se autentifică...
                  </>
                ) : (
                  'Intră în panou'
                )}
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-800 font-medium">
                    Acces restricționat
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Acest panou este protejat. După 5 încercări eșuate, contul va fi blocat temporar pentru securitate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-[#1e3a5f] transition-colors"
          >
            ← Înapoi la site
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
