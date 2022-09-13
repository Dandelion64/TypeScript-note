import Leaflet from 'leaflet';
import { CustomMap } from './map';
import { districtLatLngMap } from '../districtData';

class MapUtility implements CustomMap.Utility {
    constructor(public readonly map: Leaflet.Map) {}

    public focusOnDistrict(district: Districts) {
        const focusLatLng = districtLatLngMap.get(district);

        if (focusLatLng) {
            this.map.flyTo(focusLatLng);
        }
    }
}

export default MapUtility;
