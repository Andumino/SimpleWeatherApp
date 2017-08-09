import React from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'react-loading-indicator';

class ForecastNextDayWeather extends React.Component {
    getTimeStr(dt) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: false };
        return (new Date(dt * 1000)).toLocaleString('en-US', options);
    }

    renderNextDay(list) {
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay = nextDay.toDateString();
        console.log('nextDay = ', nextDay);
        return list.filter((day) => {
            const curDay = (new Date(day.dt * 1000)).toDateString();
            // console.log(day.dt_txt, ';', (new Date(day.dt * 1000)), ';', (curDay === nextDay));
            return (curDay === nextDay);
        })
        .map((day) => {
            return (
                <tr key={day.dt}>
                    <td>{this.getTimeStr(day.dt)}</td>
                    <td>{day.main.temp}&#8451;</td>
                    <td>{day.main.humidity}%</td>
                    <td>{day.wind.speed} м/с</td>
                </tr>

            );
        });
    }

    render() {
        const { isFetchingForecast, weather } = this.props;

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
                    <th>Час</th>
                    <th>Температура</th>
                    <th>Вологість</th>
                    <th>Вітер</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderNextDay(weather.forecast.list)}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => {
    const { weather } = state;

    return {
        weather
    };
};

ForecastNextDayWeather = connect(mapStateToProps)(ForecastNextDayWeather);

export default ForecastNextDayWeather;
