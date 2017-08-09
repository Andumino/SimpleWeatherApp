import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import ForecastNextDayWeather from '../ForecastNextDayWeather/ForecastNextDayWeather';

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
                        <Tab>На наступні 7 днів</Tab>
                        <Tab>На наступні 30 днів</Tab>
                    </TabList>

                    <TabPanel>
                        <CurrentWeather />
                    </TabPanel>
                    <TabPanel>
                        <ForecastNextDayWeather />
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
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
