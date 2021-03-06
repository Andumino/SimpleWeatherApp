import fetch from 'isomorphic-fetch';
// import { key as APP_ID } from '../../config';
const APP_ID = 'd53956dad34db9cb8fdb8ac81e1a9579';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const REQUEST_WEATHER_FAILED = 'REQUEST_WEATHER_FAILED';

export const REQUEST_FORECAST = 'REQUEST_FORECAST';
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';
export const REQUEST_FORECAST_FAILED = 'REQUEST_FORECAST_FAILED';

export const REQUEST_FORECAST16 = 'REQUEST_FORECAST16';
export const RECEIVE_FORECAST16 = 'RECEIVE_FORECAST16';
export const REQUEST_FORECAST16_FAILED = 'REQUEST_FORECAST16_FAILED';

export function requestWeather() {
	return {
		type: REQUEST_WEATHER
	};
}

export function requestWeatherFailed(error) {
	return {
		type: REQUEST_WEATHER_FAILED,
		error
	};
}

export function receiveWeather(json) {
	return {
		type: RECEIVE_WEATHER,
		payload: {
			json
		}
	};
}

export function requestForecast() {
	return {
		type: REQUEST_FORECAST
	};
}


export function requestForecastFailed(error) {
	return {
		type: REQUEST_FORECAST_FAILED,
		error
	};
}

export function receiveForecast(json) {
	return {
		type: RECEIVE_FORECAST,
		payload: {
			json
		}
	};
}

export function requestForecast16() {
    return {
        type: REQUEST_FORECAST16
    };
}


export function requestForecast16Failed(error) {
    return {
        type: REQUEST_FORECAST16_FAILED,
        error
    };
}

export function receiveForecast16(json) {
    return {
        type: RECEIVE_FORECAST16,
        payload: {
            json
        }
    };
}


export function fetchWeather(params) {
    // console.log('start Actions.fetchWeather params=', params);
	const url = `${BASE_URL}/weather?${params}&units=metric&appid=${APP_ID}&lang=ua`;

	return function (dispatch) {
		dispatch(requestWeather());

		return fetch(url)
			.then(response => response.json())
			.then(json => {
                // console.log(json);
                // console.log('json.cod = ', json.cod);
                if (json.cod == 200) {
                    dispatch(receiveWeather(json));
                } else {
                    dispatch(requestWeatherFailed(json.message));
                }
            })
			.catch(error => dispatch(requestWeatherFailed(error.toString())));
	};
}

export function fetchForecast(params) {
    // console.log('start Actions.fetchForecast params=', params);
	const url = `${BASE_URL}/forecast?${params}&units=metric&appid=${APP_ID}&lang=ua`;

	return function (dispatch) {
		dispatch(requestForecast());

		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(receiveForecast(json)))
			.catch(error => {
				console.log('error happened when fetchForecast: ', error);
				dispatch(requestForecastFailed(error.toString()));
			});
	};
}

export function fetchForecast16(params) {
    // console.log('start Actions.fetchForecast params=', params);
    const url = `${BASE_URL}/forecast/daily?${params}&units=metric&appid=${APP_ID}&lang=ua`;

    return function (dispatch) {
        dispatch(requestForecast16());

        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveForecast16(json)))
            .catch(error => {
                console.log('error happened when fetchForecast16: ', error);
                dispatch(requestForecast16Failed(error.toString()));
            });
    };
}

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export function requestLocation() {
	return {
		type: REQUEST_LOCATION
	};
}

export function receiveLocation(location) {
    // console.log('start Actions.receiveLocation');
    // console.log('recive location:', location);

	return {
		type: RECEIVE_LOCATION,
		payload: {
			location
		}
	};
}

export function fetchLocation() {
	return function (dispatch) {
		// console.log('start fetch Location');
		if (navigator.geolocation) {
			dispatch(requestLocation());
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.log('navigator.geolocation not supported.');
		}

		function success(position) {
			const { latitude, longitude } = position.coords;
			dispatch(receiveLocation({ latitude, longitude }));
            dispatch(fetchWeather(`lat=${latitude}&lon=${longitude}`));
            dispatch(fetchForecast(`lat=${latitude}&lon=${longitude}`));
            dispatch(fetchForecast16(`lat=${latitude}&lon=${longitude}`));
		}

		function error(error) {
			console.error('navigator.geolocation.getCurrentPosition - ',error);

            fetch('https://ipinfo.io/json')
                .then(response => response.json())
                .then(json => {
                    const latitude = json.loc.split(',')[0];
                    const longitude = json.loc.split(',')[1];
                    dispatch(receiveLocation({ latitude, longitude }));
                    dispatch(fetchWeather(`lat=${latitude}&lon=${longitude}`));
                    dispatch(fetchForecast(`lat=${latitude}&lon=${longitude}`));
                    dispatch(fetchForecast16(`lat=${latitude}&lon=${longitude}`));
                })
                .catch(error => {
                    console.log('error request from "https://ipinfo.io/json" : ', error);
                });

		}
	};
}
