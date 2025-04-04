
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { UserCredentials, UserRegistrationData } from "@/types";

export function AuthForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<UserCredentials>({
    email: "",
    password: ""
  });
  const [registrationData, setRegistrationData] = useState<UserRegistrationData>({
    name: "",
    email: "",
    password: "",
    medicalHistory: {
      allergies: [],
      chronicConditions: [],
      currentMedications: [],
      bloodType: undefined
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here we would normally authenticate with a backend
      console.log("Login data:", loginData);
      
      // Simulate successful login
      setTimeout(() => {
        toast.success("Login successful!");
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here we would normally register with a backend
      console.log("Registration data:", registrationData);
      
      // Simulate successful registration
      setTimeout(() => {
        toast.success("Registration successful! Please complete your profile.");
        navigate("/profile");
      }, 1500);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRegistrationData = (field: string, value: any) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateMedicalHistory = (field: string, value: any) => {
    setRegistrationData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: value
      }
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-healthcare-800">Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      variant="link" 
                      className="text-xs text-healthcare-600 px-0"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-healthcare-500 hover:bg-healthcare-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-healthcare-800">Create Account</CardTitle>
              <CardDescription>
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegistration}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={registrationData.name}
                    onChange={(e) => updateRegistrationData("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={registrationData.email}
                    onChange={(e) => updateRegistrationData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password"
                    value={registrationData.password}
                    onChange={(e) => updateRegistrationData("password", e.target.value)}
                    required
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label>Basic Medical Information (Optional)</Label>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="blood-type" className="text-sm">Blood Type</Label>
                      <Select 
                        onValueChange={(value) => updateMedicalHistory("bloodType", value)}
                      >
                        <SelectTrigger className="mt-1">
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
                    
                    <div>
                      <Label htmlFor="allergies" className="text-sm">Allergies (separated by commas)</Label>
                      <Input 
                        id="allergies" 
                        placeholder="e.g., Peanuts, Penicillin, Latex" 
                        className="mt-1"
                        onChange={(e) => updateMedicalHistory("allergies", e.target.value.split(',').map(item => item.trim()))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="conditions" className="text-sm">Chronic Conditions (separated by commas)</Label>
                      <Input 
                        id="conditions" 
                        placeholder="e.g., Asthma, Diabetes, Hypertension" 
                        className="mt-1"
                        onChange={(e) => updateMedicalHistory("chronicConditions", e.target.value.split(',').map(item => item.trim()))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-healthcare-500 hover:bg-healthcare-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthForm;
