
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, MedicalHistory } from "@/types";

interface ProfileFormProps {
  user?: User;
  onUpdateProfile?: (user: User) => void;
}

export function ProfileForm({ user, onUpdateProfile }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<User>>(user || {
    name: "",
    email: "",
    medicalHistory: {
      allergies: [],
      chronicConditions: [],
      currentMedications: [],
      bloodType: undefined,
      height: undefined,
      weight: undefined,
      birthDate: undefined,
      lastPhysicalExam: undefined
    }
  });
  
  const [allergiesInput, setAllergiesInput] = useState("");
  const [conditionsInput, setConditionsInput] = useState("");
  const [medicationsInput, setMedicationsInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
      
      if (onUpdateProfile) {
        onUpdateProfile(formData as User);
      }
    }, 1000);
  };
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateMedicalHistory = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: value
      }
    }));
  };
  
  const handleAllergiesUpdate = () => {
    if (allergiesInput.trim()) {
      const allergiesList = allergiesInput.split(',').map(item => item.trim());
      updateMedicalHistory("allergies", allergiesList);
      setAllergiesInput("");
    }
  };
  
  const handleConditionsUpdate = () => {
    if (conditionsInput.trim()) {
      const conditionsList = conditionsInput.split(',').map(item => item.trim());
      updateMedicalHistory("chronicConditions", conditionsList);
      setConditionsInput("");
    }
  };
  
  const handleMedicationsUpdate = () => {
    if (medicationsInput.trim()) {
      const medicationsList = medicationsInput.split(',').map(item => item.trim());
      updateMedicalHistory("currentMedications", medicationsList);
      setMedicationsInput("");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-healthcare-800">Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="text-xl bg-healthcare-100 text-healthcare-800">
                    {formData.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input 
                    id="full-name" 
                    value={formData.name || ""}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birth-date">Date of Birth</Label>
                  <Input 
                    id="birth-date" 
                    type="date"
                    value={formData.medicalHistory?.birthDate || ""}
                    onChange={(e) => updateMedicalHistory("birthDate", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Enter your full address"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="bg-healthcare-500 hover:bg-healthcare-600"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle className="text-healthcare-800">Medical History</CardTitle>
              <CardDescription>
                Update your medical information for better health recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Select 
                    onValueChange={(value) => updateMedicalHistory("bloodType", value)}
                    value={formData.medicalHistory?.bloodType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-physical">Last Physical Examination</Label>
                  <Input 
                    id="last-physical" 
                    type="date"
                    value={formData.medicalHistory?.lastPhysicalExam || ""}
                    onChange={(e) => updateMedicalHistory("lastPhysicalExam", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number"
                    value={formData.medicalHistory?.height || ""}
                    onChange={(e) => updateMedicalHistory("height", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    value={formData.medicalHistory?.weight || ""}
                    onChange={(e) => updateMedicalHistory("weight", parseFloat(e.target.value))}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="allergies" 
                      placeholder="e.g., Peanuts, Penicillin, Latex"
                      value={allergiesInput}
                      onChange={(e) => setAllergiesInput(e.target.value)}
                    />
                    <Button 
                      variant="outline"
                      onClick={handleAllergiesUpdate}
                      disabled={!allergiesInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {formData.medicalHistory?.allergies && formData.medicalHistory.allergies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.medicalHistory.allergies.map((allergy, index) => (
                        <div
                          key={index} 
                          className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs"
                        >
                          {allergy}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="conditions">Chronic Conditions</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="conditions" 
                      placeholder="e.g., Asthma, Diabetes, Hypertension"
                      value={conditionsInput}
                      onChange={(e) => setConditionsInput(e.target.value)}
                    />
                    <Button 
                      variant="outline"
                      onClick={handleConditionsUpdate}
                      disabled={!conditionsInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {formData.medicalHistory?.chronicConditions && formData.medicalHistory.chronicConditions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.medicalHistory.chronicConditions.map((condition, index) => (
                        <div
                          key={index} 
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs"
                        >
                          {condition}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medications">Current Medications</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="medications" 
                      placeholder="e.g., Lisinopril, Metformin, Albuterol"
                      value={medicationsInput}
                      onChange={(e) => setMedicationsInput(e.target.value)}
                    />
                    <Button 
                      variant="outline"
                      onClick={handleMedicationsUpdate}
                      disabled={!medicationsInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {formData.medicalHistory?.currentMedications && formData.medicalHistory.currentMedications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.medicalHistory.currentMedications.map((medication, index) => (
                        <div
                          key={index} 
                          className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs"
                        >
                          {medication}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Medical Notes</Label>
                <Textarea 
                  id="additional-notes" 
                  placeholder="Any other relevant medical information..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="bg-healthcare-500 hover:bg-healthcare-600"
              >
                {isLoading ? "Saving..." : "Save Medical History"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle className="text-healthcare-800">Emergency Contacts</CardTitle>
              <CardDescription>
                Add contacts that should be notified in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Add New Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input id="contact-name" placeholder="Contact's full name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-relationship">Relationship</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input id="contact-phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div className="flex items-end">
                    <Button className="bg-healthcare-500 hover:bg-healthcare-600">
                      Add Contact
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Your Emergency Contacts</h3>
                
                <div className="space-y-3">
                  {/* Sample contacts - in a real app these would be loaded from the user's profile */}
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">Spouse • +1 (555) 987-6543</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Parent • +1 (555) 123-4567</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="bg-healthcare-500 hover:bg-healthcare-600"
              >
                {isLoading ? "Saving..." : "Save Emergency Contacts"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfileForm;
