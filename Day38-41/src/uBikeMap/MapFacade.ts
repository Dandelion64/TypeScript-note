import MapSingleton from './MapSingleton';
import MapInitializer from './MapInitializer';
import MapMarkerLayer from './MapMarkerLayer';
import MapMarker from './MapMarker';
import { MapConfig } from '../map.config';
import MapUtility from './MapUtility';

class MapFacade {
    private map = MapSingleton.getInstance();
    private mapInitializer: MapInitializer;
    private mapMarkerLayer: MapMarkerLayer;
    private mapUtility: MapUtility;

    constructor(
        config: MapConfig,
        public tooltipTemplate: (data: UBikeInfo) => string,
    ) {
        if (this.map === null) {
            throw new Error("Map isn't initialized correctly!");
        }
        this.mapInitializer = new MapInitializer(this.map, config);
        this.mapMarkerLayer = new MapMarkerLayer(this.map);
        this.mapUtility = new MapUtility(this.map);

        this.mapInitializer.initialize();
    }

    // 標示出站場
    pinStops(data: UBikeInfo[]) {
        const markers = data.map((info) => {
            const marker = MapMarker.create(info.latLng);

            marker.bindTooltip(this.tooltipTemplate(info));

            return marker;
        });

        this.mapMarkerLayer.addMarkers(markers);
    }

    // 清除站場
    clearStops() {
        this.mapMarkerLayer.clear();
    }

    // 移動焦點
    focusStops(district: Districts) {
        this.mapUtility.focusOnDistrict(district);
    }
}

export default MapFacade;

// 這樣做的好處是：

// 與 CustomMap 中的 interfaces 相關的 class
// 其內部功能都關注在地圖上的運作 而非 UBike 站場的渲染過程

// 而 MapFacade 關注在操作子類別介面
// 渲染 UBike 站場的相關邏輯
