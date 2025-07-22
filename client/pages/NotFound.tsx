import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md px-4">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist. Let's get you back on track with your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="flex-1 sm:flex-none">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Upload Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
