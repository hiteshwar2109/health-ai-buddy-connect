
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Heart, MapPin, MessageSquare, User } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-healthcare-50 to-healthcare-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-healthcare-900 mb-4">
                Your AI-Powered Health Companion
              </h1>
              <p className="text-xl text-healthcare-700 mb-8">
                Get personalized health insights, find nearby healthcare, and stay connected with emergency services - all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-healthcare-500 hover:bg-healthcare-600 text-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Try Symptom Checker
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg"
                  onClick={() => navigate("/auth")}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-healthcare-800 mb-12">
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="healthcare-card hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-healthcare-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-healthcare-500" />
                  </div>
                  <CardTitle className="text-healthcare-800">AI Symptom Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Describe your symptoms and get AI-powered analysis of possible conditions and recommendations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="healthcare-card hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-healthcare-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-healthcare-500" />
                  </div>
                  <CardTitle className="text-healthcare-800">Nearby Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Find hospitals, clinics, pharmacies, and other healthcare facilities near your location.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="healthcare-card hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-healthcare-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-emergency-500" />
                  </div>
                  <CardTitle className="text-healthcare-800">Emergency SOS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    One-click emergency alerts to your designated contacts with your location information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-healthcare-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-healthcare-800 mb-12">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-healthcare-200">
                  <span className="text-xl font-bold text-healthcare-500">1</span>
                </div>
                <h3 className="font-medium text-healthcare-800 mb-2">Create Account</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up and create your health profile with relevant medical history.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-healthcare-200">
                  <span className="text-xl font-bold text-healthcare-500">2</span>
                </div>
                <h3 className="font-medium text-healthcare-800 mb-2">Check Symptoms</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your symptoms to get AI-powered analysis and recommendations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-healthcare-200">
                  <span className="text-xl font-bold text-healthcare-500">3</span>
                </div>
                <h3 className="font-medium text-healthcare-800 mb-2">Find Healthcare</h3>
                <p className="text-sm text-muted-foreground">
                  Locate nearby medical facilities based on your current location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-healthcare-200">
                  <span className="text-xl font-bold text-healthcare-500">4</span>
                </div>
                <h3 className="font-medium text-healthcare-800 mb-2">Set Up Emergency</h3>
                <p className="text-sm text-muted-foreground">
                  Add emergency contacts for quick alerts in case of emergencies.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-healthcare-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust Health Buddy for their healthcare needs.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-healthcare-600 hover:bg-healthcare-50 border-white text-lg"
              onClick={() => navigate("/auth")}
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-healthcare-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-healthcare-400" />
                <span className="text-xl font-bold">HealthBuddy</span>
              </div>
              <p className="text-sm text-healthcare-300 mt-1">
                Your AI-powered health companion
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <Button variant="ghost" size="sm" className="text-healthcare-300 hover:text-white">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm" className="text-healthcare-300 hover:text-white">
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm" className="text-healthcare-300 hover:text-white">
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="border-t border-healthcare-800 mt-6 pt-6 text-center text-xs text-healthcare-400">
            © {new Date().getFullYear()} Health Buddy. All rights reserved. This application is for informational purposes only and is not a substitute for professional medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
