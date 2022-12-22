import { useEffect } from "react";
import { useMap } from "../hooks/useMap";
import MapMarker from "./MapMarker";
import { PlaceType } from "./mapTypes";

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedPlaceId?: string;
}

const MapMarkerController = (props: MapMarkerControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      bounds.extend(place.position); // 검색되어 나온 리스트의 좌표값을 전부 넘겨서 마커가 표시되게 한다.
    });

    map.setBounds(bounds);
  }, [props.places]);

  return (
    <>
      {props.places.map((place, index) => {
        return (
          <MapMarker
            key={place.id}
            place={place}
            showInfo={props.selectedPlaceId === place.id}
            index={index}
          />
        );
      })}
    </>
  );
};

export default MapMarkerController;
