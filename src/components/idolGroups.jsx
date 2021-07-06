import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Idol from "./idol/idol";

const IdolGroups = (props) => {
  const [idols, setIdols] = useState([
    {
      korName: "방탄소년단",
      engName: "BTS",
      img: "https://img0.yna.co.kr/etc/inner/KR/2021/06/19/AKR20210619028500005_01_i_P2.jpg",
    },
    {
      korName: "소녀시대",
      engName: "Girls Generation",
      img: "https://img.hankyung.com/photo/201908/BF.20225287.1-1200x.jpg",
    },
    {
      korName: "샤이니",
      engName: "SHINee",
      img: "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile30.uf.tistory.com%2Fimage%2F24395443582687C3196284",
    },
    {
      korName: "트와이스",
      engName: "Twice",
      img: "https://image.newsis.com/2020/10/26/NISI20201026_0000623685_web.jpg?rnd=20201026080838",
    },
    {
      korName: "세븐틴",
      engName: "Seventeen",
      img: "http://www.beffreport.com/news/photo/202012/88911_43486_4938.jpg",
    },
  ]);
  const [checkedIdols, setCheckedIdols] = useState([]);

  const handleCheck = useCallback((name) => {
    setCheckedIdols(checkedIdols.push(name));
    console.log(checkedIdols);
  }, []);

  const handleUncheck = useCallback((name) => {
    const idx = checkedIdols.indexOf(name);
    setCheckedIdols(checkedIdols.splice(idx, 1));
    console.log(checkedIdols);
  }, []);

  return (
    <IdolList>
      {idols.map((idol) => (
        <Idol
          key={idol.engName}
          idol={idol}
          onCheck={handleCheck}
          onUncheck={handleUncheck}
        />
      ))}
    </IdolList>
  );
};

const IdolList = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, 100px);
  grid-auto-rows: 100px;
`;

export default IdolGroups;
