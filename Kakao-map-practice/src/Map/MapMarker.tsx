import ReactDom from "react-dom";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useMap } from "../hooks/useMap";
import { PlaceType } from "./mapTypes";
import styled from "@emotion/styled";

interface MapMarkerProps {
  index: number;
  place: PlaceType;
  showInfo?: boolean;
}

const MARKER_IMAGE_URL =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다

// map에 표시될 마커를 만든다.
const MapMarker = (props: MapMarkerProps) => {
  const map = useMap();
  const container = useRef(document.createElement("div"));

  const infoWindow = useMemo(() => {
    container.current.style.position = "absolute";
    container.current.style.bottom = "40px";

    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: container.current,
    });
  }, []);

  const marker = useMemo(() => {
    const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, props.index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    const markerImage = new kakao.maps.MarkerImage(
      MARKER_IMAGE_URL,
      imageSize,
      imgOptions
    );

    const marker = new kakao.maps.Marker({
      position: props.place.position,
      image: markerImage,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      map.setCenter(props.place.position);
      map.setLevel(4, {
        animate: true,
      });
      infoWindow.setMap(map);
    });

    return marker;
  }, []);

  useLayoutEffect(() => {
    // useEffect는 모든 화면이 랜더링 된 후 effect가 발생 하지만 LayoutEffect는 레이아웃이 정렬 되기 전에 먼저 발생함
    marker.setMap(map); // 지도위에 마커를 표시

    return () => {
      marker.setMap(null); // 언마운트 될때 clear동작
    };
  }, [map]); // map 에 변화가 잇을때 동작

  useEffect(() => {
    if (props.showInfo) {
      // 마커가 선택 되었을때(마운트 되엇을때를 의미) 창을 띄워준다.
      infoWindow.setMap(map);
      return;
    }

    return () => {
      // 마커가 선택 해제 되엇을때 (마운트가 해제 되었을때) 창을 지워준다.
      infoWindow.setMap(null);
    };
  }, [props.showInfo]);

  return container.current
    ? ReactDom.createPortal(
        <Message
          onClick={() => {
            infoWindow.setMap(null);
          }}
        >
          <Title>{props.place.title}</Title>
          <Address>{props.place.address}</Address>
        </Message>,
        container.current
      )
    : null;
};

const Title = styled.label`
  font-weight: bold;
  padding: 6px 8px;
`;

const Address = styled.span`
  font-size: 12px;
  padding: 0px 6px 6px;
`;

const Message = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 50px;
  margin-left: -90px;
  border-radius: 16px;

  background-color: rgba(255, 228, 196, 0.9);
`;

export default MapMarker;
