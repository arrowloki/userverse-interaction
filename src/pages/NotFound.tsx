
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 text-center animate-fade-in">
        <div className="mb-8 inline-flex p-6 bg-muted rounded-full">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-xl mb-8">Oops! Page not found</p>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild size="lg" className="animate-float">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
