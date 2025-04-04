
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MedicalHistory, HealthTip } from "@/types";

interface HealthTipsProps {
  medicalHistory?: MedicalHistory;
}

export function HealthTips({ medicalHistory }: HealthTipsProps) {
  const [tips, setTips] = useState<HealthTip[]>([]);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API based on the user's medical history
    // For demo purposes, we'll use static data
    const allTips: HealthTip[] = [
      {
        id: "1",
        title: "Managing Allergies in Spring",
        description: "Stay indoors on high pollen days, use air purifiers, and take antihistamines as prescribed by your doctor to manage seasonal allergies.",
        category: "Allergies",
        relevantConditions: ["Pollen Allergy", "Hay Fever", "Allergic Rhinitis"]
      },
      {
        id: "2",
        title: "Controlling Asthma with Regular Exercise",
        description: "Regular, moderate exercise can help improve lung function and reduce asthma symptoms. Always keep your inhaler nearby when exercising.",
        category: "Respiratory Health",
        relevantConditions: ["Asthma"]
      },
      {
        id: "3",
        title: "Blood Sugar Management for Diabetics",
        description: "Regular monitoring, balanced meals, consistent exercise, and medication adherence are key to managing diabetes effectively.",
        category: "Diabetes Management",
        relevantConditions: ["Diabetes", "Type 1 Diabetes", "Type 2 Diabetes"]
      },
      {
        id: "4",
        title: "Heart-Healthy Diet Recommendations",
        description: "Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit sodium, saturated fats, and added sugars to support heart health.",
        category: "Heart Health",
        relevantConditions: ["Hypertension", "Heart Disease", "High Cholesterol"]
      },
      {
        id: "5",
        title: "Improving Sleep Quality",
        description: "Maintain a regular sleep schedule, create a restful environment, limit screen time before bed, and practice relaxation techniques for better sleep.",
        category: "General Wellness",
        relevantConditions: []
      },
      {
        id: "6",
        title: "Staying Hydrated Throughout the Day",
        description: "Drink water regularly, eat water-rich foods, and limit alcohol and caffeine to maintain proper hydration for overall health.",
        category: "General Wellness",
        relevantConditions: []
      },
      {
        id: "7",
        title: "Managing Medication Side Effects",
        description: "Take medications as prescribed, report side effects to your doctor, and never stop medication without consulting your healthcare provider.",
        category: "Medication Management",
        relevantConditions: []
      },
      {
        id: "8",
        title: "Stress Reduction Techniques",
        description: "Practice deep breathing, meditation, physical activity, and time management to reduce stress and improve mental wellbeing.",
        category: "Mental Health",
        relevantConditions: ["Anxiety", "Depression", "Stress"]
      }
    ];
    
    if (medicalHistory && 
        (medicalHistory.allergies.length > 0 || 
         medicalHistory.chronicConditions.length > 0)) {
      // Filter tips based on medical history
      const relevantTips = allTips.filter(tip => {
        // Include general wellness tips for everyone
        if (tip.category === "General Wellness") return true;
        
        // Check if tip is relevant to user's conditions
        const isRelevantToConditions = medicalHistory.chronicConditions.some(condition => 
          tip.relevantConditions.some(rc => 
            rc.toLowerCase().includes(condition.toLowerCase()) || 
            condition.toLowerCase().includes(rc.toLowerCase())
          )
        );
        
        // Check if tip is relevant to user's allergies
        const isRelevantToAllergies = tip.category === "Allergies" && 
          medicalHistory.allergies.length > 0;
        
        return isRelevantToConditions || isRelevantToAllergies;
      });
      
      setTips(relevantTips);
    } else {
      // If no medical history, just show general wellness tips
      setTips(allTips.filter(tip => tip.category === "General Wellness"));
    }
  }, [medicalHistory]);
  
  return (
    <Card className="healthcare-card">
      <CardHeader>
        <CardTitle className="text-healthcare-800">Personalized Health Tips</CardTitle>
        <CardDescription>
          Health recommendations based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        {medicalHistory ? (
          <>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Based on your health profile:</h3>
              <div className="flex flex-wrap gap-2">
                {medicalHistory.allergies.length > 0 && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Allergies: {medicalHistory.allergies.join(", ")}
                  </Badge>
                )}
                {medicalHistory.chronicConditions.length > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Conditions: {medicalHistory.chronicConditions.join(", ")}
                  </Badge>
                )}
                {medicalHistory.bloodType && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Blood Type: {medicalHistory.bloodType}
                  </Badge>
                )}
              </div>
            </div>
            
            {tips.length > 0 ? (
              <div className="space-y-6">
                {tips.map((tip) => (
                  <div key={tip.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{tip.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                    <Separator className="my-1" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <h3 className="font-medium text-muted-foreground">No specific tips available for your profile yet</h3>
                <p className="text-sm mt-2">Update your medical history to get personalized recommendations</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="font-medium text-muted-foreground">Complete your profile to get personalized health tips</h3>
            <p className="text-sm mt-2">We'll provide recommendations based on your medical history</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HealthTips;
