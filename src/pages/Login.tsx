
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      toast({
        title: "Inicio de sesión exitoso",
        description: `Has iniciado sesión como ${userType}`,
      });
      
      setIsLoading(false);
      
      // Redirigir según el tipo de usuario
      if (userType === 'paciente') {
        navigate("/patient/dashboard");
      } else {
        navigate("/doctor/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-medical-100/50">
      <div className="container max-w-md mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-medical-600 pl-0" 
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <Calendar className="h-8 w-8 text-medical-600 mr-2" />
          <h1 className="text-2xl font-bold text-medical-800">MediCita</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-2xl font-semibold text-center mb-6 text-medical-800">
            Inicia sesión
          </h1>
          
          <Tabs defaultValue="paciente" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="paciente">Paciente</TabsTrigger>
              <TabsTrigger value="medico">Médico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="paciente">
              <form onSubmit={(e) => handleSubmit(e, 'paciente')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-paciente">Email</Label>
                  <Input 
                    id="email-paciente" 
                    type="email" 
                    placeholder="tu@email.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password-paciente">Contraseña</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-medical-600 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input 
                    id="password-paciente" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-medical-500 hover:bg-medical-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="medico">
              <form onSubmit={(e) => handleSubmit(e, 'médico')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-medico">Email</Label>
                  <Input 
                    id="email-medico" 
                    type="email" 
                    placeholder="tu@clinica.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password-medico">Contraseña</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-medical-600 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input 
                    id="password-medico" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-medical-500 hover:bg-medical-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link 
                to="/register" 
                className="text-medical-600 font-medium hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
