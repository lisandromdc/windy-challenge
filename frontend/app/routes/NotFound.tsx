import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';
// i18n
import { defineI18n } from '~/i18n/i18n'

export default function NotFound() {
  const i18n = defineI18n('notFound');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">
          404
        </h1>
        <h2 className="text-4xl font-bold text-white mb-8">
          {i18n('pageNotFound')}
        </h2>
        <p className="text-xl text-white mb-8">
          {i18n('description')}
        </p>
        <NavLink
          to="/menu"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-50 transition duration-300 ease-in-out"
        >
          <Home className="mr-2 h-5 w-5" />
          {i18n('goBackHome')}
        </NavLink>
      </div>
    </div>
  )
}

