import { useState } from "react";
import { useQery } from "react-query";
import axios from "axios";

import { GITHUB_API } from "../constent/API.js";

export function useForm({
  initialValues,
  validate,
  refs,
  onSucess, // 성공시 할일
  // onErrors, // 에러시 할일
  onSubmit, // 값이 submit 됐을때 할일
}) {
  const [inputValues, setInputvalues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIstSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setInputvalues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIstSubmitting(true);
    const validateResult = validate(inputValues);
    setErrors(validateResult);

    const errorKeys = Object.keys(validateResult);

    if (errorKeys.length !== 0) {
      // validate 에 지정 해둔 title값을 입력 하지 않았을때 발생하는 에러
      const key = errorKeys[0]; // title을 의미한다.
      alert(validateResult[key]);
      refs[key].current.focus();

      setIstSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      try {
        setIstSubmitting(false);
        const result = await onSubmit(); // onSubmit()에서 response 값으로 프로미스를 반환한다.
        onSucess(result);
        // setInputvalues(initialValues);  // submit 후 입력값 초기화 하기
      } catch (e) {
        console.error(e);
        // onErrors(); // 서버와의 통신에 실패 했을때 뜨는 에러
      }

      return;
    }
  }

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  };
}

async function getUserInfo() {
  const data = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      "Content-Type": "application/json",
    },
  });
  return data.data;
}

export function useUser() {
  return useQery(["userInfo"], () => getUserInfo(), { staleTime: "Infinity" });
  // useUser를 다른 컴포넌트에서 여러번 사용 하더라도 이미 useQery에 의해 ["userInfo"] 라는 key값으로 캐싱 되어 있기때문에
  // 처음 사용시에만 getUserInfo() 에 의한 api콜을 하고 그 이후 중복 사용 시엔 캐싱된 값을 사용 한다.
  // 즉, 서버에서 받아온 데이터를 캐싱해서 전역에서 사용 하게 해주는게 react-query 이다.

  // fetch : 정보가 신선한 상태
  // stale : 정보가 오염된 상태. (새로 불러오게된다.)
  // 그러므로 staleTime에 Infinity 값을 주면 정보가 오염되지 않고 계속 신선한 상태라는걸 의미 . 즉 다시 업데이트를 하지않는다. (불필요한 네트워크 콜을 방지)
}
