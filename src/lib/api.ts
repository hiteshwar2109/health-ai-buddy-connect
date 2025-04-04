
// This utility file contains API functions for interacting with external services

// Function to analyze symptoms with Groq API
export async function analyzeSymptoms(symptoms: string[], apiKey: string): Promise<any> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI medical assistant. Analyze the symptoms provided and suggest possible conditions, 
                      their probabilities, brief descriptions, and recommendations. Always include a disclaimer that this is not 
                      professional medical advice and the user should consult with a healthcare professional. Rate the urgency level 
                      as low, medium, high, or emergency. Format the response as a JSON object with keys: 
                      possibleConditions (array of objects with name, probability, description, recommendations), 
                      urgencyLevel (string), and disclaimer (string).`
          },
          {
            role: 'user',
            content: `Analyze these symptoms: ${symptoms.join(', ')}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Extract JSON from the content if needed
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON from response:", e);
      return { error: "Failed to parse response", rawContent: content };
    }
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
}

// Function to search for nearby healthcare facilities using Google Maps API
export async function findNearbyHealthcare(
  position: GeolocationPosition,
  apiKey: string,
  type: string = 'hospital',
  radius: number = 5000
): Promise<any> {
  try {
    const { latitude, longitude } = position.coords;
    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
    
    // This would typically be proxied through your backend to protect your API key
    // For demonstration, we're showing the direct call
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(endpoint)}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error finding nearby healthcare:", error);
    throw error;
  }
}

// Function to send WhatsApp message using WhatsApp Business API
export async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  try {
    // This would typically be handled by your backend
    // For demonstration, we're showing a mock implementation
    console.log(`Sending WhatsApp message to ${to}: ${message}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

// Function to send emergency SMS to contacts
export async function sendEmergencySMS(
  contacts: { name: string; phone: string }[],
  message: string,
  location?: GeolocationPosition
): Promise<{ success: boolean; failed: string[] }> {
  try {
    // This would typically be handled by your backend
    // For demonstration, we're showing a mock implementation
    console.log("Sending emergency SMS to contacts:", contacts);
    
    let locationText = "";
    if (location) {
      const { latitude, longitude } = location.coords;
      locationText = `\nLocation: https://maps.google.com/?q=${latitude},${longitude}`;
    }
    
    const fullMessage = `${message}${locationText}`;
    console.log("Message:", fullMessage);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate some failures for demonstration
    const failed = contacts
      .filter(() => Math.random() > 0.8)
      .map(contact => contact.name);
    
    return {
      success: true,
      failed
    };
  } catch (error) {
    console.error("Error sending emergency SMS:", error);
    return {
      success: false,
      failed: contacts.map(contact => contact.name)
    };
  }
}
