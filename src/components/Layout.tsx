import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, FileText, Home, ClipboardList, Menu, X } from 'lucide-react';
import { useState } from 'react';
import FarmSelector from './FarmSelector';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Farms', href: '/farms', icon: Building2 },
    { name: 'Visits', href: '/visits', icon: ClipboardList },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#ff624d] shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Building2 className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">LiveStock Pro</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive(item.href)
                          ? 'border-white text-white'
                          : 'border-transparent text-white/80 hover:border-white/50 hover:text-white'
                      } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <FarmSelector />
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#ff7a69] hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-[#ff7a69] text-white'
                        : 'text-white/80 hover:bg-[#ff7a69] hover:text-white'
                    } block px-3 py-2 text-base font-medium`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
              <div className="px-3 py-2">
                <FarmSelector />
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;