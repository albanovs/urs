import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await api.post('/api/login', {
        email,
        password,
      });

      localStorage.setItem('token', email);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Ошибка входа. Попробуйте еще раз.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50 p-3">
      <div className="w-full max-w-md bg-white border rounded-xl p-3 lg:p-8 relative">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.105 0 2-.895 2-2 0-1.104-.895-2-2-2s-2 .896-2 2c0 1.105.895 2 2 2zm-7 7v-1.076a2.993 2.993 0 011.332-2.456C7.702 13.323 9.777 13 12 13c2.223 0 4.298.323 5.668 1.468A2.993 2.993 0 0119 16.924V18"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Войти
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Введите свои данные для входа.
        </p>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Электронная почта
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите вашу почту"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите пароль"
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
