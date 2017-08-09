import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'react-loading-indicator';

class CurrentWeather extends React.Component {

    render() {
        const { isFetchingCurrent, weather } = this.props;

        if (weather.error) {
            return (
                <p>Помилка : {weather.error}</p>
            );
        }

        if (!weather.current || isFetchingCurrent) {
            return (
                <LoadingIndicator />
            );
        }

        return (
            <div className="CurrentWeather">
                <p> Температура: {weather.current.main.temp}&#8451;</p>
                <p> Вологість: {weather.current.main.humidity}% </p>
                <p> Вітер: {weather.current.wind.speed} м/с </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { weather } = state;

    return {
        weather
    };
};

CurrentWeather = connect(mapStateToProps)(CurrentWeather);

export default CurrentWeather;
