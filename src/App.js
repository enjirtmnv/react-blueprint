import React from 'react';
import './App.css';
import {MapContainer, ImageOverlay, FeatureGroup, ZoomControl} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';
import L from 'leaflet';
import blueprint from './img/blueprint.svg';
import "leaflet/dist/leaflet.css";
import 'leaflet-draw/dist/leaflet.draw.css';
import './App.css';
import blackPin from './img/pin-black.png';
import redPin from './img/pin-red.png';
import shadowPin from './img/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: blackPin,
    iconUrl: blackPin,
    iconSize: [40, 40],
    shadowUrl: shadowPin,
    shadowSize: [40, 40],
    shadowAnchor: [4, 40]
});

function App() {
    const bounds = [[0, 0], [1000, 2000]];
    const style = {height: '700px', width: '1000px'};

    const created = e => {
        console.log(e);

        function changeMarkerSize(e) {
            e.layer._icon.addEventListener('mouseover', function (e) {
                e.target.src = redPin;
            });
            e.layer._icon.addEventListener('mouseout', function (e) {
                e.target.src = blackPin;
            });
        }


        function changeColor(e) {
            e.target.addEventListener('mouseover', function () {
                e.layer.options.color = '#ff3e83';
            });

            e.target.addEventListener('mouseout', function () {
                e.layer.options.color = '#3388ff';
            });
        }

        if (e.layerType === 'rectangle'
            || e.layerType === 'polygon'
            || e.layerType === 'circle'
        ) {
            changeColor(e)
        }

        if (e.layerType === 'marker'){
            changeMarkerSize(e)
        }

    };


    return (
        <div className={'blueprint__wrap'}>
            <p className={'blueprint__name'}>Interactive Map</p>
            <div>
                <MapContainer
                    crs={L.CRS.Simple}
                    minZoom={-1.5}
                    bounds={bounds}
                    style={style}
                    preferCanvas={true}
                    attributionControl={false}
                    maxZoom={1.5}
                    zoomControl={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={true}
                >
                    <FeatureGroup>
                        <EditControl
                            position={'topright'}
                            onCreated={created}
                            draw={{
                                polyline: false,
                                rectangle: true,
                                circle: true,
                                circlemarker: false,
                                marker: true,
                                polygon: true,
                            }}
                        />
                    </FeatureGroup>
                    <ImageOverlay
                        url={blueprint}
                        bounds={bounds}
                    />
                    <ZoomControl position="topleft"/>
                </MapContainer>
            </div>
        </div>
    );
}

export default App;
