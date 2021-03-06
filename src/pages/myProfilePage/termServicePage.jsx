import React from "react";
import HeaderInfo from "../../components/haeder/headerInfo";
import styles from "./myProfilePage.module.css";

const TermServicePage = (props) => {
  return (
    <>
      <HeaderInfo text="이용 약관" />
      <div style={{ padding: "60px 15px" }}>
        <h1 className={styles.title}>제1장 총칙</h1>
        <h2 className={styles.subTitle}>제1조 (목적)</h2>
        <p className={styles.termBody}>
          본 약관은 서비스 이용자가 굿즈덕(이하 “회사”라 합니다)이 제공하는
          온라인 서비스 (이하 “서비스”라 합니다)에 회원으로 가입하고 이를
          이용함에 있어 회사와 그 이용자의 권리⋅의무 및 책임 사항을 규정함을
          목적으로 합니다.
        </p>
        <h2 className={styles.subTitle}>제2조 (정의)</h2>
        <div className={styles.termBody}>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 정의되지 않은 본
          약관상 용어의 의미는 일반적인 거래 관행에 의합니다.
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회원: 회원 가입을 한 자로서, 회사와 제공하는 모든 서비스를 이용할
              수 있는 자를 말합니다
            </li>
            <li className={styles.term}>
              비회원: 회원 가입을 하지 않은 자로서, 회사가 제공하는 제한된
              서비스를 이용할 수 있는 자를 말합니다.
            </li>
            <li className={styles.term}>
              판매자: 물품을 판매하기 위해 회사의 판매자 등록 절차를 완료한
              회원을 말합니다. 물품의 판매를 업(業)으로 하는 판매자(이하 “업자인
              판매자”, 개인인지 법인인지 여부를 불문)인 경우와 그렇지 아니한
              판매자 (이하 “업자 아닌 판매자”)인 경우 판매자 등록 절차에 차이가
              있을 수 있습니다.
            </li>
            <li className={styles.term}>
              구매자: 판매자가 판매하는 물품을 구매하고자 하는 회원을 말합니다.
            </li>
            <li className={styles.term}>
              가격제시: 구매자/판매자가 물품을 거래하는 과정에서, 원하는 가격을
              제시하는 기능을 말합니다.
            </li>
            <li className={styles.term}>
              채팅: 서비스 내에서 회원들 간에 메시지 송수신할 수 있는 기능을
              말합니다.
            </li>
            <li className={styles.term}>
              채팅거래: 회원이 회사를 통하지 않고 회원간 채팅을 통해 메시지를
              주고 받아 물품을 거래하는 형태를 말합니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제3조 (약관의 게시와 개정)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회사는 본 약관의 내용을 회원이 쉽게 확인할 수 있도록 기술적 조치를
              취합니다.
            </li>
            <li className={styles.term}>
              회사는 콘텐츠산업진흥법, 전자상거래 등에서의 소비자보호에 관한
              법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련 법령을
              위반하지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
            </li>
            <li className={styles.term}>
              회사가 약관을 개정할 경우 기존 약관과 개정 약관 및 개정 약관 적용
              일자와 개정 사유를 명시하고 기존 약관과 함께 개정 약관 적용 일자
              7일 전부터 적용 일자 이후 상당한 기간 동안, 개정 약관의 내용이
              회원에게 불리한 경우 개정 약관 적용 일자 30일 전부터 적용 일 이후
              상당한 기간 동안, 이를 서비스 웹페이지 및 어플리케이션 화면에
              게시하거나 기타 방법으로 회원에게 통지합니다.
            </li>
            <li className={styles.term}>
              회사가 ‘전항에 따라 회원에게 통지한 후 개정 약관 고지일로부터 개정
              약관 시행일 이후 7일이 지나는 날까지 회원이 거부 의사를 표시하지
              아니할 경우 회원이 개정 약관에 동의한 것으로 본다는 뜻’을
              고지하였음에도 회원의 거부 의사표시가 없는 경우 개정 약관에 동의한
              것으로 간주합니다. 회원이 개정 약관에 동의하지 않을 경우 해당
              회원은 서비스 이용 계약을 해지할 수 있습니다.
            </li>
            <li className={styles.term}>
              회원은 회사가 제공하는 서비스를 이용함에 있어서 전자상거래
              등에서의 소비자보호에 관한 법률, 전자금융거래법, 소비자기본법,
              표시∙광고의 공정화에 관한 법률, 정보통신망 이용촉진 및 정보보호
              등에 관한 법률 등 관련 법령을 준수하여야 하며, 본 약관의 규정을
              들어 관련법령 위반에 대한 면책을 주장할 수 없습니다.
            </li>
          </ol>
        </div>

        <h1 className={styles.title}>제2장 서비스의 내용 및 회원 가입</h1>
        <h2 className={styles.subTitle}>제4조 (서비스 이용 계약)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회사가 제공하는 서비스를 이용하기 위한 이용 계약은 회사의 서비스를
              이용하고자 하는 자의 회원가입 신청에 대하여 회사가 승낙함으로써
              성립합니다.
            </li>
            <li className={styles.term}>
              전항의 회원가입 신청을 하기 위해서는 회사가 정한 온라인 회원가입
              신청서에 필수 기재사항을 입력하고 본인인증 절차를 완료하여야
              합니다.
            </li>
            <li className={styles.term}>
              회원가입 신청을 위해 필수적으로 기재한 항목이 변경된 경우(폐업
              등의 사유 발생 포함) 해당 회원은 위 변경 사실을 직접 수정하거나
              회사에 1:1문의 또는 전화를 통해 통지하여야 하며, 통지하지 않음으로
              인하여 발생한 회원의 불이익에 관하여는 회원이 책임을 집니다.
            </li>
            <li className={styles.term}>
              회사가 정한 필수 기재사항을 입력하지 않거나 허위의 정보를
              입력하거나 회원가입 신청을 하려는 자가 만 14세 미만일 경우
              회원가입 신청이 제한될 수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 회원에게 유익한 정보를 제공하기 위해 위 필수 기재사항
              이외에도 회원가입을 신청하는 자에게 취미, 관심사 등 정보 제공을
              요청할 수 있으나 회원가입을 신청하는 자는 위 정보의 제공을 거절할
              수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 회사의 서비스를 이용하기 위해 회원가입 신청을 한 자가 본조
              제2.항에서 정한 필수 기재사항을 정확하게 입력하고 본 약관에 동의한
              경우 원칙적으로 서비스의 이용을 승낙합니다. 다만, 회사는 다음과
              같은 사유가 있는 경우 회원가입 신청의 승낙을 거절 또는 보류할 수
              있고, 이 경우 회사는 승낙 거절 또는 보류의 사유와 승낙에 필요한
              추가 요청 정보 등 관련 사항을 통지합니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>회사의 설비에 여유가 없는 경우</li>
                <li className={styles.term}>
                  회사의 서비스 제공에 기술적인 문제가 있는 경우
                </li>
                <li className={styles.term}>
                  회원가입 신청자가 본 약관에 따라 회원 자격을 상실하거나 이용
                  계약이 해지된 적이 있는 경우 (단, 회사의 회원 재가입 승낙을
                  얻은 경우는 예외)
                </li>
                <li className={styles.term}>타인의 명의를 도용한 경우</li>
                <li className={styles.term}>허위의 정보를 기재한 경우</li>
                <li className={styles.term}>
                  기타 회사의 합리적인 판단 하에 필요하다고 인정하는 경우
                </li>
              </ol>
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제5조 (구매자/판매자 등록)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              제4조에 따라 회사로부터 회원가입 신청을 승낙 받아 이용 계약이
              성립된 회원이 회사의 서비스를 이용하여 다른 회원에게 물품을
              구매/판매하고자 할 경우 구매자/판매자 등록 절차를 거쳐야 합니다.
            </li>
            <li className={styles.term}>
              구매자/판매자 등록을 하기 위해서는 회사가 정한 온라인 등록
              신청서에 다음의 필수 기재사항을 입력하여야 하며, 업자인 판매자의
              다음 각 호의 정보는 회원에게 공개됩니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  이름(법인인 경우 상호 및 대표자 이름)
                </li>
                <li className={styles.term}>주소</li>
                <li className={styles.term}>전화번호</li>
                <li className={styles.term}>이메일주소</li>
                <li className={styles.term}>
                  (통신판매업자인 경우) 통신판매업신고 번호
                </li>
              </ol>
            </li>
            <li className={styles.term}>
              업자가 아닌 구매자/판매자가 서비스 이용을 위해 입력하여 제공한
              신원정보는 거래 물품에 대한 구매/판매 청약을 한 구매자/판매자의
              요청에 따라 해당 구매자에게 제공될 수 있습니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제6조 (서비스의 제공)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              서비스의 종류
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  거래중개서비스
                  <ol type="a" className={styles.termLists}>
                    <li className={styles.term}>
                      회사가 제공하는 웹사이트 또는 어플리케이션을 통하여 회원
                      상호간에 물품 거래가 이루어질 수 있는 사이버 거래 장소의
                      제공
                    </li>
                  </ol>
                </li>
                <li className={styles.term}>
                  유료서비스
                  <ol type="a" className={styles.termLists}>
                    <li className={styles.term}>
                      광고 서비스: 회원이 회사에 광고 수수료를 지급하고 자신이
                      운영하는 사이버 몰 또는 판매하는 물품 등을 다른 회원에게
                      광고할 수 있는 서비스
                    </li>
                    <li className={styles.term}>
                      프리미엄 서비스: 원하는 물품에 대해 판매자로부터 운영자가
                      선검수 후, 상품에 대한 결함이나 문제가 없을 시 구매자에게
                      판매하는 서비스
                    </li>
                  </ol>
                </li>
                <li className={styles.term}>
                  기타 부가서비스
                  <ol type="a" className={styles.termLists}>
                    <li className={styles.term}>
                      채팅 서비스: 회원 상호간 메시지를 주고 받을 수 있는 메신저
                      서비스
                    </li>
                    <li className={styles.term}>
                      거래 활성화를 위한 부수적인 서비스: 거래 후기 작성, 찜
                      기능 등 회원의 서비스 이용을 돕는 부수적인 서비스
                    </li>
                    <li className={styles.term}>
                      커뮤니티 서비스: 공통 관심사를 가진 회원들 간의 정보 공유
                      및 콘텐츠를 제공하는 서비스
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li className={styles.term}>
              회사는 연중무휴, 24시간 서비스를 제공함을 원칙으로 하되, 컴퓨터 등
              정보통신설비의 보수, 점검, 교체, 고장 등 운영상 상당한 이유가 있는
              경우 회원에게 통지한 후 서비스의 제공을 일시적으로 중단할 수
              있습니다. 다만, 회사가 사전에 서비스의 중단을 통지할 수 없었던
              부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 서비스의 제공을 위한 별도의 계약 종료, 신규 서비스 개시,
              기존 서비스 개정 등의 사유로 서비스의 내용을 변경할 수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 서비스의 내용에 변경이 있는 경우 변경된 서비스가 적용되기
              30일 이전부터 적용 일자 이후 상당한 기간까지 웹사이트 및
              어플리케이션 공지사항을 통해 회원들에게 변경된 서비스의 내용을
              사전 공지합니다. 다만 회원의 거래와 관련하여 중대한 영향을 미치는
              변경 사항이 있는 경우 회원에게 별도로 통지합니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>
          제7조 (이용 계약의 종료 및 회원 자격 상실)
        </h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회원은 언제든지 회사에 해지의 의사를 통지함으로써 이용 계약을
              해지할 수 있습니다. 다만 회원은 회사의 해지 의사를 통지하기 전에
              구매 또는 판매 진행 중인 절차를 모두 완료, 철회, 취소하여야 하며,
              철회 또는 취소로 인한 불이익은 해당 회원이 부담합니다.
            </li>
            <li className={styles.term}>
              회사는 원칙적으로 전항의 이용 계약 해지의 의사 표시를 확인한 후
              해당 회원의 게시글과 해당 계정을 삭제하여 해지 절차를 완료해야
              합니다. 다만, 다음 각 호의 사유가 있는 경우 이용 계약 해지 절차를
              보류할 수 있습니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  이용 계약 해지의 의사표시를 한 자가 회원 당사자인지 여부를
                  확인할 수 없는 경우
                </li>
                <li className={styles.term}>
                  이용 계약 해지의 의사표시를 한 회원의 구매 또는 판매 진행 중인
                  거래 절차가 모두 완료되지 않은 경우
                </li>
                <li className={styles.term}>
                  구매자에 대한 환불 등으로 인하여 회원이 서비스 이용에 관하여
                  회사에 변제할 채무가 남아있는 경우
                </li>
                <li className={styles.term}>
                  이용 계약 해지의 의사표시를 한 회원에 관한 거래 사기 및 분쟁
                  문제가 남아 있는 경우
                </li>
              </ol>
            </li>
            <li className={styles.term}>
              회사는 본 약관 또는 운영정책에 따라 특정한 사유가 발생한 경우
              회원의 자격을 박탈하고 이용계약을 해지할 수 있습니다.
            </li>
          </ol>
        </div>

        <h1 className={styles.title}>제3장 개인정보보호</h1>
        <h2 className={styles.subTitle}>
          제8조 (개인정보보호 및 개인정보 제공 동의 등)
        </h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회사는 개인정보처리방침에 따라 회원가입 및 판매자 등록시
              회원으로부터 제공 받은 정보를 수집 및 보관합니다.
            </li>
            <li className={styles.term}>
              회사는 관련 법령 및 회사의 운영정책에 따라 특정 물품을 판매하고자
              하는 판매자의 경우 추가적인 정보 및 관련 자료를 요청하여 수집 및
              보관할 수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 회원의 회원가입 신청 및 판매자 등록을 위해 제공 받은 정보를
              다음의 예외적인 경우가 아닌 한 원활한 서비스 제공 이외의 목적으로
              사용하거나 이용자의 동의 없이 제3자에게 제공하지 않습니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  관련 법령에 근거하여 회원 정보의 이용 및 제3자에 대한 정보
                  제공을 허용하는 경우
                </li>
                <li className={styles.term}>
                  회사의 약관 및 운영 정책 등에 따라 회원의 동의를 얻은 경우
                </li>
                <li className={styles.term}>
                  특정 물품을 구매하고자 하는 회원이 해당 물품을 판매하는 업자
                  아닌 판매자의 정보를 회사에 요청하는 경우
                </li>
              </ol>
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제9조 (거래 기록 보관)</h2>
        <p className={styles.termBody}>
          회사는 채팅거래를 통해 거래된 구매 내역의 당사자, 물품, 가격 등 정보를
          거래 이후 5년간 보관합니다.
          <br />
          회사는 본조 제 1, 2항의 거래 정보의 보안을 유지하고 위 거래 정보를
          거래 당사자인 회원이 보관 기간 동안 열람할 수 있도록 기술적 조치를
          취합니다.
          <br />
          거래 기록 등 보관에 관한 구체적인 사항은 관련 법령 및
          개인정보처리방침을 따릅니다.
        </p>

        <h1 className={styles.title}>제4장 거래중개서비스를 통한 물품거래</h1>
        <h2 className={styles.subTitle}>
          제10조 (물품거래서비스의 성질과 목적)
        </h2>
        <p className={styles.termBody}>
          회사는 서비스 내에서 회원간 물품 거래가 이루어질 수 있도록 온라인 거래
          장소와 서비스를 제공합니다. 서비스 내에서 판매되는 물품 중 판매자가
          직접 판매하나 위 판매자로부터 회사가 판매 중개를 의뢰 받은 물품에
          관하여 회사는 거래의 당사자가 아니며 해당 물품의 거래에 대하여
          원칙적으로 책임을 부담하지 않습니다.
        </p>
        <h2 className={styles.subTitle}>제11조 (구매 신청)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              서비스를 이용하여 물품을 구매하고자 하는 회원은 채팅거래를 통해
              물품의 구매를 위한 청약을 할 수 있습니다.
            </li>
            <li className={styles.term}>
              회원이 채팅거래를 통해 물품을 구매하고자 할 경우 위 회원은 채팅
              서비스를 통해 판매자와 거래 조건 및 방안을 개별적으로 정하여 청약,
              청약의 승낙, 계약 체결, 결제, 환불 등의 거래 절차를 진행합니다.
              회사는 구매자와 판매자간 직접 거래 절차를 진행하는 위와 같은
              거래에 관하여 원칙적으로 책임을 부담하지 않습니다.
            </li>
          </ol>
        </div>

        <h1 className={styles.title}>제5장 회사와 회원의 책임과 의무</h1>
        <h2 className={styles.subTitle}>제12조 (회사의 의무)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회사는 원활한 서비스의 제공 및 정보의 보안을 위하여 이에 필요한
              인력과 설비를 적절하게 유지하고 점검 또는 복구 조치 등을 성실하게
              이행합니다.
            </li>
            <li className={styles.term}>
              회사는 회원의 동의 없이 회원의 정보를 수집 또는 활용하거나
              제3자에게 제공하지 않습니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제13조 (회원의 의무)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회원은 본 약관, 운영정책, 이용안내 사항과 관련 법령을 준수하여야
              하며 기타 회사 업무에 방해되는 행위를 하여서는 안됩니다.
            </li>
            <li className={styles.term}>
              회사는 회원이 본 약관 및 운영정책에서 제한 또는 금지하는 행위를 한
              경우 해당 회원이 회사로부터 부수적으로 제공 받은 혜택의 전부 또는
              일부를 회수하거나 계정 접속을 제한 또는 회원 자격을 박탈할 수
              있고, 해당 회원의 게시글을 임시 삭제 또는 영구 삭제 할 수
              있습니다. 이에 따라 회원 자격을 박탈 당한 자의 재가입은 제한될 수
              있습니다.
            </li>
            <li className={styles.term}>
              회사가 전항에 따른 조치를 취할 경우 원칙적으로 사전에 해당
              회원에게 통지하나 긴급을 요하는 등 부득이한 사유가 있는 경우 선
              조치 후 사후 통지할 수 있습니다.
            </li>
            <li className={styles.term}>
              조치의 대상인 회원이 제2항에 따른 회사의 조치에 대하여 이의가 있는
              경우 회사에 이의를 신청할 수 있습니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제14조 (판매자의 의무)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              판매자는 다음 각 호에 따른 의무를 이행하여야 합니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  구매자의 요청이 있을 경우 판매하는 물품의 구매 청약을 한
                  구매자에게 이름, 생년월일(업자 아닌 판매자의 경우만 해당),
                  주소, 전화번호, 이메일 등 신원정보를 제공하여야 합니다.
                </li>
                <li className={styles.term}>
                  구매자로부터 채팅거래를 통한 구매 청약을 한 사실을 알게 되었을
                  경우 청약을 받은 사실을 즉시 구매자에게 알려야 합니다. 만약
                  청약을 받은 물품을 판매할 수 없는 사정이 있다면 지체 없이 그
                  사정을 구매자에게 알리고 구매 청약을 취소할 것을 요청하여야
                  합니다.
                </li>
                <li className={styles.term}>
                  청약의 철회와 계약의 해제에 관한 기한, 행사 방법, 효과에
                  관하여 미리 다른 회원이 알 수 있도록 고지하여야 합니다.
                </li>
                <li className={styles.term}>
                  구매자가 물품 대금을 결제하거나 판매자에게 지급한 후
                  판매자에게 물품 배송 또는 직거래에 관한 진행 상황을 문의한
                  경우 이에 성실하게 응하여야 합니다.
                </li>
                <li className={styles.term}>
                  물품을 발송하였거나 직접 전달하였다는 점을 증명할 책임이 있고,
                  회사가 물품 대금 정산 등 목적으로 판매자에게 물품의 발송 또는
                  전달이 완료되었다는 증빙을 요청할 수 있으며 판매자는 회사의
                  위와 같은 요청에 성실하게 응하여야 합니다. 판매자가 위 요청에
                  성실하게 응하지 아니하여 발생한 회사의 손해 및 제반 문제에
                  대한 일체의 책임은 판매자가 부담합니다.
                </li>
              </ol>
            </li>
            <li className={styles.term}>
              업자인 판매자는 다음 각 호에 따른 의무를 추가적으로 이행하여야
              합니다.
            </li>
            <li className={styles.term}>
              전자상거래법에 따라 통신판매업자로 신고하여야 합니다.
              <ol type="A" className={styles.termLists}>
                <li className={styles.term}>
                  구매자가 구매 청약을 한 날로부터 7일 이내에 물품 전달을 위한
                  조치를 취하여야 하고 번개페이거래의 경우 구매자가 번개페이를
                  통해 물품 대금 결제를 한 날로부터 3영업일 이내에 물품의 택배
                  배송을 위한 조치를 하여야 합니다(직거래의 경우 3영업일 이내에
                  직거래를 위한 거래 일정을 정하여야 합니다). 다만, 판매자가
                  구매자와 별도로 달리 협의한 경우에는 위 의무가 적용되지 않을
                  수 있습니다.
                </li>
                <li className={styles.term}>
                  구매자가 물품을 수령한 후 7일 이내에 단순 변심 등의 사유에
                  따라 청약을 철회할 의사를 표시한 경우 구매자가 수령한 방법으로
                  물품을 판매자에게 반환할 수 있도록 협조하여야 하고,
                  구매자로부터 물품을 반환 받은 후 즉시 구매자로부터 직접 받은
                  물품 대금을 구매자에게 반환하거나 회사로부터 정산 받은 물품
                  대금을 회사에 반환하여야 합니다.
                </li>
                <li className={styles.term}>
                  판매자가 판매한 물품이 기존의 판매 게시글에 기재된 정보와
                  다르거나 다르게 이행되었다면 구매자가 물품을 수령한 후 3개월
                  이내에, 위 다르거나 다르게 이행된 사실을 구매자가 안 날 또는
                  알 수 있었던 날로부터 30일 이내에 청약을 철회할 의사를 표시한
                  경우 구매자가 수령한 방법으로 물품을 판매자에게 반환할 수
                  있도록 협조하여야 하고, 구매자로부터 물품을 반환 받은 후 즉시
                  구매자로부터 직접 받은 물품 대금을 구매자에게 반환하거나
                  회사로부터 정산 받은 물품 대금을 회사에 반환하여야 합니다.
                </li>
                <li className={styles.term}>
                  구매자의 책임 있는 사유로 물품이 이미 멸실 또는 훼손되거나
                  구매자의 사용 또는 소비로 물품의 가치가 현저하게 감소하였거나
                  재판매하기 곤란한 정도로 물품의 가치가 현저히 감소한 경우에는
                  본조에 따라 구매자가 청약을 철회할 의사를 표시하였다고
                  하더라도 이를 거부할 수 있습니다.
                </li>
              </ol>
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제15조 (회원에 대한 통지)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              회사가 회원에 대한 통지를 하는 경우 본 약관에 별도의 규정이 없는
              한 서비스 제공을 위한 웹사이트 또는 어플리케이션 내 알림으로
              통지하거나 회원이 회원가입 신청시(또는 이후 회사에 변경 통지한)
              입력한 이메일 주소로 이메일 발송, 휴대전화번호로 SMS 또는 카카오톡
              메시지 발송을 통해 통지할 수 있습니다.
            </li>
            <li className={styles.term}>
              회사는 회원 전체에 대한 통지가 필요한 경우 7일 이상의 웹사이트 및
              어플리케이션 공지사항 화면에 통지의 내용을 게시함으로써 전항의
              통지를 갈음할 수 있습니다.
            </li>
          </ol>
        </div>

        <h1 className={styles.title}>제6장 분쟁의 해결</h1>
        <h2 className={styles.subTitle}>제16조 (분쟁조정센터)</h2>
        <p className={styles.termBody}>
          회사는 서비스 이용에 관한 회원의 불만이나 회원간 분쟁의 접수 및 해결을
          위한 인력 및 설비를 갖춘 분쟁조정센터를 운영하고, 분쟁조정의 절차에
          관한 상세 내용을 정하는 분쟁조정기준을 제정합니다.
        </p>
        <h2 className={styles.subTitle}>
          제17조 (분쟁의 해결을 위한 신원정보 제공)
        </h2>
        <p className={styles.termBody}>
          거래 관련 분쟁에 관한 관계기관의 회사에 대한 요청에 따라 회사는
          관계기관에 회원의 신원 정보를 제공할 수 있습니다.
        </p>

        <h1 className={styles.title}>제7장 기타</h1>
        <h2 className={styles.subTitle}>제18조 (운영정책)</h2>
        <p className={styles.termBody}>
          회사는 회원에게 건전하고 안전한 서비스를 원활하게 제공하기 위해
          운영정책을 수립하고 운영합니다.
        </p>
        <h2 className={styles.subTitle}>
          제19조 (저작권 등 콘텐츠에 대한 권리의 귀속)
        </h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              서비스의 저작권 및 지적재산권을 전적으로 회사에 귀속됩니다. 다만,
              제휴 계약에 따라 제공된 저작물은 그렇지 아니합니다.
            </li>
            <li className={styles.term}>
              회사가 제공하는 서비스의 디자인, 회사가 만든 텍스트,
              스크립트(script), 그래픽, 회원 상호간 메시지 전송 기능 등 회사가
              제공하는 서비스에 관한 모든 상표, 서비스 마크, 로고 등 관련 저작권
              기타 지적재산권은 대한민국 및 외국의 관련 법령에 근거하여 회사가
              보유하고 있거나 회사에게 소유권 또는 사용권이 있습니다.
            </li>
            <li className={styles.term}>
              회원은 본 약관으로 인하여 서비스를 소유하거나 서비스에 관한
              저작권을 보유하게 되는 것이 아니라, 회사로부터 서비스의 이용을
              허락 받게 되는 것입니다.
            </li>
            <li className={styles.term}>
              회원은 회사에 의해 명시적으로 허락된 내용을 제외하고는 서비스를
              통해 얻어지는 회원 상태 정보를 영리 목적으로 사용, 복사, 유통할 수
              없고, 회사가 만든 텍스트, 스크립트, 그래픽의 회원 상호간 메시지
              전송 기능 등을 복사하거나 유통할 수 없습니다.
            </li>
            <li className={styles.term}>
              회사는 서비스와 관련하여 회원에게 회사가 정한 이용 조건에 따라
              계정, 아이디, 콘텐츠 등을 이용할 수 있는 이용 권한을 부여하며,
              회원은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.
            </li>
            <li className={styles.term}>
              회사는 서비스를 통해 얻어지는 회원의 게시물(판매자, 구매자 정보 및
              기타 거래 관련 정보) 관련 정보를 영리 목적으로 회원의 허락 없이
              사용할 수 있습니다.
            </li>
            <li className={styles.term}>
              회원이 서비스를 이용하면서 발생 및 생성된 정보에 대한 저작권 및
              지적재산권은 모두 회사에 귀속됩니다. 다만, 회원이 단독으로 생성한
              콘텐츠에 대해서는 회사와 해당 회원에게 공동 소유권 또는 사용권이
              있습니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제20조 (재판권 및 준거법)</h2>
        <div className={styles.termBody}>
          <ol type="1" className={styles.termLists}>
            <li className={styles.term}>
              본 약관과 회사와 회원간의 서비스 이용 계약, 회원 상호간의 물품
              거래에 관하여는 대한민국 법령이 적용된다.
            </li>
            <li className={styles.term}>
              회사와 회원간에 발생한 분쟁에 관한 소송은 소송의 관할은 당사자
              간의 합의에 따르며, 사전 합의된 바가 없는 경우에는 민사소송법의
              관할 규정에 따릅니다.
            </li>
          </ol>
        </div>
        <h2 className={styles.subTitle}>제21조 (특별규정)</h2>
        <p className={styles.termBody}>
          이 약관에 명시되지 않은 사항은 전자거래기본법, 전자서명법, 전자상거래
          등에서의 소비자보호에 관한 법률 등 기타 관련법령의 규정에 의합니다.
        </p>
        <p className={styles.term}>
          이 방침은 2021년 08월 17일부터 적용됩니다.
        </p>
      </div>
    </>
  );
};

export default TermServicePage;
