/* eslint-disable radix */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Timer = ({ onTimeOut }) => {
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      onTimeOut();
      clearInterval(timerId.current);
    }
  }, [sec]);

  return (
    <TimerBox>
      ⏱ {min} 분 {sec} 초
    </TimerBox>
  );
};

const TimerBox = styled.div`
  width: 100%;
  text-align: right;
  padding: 10px;
`;

export default Timer;
