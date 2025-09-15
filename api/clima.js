const axios = require('axios');


const LATITUDE = -22.9056;
const LONGITUDE = -47.0608;


const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&timezone=America%2FSao_Paulo`;


const weatherCodeMap = {
  0: 'Céu limpo',
  1: 'Principalmente céu limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Névoa',
  48: 'Névoa com deposição de gelo',
  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa densa',
  56: 'Garoa congelante leve',
  57: 'Garoa congelante densa',
  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  66: 'Chuva congelante leve',
  67: 'Chuva congelante forte',
  71: 'Nevasca leve',
  73: 'Nevasca moderada',
  75: 'Nevasca forte',
  77: 'Grãos de neve',
  80: 'Pancadas de chuva leves',
  81: 'Pancadas de chuva moderadas',
  82: 'Pancadas de chuva fortes',
  85: 'Pancadas de neve leves',
  86: 'Pancadas de neve fortes',
  95: 'Trovoada leve a moderada',
  96: 'Trovoada com granizo leve',
  99: 'Trovoada com granizo forte',
};

module.exports = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const { weathercode } = data.current_weather;

    const weatherDescription = weatherCodeMap[weathercode] || 'Não disponível';

    
    res.status(200).json({
      clima: weatherDescription,
    });

  } catch (error) {
  
    res.status(500).json({
      erro: 'Não foi possível obter os dados de clima.',
      detalhes: error.message,
    });
  }
};