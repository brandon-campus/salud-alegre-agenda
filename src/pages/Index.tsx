
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, FileText, UserCheck, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-100 to-white">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calendar className="h-7 w-7 text-medical-600" />
          <span className="text-xl font-semibold text-medical-800">MediCita</span>
        </div>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="border-medical-400 text-medical-600 hover:bg-medical-100"
          >
            Ingresar
          </Button>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-medical-500 hover:bg-medical-600"
          >
            Registrarse
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-medical-900">
            Gestiona tus citas médicas<br />
            <span className="text-medical-500">sin complicaciones</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Agenda, reprograma o cancela tus citas médicas en cualquier momento.
            Plataforma simple y segura para pacientes y profesionales.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-medical-500 hover:bg-medical-600"
            >
              Crear cuenta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/about")}
              className="border-medical-400 text-medical-600 hover:bg-medical-100"
            >
              Conocer más
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="relative">
            <div className="w-full h-[400px] bg-gradient-to-br from-medical-200 to-medical-300 rounded-2xl shadow-xl flex items-center justify-center">
              <Calendar className="h-20 w-20 text-white" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-lg animate-fade-in animation-delay-100">
              <div className="flex items-center gap-3">
                <div className="bg-accent-green/20 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-accent-green" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Cita confirmada</p>
                  <p className="text-xs text-gray-500">Dr. Martinez - 10:00 AM</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-white p-4 rounded-xl shadow-lg animate-fade-in animation-delay-200">
              <div className="flex items-center gap-3">
                <div className="bg-accent-orange/20 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-accent-orange" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Recordatorio</p>
                  <p className="text-xs text-gray-500">Cita mañana a las 3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-medical-800">
          Todo lo que necesitas para gestionar tus citas
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-10 w-10 text-medical-500" />}
            title="Agenda fácilmente"
            description="Encuentra especialistas disponibles y agenda en minutos"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-medical-500" />}
            title="Historial completo"
            description="Accede a tu historial de citas y mantén un seguimiento"
          />
          <FeatureCard 
            icon={<UserCheck className="h-10 w-10 text-medical-500" />}
            title="Panel para médicos"
            description="Profesionales pueden administrar agenda y pacientes"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-medical-600 text-white py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comienza a gestionar tus citas hoy
            </h2>
            <p className="text-lg mb-8 text-medical-100">
              Únete a miles de pacientes y profesionales que utilizan nuestra plataforma para organizar su día a día médico.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/register?type=patient")}
                className="bg-white text-medical-600 hover:bg-medical-100"
              >
                Registrarse como paciente
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/register?type=doctor")}
                className="border-white text-white hover:bg-medical-500"
              >
                Registrarse como profesional
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-medical-600" />
                <span className="text-lg font-semibold text-medical-800">MediCita</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                La forma más simple de gestionar citas médicas.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Plataforma</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Características</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Para pacientes</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Para médicos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Empresa</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Acerca de</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Contacto</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Privacidad</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-medical-500">Términos</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p>© {new Date().getFullYear()} MediCita. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="medical-card hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2 text-medical-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
