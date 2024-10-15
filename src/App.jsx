import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
// import './App.css';
import './index.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  const handleCityChange = (inputTag) => {
    const { value } = inputTag;
    setCity(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  const fetchDetails = async () => {
    if (city) {
      try {
        const response = await axios({
          method: 'GET',
          url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`,
        });
        setWeather(response.data);
      } catch (error) {
        alert('City Not Found');
      }
    } else {
      alert('Please fill in the city name!');
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '100vh',
          backgroundImage: 'url(https://myradar.com/static/background-a089d87ba11e1a4c45a8efa960b86092.jpg)', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ width: '600px' }} className="shadow rounded p-5">
          <h2 style={{color:'white'}} className="text-center fw-bolder mb-4">Today's Weather Details!!!</h2>
          <div className="d-flex mb-4">
            <TextField
              sx={{background:'linear-gradient(to top, #0000FF, #FFFFFF)'}}
              onChange={(e) => handleCityChange(e.target)}
              
              id="outlined-basic"
              className="text-white w-75"
              label="Enter Your City"
              variant="outlined"
            />
            <Button
              sx={{ background:'linear-gradient(to bottom, #0000FF, #000000)', marginLeft: '10px' }}
              onClick={handleSearch}
              variant="contained"
            >
              Search
            </Button>
          </div>
          {weather && (
            <div className="row d-flex py-5">
              <div style={{ background: 'linear-gradient(to bottom, #87CEEB, #00008B)'}} className="col-6 d-flex align-items-center justify-content-center bg-dark p-4 rounded-start">
                <h2 className="display-4 text-light">
                  <i className="fa-solid fa-thermometer-empty"></i> {weather.main.temp}°C
                </h2>
              </div>
              <div style={{ background: 'linear-gradient(to bottom, #00008B, #87CEEB)'}} className="col-6 bg-secondary text-white p-4 rounded-end">
                <h2 className="fw-bold">{weather.name}</h2>
                <h4>
                  <i className="fa-solid fa-cloud"></i>
                  {weather.weather?.map((item) => item.description).join(', ')}
                </h4>
                <p>
                  <i className="fa-solid fa-globe"></i> Country: {weather.sys.country}
                </p>
                <p>
                  <i className="fa-solid fa-temperature-quarter"></i> Feels Like: {weather.main.feels_like}°C
                </p>
                <p>
                  <i className="fa-solid fa-droplet"></i> Humidity: {weather.main.humidity}%
                </p>
                <p>
                  <i className="fa-solid fa-wind"></i> Wind: {weather.wind.speed} km/h
                </p>
                <p>
                  <i className="fa-solid fa-tornado"></i> Pressure: {weather.main.pressure}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
