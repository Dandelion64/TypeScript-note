// 因為地圖使用的資訊有一定意義上的格式所以可以切分出去

import { LatLngExpression } from 'leaflet';

export type MapConfig = {
    containerID: string;
    coordinates: LatLngExpression;
    zoomLevel: number;
    tileLayerUrl: string;
};

export default {
    containerID: 'map',
    coordinates: [25.033, 121.5654],
    zoomLevel: 13,
    tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
} as MapConfig;
