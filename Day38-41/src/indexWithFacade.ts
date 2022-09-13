import fetchUBikeData from './fetchUBikeData';
import mapConfig from './map.config';
import MapFacade from './uBikeMap/MapFacade';
import { districts } from './districtData';

const mapFacade = new MapFacade(
    mapConfig,
    (info: UBikeInfo) => `
        <p>${info.districtName} - ${info.stopName}</p>
        <p>總自行車數 - ${info.totalBikes}</p>
        <p>尚可借車數 - ${info.availableBikes}</p>
    `,
);

const $selectDistrict = <HTMLSelectElement | null>(
    document.querySelector('#selectDistrict')
);

let currentDistrict = $selectDistrict?.value as Districts;

function updateUBikeMap(district: Districts) {
    fetchUBikeData().then((data) => {
        const selectedData = data.filter(
            (info) => info.districtName === district,
        );

        mapFacade.pinStops(selectedData);
        mapFacade.focusStops(district);
    });
}

$selectDistrict?.addEventListener('change', (event) => {
    const { value } = event.target as HTMLSelectElement;
    currentDistrict = value as Districts;

    mapFacade.clearStops();

    updateUBikeMap(currentDistrict);
});

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
