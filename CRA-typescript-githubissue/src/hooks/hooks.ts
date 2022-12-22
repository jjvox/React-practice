import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { GITHUB_API } from '../constent/api';

interface Props {
  initialValues: Record<string, string>; // object type 사용법
  validate: (value: Record<string, string>) => Record<string, string>;
  refs: Record<string, React.MutableRefObject<HTMLInputElement>>;
  onSucess: (result: string) => void;
  onSubmit: () => Promise<string>;
}

export function useForm({
  initialValues,
  validate,
  refs,
  onSucess,
  onSubmit,
}: Props) {
  const [inputValues, setInputvalues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIstSubmitting] = useState(false);

  function onChange(e: React.ChangeEvent<{ name: string; value: string }>) {
    const { name, value } = e.target;
    setInputvalues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIstSubmitting(true);
    const validateResult = validate(inputValues);
    setErrors(validateResult);

    const errorKeys = Object.keys(validateResult);

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      // eslint-disable-next-line no-alert
      alert(validateResult[key]);
      refs[key].current.focus();

      setIstSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      try {
        setIstSubmitting(false);
        const result = await onSubmit();
        onSucess(result);
      } catch {
        /* empty */
      }
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
      'Content-Type': 'application/json',
    },
  });
  return data.data;
}

export function useUser() {
  return useQuery(['userInfo'], () => getUserInfo());
}
