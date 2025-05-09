
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const userTypeFromUrl = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      toast({
        title: "Registro exitoso",
        description: `Tu cuenta como ${userType} ha sido creada correctamente`,
      });
      
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-medical-100/50">
      <div className="container mx-auto max-w-xl px-4 py-12 flex-1 flex flex-col justify-center">
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
            Crear una cuenta
          </h1>
          
          <Tabs 
            defaultValue={userTypeFromUrl === "doctor" ? "medico" : "paciente"} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="paciente">Paciente</TabsTrigger>
              <TabsTrigger value="medico">Médico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="paciente">
              <form onSubmit={(e) => handleSubmit(e, 'paciente')} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Juan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="Pérez" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" type="tel" placeholder="+34 612 345 678" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmar-password">Confirmar contraseña</Label>
                  <Input id="confirmar-password" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los{" "}
                    <a href="#" className="text-medical-600 hover:underline">
                      términos y condiciones
                    </a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-medical-500 hover:bg-medical-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="medico">
              <form onSubmit={(e) => handleSubmit(e, 'médico')} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-medico">Nombre</Label>
                    <Input id="nombre-medico" placeholder="María" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido-medico">Apellido</Label>
                    <Input id="apellido-medico" placeholder="González" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="especialidad">Especialidad</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger id="especialidad">
                      <SelectValue placeholder="Selecciona especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Corregido: Añadidos valores para cada SelectItem */}
                      <SelectItem value="medicina-general">Medicina General</SelectItem>
                      <SelectItem value="cardiologia">Cardiología</SelectItem>
                      <SelectItem value="dermatologia">Dermatología</SelectItem>
                      <SelectItem value="neurologia">Neurología</SelectItem>
                      <SelectItem value="pediatria">Pediatría</SelectItem>
                      <SelectItem value="psiquiatria">Psiquiatría</SelectItem>
                      <SelectItem value="oftalmologia">Oftalmología</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="licencia">Número de licencia médica</Label>
                  <Input id="licencia" placeholder="123456789" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-medico">Email profesional</Label>
                  <Input id="email-medico" type="email" placeholder="tu@clinica.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefono-medico">Teléfono profesional</Label>
                  <Input id="telefono-medico" type="tel" placeholder="+34 912 345 678" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-medico">Contraseña</Label>
                  <Input id="password-medico" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmar-password-medico">Confirmar contraseña</Label>
                  <Input id="confirmar-password-medico" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms-medico" required />
                  <label
                    htmlFor="terms-medico"
                    className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los{" "}
                    <a href="#" className="text-medical-600 hover:underline">
                      términos y condiciones
                    </a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-medical-500 hover:bg-medical-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link 
                to="/login" 
                className="text-medical-600 font-medium hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
