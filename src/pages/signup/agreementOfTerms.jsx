import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Text, Icon } from "../../elements";
import { grayBorder } from "../../shared/colors";
import TermMarketingPage from "../myProfilePage/termMarketingPage";
import TermServicePage from "../myProfilePage/termServicePage";
import TermPrivacyPage from "../myProfilePage/termPrivacyPage";

const AgreementOfTerms = ({
  onAllClick,
  onServiceClick,
  onPrivacyClick,
  onMarketingClick,
}) => {
  // 자세히 보기
  const [serviceIconUrl, setServiceIconUrl] = useState("more");
  const [privacyIconUrl, setPrivacyIconUrl] = useState("more");
  const [marketingIconUrl, setMarketingIconUrl] = useState("more");
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMarketingOpen, setIsMarketingOpen] = useState(false);

  // 동의
  const [allAgreeIconUrl, setAllServiceAgreeIconUrl] = useState("uncheckbox");
  const [serviceAgreeIconUrl, setServiceAgreeIconUrl] = useState("uncheckbox");
  const [privacyAgreeIconUrl, setPrivacyAgreeIconUrl] = useState("uncheckbox");
  const [marketingAgreeIconUrl, setMarketingAgreeIconUrl] =
    useState("uncheckbox");
  const [isServiceAgree, setIsServiceAgree] = useState(false);
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);

  const handleServiceClick = () => {
    setIsServiceOpen(!isServiceOpen);
  };
  const handlePrivacyClick = () => {
    setIsPrivacyOpen(!isPrivacyOpen);
  };
  const handleMarketingClick = () => {
    setIsMarketingOpen(!isMarketingOpen);
  };

  const handleAgreeAllClick = () => {
    onAllClick();
    setIsServiceAgree(true);
    setIsPrivacyAgree(true);
    setIsMarketingAgree(true);
  };
  const handleAgreeServiceClick = () => {
    onServiceClick();
    setIsServiceAgree(!isServiceAgree);
  };
  const handleAgreePrivacyClick = () => {
    onPrivacyClick();
    setIsPrivacyAgree(!isPrivacyAgree);
  };
  const handleAgreeMarketingClick = () => {
    onMarketingClick();
    setIsMarketingAgree(!isMarketingAgree);
  };

  useEffect(() => {
    if (isServiceOpen) {
      setServiceIconUrl("more_black");
    } else {
      setServiceIconUrl("more");
    }
    if (isPrivacyOpen) {
      setPrivacyIconUrl("more_black");
    } else {
      setPrivacyIconUrl("more");
    }
    if (isMarketingOpen) {
      setMarketingIconUrl("more_black");
    } else {
      setMarketingIconUrl("more");
    }

    if (isServiceAgree && isPrivacyAgree && isMarketingAgree) {
      setAllServiceAgreeIconUrl("checkbox");
    } else {
      setAllServiceAgreeIconUrl("uncheckbox");
    }
    if (isServiceAgree) {
      setServiceAgreeIconUrl("checkbox");
    } else {
      setServiceAgreeIconUrl("uncheckbox");
    }
    if (isPrivacyAgree) {
      setPrivacyAgreeIconUrl("checkbox");
    } else {
      setPrivacyAgreeIconUrl("uncheckbox");
    }
    if (isMarketingAgree) {
      setMarketingAgreeIconUrl("checkbox");
    } else {
      setMarketingAgreeIconUrl("uncheckbox");
    }
  }, [
    isServiceOpen,
    isPrivacyOpen,
    isMarketingOpen,
    isServiceAgree,
    isPrivacyAgree,
    isMarketingAgree,
  ]);

  return (
    <TermsContainer>
      <TermBox>
        <TermBtn
          onClick={() => {
            handleAgreeAllClick();
          }}
        >
          <Icon
            width="16px"
            margin="0 7px 0 0"
            src={`https://goods-duck.com/icon/icon_${allAgreeIconUrl}.svg`}
          />
          <Text bold>약관에 모두 동의</Text>
        </TermBtn>
      </TermBox>
      <Line />
      <TermBox>
        <TermBtn
          onClick={() => {
            handleAgreeServiceClick();
          }}
        >
          <Icon
            width="16px"
            margin="0 7px 0 0"
            src={`https://goods-duck.com/icon/icon_${serviceAgreeIconUrl}.svg`}
          />
          <Text>(필수) 이용약관 동의</Text>
        </TermBtn>
        <Icon
          width="12px"
          src={`https://goods-duck.com/icon/icon_${serviceIconUrl}.svg`}
          _onClick={() => {
            handleServiceClick();
          }}
        />
      </TermBox>
      {isServiceOpen && <TermServicePage />}

      <TermBox>
        <TermBtn
          onClick={() => {
            handleAgreePrivacyClick();
          }}
        >
          <Icon
            width="16px"
            margin="0 7px 0 0"
            src={`https://goods-duck.com/icon/icon_${privacyAgreeIconUrl}.svg`}
          />
          <Text>(필수) 개인정보 처리방침 동의</Text>
        </TermBtn>
        <Icon
          width="12px"
          src={`https://goods-duck.com/icon/icon_${privacyIconUrl}.svg`}
          _onClick={() => {
            handlePrivacyClick();
          }}
        />
      </TermBox>
      {isPrivacyOpen && <TermPrivacyPage />}

      <TermBox>
        <TermBtn
          onClick={() => {
            handleAgreeMarketingClick();
          }}
        >
          <Icon
            width="16px"
            margin="0 7px 0 0"
            src={`https://goods-duck.com/icon/icon_${marketingAgreeIconUrl}.svg`}
          />
          <Text>(선택) 마케팅 정보 활용 동의</Text>
        </TermBtn>
        <Icon
          width="12px"
          src={`https://goods-duck.com/icon/icon_${marketingIconUrl}.svg`}
          _onClick={() => {
            handleMarketingClick();
          }}
        />
      </TermBox>
      {isMarketingOpen && <TermMarketingPage />}
    </TermsContainer>
  );
};

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const TermBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const TermBtn = styled.button`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin: 10px 0;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

export default AgreementOfTerms;
