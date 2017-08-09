import React from 'react';
import {connect} from 'react-redux';
import LoadingIndicator from 'react-loading-indicator';

class ForecastNext5DayWeather extends React.Component {
    getTimeStr(dt) {
        const options = {
            day: 'numeric', month: 'numeric', year: 'numeric',
            hour: 'numeric', minute: 'numeric', hour12: false
        };
        return (new Date(dt * 1000)).toLocaleString('ua-UA', options);
    }

    renderNextDay(list) {
        const today = (new Date()).getDate();
        // console.log('nextDay = ', nextDay);
        return list.filter((day) => {
            const curDay = (new Date(day.dt * 1000)).getDate();
            // console.log(day.dt_txt, ';', (new Date(day.dt * 1000)), ';', (curDay === nextDay));
            return (curDay !== today);
        }).map((day) => {
            return (
                <tr key={day.dt}>
                    <td>{this.getTimeStr(day.dt)}</td>
                    <td>{day.main.temp}&#8451;</td>
                    <td>{day.main.humidity}%</td>
                    <td>{day.wind.speed} м/с</td>
                    <td>{day.weather[0].description}</td>
                </tr>

            );
        });
    }

    render() {
        const {isFetchingForecast, weather} = this.props;

        if (weather.error) {
            return (
                <p>Помилка : {weather.error}</p>
            );
        }

        if (!weather.forecast || isFetchingForecast) {
            return (
                <LoadingIndicator />
            );
        }

        return (
            <table>
                <thead>
                <tr>
                    <th>Дата та час</th>
                    <th>Температура</th>
                    <th>Вологість</th>
                    <th>Вітер</th>
                    <th>Прогноз</th>
                </tr>
                </thead>
                <tbody>
                {this.renderNextDay(weather.forecast.list)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    const {weather} = state;

    return {
        weather
    };
};

ForecastNext5DayWeather = connect(mapStateToProps)(ForecastNext5DayWeather);

export default ForecastNext5DayWeather;
