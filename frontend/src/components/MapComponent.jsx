import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

function MapComponent({ latitude, longitude }) {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat: latitude, lng: longitude }} zoom={12}>
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
