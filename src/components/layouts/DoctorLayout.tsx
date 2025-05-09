
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  Bell,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

interface DoctorLayoutProps {
  children: ReactNode;
}

export const DoctorLayout = ({ children }: DoctorLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: Home },
    { name: "Mi agenda", href: "/doctor/schedule", icon: Calendar },
    { name: "Pacientes", href: "/doctor/patients", icon: Users },
    { name: "Horarios", href: "/doctor/availability", icon: Clock },
    { name: "Configuración", href: "/doctor/settings", icon: Settings },
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
          
          <div className="px-2 pb-4 pt-2 border-t border-gray-100">
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/67.jpg" />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="text-sm font-medium">Dr. Martínez</p>
                  <p className="text-xs text-gray-500 truncate">Dermatología</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Mi perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                  <AvatarImage src="https://randomuser.me/api/portraits/men/67.jpg" />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Dr. Martínez</p>
                  <p className="text-sm text-gray-500">Dermatología</p>
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
