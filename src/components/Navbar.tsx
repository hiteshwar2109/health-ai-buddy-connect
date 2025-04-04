
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Heart, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavItem = ({ to, label, icon, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-2 px-4",
        isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Button>
  </Link>
);

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-healthcare-500" />
          <span className="text-xl font-bold text-healthcare-800">HealthBuddy</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem
            to="/"
            label="Home"
            icon={<Home size={18} />}
            isActive={isActive("/")}
          />
          <NavItem
            to="/dashboard"
            label="Dashboard"
            icon={<Heart size={18} />}
            isActive={isActive("/dashboard")}
          />
          <NavItem
            to="/profile"
            label="Profile"
            icon={<User size={18} />}
            isActive={isActive("/profile")}
          />
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emergency-500" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            asChild
          >
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
