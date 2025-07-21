import logo from '../../../assets/logo/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-t border-blue-200 py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">

                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-auto"
                    />
                    <span className="text-xl font-semibold text-blue-700">Online Courses</span>
                </div>

                <p className="text-sm text-blue-600">
                    © 2025 Online Course. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <i className="fab fa-youtube text-lg"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
