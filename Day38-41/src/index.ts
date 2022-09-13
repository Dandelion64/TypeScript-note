import Leaflet, { LayerGroup } from 'leaflet';
import mapConfig from './map.config';
import fetchUBikeData from './fetchUBikeData';
import { districts, districtLatLngMap } from './districtData';

// const taipeiCoord: LatLngExpression = [25.0330, 121.5654];
// const zoom = 13;

// const map = Leaflet.map('map');

// map.setView(taipeiCoord, zoom);

// 這是原本教學使用的底圖
// Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 想更換的話可以參考 Leaflet Provider Demo:
// http://leaflet-extras.github.io/leaflet-providers/preview/index.html

// 大多都要購買 token 但 mapbox 申請就能使用
// https://account.mapbox.com/auth/signup/

const { containerID, coordinates, zoomLevel, tileLayerUrl } = mapConfig;

const map = Leaflet.map(containerID);
map.setView(coordinates, zoomLevel);
Leaflet.tileLayer(tileLayerUrl).addTo(map);

// 最好使用複合型別來註記
// WARNING: 在積極型別註記時
// 完全忽略掉其他情況指定型別是不好的
// 強烈建議禁止
const $selectDistrict = <HTMLSelectElement | null>(
    document.querySelector('#selectDistrict')
);

// 新增 Map Layer 以渲染所有 Marker
let markerLayer: LayerGroup;

// 目前選擇行政區
let currentDistrict = $selectDistrict?.value as Districts;

function updateUBikeMap(district: Districts): void {
    fetchUBikeData().then((data) => {
        const selectedData = data.filter(
            (info) => info.districtName === district,
        );

        const markers = selectedData.map((data) => {
            const marker = new Leaflet.Marker(data.latLng);

            marker.bindTooltip(`
                <p>${data.districtName} - ${data.stopName}</p>
                <p>總自行車數 - ${data.totalBikes}</p>
                <p>尚可借車數 - ${data.availableBikes}</p>
            `);

            marker.on('mouseover', () => {
                marker.openTooltip;
            });

            marker.on('mouseout', () => {
                marker.closeTooltip();
            });

            return marker;
        });

        markerLayer = Leaflet.layerGroup(markers);
        markerLayer.addTo(map);
    });
    focusOnDistrict(district);
}

// TRY: 自行加入焦點移動功能
function focusOnDistrict(district: Districts) {
    const focusLatLng = districtLatLngMap.get(district);

    if (focusLatLng) {
        map.flyTo(focusLatLng);
    }
}

$selectDistrict?.addEventListener('change', (e) => {
    const { value } = e.target as HTMLSelectElement;
    currentDistrict = value as Districts;

    markerLayer.remove();

    updateUBikeMap(currentDistrict);
});

// hover 會看到推論輸出為 Promise<UBikeInfo[]>
// REVIEW: 這與 Generic Type 有關 (Day 47)
// fetchUBikeData().then((data) => {
//     const selectedData = data.filter(
//         (info) => info.districtName === currentDistrict,
//     );

//     const markers = selectedData.map((data) => {
//         const marker = new Leaflet.Marker(data.latLng);

//         marker.bindTooltip(`
//             <p>${data.districtName} - ${data.stopName}</p>
//             <p>總自行車數 - ${data.totalBikes}</p>
//             <p>尚可借車數 - ${data.availableBikes}</p>
//         `);

//         marker.on('mouseover', () => {
//             marker.openTooltip;
//         });

//         marker.on('mouseout', () => {
//             marker.closeTooltip();
//         });

//         return marker;
//     });

//     markerLayer = Leaflet.layerGroup(markers);
//     markerLayer.addTo(map);
// });

districts.forEach((d) => {
    const $optionTag = document.createElement('option');
    $optionTag.setAttribute('value', d);
    $optionTag.innerText = d;

    if ($selectDistrict === null) {
        throw new Error('No select-district field provided...');
    }

    $selectDistrict.appendChild($optionTag);
});

updateUBikeMap(currentDistrict);
