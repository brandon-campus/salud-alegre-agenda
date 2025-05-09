
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { PatientLayout } from "@/components/layouts/PatientLayout";
import {
  Search,
  Filter,
  ChevronRight,
  MapPin,
  Star,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const specialties = [
  "Cardiología",
  "Dermatología",
  "Endocrinología",
  "Gastroenterología",
  "Medicina General",
  "Neurología",
  "Oftalmología",
  "Pediatría",
  "Psiquiatría",
];

const doctors = [
  {
    id: 1,
    name: "Dra. Ana Martínez",
    specialty: "Dermatología",
    rating: 4.8,
    reviews: 124,
    location: "Clínica San Carlos, Consultorio 302",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    availableToday: true,
  },
  {
    id: 2,
    name: "Dr. Carlos Sánchez",
    specialty: "Dermatología",
    rating: 4.5,
    reviews: 98,
    location: "Hospital Central, Torre B, Piso 4",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    availableToday: false,
  },
  {
    id: 3,
    name: "Dra. Laura Gómez",
    specialty: "Dermatología",
    rating: 4.9,
    reviews: 156,
    location: "Centro Médico Aurora, Consultorio 205",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    availableToday: true,
  },
  {
    id: 4,
    name: "Dr. Roberto García",
    specialty: "Medicina General",
    rating: 4.7,
    reviews: 142,
    location: "Centro Médico Las Flores, Consultorio 105",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    availableToday: true,
  },
];

const availableTimeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", 
  "11:30", "12:00", "16:00", "16:30", "17:00"
];

const NewAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchTerm === "" || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "" || 
      doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateTimeSelect = () => {
    setStep(3);
  };

  const handleConfirmAppointment = () => {
    navigate("/patient/appointment-confirmed");
  };

  return (
    <PatientLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className={step >= 1 ? "text-medical-600 font-medium" : ""}>Buscar médico</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className={step >= 2 ? "text-medical-600 font-medium" : ""}>Seleccionar fecha y hora</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className={step >= 3 ? "text-medical-600 font-medium" : ""}>Confirmar cita</span>
        </div>

        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-medical-800">Buscar médico</h1>
            
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              {/* Filtros */}
              <Card className="h-fit border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Todas las especialidades" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Corregido: Se ha asignado un valor no vacío al primer item */}
                        <SelectItem value="all">Todas las especialidades</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Disponibilidad</Label>
                    <RadioGroup defaultValue="all">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">Todos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="today" id="today" />
                        <Label htmlFor="today">Disponible hoy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="week" id="week" />
                        <Label htmlFor="week">Disponible esta semana</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Resultados */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-10"
                    placeholder="Buscar médico por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <Card 
                        key={doctor.id}
                        className="border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleDoctorSelect(doctor)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg text-medical-800">{doctor.name}</h3>
                                  <p className="text-gray-500">{doctor.specialty}</p>
                                </div>
                                {doctor.availableToday && (
                                  <span className="bg-accent-green/20 text-accent-green-dark text-xs px-2 py-1 rounded-full">
                                    Disponible hoy
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-gray-700">{doctor.rating}</span>
                                <span className="ml-1 text-gray-500">({doctor.reviews} reseñas)</span>
                              </div>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {doctor.location}
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No se encontraron médicos con los criterios seleccionados.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && selectedDoctor && (
          <>
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setStep(1)}
                className="p-0 mr-4 h-auto"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
                <span className="ml-1 text-sm">Volver</span>
              </Button>
              <h1 className="text-2xl font-bold text-medical-800">Seleccionar fecha y hora</h1>
            </div>
            
            <div className="grid md:grid-cols-[350px_1fr] gap-8">
              <Card className="border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={selectedDoctor.image} 
                        alt={selectedDoctor.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-medical-800">{selectedDoctor.name}</h3>
                      <p className="text-gray-500">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{selectedDoctor.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-gray-100">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium text-lg mb-4 text-medical-800">
                          Selecciona una fecha
                        </h3>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : <span>Selecciona fecha</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 pointer-events-auto">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border pointer-events-auto"
                              disabled={(date) => {
                                // Deshabilitar fechas pasadas y fines de semana
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const day = date.getDay();
                                return date < today || day === 0 || day === 6;
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <h3 className="font-medium text-lg mb-4 text-medical-800">
                          Selecciona una hora
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-medical-500 hover:bg-medical-600" : ""}
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button 
                    size="lg"
                    onClick={handleDateTimeSelect}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-medical-500 hover:bg-medical-600"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && selectedDoctor && selectedDate && selectedTime && (
          <>
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                onClick={() => setStep(2)}
                className="p-0 mr-4 h-auto"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
                <span className="ml-1 text-sm">Volver</span>
              </Button>
              <h1 className="text-2xl font-bold text-medical-800">Confirmar cita</h1>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="border-gray-100">
                <CardHeader>
                  <CardTitle>Resumen de la cita</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={selectedDoctor.image} 
                        alt={selectedDoctor.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-medical-800">{selectedDoctor.name}</h3>
                      <p className="text-gray-500">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <span className="text-sm text-gray-500">Fecha</span>
                          <p className="font-medium">{format(selectedDate, "PPP")}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <span className="text-sm text-gray-500">Hora</span>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 col-span-full">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <span className="text-sm text-gray-500">Ubicación</span>
                          <p className="font-medium">{selectedDoctor.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <Label htmlFor="notes">Motivo de la consulta (opcional)</Label>
                    <Input 
                      id="notes" 
                      className="mt-1" 
                      placeholder="Describa brevemente el motivo de su consulta..." 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end mt-6 space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Volver
                </Button>
                <Button
                  size="lg"
                  onClick={handleConfirmAppointment}
                  className="bg-medical-500 hover:bg-medical-600"
                >
                  Confirmar cita
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PatientLayout>
  );
};

export default NewAppointment;
