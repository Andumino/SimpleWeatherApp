import React from 'react';
import {connect} from 'react-redux';
import LoadingIndicator from 'react-loading-indicator';

class ForecastNext16DayWeather extends React.Component {
    getTimeStr(dt) {
        const options = {
            day: 'numeric', month: 'numeric', year: 'numeric', hour12: false
        };
        return (new Date(dt * 1000)).toLocaleString('ua-UA', options);
    }

    renderNextDay(list) {
        const today = (new Date()).getDate();
        return list.filter((day) => {
            const curDay = (new Date(day.dt * 1000)).getDate();
            return (curDay !== today);
        }).map((day) => {
            return (
                <tr key={day.dt}>
                    <td>{this.getTimeStr(day.dt)}</td>
                    <td>{day.temp.night}&#8451;</td>
                    <td>{day.temp.morn}&#8451;</td>
                    <td>{day.temp.day}&#8451;</td>
                    <td>{day.humidity}%</td>
                    <td>{day.speed} м/с</td>
                    <td>{day.weather[0].description}</td>
                </tr>

            );
        });
    }


    render() {
        const {isFetchingForecast16, weather} = this.props;

        if (weather.error) {
            return (
                <p>Помилка : {weather.error}</p>
            );
        }

        if (!weather.forecast || isFetchingForecast16) {
            return (
                <LoadingIndicator />
            );
        }

        return (
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Температура (вночі)</th>
                    <th>Температура (вранці)</th>
                    <th>Температура (вдень)</th>
                    <th>Вологість</th>
                    <th>Вітер</th>
                    <th>Прогноз</th>
                </tr>
                </thead>
                <tbody>
                {this.renderNextDay(weather.forecast16.list)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    const { weather } = state;

    return {
        weather
    };
};

ForecastNext16DayWeather = connect(mapStateToProps)(ForecastNext16DayWeather);

export default ForecastNext16DayWeather;
