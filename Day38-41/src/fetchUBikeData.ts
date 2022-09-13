import { LatLngExpression } from 'leaflet';

const bikeUrl =
    'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';

export default function fetchUBikeData(url = bikeUrl) {
    return fetch(url)
        .then((result) => result.json())
        .then((sourceInfo: SourceUBikeInfo[]) =>
            sourceInfo.map((sourceItem) => {
                return {
                    availableBikes: parseInt(sourceItem.sbi, 10),
                    totalBikes: parseInt(sourceItem.tot, 10),
                    latLng: <LatLngExpression>[
                        parseFloat(sourceItem.lat),
                        parseFloat(sourceItem.lng),
                    ],
                    districtName: sourceItem.sarea,
                    stopName: sourceItem.sna,
                } as UBikeInfo;
            }),
        );
}
