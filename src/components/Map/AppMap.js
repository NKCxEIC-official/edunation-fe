/* eslint-disable */
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import AppMapLocation from './AddMapLocation';
import mapStyle from '../mapStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getDatafromDBAction } from '../../store/actions/AuthActions';
const containerStyle = {
  width: '100%',
  height: '70vh',
};

function AppMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationCenter, setLocationCenter] = useState();
  const [presentRedSpots, setPresentRedSpots] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [selectedLocation, setSelectedLocation] = useState();

  const [address, setAddress] = useState('');
  const locationInputRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);

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
    setSelectedLocation(value);
    setLocationCenter({ lat: fetchedCoordinates.lat, lng: fetchedCoordinates.lng });
  }

  useEffect(() => {
    if (locationCenter) {
      map.panTo(locationCenter);
      setZoom(13);
    }
  }, [locationCenter]);

  useEffect(() => {
    dispatch(getDatafromDBAction('redSpots', true, 'redSpots'));
  }, []);

  return isLoaded ? (
    currentLocation && (
      <Grid container maxWidth="lg">
        <Grid item xs={12} md={4} sx={{ mb: 4, pl: 2, pr: 2 }}>
          {!locationCenter && (
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              shouldFetchSuggestions={address.length > 3}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box>
                  <TextField
                    {...getInputProps({ placeholder: 'Enter Red Spot Address', className: 'address-input' })}
                    ref={locationInputRef}
                    fullWidth
                    label="Select Red Spot"
                  />
                  {loading && (
                    <div className="suggestion-item-container">
                      <CircularProgress />
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
                        <Typography variant="p" sx={{ fontSize: '12px', opacity: 0.8 }}>
                          please wite atleast 4 character
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </Box>
              )}
            </PlacesAutocomplete>
          )}

          {locationCenter && locationCenter?.lng && (
            <Box>
              <Stack spacing={2}>
                <Typography variant="subtitle" sx={{ opacity: 0.5 }}>
                  Selected Location Details
                </Typography>
                <Box>
                  <Typography variant="subtitle2">Latitude : {locationCenter.lat}</Typography>
                  <Typography variant="subtitle2">Longitude : {locationCenter.lng}</Typography>
                </Box>
                <AppMapLocation selectedLocation={selectedLocation} coords={locationCenter} />
              </Stack>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoom: zoom,
              styles: mapStyle,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {currentLocation && <Marker position={currentLocation} />}
            {locationCenter && (
              <Circle radius={2500} center={locationCenter} options={{ fillColor: 'red', strokeColor: 'red' }} />
            )}

            {locationCenter && (
              <Circle
                radius={100}
                center={locationCenter}
                options={{ fillColor: 'red', strokeColor: 'red', fillOpacity: 1 }}
              />
            )}

            {Object.keys(data?.redSpots).map(function (key, index) {
              return (
                <Circle
                  radius={2500}
                  center={data?.redSpots?.[key].coords}
                  options={{ fillColor: 'white', strokeColor: 'white' }}
                />
              );
            })}
          </GoogleMap>
        </Grid>
      </Grid>
    )
  ) : (
    <>Map Loading ...</>
  );
}

export default React.memo(AppMap);
