// 地圖實體只需要一個 適用單例模式

import Leaflet from 'leaflet';
import mapConfig from '../map.config';

export default class MapSingleton {
    // 地圖可能為 null
    // 因為 containerID 可能會發生 typo
    public readonly map = Leaflet.map(mapConfig.containerID);

    private constructor() {
        if (this.map === null) {
            console.warn("Map isn't initialized correctly!");
        }
    }

    private static Instance: Leaflet.Map | null = new MapSingleton().map;

    public static getInstance() {
        return this.Instance;
    }
}
