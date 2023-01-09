import { ReactNode, useEffect, useState } from "react";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";
const KAKAO_MAP_APP_KEY = process.env.REACT_APP_KAKAO_MAP_KEY; // 이러한 앱키는 환경변수로 설정 해줘야 한다.

interface KakaoMapScriptLoaderProps {
  children: ReactNode;
}

// api 연결을 위한 script DOM을 만들고 연결하는 컴포넌트
const KakaoMapScriptLoader = (props: KakaoMapScriptLoaderProps) => {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

    if (mapScript && !window.kakao) return; // script는 생성이 되었지만 map이 아직 로딩되기 전 인경우.

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        // load 성공
        setMapScriptLoaded(true);
      });
    };
    script.onerror = () => {
      // load 실패
      setMapScriptLoaded(false);
    };

    document.getElementById("root")?.appendChild(script);
  }, []);

  return (
    <>
      {mapScriptLoaded ? (
        props.children
      ) : (
        <div> 지도를 가져오는 중입니다. </div>
      )}
    </>
  );
};

export default KakaoMapScriptLoader;
