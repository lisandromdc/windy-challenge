import { Facebook, Instagram, Twitter } from 'lucide-react'
// i18n
import { defineI18n } from '~/i18n/i18n';
// components
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
// lib
import { wipMessage } from '~/lib/utils'

const Footer = () => {
  const i18n = defineI18n('footer');
  const i18nGlobal = defineI18n('global');
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contact Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">{i18n('titleContactUs')}</h3>
            <p>{i18n('address')}</p>
            <p>{i18n('cityAndState')}</p>
            <p>{i18n('phone')}</p>
            <p>{i18n('email')}</p>
          </div>

          {/* Newsletter Signup */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">{i18n('titleNewsletter')}</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder={i18n('newsletterPlaceholder')} className="bg-gray-700 text-white" />
              <Button type="submit" variant="secondary" onClick={wipMessage}>
                {i18n('subscribe')}
              </Button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-right">{i18n('titleFollowUs')}</h3>
            <div className="flex space-x-8 justify-end">
              <a href="#" className="hover:text-gray-300" onClick={wipMessage}>
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-300" onClick={wipMessage}>
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300" onClick={wipMessage}>
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} {i18nGlobal('appName')}. {i18n('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

