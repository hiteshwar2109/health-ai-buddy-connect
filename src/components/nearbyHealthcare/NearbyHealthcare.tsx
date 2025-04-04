
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Phone, Star } from "lucide-react";
import { toast } from "sonner";
import { findNearbyHealthcare } from "@/lib/api";
import { HealthcareFacility } from "@/types";

export function NearbyHealthcare() {
  const [apiKey, setApiKey] = useState("");
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [facilityType, setFacilityType] = useState<string>("hospital");
  const [error, setError] = useState<string | null>(null);
  
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    setError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        setIsLocating(false);
        toast.success("Location detected successfully");
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location permission denied");
            toast.error("Location permission denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable");
            toast.error("Location information unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            toast.error("Location request timed out");
            break;
          default:
            setError("Unknown error occurred");
            toast.error("Unknown error occurred while getting location");
        }
      }
    );
  };
  
  const searchNearbyFacilities = async () => {
    if (!position) {
      toast.error("Please enable location detection first");
      return;
    }
    
    if (!apiKey) {
      toast.error("Please enter your Google Maps API key");
      return;
    }
    
    setIsSearching(true);
    setError(null);
    
    try {
      // For demonstration, we're using mock data
      // In a real application, this would use the actual API
      // const data = await findNearbyHealthcare(position, apiKey, facilityType);
      
      // Mock data for demonstration
      setTimeout(() => {
        const mockFacilities: HealthcareFacility[] = [
          {
            id: "1",
            name: "City General Hospital",
            type: "hospital",
            address: "123 Healthcare Blvd, City Center",
            phone: "+1 (555) 123-4567",
            distance: 1.2,
            rating: 4.5,
            openNow: true,
            location: {
              lat: position.coords.latitude + 0.01,
              lng: position.coords.longitude + 0.01
            }
          },
          {
            id: "2",
            name: "Downtown Medical Clinic",
            type: "clinic",
            address: "456 Medical Dr, Downtown",
            phone: "+1 (555) 234-5678",
            distance: 2.5,
            rating: 4.2,
            openNow: true,
            location: {
              lat: position.coords.latitude - 0.01,
              lng: position.coords.longitude - 0.01
            }
          },
          {
            id: "3",
            name: "Neighborhood Pharmacy",
            type: "pharmacy",
            address: "789 Pharmacy St, Neighborhood",
            phone: "+1 (555) 345-6789",
            distance: 0.7,
            rating: 4.0,
            openNow: false,
            location: {
              lat: position.coords.latitude + 0.005,
              lng: position.coords.longitude - 0.008
            }
          },
          {
            id: "4",
            name: "Urgent Care Center",
            type: "urgent-care",
            address: "321 Emergency Way, Uptown",
            phone: "+1 (555) 456-7890",
            distance: 3.1,
            rating: 4.7,
            openNow: true,
            location: {
              lat: position.coords.latitude - 0.02,
              lng: position.coords.longitude + 0.015
            }
          },
          {
            id: "5",
            name: "Specialty Medical Center",
            type: "specialist",
            address: "987 Specialist Circle, Medical District",
            phone: "+1 (555) 567-8901",
            distance: 4.3,
            rating: 4.8,
            openNow: false,
            location: {
              lat: position.coords.latitude + 0.025,
              lng: position.coords.longitude + 0.02
            }
          }
        ];
        
        // Filter by type if not 'all'
        const filtered = facilityType === "all" 
          ? mockFacilities
          : mockFacilities.filter(f => f.type === facilityType);
        
        setFacilities(filtered.sort((a, b) => a.distance! - b.distance!));
        setIsSearching(false);
        toast.success(`Found ${filtered.length} nearby healthcare facilities`);
      }, 1500);
    } catch (error) {
      console.error("Error finding nearby healthcare:", error);
      setError("Failed to find nearby healthcare facilities");
      toast.error("Failed to find nearby healthcare facilities");
      setIsSearching(false);
    }
  };
  
  const getFacilityTypeLabel = (type: string) => {
    switch (type) {
      case "hospital": return "Hospitals";
      case "clinic": return "Clinics";
      case "pharmacy": return "Pharmacies";
      case "urgent-care": return "Urgent Care";
      case "specialist": return "Specialists";
      case "all": return "All Facilities";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="text-healthcare-800">Find Nearby Healthcare</CardTitle>
          <CardDescription>
            Locate medical facilities near your current location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maps-api-key">Google Maps API Key (Required)</Label>
            <Input
              id="maps-api-key"
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your API key is required to access Google Maps services. It's only used for these requests and not stored.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Location Status</Label>
            <div className="flex items-center gap-2">
              {position ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Location Detected
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Location Not Detected
                </Badge>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getLocation}
                disabled={isLocating}
              >
                {isLocating ? "Detecting Location..." : "Detect My Location"}
              </Button>
            </div>
            
            {error && (
              <p className="text-sm text-emergency-500 mt-1">{error}</p>
            )}
            
            {position && (
              <p className="text-xs text-muted-foreground">
                Coordinates: {position.coords.latitude.toFixed(6)}, {position.coords.longitude.toFixed(6)}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Facility Type</Label>
            <div className="flex flex-wrap gap-2">
              {["hospital", "clinic", "pharmacy", "urgent-care", "specialist", "all"].map((type) => (
                <Badge 
                  key={type}
                  variant={facilityType === type ? "default" : "outline"}
                  className={`cursor-pointer ${facilityType === type ? "bg-healthcare-500" : "hover:bg-secondary/50"}`}
                  onClick={() => setFacilityType(type)}
                >
                  {getFacilityTypeLabel(type)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={searchNearbyFacilities}
            disabled={!position || !apiKey || isSearching}
            className="w-full bg-healthcare-500 hover:bg-healthcare-600"
          >
            {isSearching ? "Searching Nearby..." : "Search Nearby Facilities"}
          </Button>
        </CardFooter>
      </Card>
      
      {facilities.length > 0 && (
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="text-healthcare-800">
              Nearby {getFacilityTypeLabel(facilityType)}
            </CardTitle>
            <CardDescription>
              Found {facilities.length} facilities near your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div 
                  key={facility.id} 
                  className="p-4 border rounded-md hover:border-healthcare-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{facility.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {getFacilityTypeLabel(facility.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{facility.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span>{facility.address}</span>
                    </div>
                    
                    {facility.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={14} />
                        <span>{facility.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      <span>{facility.openNow ? "Open now" : "Closed"}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-healthcare-600 font-medium">
                      {facility.distance} miles away
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Call
                      </Button>
                      <Button variant="default" size="sm" className="bg-healthcare-500 hover:bg-healthcare-600">
                        Directions
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default NearbyHealthcare;
