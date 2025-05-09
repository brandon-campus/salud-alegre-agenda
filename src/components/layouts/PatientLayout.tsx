
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  X,
  Bell,
} from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

interface PatientLayoutProps {
  children: ReactNode;
}

export const PatientLayout = ({ children }: PatientLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: "Inicio", href: "/patient/dashboard", icon: Home },
    { name: "Mis citas", href: "/patient/appointments", icon: Calendar },
    { name: "Mi perfil", href: "/patient/profile", icon: User },
    { name: "Configuración", href: "/patient/settings", icon: Settings },
  ];

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente. ¡Hasta pronto!"
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar para escritorio */}
      <div className="hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col min-h-0 px-3">
          <div className="flex items-center h-16 px-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-medical-600" />
              <span className="text-xl font-semibold text-medical-800">MediCita</span>
            </div>
          </div>
          
          <div className="flex-1 px-2 mt-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg",
                      isActive
                        ? "bg-medical-50 text-medical-700"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-medical-500" : "text-gray-400"
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="px-2 pb-4">
            <Link
              to="/login"
              onClick={handleLogout}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Cerrar sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Header móvil */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-medical-600" />
            <span className="text-lg font-semibold text-medical-800">MediCita</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {}}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col bg-white w-72 max-w-[80%] h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-medical-600" />
                <span className="text-lg font-semibold text-medical-800">MediCita</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Juan Pérez</p>
                  <p className="text-sm text-gray-500">juan.perez@gmail.com</p>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-base font-medium rounded-lg",
                      isActive
                        ? "bg-medical-50 text-medical-700"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-medical-500" : "text-gray-400"
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="px-2 py-4 border-t border-gray-200">
              <Link
                to="/login"
                onClick={handleLogout}
                className="flex items-center px-3 py-2.5 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className={cn(
        "flex flex-col flex-1",
        isMobile ? "pt-16" : "md:pl-60"
      )}>
        {children}
      </div>
    </div>
  );
};
