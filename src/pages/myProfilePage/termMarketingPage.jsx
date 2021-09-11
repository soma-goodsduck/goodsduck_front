import React from "react";
import HeaderInfo from "../../components/haeder/headerInfo";
import styles from "./myProfilePage.module.css";

const TermMarketingPage = (props) => {
  return (
    <>
      <HeaderInfo text="마케팅 정보 활용 동의" />
      <div style={{ padding: "60px 15px" }}>
        <p className={styles.term}>
          1. 굿즈덕이 제공하는 이용자 맞춤형 서비스 및 상품 추천, 각종 경품
          행사, 이벤트 등의 광고성 정보를 전자우편이나 서신우편, 문자, 푸시,
          전화 등을 통해 이용자에게 제공합니다.
        </p>
        <p className={styles.term}>
          2. 마케팅 수신 동의는 선택하지 않으실 수 있으며 동의 후라도 고객의
          의사에 따라 철회할 수 있습니다. 철회는 카카오톡 채널(GOODSDUCK) 앞으로
          요청해 주십시오.
        </p>
        <p className={styles.term}>
          3. 관련 법규에 의거 선택정보 사항에 대해서는 동의 거부 또는
          철회하더라도 서비스 이용에 제한되지 않습니다. 단, 할인, 이벤트 및
          이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.
        </p>

        <table>
          <thead>
            <tr>
              <th>이용항목</th>
              <th>이용목적</th>
              <th>이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.shortTd}>
                전화번호, 이메일, 주소(자택, 직장)
              </td>
              <td className={styles.longTd}>
                인구통계학적 특성에 따른 서비스 제공, 광고 게재, 이벤트, 신상품
                등 광고성 정보 전달 및 참여기회 제공, 접속빈도 파악, 신규 및
                제휴 비지니스 관련 서비스 제공 및 각종 마케팅 활동
              </td>
              <td className={styles.shortTd}>탈퇴 시 까지</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TermMarketingPage;
