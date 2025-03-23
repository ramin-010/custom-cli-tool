const { Command } = require('commander'); // For CLI commands
const { log } = require('console');
const program = new Command();
const axios = require('axios'); 
require('dotenv').config();

const Api_key = process.env.Api_key; // API key from .env file

// Setting up CLI details
program
    .name('weather-CLI')
    .description('CLI for weather report')
    .version('1.0.0');

// 'weather' command to fetch weather details
program
    .command('weather')
    .description('Get the current weather of a city')
    .option('-c, --city <city>', 'City Name')
    .action(async (opt) => {
        const city = opt.city;

        if (!city) {
            log('Error: Please enter a city name.');
            return;
        }

        try {
            // Fetching weather data
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${Api_key}&q=${city}&aqi=no`);
            const data = response.data;

            // Displaying results
            log(`Weather in ${city}: ${data.current.condition.text}`);
            log(`Humidity: ${data.current.humidity}%`);
            log(`Temperature: ${data.current.temp_c}°C`);
        } catch (err) {
            log('Error in fetching the weather data. Please check the API key or city name.');
        }
    });

program.parse(process.argv); // Parse the CLI arguments
