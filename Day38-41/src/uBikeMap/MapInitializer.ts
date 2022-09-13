import Leaflet from 'leaflet';
import { CustomMap } from './map';
import { MapConfig } from '../map.config';

class MapInitializer implements CustomMap.Initializer {
    constructor(
        public readonly map: Leaflet.Map,
        public readonly config: MapConfig,
    ) {}

    public initialize() {
        const { map, config } = this;
        const { coordinates, zoomLevel, tileLayerUrl } = config;

        map.setView(coordinates, zoomLevel);

        Leaflet.tileLayer(tileLayerUrl).addTo(map);
    }
}

export default MapInitializer;

// 當然也可以採取策略模式
// 宣告出 CustomMap.InitializeStrategy 這個介面
// 然後定義不同的 InitializeStrategy 參考點讓 MapInitializer 採用
