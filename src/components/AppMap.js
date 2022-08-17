/* eslint-disable */
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Grid, TextField } from '@mui/material';
import location from './location.png';
import myLocation from './location-live.png';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const containerStyle = {
  width: '100%',
  height: '70vh',
};

function AppMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationCenter, setLocationCenter] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [address, setAddress] = useState('');
  const locationInputRef = useRef();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDQuYLOkxwplkkLSKeb-mU_Yn9vJElzYS0',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(currentLocation);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  function success(pos) {
    const crd = pos.coords;
    setCurrentLocation({ lat: crd.latitude, lng: crd.longitude });
    setLocationCenter({ lat: crd.latitude, lng: crd.longitude });
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 100,
      };
      const watchID = navigator.geolocation.watchPosition(success, error, options);
      setTimeout(() => {
        navigator.geolocation.clearWatch(watchID);
      }, 5000);
    } else {
      // Fallback for no geolocation
    }
  }, []);

  async function handleSelect(value) {
    const results = await geocodeByAddress(value);
    const fetchedCoordinates = await getLatLng(results[0]);
    console.log({ lat: fetchedCoordinates.lat, lng: fetchedCoordinates.lng });
    setSelectedLocation({ lat: fetchedCoordinates.lat, lng: fetchedCoordinates.lng });
    setLocationCenter({ lat: fetchedCoordinates.lat, lng: fetchedCoordinates.lng });
  }

  return isLoaded ? (
    currentLocation && (
      <Grid container maxWidth="lg">
        <Grid item md={3}>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            shouldFetchSuggestions={address.length > 3}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <TextField
                  {...getInputProps({ placeholder: 'Enter Red Spot Address', className: 'address-input' })}
                  ref={locationInputRef}
                  fullWidth
                />
                {loading && (
                  <div className="suggestion-item-container">
                    {/* <Spinner animation="border" variant="primary" /> */}
                  </div>
                )}
                <div>
                  {suggestions &&
                    suggestions.map((suggestion, key) => {
                      return (
                        <div {...getSuggestionItemProps(suggestion)} key={key} className="suggestion-item-container">
                          <div>
                            <div xs={2}>
                              <div className="icon-container">
                                <span>{/* <div icon={faMapMarkerAlt} /> */}</span>
                              </div>
                            </div>
                            <div className="suggestion-item-desc">
                              <h4>{suggestion.formattedSuggestion.mainText}</h4>
                              <span>{suggestion.formattedSuggestion.secondaryText}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {address.length < 5 ? (
                    <div class="nf">
                      <span>{/* <div icon={faSmileBeam} /> */}</span>
                      <h6>please wite atleast 4 character for me</h6>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Grid>
        <Grid item md={9}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker icon={myLocation} position={currentLocation} />
            {selectedLocation && <Marker icon={location} position={selectedLocation} />}
          </GoogleMap>
        </Grid>
      </Grid>
    )
  ) : (
    <>Map Loading ...</>
  );
}

export default React.memo(AppMap);
