
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-netflix-red mb-4">404</h1>
        <p className="text-xl text-netflix-white mb-8">Oops! The page you're looking for doesn't exist</p>
        <div className="max-w-md text-center mb-12">
          <p className="text-netflix-white/70">
            The page you're trying to access might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-netflix-red hover:bg-netflix-dark-red text-white"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
