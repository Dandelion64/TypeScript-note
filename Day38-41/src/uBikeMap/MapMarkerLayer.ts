import Leaflet from 'leaflet';
import { CustomMap } from './map';

class MapMarkerLayer implements CustomMap.MarkerLayer {
    public readonly layer = Leaflet.layerGroup();

    constructor(public readonly map: Leaflet.Map) {
        this.layer.addTo(map);
    }

    addMarker(marker: CustomMap.Marker) {
        marker.marker.addTo(this.layer);
    }

    addMarkers(markers: CustomMap.Marker[]) {
        markers.forEach((marker) => {
            this.addMarker(marker);
        });
    }

    clear() {
        this.layer.clearLayers();
    }
}

export default MapMarkerLayer;
