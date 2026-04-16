import { FaTelegram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-base-content mb-4">Давайте создадим что-то удивительное вместе</p>
        <div className="flex justify-center space-x-6">
          <a href="mailto:hello@alexmorgan.design" className="text-base-content hover:text-orange-500 transition-colors">
            <FaEnvelope className="h-6 w-6" />
          </a>
          <a href="https://t.me/alexmorgan" className="text-base-content hover:text-orange-500 transition-colors">
            <FaTelegram className="h-6 w-6" />
          </a>
        </div>
        <p className="text-base-content/60 text-sm mt-6">© {new Date().getFullYear()} Шведов Дмитрий. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;