import axios from 'axios';

export class LLMProvider {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    // Configuração para acessar um serviço de LLM (exemplo: OpenAI API)
    this.apiKey = process.env.LLM_API_KEY || ''; // Chave de API armazenada em variáveis de ambiente
    this.apiUrl = process.env.LLM_API_URL || 'https://api.openai.com/v1/completions'; // URL da API
  }

  async getWateringSuggestion(input: {
    plantName: string;
    speciesName: string;
    isOutdoor: boolean;
    isIlluminated: boolean;
    state: string;
  }): Promise<string> {
    const additionalContext = `The plant is located in ${input.state}, and it is ${
      input.isOutdoor ? 'outdoor' : 'indoor'
    }. The area is ${input.isIlluminated ? 'well-lit' : 'shaded'}.`;

    // Prompt enviado ao modelo de linguagem
    const prompt = `
      Based on the following details, provide a watering schedule for the plant:
      - Plant Name: ${input.plantName}
      - Species Name: ${input.speciesName}
      - Location: ${input.state}
      - Outdoor: ${input.isOutdoor ? 'Yes' : 'No'}
      - Illuminated: ${input.isIlluminated ? 'Yes' : 'No'}
      ${additionalContext}
      Suggest the watering frequency in days.
    `;

    try {
      // Chamada à API do LLM
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'text-davinci-003', // Modelo usado (exemplo: GPT-3.5)
          prompt: prompt,
          max_tokens: 50, // Limite de tokens na resposta
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      // Processa a resposta do LLM
      const suggestion = response.data.choices[0].text.trim();
      return suggestion || 'No suggestion available';
    } catch (error) {
      console.error('Error fetching watering suggestion:', error);
      throw new Error('Failed to fetch watering suggestion from LLM');
    }
  }
}