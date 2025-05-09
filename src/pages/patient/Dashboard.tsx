
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PatientLayout } from "@/components/layouts/PatientLayout";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [upcomingAppointments] = useState([
    {
      id: 1,
      doctor: "Dra. Ana Martínez",
      specialty: "Dermatología",
      date: "2025-05-15T10:30:00",
      location: "Clínica San Carlos, Consultorio 302",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Roberto García",
      specialty: "Medicina General",
      date: "2025-05-21T16:00:00",
      location: "Centro Médico Las Flores, Consultorio 105",
      status: "pending"
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelAppointment = (id: number) => {
    toast({
      title: "Cita cancelada",
      description: "Tu cita ha sido cancelada exitosamente."
    });
  };

  return (
    <PatientLayout>
      <div className="p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-medical-800">Hola, Juan</h1>
            <p className="text-gray-500 text-lg">Bienvenido a tu panel de paciente</p>
          </div>
          <Button 
            onClick={() => navigate('/patient/new-appointment')}
            className="bg-medical-500 hover:bg-medical-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Agendar nueva cita
          </Button>
        </div>

        {/* Próximas citas */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-medical-800">Próximas citas</h2>
            <Button 
              variant="outline"
              className="text-medical-600 border-medical-300"
              onClick={() => navigate("/patient/appointments")}
            >
              Ver todas
            </Button>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border border-gray-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="bg-medical-100 p-3 rounded-full">
                          <User className="h-6 w-6 text-medical-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-medical-800">
                            {appointment.doctor}
                          </h3>
                          <p className="text-gray-500 text-sm">{appointment.specialty}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === 'confirmed' 
                            ? 'bg-accent-green/20 text-accent-green-dark' 
                            : 'bg-accent-orange/20 text-accent-orange-dark'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatTime(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-accent-red border-accent-red/30 hover:bg-accent-red/10"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/patient/appointments/${appointment.id}`)}
                      >
                        Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-gray-100">
              <CardContent className="p-6 text-center">
                <div className="py-6">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900">No tienes citas próximas</h3>
                  <p className="mt-2 text-gray-500">
                    Agenda una nueva cita con alguno de nuestros profesionales.
                  </p>
                  <Button 
                    className="mt-4 bg-medical-500 hover:bg-medical-600"
                    onClick={() => navigate('/patient/new-appointment')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar ahora
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Agenda del mes */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">Tu mes</h2>
          <Card className="border border-gray-100">
            <CardContent className="p-6">
              {/* Mini calendario */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Mayo 2025</h3>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="outline" className="h-8 w-8 p-0">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Días de la semana */}
                <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
                  <div>L</div>
                  <div>M</div>
                  <div>X</div>
                  <div>J</div>
                  <div>V</div>
                  <div>S</div>
                  <div>D</div>
                </div>
                
                {/* Días del mes */}
                <div className="grid grid-cols-7 text-center text-sm gap-1">
                  {/* Semana 1 */}
                  <div className="text-gray-400 py-1">28</div>
                  <div className="text-gray-400 py-1">29</div>
                  <div className="text-gray-400 py-1">30</div>
                  <div className="py-1">1</div>
                  <div className="py-1">2</div>
                  <div className="py-1">3</div>
                  <div className="py-1">4</div>
                  
                  {/* Semana 2 */}
                  <div className="py-1">5</div>
                  <div className="py-1">6</div>
                  <div className="py-1">7</div>
                  <div className="py-1">8</div>
                  <div className="py-1">9</div>
                  <div className="py-1">10</div>
                  <div className="py-1">11</div>
                  
                  {/* Semana 3 */}
                  <div className="py-1">12</div>
                  <div className="py-1">13</div>
                  <div className="py-1">14</div>
                  <div className="bg-medical-100 text-medical-800 rounded-full font-medium py-1">15</div>
                  <div className="py-1">16</div>
                  <div className="py-1">17</div>
                  <div className="py-1">18</div>
                  
                  {/* Semana 4 */}
                  <div className="py-1">19</div>
                  <div className="py-1">20</div>
                  <div className="bg-medical-100 text-medical-800 rounded-full font-medium py-1">21</div>
                  <div className="py-1">22</div>
                  <div className="py-1">23</div>
                  <div className="py-1">24</div>
                  <div className="py-1">25</div>
                  
                  {/* Semana 5 */}
                  <div className="py-1">26</div>
                  <div className="py-1">27</div>
                  <div className="py-1">28</div>
                  <div className="py-1">29</div>
                  <div className="py-1">30</div>
                  <div className="py-1">31</div>
                  <div className="text-gray-400 py-1">1</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medical-300 rounded-full"></div>
                  <span>15 Mayo - Dra. Ana Martínez</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medical-300 rounded-full"></div>
                  <span>21 Mayo - Dr. Roberto García</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
