import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import ForecastNextDayWeather from '../ForecastNextDayWeather/ForecastNextDayWeather';
import ForecastNext5DayWeather from '../ForecastNext5DayWeather/ForecastNext5DayWeather';
import ForecastNext16DayWeather from '../ForecastNext16DayWeather/ForecastNext16DayWeather';

class Weather extends React.Component {

	render() {
		const { isFetching, weather } = this.props;

		if (weather.error) {
			return (
				<p>Помилка отримання даних: {weather.error}</p>
			);
		}

        let city = '';

        if (weather.current) {
            city = weather.current.name + ', ' + weather.current.sys.country;
		}

		return (
			<div className="Weather">
                <p> Назва: {city} </p>
                <Tabs>
                    <TabList>
                        <Tab>В даний час</Tab>
                        <Tab>Завтра</Tab>
                        <Tab>На наступні 5 днів</Tab>
                        <Tab>На наступні 16 днів</Tab>
                    </TabList>

                    <TabPanel>
                        <CurrentWeather />
                    </TabPanel>
                    <TabPanel>
                        <ForecastNextDayWeather />
                    </TabPanel>
                    <TabPanel>
                        <ForecastNext5DayWeather />
                    </TabPanel>
                    <TabPanel>
                        <ForecastNext16DayWeather />
                    </TabPanel>
                </Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { location, weather } = state;

	return {
		location,
		weather
	};
};

Weather = connect(mapStateToProps)(Weather);

export default Weather;
