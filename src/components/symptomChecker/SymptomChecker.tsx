
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share } from "lucide-react";
import { toast } from "sonner";
import { analyzeSymptoms, sendWhatsAppMessage } from "@/lib/api";
import { SymptomCheckerResult } from "@/types";

export function SymptomChecker() {
  const [apiKey, setApiKey] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomCheckerResult | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const addSymptom = () => {
    if (currentSymptom.trim() !== "" && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };
  
  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSymptom();
    }
  };
  
  const analyzeSymptomsList = async () => {
    if (symptoms.length === 0) {
      toast.error("Please add at least one symptom");
      return;
    }
    
    if (!apiKey) {
      toast.error("Please enter your Groq API key");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const allSymptoms = [...symptoms];
      if (additionalInfo.trim()) {
        allSymptoms.push(`Additional information: ${additionalInfo}`);
      }
      
      const analysisResult = await analyzeSymptoms(allSymptoms, apiKey);
      
      const formattedResult: SymptomCheckerResult = {
        symptoms: symptoms,
        possibleConditions: analysisResult.possibleConditions || [],
        urgencyLevel: analysisResult.urgencyLevel || "low",
        generatedAt: new Date().toISOString()
      };
      
      setResult(formattedResult);
      toast.success("Symptom analysis complete");
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast.error("Failed to analyze symptoms. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "emergency": return "bg-emergency-500";
      default: return "bg-green-500";
    }
  };
  
  const shareViaWhatsApp = async () => {
    if (!result) return;
    
    if (!phoneNumber || !phoneNumber.match(/^\+?[0-9]{10,15}$/)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    try {
      // Format message for WhatsApp
      const message = `
*Health Buddy Symptom Analysis*

*Symptoms:* ${result.symptoms.join(", ")}

*Possible Conditions:*
${result.possibleConditions.slice(0, 3).map(condition => 
  `- ${condition.name} (${Math.round(condition.probability * 100)}%)
   ${condition.description}`
).join("\n\n")}

*Urgency Level:* ${result.urgencyLevel.toUpperCase()}

*Important:* This is not a medical diagnosis. Please consult with a healthcare professional.

Generated at: ${new Date(result.generatedAt).toLocaleString()}
      `.trim();
      
      const success = await sendWhatsAppMessage(phoneNumber, message);
      
      if (success) {
        toast.success("Report shared via WhatsApp");
      } else {
        toast.error("Failed to share report. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing via WhatsApp:", error);
      toast.error("Failed to share report. Please try again.");
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="healthcare-card">
        <CardHeader>
          <CardTitle className="text-healthcare-800">AI Symptom Checker</CardTitle>
          <CardDescription>
            Enter your symptoms for analysis and get potential conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Groq API Key (Required)</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Groq API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your API key is required for the symptom analysis. It's only used for this request and not stored.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptom">Your Symptoms</Label>
            <div className="flex gap-2">
              <Input
                id="symptom"
                placeholder="e.g., headache, fever, cough"
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                variant="secondary"
                onClick={addSymptom}
                disabled={currentSymptom.trim() === ""}
              >
                Add
              </Button>
            </div>
          </div>
          
          {symptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {symptoms.map((symptom, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => removeSymptom(symptom)}
                >
                  {symptom} &times;
                </Badge>
              ))}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional Information (Optional)</Label>
            <Textarea
              id="additional-info"
              placeholder="Provide any additional details that might be relevant..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={analyzeSymptomsList}
            disabled={symptoms.length === 0 || !apiKey || isAnalyzing}
            className="w-full bg-healthcare-500 hover:bg-healthcare-600"
          >
            {isAnalyzing ? "Analyzing Symptoms..." : "Analyze Symptoms"}
          </Button>
        </CardFooter>
      </Card>
      
      {result && (
        <Card className="healthcare-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-healthcare-800">Analysis Results</CardTitle>
              <Badge className={`${getUrgencyColor(result.urgencyLevel)} text-white`}>
                {result.urgencyLevel.toUpperCase()} URGENCY
              </Badge>
            </div>
            <CardDescription>
              Generated at {new Date(result.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Symptoms Analyzed</h3>
              <div className="flex flex-wrap gap-2">
                {result.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Possible Conditions</h3>
              <div className="space-y-4">
                {result.possibleConditions.map((condition, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{condition.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(condition.probability * 100)}%
                      </span>
                    </div>
                    <Progress value={condition.probability * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">{condition.description}</p>
                    
                    {condition.recommendations && condition.recommendations.length > 0 && (
                      <div className="pl-4 border-l-2 border-healthcare-300">
                        <h4 className="text-xs font-semibold mb-1">Recommendations:</h4>
                        <ul className="text-sm space-y-1">
                          {condition.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-md">
              <p className="text-sm font-medium text-muted-foreground">
                <strong>Important Disclaimer:</strong> This analysis is not a medical diagnosis and should not be used as a substitute for professional medical advice. 
                Please consult with a healthcare professional for proper evaluation and treatment.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="phone-number" className="text-sm mb-2 block">
                Share report via WhatsApp
              </Label>
              <div className="flex gap-2">
                <Input
                  id="phone-number"
                  placeholder="WhatsApp number (with country code)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  className="gap-2 whitespace-nowrap"
                  onClick={shareViaWhatsApp}
                >
                  <Share size={16} />
                  Share
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default SymptomChecker;
