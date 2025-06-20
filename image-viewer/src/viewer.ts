import "./viewer.css";
import Map from "ol/Map.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import IIIFInfo, { PreferredOptions } from "ol/format/IIIFInfo.js";
import IIIF from "ol/source/IIIF";

interface MapMeta {
  iiifInfo: IIIFInfo;
  tileLayer: TileLayer;
  view: View;
}

const getMapMeta = async (infoUrl: string): Promise<MapMeta> => {
  const response = await fetch(infoUrl);
  if (!response.ok) {
    throw Error(`Could not fetch image info at ${infoUrl}`);
  }
  const iiifInfo = new IIIFInfo(await response.json());
  const options = iiifInfo.getTileSourceOptions({
    zDirection: -1,
  } as PreferredOptions);
  const iiifTileSource = new IIIF(options);
  const tileLayer = new TileLayer({ source: iiifTileSource });
  const view = new View({
    resolutions: iiifTileSource.getTileGrid()?.getResolutions(),
    extent: iiifTileSource.getTileGrid()?.getExtent(),
    constrainOnlyCenter: true,
    showFullExtent: true,
    center: [iiifInfo.imageInfo.width / 2, -iiifInfo.imageInfo.height / 2],
    zoom: 2,
  });
  return {
    iiifInfo,
    tileLayer,
    view,
  };
};

// const iiifInfo = new IIIFInfo("http://art.philtom.com:8080/iiif/3/Kunisasda-Nakamura_Utaemon_IV-Hyuga_Koto.lzw.tif.tiled.pyramidal.tif/info.json");
// const options = {...iiifInfo.getTileSourceOptions(), zDirection: -1};
// if (options === undefined || options.version === undefined) {
//     notifyDiv.textContent =
//     'Data seems to be no valid IIIF image information.';
//     return;
// }
// const iiifTileSource = new IIIF(options);
// const layer = new TileLayer();

getMapMeta(
    "http://art.philtom.com:8080/iiif/3/Kunisasda-Nakamura_Utaemon_IV-Hyuga_Koto.lzw.tif.tiled.pyramidal.tif/info.json"
).then(mapMeta => {
  const map = new Map({
    target: "map",
    layers: [mapMeta.tileLayer],
    view: mapMeta.view,
  });
    const extent = [0, -mapMeta.iiifInfo.imageInfo.height, mapMeta.iiifInfo.imageInfo.width, 0];
    const size = map.getSize();
    if (size) {
      map.getView().fit(extent, {
        size,
        padding: [0, 0, 0, 0], // Optional: padding around image
      });
    }
}).catch(e =>  {
  console.log("Unhandled error", e);
});
