// Calls OpenAI’s image-generation API and inserts the image in the page
async function generateImage() {
  const apiKey  = 'YOUR_OPENAI_API_KEY';
  const prompt  = 'A cute baby sea otter';
  const apiUrl  = 'https://api.openai.com/v1/images/generations';

  const requestBody = {
    model: 'gpt-image-1',
    prompt,
    n: 1,
    size: '1024x1024' // gpt-image-1 always returns base64
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    // Parse the response as JSON
    const jsonResponse = await response.json();
    const data = jsonResponse.data;
    const base64Image = data[0].b64_json;

    document.body.insertAdjacentHTML(
      'beforeend',
      `<img src="data:image/png;base64,${base64Image}" alt="${prompt}" width="256">`
    );
  } catch (error) {
      console.error('Image generation failed:', error);
  }
}

// Generate and display the image
generateImage();