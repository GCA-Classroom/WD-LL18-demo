const imgContainer = document.getElementById('img-container');

async function generateImage() {
  // The prompt for the image
  const prompt  = 'A cute baby snake';
  // The API endpoint URL
  const apiUrl  = 'https://api.openai.com/v1/images/generations';

  // Create the request body for the API
  const requestBody = {
    model: 'gpt-image-1',
    quality: 'medium', 
    prompt,
    n: 1,
    size: '1024x1024' // gpt-image-1 always returns base64
  };

  // Show a loading message
  imgContainer.textContent = 'Loading image...';

  try {
    // Send the request to OpenAI API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}` // Use the key from secrets.js
      },
      body: JSON.stringify(requestBody)
    });

    // Parse the response as JSON
    const jsonResponse = await response.json();
    const data = jsonResponse.data;
    const base64Image = data[0].b64_json;

    // Display the image in the #img-container
    imgContainer.innerHTML =
      `<img src="data:image/png;base64,${base64Image}" alt="${prompt}">`;
  } catch (error) {
    // Log any errors to the console
    console.error('Image generation failed:', error);
  }
}

// Generate and display the image
generateImage();