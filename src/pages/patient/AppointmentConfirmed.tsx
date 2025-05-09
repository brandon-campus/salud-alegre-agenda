
import { Button } from "@/components/ui/button";
import { PatientLayout } from "@/components/layouts/PatientLayout";
import { Calendar, Check, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AppointmentConfirmed = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCalendar = () => {
    toast({
      title: "Cita agregada al calendario",
      description: "Se ha guardado correctamente en tu calendario."
    });
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF generado",
      description: "El resumen de tu cita ha sido descargado."
    });
  };

  return (
    <PatientLayout>
      <div className="p-6 flex flex-col items-center justify-center max-w-lg mx-auto py-12">
        <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-accent-green" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-medical-800 text-center mb-2">
          ¡Cita confirmada!
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          Tu cita ha sido programada exitosamente. Hemos enviado un correo 
          electrónico con los detalles de la cita.
        </p>
        
        <div className="medical-card w-full mb-8">
          <div className="flex items-center border-b border-gray-100 pb-4 mb-4">
            <div className="bg-medical-100 rounded-full p-2 mr-4">
              <Calendar className="h-6 w-6 text-medical-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-medical-800">Detalles de la cita</h3>
              <p className="text-gray-500 text-sm">Dra. Ana Martínez - Dermatología</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium">Jueves, 15 de Mayo de 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hora</p>
                <p className="font-medium">10:30 AM</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Ubicación</p>
              <p className="font-medium">Clínica San Carlos, Consultorio 302</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Instrucciones</p>
              <p className="font-medium">Por favor, llegue 15 minutos antes para completar el registro.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <Button 
            className="w-full flex items-center justify-center bg-medical-500 hover:bg-medical-600"
            onClick={handleAddToCalendar}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Agregar al calendario
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center border-medical-400 text-medical-600 hover:bg-medical-100"
            onClick={handleDownloadPDF}
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar resumen
          </Button>
        </div>
        
        <div className="mt-8">
          <Button
            variant="link"
            onClick={() => navigate("/patient/dashboard")}
          >
            Volver al panel principal
          </Button>
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentConfirmed;
