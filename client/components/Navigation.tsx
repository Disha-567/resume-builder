import { Sparkles, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 group">
            <Sparkles className="h-8 w-8 text-primary animate-pulse group-hover:animate-rotate-hue transition-all duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:bg-size-200 transition-all duration-300">ResumeAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-all duration-300 hover:scale-105 relative group ${
                isActive('/')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Home
              {isActive('/') && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>}
            </Link>
            <Link
              to="/analysis"
              className={`transition-all duration-300 hover:scale-105 relative group ${
                isActive('/analysis')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Analysis
              {isActive('/analysis') && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>}
            </Link>
            <Link
              to="/interview"
              className={`transition-all duration-300 hover:scale-105 relative group ${
                isActive('/interview')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Interview Prep
              {isActive('/interview') && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>}
            </Link>
            <Link
              to="/cover-letter"
              className={`transition-all duration-300 hover:scale-105 relative group ${
                isActive('/cover-letter')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Cover Letter
              {isActive('/cover-letter') && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>}
            </Link>
            <Link
              to="/dashboard"
              className={`transition-all duration-300 hover:scale-105 relative group ${
                isActive('/dashboard')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Dashboard
              {isActive('/dashboard') && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>}
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 p-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/analysis"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/analysis')
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Analysis
              </Link>
              <Link
                to="/interview"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/interview')
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Interview Prep
              </Link>
              <Link
                to="/cover-letter"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/cover-letter')
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Cover Letter
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
