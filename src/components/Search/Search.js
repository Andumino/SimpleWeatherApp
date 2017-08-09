import React from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchForecast, fetchForecast16} from '../../actions';
import Autocomplete from 'react-google-autocomplete';

class Search extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.onFetchFotrecast = this.onFetchFotrecast.bind(this);
    //     // this.onFetchWeather = this.onFetchWeather.bind(this);
    // }

    PlaceSelected(place) {
        let city = place.formatted_address || place.name;
        this.props.onFetchFotrecast(city);
        this.props.onFetchWeather(city);
    }

    render() {
        return (
            <Autocomplete
                placeholder = "Вкажіть місто"
                ref="city"
                style={{width: '90%'}}
                onPlaceSelected={this.PlaceSelected.bind(this)}
                types={['(cities)']}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        onFetchWeather: function (city) {
            return dispatch(fetchWeather(`q=${city}`));
        },
        onFetchFotrecast: function (city) {
            return dispatch(fetchForecast(`q=${city}`));
        },
        onFetchFotrecast16: function (city) {
            return dispatch(fetchForecast16(`q=${city}`));
        },
    };
}

Search = connect(null, mapDispatchToProps)(Search);

export default Search;
