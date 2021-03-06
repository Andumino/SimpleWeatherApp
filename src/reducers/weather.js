import {
	REQUEST_WEATHER,
	REQUEST_WEATHER_FAILED,
	RECEIVE_WEATHER,
	REQUEST_FORECAST,
	REQUEST_FORECAST_FAILED,
	RECEIVE_FORECAST,
    REQUEST_FORECAST16,
    REQUEST_FORECAST16_FAILED,
    RECEIVE_FORECAST16
} from '../actions';

const initialState = {
    isFetchingCurrent: true,
    isFetchingForecast: true,
    isFetchingForecast16: true
};

export default function weather(state = initialState, action) {
	switch (action.type) {
		case REQUEST_WEATHER:
			return Object.assign({}, state, {
				isFetchingCurrent: true,
			});
		case REQUEST_WEATHER_FAILED:
			return Object.assign({}, state, {
                isFetchingCurrent: false,
				error: action.error
			});
		case RECEIVE_WEATHER: {
            let state1 = Object.assign({}, state);
			delete state1.error;
            return Object.assign({}, state1, {
                isFetchingCurrent: false,
                current: action.payload.json
            });
        }
		case REQUEST_FORECAST:
			return Object.assign({}, state, {
                isFetchingForecast: true,
			});
		case REQUEST_FORECAST_FAILED:
			return Object.assign({}, state, {
                isFetchingForecast: false,
				error: action.error
			});
		case RECEIVE_FORECAST:
			return Object.assign({}, state, {
                isFetchingForecast: false,
				forecast: action.payload.json
			});
        case REQUEST_FORECAST16:
            return Object.assign({}, state, {
                isFetchingForecast16: true,
            });
        case REQUEST_FORECAST16_FAILED:
            return Object.assign({}, state, {
                isFetchingForecast16: false,
                error: action.error
            });
        case RECEIVE_FORECAST16:
            return Object.assign({}, state, {
                isFetchingForecast16: false,
                forecast16: action.payload.json
            });
		default:
			return state;
	}
}
