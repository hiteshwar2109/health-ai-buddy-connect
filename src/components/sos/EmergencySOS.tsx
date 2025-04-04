
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, EmergencyContact } from "@/types";
import { sendEmergencySMS } from "@/lib/api";
import { toast } from "sonner";

interface EmergencySOSProps {
  user?: User;
}

export function EmergencySOS({ user }: EmergencySOSProps) {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isActivating, setIsActivating] = useState(false);
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  
  useEffect(() => {
    // In a real app, this would be loaded from the user's profile
    // For demo purposes, we'll use sample data
    const sampleContacts: EmergencyContact[] = [
      {
        id: "1",
        name: "Jane Doe",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
        isWhatsApp: true
      },
      {
        id: "2",
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        relationship: "Parent",
        isWhatsApp: false
      },
      {
        id: "3",
        name: "Mark Johnson",
        phone: "+1 (555) 234-5678",
        relationship: "Friend",
        isWhatsApp: true
      }
    ];
    
    setEmergencyContacts(user?.emergencyContacts || sampleContacts);
  }, [user]);
  
  useEffect(() => {
    if (isActivating) {
      // Get current location when activating emergency mode
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition(position);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Unable to get your location. Emergency alerts will be sent without location data.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser. Emergency alerts will be sent without location data.");
      }
    }
  }, [isActivating]);
  
  const activateEmergencyMode = () => {
    setIsActivating(true);
    toast.info("Emergency mode activated. Your location is being determined.");
  };
  
  const deactivateEmergencyMode = () => {
    setIsActivating(false);
    setPosition(null);
    toast.info("Emergency mode deactivated.");
  };
  
  const sendEmergencyAlert = async () => {
    if (emergencyContacts.length === 0) {
      toast.error("No emergency contacts found. Please add contacts first.");
      return;
    }
    
    setIsSendingAlert(true);
    
    try {
      const message = "EMERGENCY ALERT: I need immediate assistance. This is an automated alert sent from my Health Buddy app.";
      
      const result = await sendEmergencySMS(
        emergencyContacts.map(c => ({ name: c.name, phone: c.phone })),
        message,
        position
      );
      
      if (result.success) {
        toast.success(`Emergency alert sent to ${emergencyContacts.length - result.failed.length} contacts`);
        
        if (result.failed.length > 0) {
          toast.error(`Failed to send alert to ${result.failed.length} contacts: ${result.failed.join(", ")}`);
        }
      } else {
        toast.error("Failed to send emergency alerts. Please try again or call emergency services directly.");
      }
    } catch (error) {
      console.error("Error sending emergency alerts:", error);
      toast.error("Error sending emergency alerts. Please try again or call emergency services directly.");
    } finally {
      setIsSendingAlert(false);
      setIsActivating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className={`${isActivating ? "border-emergency-500 bg-emergency-50" : "healthcare-card"}`}>
        <CardHeader>
          <CardTitle className={isActivating ? "text-emergency-600" : "text-healthcare-800"}>
            Emergency SOS
          </CardTitle>
          <CardDescription>
            Quickly alert your emergency contacts in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isActivating ? (
            <div className="text-center space-y-6 py-4">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emergency-400 animate-pulse-slow"></div>
                <Button
                  variant="destructive"
                  size="lg"
                  className="absolute inset-0 rounded-full h-full w-full text-xl font-bold"
                  onClick={sendEmergencyAlert}
                  disabled={isSendingAlert}
                >
                  {isSendingAlert ? "Sending..." : "SEND SOS"}
                </Button>
              </div>
              
              <p className="text-emergency-600 font-medium">
                Press the button to send emergency alerts to all your contacts
              </p>
              
              <div className="text-sm">
                <p>
                  {position ? (
                    <span className="text-green-600 font-medium">✓ Location detected successfully</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Determining your location...</span>
                  )}
                </p>
                {position && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Your coordinates will be shared: {position.coords.latitude.toFixed(6)}, {position.coords.longitude.toFixed(6)}
                  </p>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={deactivateEmergencyMode}
                disabled={isSendingAlert}
              >
                Cancel Emergency
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-48 h-48 rounded-full text-xl font-bold"
                  onClick={activateEmergencyMode}
                >
                  SOS
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Press the button to activate emergency mode
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Your Emergency Contacts ({emergencyContacts.length})</h3>
                
                {emergencyContacts.length > 0 ? (
                  <div className="space-y-2">
                    {emergencyContacts.map((contact) => (
                      <div key={contact.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {contact.relationship} • {contact.phone}
                          </p>
                        </div>
                        {contact.isWhatsApp && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            WhatsApp
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No emergency contacts found</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Contacts
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
        {!isActivating && (
          <CardFooter>
            <p className="text-xs text-muted-foreground w-full text-center">
              Emergency alerts will be sent to all contacts with your current location (if available)
            </p>
          </CardFooter>
        )}
      </Card>
      
      {!isActivating && (
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="text-healthcare-800">Emergency Services</CardTitle>
            <CardDescription>
              Quick access to emergency services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 border-emergency-200 hover:bg-emergency-50"
              >
                <span className="text-2xl text-emergency-500">911</span>
                <span className="text-sm font-normal">Emergency</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2"
              >
                <span className="text-2xl text-healthcare-600">988</span>
                <span className="text-sm font-normal">Mental Health</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2"
              >
                <span className="text-2xl text-healthcare-600">211</span>
                <span className="text-sm font-normal">Health Resources</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default EmergencySOS;
