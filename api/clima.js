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
};

module.exports = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const { temperature, windspeed, winddirection, weathercode } = data.current_weather;

    const weatherDescription = weatherCodeMap[weathercode] || 'Não disponível';

    res.status(200).json({
      localizacao: 'Aurora',
      descricao: weatherDescription,
      temperatura: `${temperature}°C`,
      velocidade_vento: `${windspeed} km/h`,
      direcao_vento: `${winddirection}°`,
    });

  } catch (error) {
    res.status(500).json({
      erro: 'Não foi possível obter os dados de clima.',
      detalhes: error.message,
    });
  }
};