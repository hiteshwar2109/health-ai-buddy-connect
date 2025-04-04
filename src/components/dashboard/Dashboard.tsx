
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Heart, MapPin, User } from "lucide-react";
import SymptomChecker from "../symptomChecker/SymptomChecker";
import NearbyHealthcare from "../nearbyHealthcare/NearbyHealthcare";
import HealthTips from "../healthTips/HealthTips";
import EmergencySOS from "../sos/EmergencySOS";
import { User as UserType, MedicalHistory } from "@/types";

export function Dashboard() {
  // In a real app, this would come from a user context or API
  const [user] = useState<UserType>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    isLoggedIn: true,
    medicalHistory: {
      allergies: ["Peanuts", "Penicillin"],
      chronicConditions: ["Asthma", "Allergic Rhinitis"],
      currentMedications: ["Albuterol", "Cetirizine"],
      bloodType: "A+",
      height: 175,
      weight: 70,
      birthDate: "1990-01-01",
      lastPhysicalExam: "2023-06-15"
    }
  });
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-healthcare-800">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        
        <Button 
          variant="destructive" 
          size="lg"
          className="gap-2"
        >
          <BellRing size={18} />
          Emergency SOS
        </Button>
      </div>
      
      <Tabs defaultValue="symptom-checker" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="symptom-checker" className="gap-2">
            <Heart size={16} />
            <span className="hidden md:inline">Symptom Checker</span>
            <span className="md:hidden">Symptoms</span>
          </TabsTrigger>
          <TabsTrigger value="nearby-healthcare" className="gap-2">
            <MapPin size={16} />
            <span className="hidden md:inline">Nearby Healthcare</span>
            <span className="md:hidden">Nearby</span>
          </TabsTrigger>
          <TabsTrigger value="health-tips" className="gap-2">
            <Heart size={16} />
            <span className="hidden md:inline">Health Tips</span>
            <span className="md:hidden">Tips</span>
          </TabsTrigger>
          <TabsTrigger value="emergency" className="gap-2">
            <BellRing size={16} />
            <span className="hidden md:inline">Emergency SOS</span>
            <span className="md:hidden">SOS</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="symptom-checker">
          <SymptomChecker />
        </TabsContent>
        
        <TabsContent value="nearby-healthcare">
          <NearbyHealthcare />
        </TabsContent>
        
        <TabsContent value="health-tips">
          <HealthTips medicalHistory={user.medicalHistory} />
        </TabsContent>
        
        <TabsContent value="emergency">
          <EmergencySOS user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;
