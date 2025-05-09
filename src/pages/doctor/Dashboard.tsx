
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, X, User, Search } from "lucide-react";
import { DoctorLayout } from "@/components/layouts/DoctorLayout";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments] = useState([
    {
      id: 1,
      patient: "Juan Pérez",
      time: "09:00",
      status: "confirmed",
      reason: "Revisión anual",
      isNew: false,
      notes: "Paciente con historial de hipertensión"
    },
    {
      id: 2,
      patient: "María López",
      time: "10:30",
      status: "confirmed",
      reason: "Control de tratamiento",
      isNew: true,
      notes: ""
    },
    {
      id: 3,
      patient: "Carlos Rodríguez",
      time: "12:00",
      status: "confirmed",
      reason: "Consulta dermatológica",
      isNew: false,
      notes: "Alergia a antibióticos de penicilina"
    },
    {
      id: 4,
      patient: "Ana Martínez",
      time: "16:30",
      status: "cancelled",
      reason: "Consulta general",
      isNew: false,
      notes: ""
    }
  ]);

  const handleMarkAsAttended = (id: number) => {
    toast({
      title: "Paciente marcado como atendido",
      description: "El estado de la cita ha sido actualizado correctamente."
    });
  };

  const handleMarkAsNoShow = (id: number) => {
    toast({
      title: "Paciente marcado como ausente",
      description: "El estado de la cita ha sido actualizado correctamente."
    });
  };

  return (
    <DoctorLayout>
      <div className="p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-medical-800">Buenos días, Dr. Martínez</h1>
            <p className="text-gray-500 text-lg">Aquí está su agenda de hoy</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="today">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Ver citas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Citas de hoy</SelectItem>
                <SelectItem value="tomorrow">Citas de mañana</SelectItem>
                <SelectItem value="week">Citas de la semana</SelectItem>
                <SelectItem value="month">Citas del mes</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="text-medical-600 border-medical-200"
              onClick={() => navigate("/doctor/patients")}
            >
              <User className="mr-2 h-4 w-4" />
              Mis pacientes
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Calendario */}
          <Card className="h-fit border-gray-100">
            <CardContent className="p-4">
              {/* Mini calendario header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Mayo 2025</h3>
                <div className="flex space-x-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
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
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">1</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">2</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">3</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">4</div>
                
                {/* Semana 2 */}
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">5</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">6</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">7</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">8</div>
                <div className="bg-medical-500 text-white rounded cursor-pointer py-1">9</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">10</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">11</div>
                
                {/* Semana 3 */}
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">12</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded relative">
                  13
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-medical-500 rounded-full"></div>
                </div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">14</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">15</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded relative">
                  16
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-medical-500 rounded-full"></div>
                </div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">17</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">18</div>
                
                {/* ... Otras semanas ... */}
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">19</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">20</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded relative">
                  21
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-medical-500 rounded-full"></div>
                </div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">22</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">23</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">24</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">25</div>
                
                {/* Semana 5 */}
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">26</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">27</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">28</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">29</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">30</div>
                <div className="py-1 hover:bg-gray-50 cursor-pointer rounded">31</div>
                <div className="text-gray-400 py-1">1</div>
              </div>
              
              {/* Leyenda */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-medical-500 rounded-full"></div>
                  <span>Día actual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-medical-500 rounded-full"></div>
                  <span>Con citas</span>
                </div>
              </div>
              
              {/* Horario rápido */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-sm mb-3">Horario de consulta</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lun, Mié, Vie</span>
                    <span className="text-gray-500">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mar, Jue</span>
                    <span className="text-gray-500">15:00 - 20:00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de citas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-medical-800">
                Citas para hoy, 9 de Mayo
              </h2>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card 
                    key={appointment.id} 
                    className={`border-gray-100 ${
                      appointment.status === 'cancelled' ? 'opacity-70' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-20 flex-shrink-0">
                          <div className="text-lg font-medium">{appointment.time}</div>
                          <div className="text-xs text-gray-500">hrs</div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-lg">{appointment.patient}</h3>
                            {appointment.isNew && (
                              <Badge className="bg-accent-green text-white">Nuevo</Badge>
                            )}
                            {appointment.status === 'cancelled' && (
                              <Badge className="bg-accent-red text-white">Cancelada</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{appointment.reason}</p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-500 mt-1">Nota: {appointment.notes}</p>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0 space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-accent-green text-accent-green hover:bg-accent-green/10"
                            onClick={() => handleMarkAsAttended(appointment.id)}
                            disabled={appointment.status === 'cancelled'}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Atendido
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-accent-red text-accent-red hover:bg-accent-red/10"
                            onClick={() => handleMarkAsNoShow(appointment.id)}
                            disabled={appointment.status === 'cancelled'}
                          >
                            <X className="h-4 w-4 mr-1" />
                            No asistió
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-gray-100">
                <CardContent className="p-6 text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">No tienes citas para hoy</h3>
                  <p className="mt-2 text-gray-500">
                    Disfruta de tu día libre o busca pacientes disponibles.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Estadísticas rápidas */}
        <section>
          <h2 className="text-xl font-semibold text-medical-800 mb-4">Resumen de la semana</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-gray-100">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Pacientes atendidos</div>
                <div className="text-2xl font-bold text-medical-800 mt-1">24</div>
                <div className="text-xs text-accent-green flex items-center mt-1">
                  <ChevronRight className="h-3 w-3 rotate-[-90deg]" />
                  <span>↑ 12% vs semana anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Pacientes nuevos</div>
                <div className="text-2xl font-bold text-medical-800 mt-1">8</div>
                <div className="text-xs text-accent-green flex items-center mt-1">
                  <ChevronRight className="h-3 w-3 rotate-[-90deg]" />
                  <span>↑ 33% vs semana anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Horas de consulta</div>
                <div className="text-2xl font-bold text-medical-800 mt-1">32</div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <span>↔ Igual que semana anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Citas canceladas</div>
                <div className="text-2xl font-bold text-medical-800 mt-1">3</div>
                <div className="text-xs text-accent-red flex items-center mt-1">
                  <ChevronRight className="h-3 w-3 rotate-90" />
                  <span>↓ 25% vs semana anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
