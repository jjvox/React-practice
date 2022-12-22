import { useRef } from "react";
import styles from "./CreateIssue.module.css";
import cx from "clsx";
import Button from "../components/Button.js";
import Textarea from "../components/Textarea.js";
import { useForm, useUser } from "../hooks/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GITHUB_API } from "../constent/API.js";

function CreateIssue() {
  const inputRef = useRef();
  const textareaRef = useRef();
  const navigate = useNavigate();
  const user = useUser(); // user 정보를 불러오는 커스텀 hook을 만들었다!

  // useForm 이라는 커스텀 hook을 만들어서 적용 했다.
  const { inputValues, onChange, isSubmitting, errors, handleSubmit } = useForm(
    {
      initialValues: { title: "", body: "" },
      onSubmit: async () =>
        await axios.post(
          `${GITHUB_API}/repos/jjvox/reactStudy/issues`,
          inputValues, // inputValues가 이미 객체 상태로 값을 가지고 있기 때문에 그냥 바로 넣어줬다. (원래는 객체형태로 들어와야함)
          {
            headers: {
              Authorization: process.env.REACT_APP_GITHUB_TOKEN, // 내가 누군지 증명 하기 위해 써주는 부분.
              "Content-Type": "applications/json",
            },
          }
        ),
      validate,
      refs: { title: inputRef, body: textareaRef },
      onSucess: (result) => {
        navigate("/", { replace: true }); // 해당 path 로 이동. replace:true를 하면 해당 path 로 이동 뒤 뒤로가기를 눌러도 이전 화면으로 돌아 가지 않는다.
      },
      // onErrors
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <Textarea
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={inputValues.title}
            onChange={onChange}
            error={errors.title}
          />
          <Textarea
            ref={textareaRef}
            type="textarea"
            name="body"
            placeholder="Leave a comment"
            value={inputValues.body}
            onChange={onChange}
            error={errors.body}
          />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Submit new issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIssue;

function validate(values) {
  // 서버로 데이터를 보내기 전에 잘못된 데이터는 프론트엔드에서 미리 차단을 해줘야 한다.
  let errors = {};
  if (values.title === "") {
    // title값을 입력하지 않아 빈칸일 경우
    errors = { title: "타이틀은 필수값 입니다." }; // 비어있던 에러객체에 에러 문구를 넣는다.
  }

  return errors;
}
