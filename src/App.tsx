
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/patient/Dashboard";
import NewAppointment from "./pages/patient/NewAppointment";
import AppointmentConfirmed from "./pages/patient/AppointmentConfirmed";
import DoctorDashboard from "./pages/doctor/Dashboard";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas de paciente */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/new-appointment" element={<NewAppointment />} />
            <Route path="/patient/appointment-confirmed" element={<AppointmentConfirmed />} />
            
            {/* Rutas de médico */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
