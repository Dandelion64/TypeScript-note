// 用 Namespace 防止命名衝突
// 當然老話一句 也可以使用 ES6 Module System

import Leaflet from 'leaflet';
import { MapConfig } from '../map.config';

declare namespace CustomMap {
    export interface Initializer {
        readonly map: Leaflet.Map;
        readonly config: MapConfig;
        initialize(): void;
        // setMap(): void;
        // changeConfig(): void;
    }

    export interface MarkerLayer {
        readonly map: Leaflet.Map;
        readonly layer: Leaflet.LayerGroup;
        addMarker(marker: Marker): void;
        addMarkers(markers: Marker[]): void;
        clear(): void;
    }

    export interface Marker {
        marker: Leaflet.Marker;
        bindTooltip(content: string): void;
    }

    export interface Utility {
        readonly map: Leaflet.Map;
        focusOnDistrict(district: Districts): void;
    }
}

// POINT:
// 注意到 Initializer 和 MarkerLayer 都要求 map 個體
// 這是為了維持彈性 (相對於寫死在實作該介面的類別中)
