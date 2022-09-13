import Leaflet, { LatLngExpression } from 'leaflet';
import { CustomMap } from './map';

class MapMarker implements CustomMap.Marker {
    public marker: Leaflet.Marker;

    private constructor(coordinates: LatLngExpression) {
        this.marker = Leaflet.marker(coordinates);
    }

    static create(coordinates: LatLngExpression) {
        return new MapMarker(coordinates);
    }

    public bindTooltip(content: string) {
        const { marker } = this;

        marker.bindTooltip(content);

        marker.on('mouseover', () => {
            marker.openTooltip();
        });

        marker.on('mouseout', () => {
            marker.closeTooltip();
        });
    }
}

export default MapMarker;

// 注意這裡並不是單例模式
// 因為我們開放了 create() 方法
// 同時也開放了 bindTooltop() 來對 Marker 進行綁定觸發行為
// 這應該算是工廠方法的一種變化

// 這部分使用 Abstract Factory Pattern 可能有點小題大作
// 畢竟只有 UBike 這一種站場
// 不過可以使用 Factory Method 喔

// 當然當之後要整合出公車、火車、捷運出口的站場的時候
// 就可以考慮用 Abstract Factory Pattern 了
