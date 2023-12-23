//login / signUp

import { useEffect, useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from "../customhook/useInput";
import {
  emailState,
  nickNameState,
  passwordCheckState,
  passwordState,
} from "../recoil/authState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { identify } from "../common.js";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
  StyledLabel,
} from "../StyledComponents";

import { GoChevronRight } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import PersonalInfoProcessingDetailModal from "../component/PersonalInfoProcessingDetailModal.jsx";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = location.state.content || "";

  const [emailInput, onEmailChange] = useInput(emailState);
  const [passwordInput, onPasswordChange] = useInput(passwordState);
  const [passwordCheckInput, onPasswordCheckChange] =
    useInput(passwordCheckState);
  const [nicknameInput, onNicknameChange] = useInput(nickNameState);

  // email이 맞는지 확인하는 useState
  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  // password가 맞는지 확인하는 useState
  const [passwordIdentifyCheck, setPasswordIdentifyCheck] = useState(null);

  // 모든 데이터를 입력받았는지 확인하는 useState
  const [dataComeIn, setDataComeIn] = useState(false);

  // 모든 상태가 변경된 채로 랜더링이 완료되었는지 알아보기 위한 useState
  // true = 아직 로딩 중이라는 의미.
  const [loading, setLoading] = useState(true);

  // 이용 약관 동의 useState
  const [allCheck, setAllCheck] = useState(false);
  const [check, setCheck] = useState([
    { title: "check0", state: false },
    { title: "check1", state: false },
    { title: "check2", state: false },
    { title: "check3", state: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenIndex, setModalOpenIndex] = useState(0);

  // email, password, passwordCheck, nickname 데이터를 다른 곳에서 사용할 수 있으니
  // 커스텀 훅과 recoil을 연결하여 전역 상태로 관리.
  const setEmailInput = useSetRecoilState(emailState);
  const setPasswordInput = useSetRecoilState(passwordState);
  const setPasswordCheckInput = useSetRecoilState(passwordCheckState);
  const setNicknameInput = useSetRecoilState(nickNameState);

  // user가 들어왔는지 안 들어왔는지 확인하는 전역 데이터.
  const userIn = useRecoilValue(userState);

  useEffect(() => {
    setEmailInput("");
    setPasswordInput("");
    setPasswordCheckInput("");
    setNicknameInput("");
    setCheck((prev) =>
      prev?.map((check) => {
        return { ...check, state: false };
      })
    );
  }, [content]);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);

      setCheck((prev) =>
        prev?.map((check) => {
          return { ...check, state: true };
        })
      );
    } else {
      setAllCheck(false);

      setCheck((prev) =>
        prev?.map((check) => {
          return { ...check, state: false };
        })
      );
    }
  };

  const checkBtnEvent = (index) => {
    if (
      check[check?.findIndex((el) => el.title === `check${index}`)]?.state ===
      false
    ) {
      setCheck((prev) =>
        prev?.map((el) => {
          if (el.title === `check${index}`) {
            return { ...el, state: true };
          } else {
            return el;
          }
        })
      );
    } else if (
      check[check?.findIndex((el) => el.title === `check${index}`)]?.state ===
      true
    ) {
      setCheck((prev) =>
        prev?.map((el) => {
          if (el.title === `check${index}`) {
            return { ...el, state: false };
          } else {
            return el;
          }
        })
      );
    }
  };

  const checkBtnEvent2 = (index) => {
    if (
      check[check?.findIndex((el) => el.title === `check${index}`)]?.state ===
      false
    ) {
      setCheck((prev) =>
        prev?.map((el) => {
          if (el.title === `check${index}`) {
            return { ...el, state: true };
          } else {
            return el;
          }
        })
      );
    }
  };

  useEffect(() => {
    if (check?.filter((el) => el.state === true)?.length === 4) {
      setAllCheck(true);
    } else if (check?.filter((el) => el.state === true)?.length < 4) {
      setAllCheck(false);
    }
  }, [check, setAllCheck]);

  useEffect(() => {
    const same =
      emailInput &&
      emailIdentifyCheck &&
      passwordInput &&
      passwordIdentifyCheck;

    if (
      (content === "login" && same) ||
      (content === "signUp" &&
        same &&
        passwordCheckInput &&
        passwordInput === passwordCheckInput &&
        nickNameState &&
        check[0].state &&
        check[1].state)
    ) {
      setDataComeIn(true);
    } else {
      setDataComeIn(false);
    }
  }, [
    content,
    emailInput,
    passwordInput,
    passwordCheckInput,
    nicknameInput,
    emailIdentifyCheck,
    passwordIdentifyCheck,
    check,
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const checkboxData = [
    {
      title: "이용약관",
      content:
        "# BE:BEAM 이용약관\n\n**제1조 목적**\n이 이용약관은 BE:BEAM(이하 회사)가 제공하는 서비스와 이용조건, 운영에 관한 제반 사항 규정을 목적으로 합니다.\n\n**제2조 용어의 정의**\n이 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.\n\n1. 회사 : 'BE:BEAM(다체로운 청년들의 따뜻한 연결망)'를 뜻합니다.\n2. 서비스 : BE:BEAM 사이트([사이트 주소])를 비롯, 온라인과 오프라인으로 회사가 제공하고 회원이 이용할 수 있는 모든 서비스를 의미합니다.\n3. 멤버 : 이용 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 서비스 이용 계약을 체결한 사람을 말합니다.\n4. 이용 계약 : 서비스 이용과 관련하여 회사와 회원 간에 체결하는 모든 계약을 말합니다.\n5. 회원 아이디(이하 'ID') : 회원의 식별과 서비스 이용을 위하여 회원 각자가 지정한 고유한 문자와 숫자 및 기호의 조합을 말합니다.\n6. 비밀번호 : 회원이 각자 지정한 ID와 일치하는 자임을 확인하고 회원의 권익을 보호하기 위하여, 회원이 설정한 문자와 숫자 및 기호의 조합을 말합니다.\n7. 해지 : 회사 또는 회원이 이용 계약을 해약하는 것을 말합니다.\n8. 사이트 : 회사가 재화 또는 용역을 회원에게 제공하기 위하여 정보통신설비를 이용해 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 의미합니다.\n9. 이 약관에서 정의되지 않은 용어는 관련 법령이 정하는 바를 따르며, 그 외에는 일반 관례를 따릅니다.\n\n**제3조 약관 외 준칙**\n회사는 필요한 경우 별도로 운영 정책을 공지하고 안내할 수 있으며, 회원은 회원 가입과 동시에 이에 동의한 것으로 간주합니다. 본 약관과 운영 정책이 중첩될 경우 운영 정책이 우선 적용됩니다.**제4조 약관 효력 및 변경**1. 회사는 이 약관의 내용과 상호, 영업장 소재지, 대표자의 성명, 사업자등록번호, 연락처(전화, 이메일 주소 등) 등을 이용자가 알 수 있도록 사이트의 초기화면에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.\n2. 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「전자상거래 등에서의 소비자보호에 관한 법률」, 「전자문서 및 전자거래 기본법」, 「전자금융거래법」, 「전자서명법」, 「방문판매 등에 관한 법률」, 「소비자 기본법」 등 관련법을 위배하지 않는 범위에서 사전 고지 없이 이 약관의 내용을 변경할 수 있습니다.\n3. 회사가 약관을 개정할 경우에는 적용일자 및 개정 사유(개정될 내용 중 중요사항에 대한 설명을 포함)를 명시하여 현행 약관과 함께, 회사가 활용 가능한 수단을 통하여 그 적용일자 7일 이전(이용자에게 불리하거나 중대한 사항의 변경은 30일 이전)부터 적용일 이후 7일 동안 공지합니다.\n4. 회원이 변경된 약관의 효력발생일 이후에도 서비스를 계속 이용할 경우, 약관의 변경사항에 동의한 것으로 간주됩니다.\n5. 회원이 개정 약관의 적용에 동의하지 않는다는 의사표시를 명시적으로 한 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용 계약을 해지할 수 있습니다. 단, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사도 이용 계약을 해지할 수 있습니다.\n\n**제5조 이용 계약 체결**\n\n1. 이용 계약은 회원으로 등록한 후, 본 약관 내용에 대한 회원의 동의와 가입 신청에 대한 회사의 이용 승낙으로 성립합니다.\n2. 회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입 신청 시, 회원 가입 절차를 완료하면 본 약관에 대해 동의한 것으로 간주합니다.\n3. 서비스 관련한 이용 계약 체결을 서면 또는 사이트가 아닌 별도의 방법을 통해 회사와 진행한 경우에도, 사이트를 통한 이용 계약 체결과 동일한 효력을 가집니다.\n\n**제6조 서비스 이용 신청**\n\n1. 회원으로 등록하여 서비스를 이용하려는 이용자는 회사 또는 사이트에서 요청하는 제반 정보(이용자ID, 비밀번호, 휴대전화번호 등)를 제공해야 합니다.\n2. 타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 사이트 이용 및 서비스 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌받을 수 있습니다.\n3. '회사'는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.\n4. 제2항에 따라 회원 가입 신청의 승낙을 하지 아니하거나 유보한 경우, 회사는 원칙적으로 이러한 사실을 가입 신청자에게 알리도록 합니다.\n5. 회원은 가입 신청 시 작성한 이용 신청 사항에 변경이 있는 경우, 온라인 또는 오프라인으로 개인정보를 수정하거나 이메일 등 기타 방법으로 회사에 그 변경 사항을 알려야 합니다. 이를 알리지 않아 발생하는 불이익에 대한 책임은 회원에게 있습니다.\n\n**제7조 개인정보 처리 방침**\n\n1. 회사는 회원 가입 시 회원이 제공한 개인정보 중 비밀번호를 가지고 있지 않으며, 이와 관련한 부분은 회사의 개인정보 처리 방침을 따릅니다.\n2. 회사는 관계 법령이 정하는 바에 따라 회원 등록 정보를 포함한 회원의 개인정보를 보호하기 위하여 노력을 합니다. 단, 회원의 귀책 사유로 인해 노출된 정보에 대해 회사는 모든 책임을 지지 않습니다.\n3. 회사는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등 위법한 게시물을 등록 · 배포할 경우 관련 기관의 요청이 있을 시 회원의 자료를 열람 및 해당 자료를 관련 기관에 제출할 수 있습니다.\n\n**제8조 회사의 의무**\n\n1. 회사는 회원이 안전한 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위해 보안 시스템을 갖추어야 하며 개인정보 처리방침을 공지하고 준수합니다.\n2. 회사는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적 빠르게 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우 사후에 공지 또는 이용회원에게 쪽지, 전자우편 등을 보내는 등 최선을 다합니다.\n3. 운영자는 지속적이고 안정적인 사이트 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체없이 수리 또는 복구할 수 있도록 사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에 부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.\n\n**제9조 회원에 대한 정보제공 및 통지**\n\n1. 회사는 서비스 이용에 필요하다고 인정되는 각종 정보를 이메일이나 우편, SMS, 전화, 카카오톡 채널, 앱 푸시 등의 방법으로 회원에게 제공할 수 있습니다.\n2. 회사는 멤버가 제공하고 회사가 활용 가능한 수단을 통해 회원에게 의사표시 관련 통지를 할 수 있습니다. 단, 회원정보에 기입 된 이메일 주소 또는 휴대전화번호를 항상 정확한 정보로 유지하는 책임은 회원에게 있습니다.\n3. 회사는 불특정 다수 회원에 대한 통지의 경우 1주일 이상 사이트 또는 오프라인에 게시함으로써 개별 통지에 갈음할 수 있습니다.\n4. 회사는 서비스 개선, 서비스 소개와 홍보 등의 목적으로 회원의 동의를 받고 관련 법령에 따라 추가적인 개인정보를 수집할 수 있습니다.\n\n**제10조 회원의 의무**\n\n1. 회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반 규정, 공지사항 및 운영정책 등 사이트가 공지하는 사항 및 관계 법령을 준수하여야 하며, 기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상하는 행위를 해서는 안 됩니다.\n2. 회원은 사이트의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.\n3. 이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, 운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.\n4. 회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안 됩니다.\n5. 다음 행동의 경우 회사는 회사가 정 한 회원의 권리에 제재를 가할수 있습니다. 더불어 아래의 내용에 해당하는 온라인 게시물의 경우, 회사가 임의로 삭제할 수 있습니다.\n- 이용권 양도 및 불법 판매\n- 타인 명의 도용 ( 멤버십 계정으로 다른 사람의 모임 참여를 대리 신청하는 경우)\n- 회사 및 제3자의 지적재산권 대한 침해\n- 회사 및 제3자의 명예를 손상하거나 업무를 방해하는 행위\n- 회원 간 금전 거래\n- 포교 활동\n- 범죄와 관련 있다고 객관적으로 판단되는 행위\n- 14세 미만 아동이 법정대리인(부모 등)의 동의를 얻지 아니하고 이용 계약을 체결한 행위\n- 커뮤니티 가이드라인을 준수하지 않은 경우 (타 회원 및 제3자에 대한 위협, 학대, 괴롭힘, 혐오 발언, 인권 침해, 성희롱 등을 포함한 언어 및 비언어 폭력 행위, 외설 또는 폭력적인 메시지 발송 등)\n- 타 멤버에게 수차례 비슷한 내용의 민원이 반복 제기된 경우\n- 회사의 동의 없이 영리를 목적으로 '서비스'를 사용하는 행위\n- 기타 불법적이거나 부당한 행위\n\n**제11조 서비스 제공 및 변경**\n\n1. 회사는 회원에게 콘텐츠 기반 커뮤니티 서비스 및 강연, 워크숍 등 이벤트 행사 서비스를 제공합니다.\n2. 회사는 사전 공지를 통해 서비스를 일정 범위로 분할하여 각 범위별로 이용 가능 시간을 별도로 지정할 수 있습니다.\n3. 회사는 타당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.\n4. 회사가 정한 정족수 미달이나 행사를 개최하는 주요 관계인의 신변상 문제 등으로 서비스 제공 일정을 변경하거나 서비스 제공을 중단할 수 있습니다.\n5. 서비스의 내용, 이용 방법, 이용 시간에 대하여 변경이 있는 경우에는 변경 사유, 변경될 서비스의 내용 및 제공 일자 등은 그 변경 전에 서비스 화면, 문자 및 이메일 등으로 통지해야 합니다.\n6. 서비스를 부득이한 사정으로 중단할 경우, 회사는 해당 내용을 회원에게 사전 통보하며, 시기에 따라 전액 환불 혹은 일부 환불 조치를 취합니다. 상세 내용은 별도 고지된 회사의 환불 규정에 따릅니다.\n\n**제12조 서비스 이용 시간**\n\n1. BE:BEAM 사이트를 통한 서비스 제공은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며, 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.\n2. 단, 사이트는 다음 경우에 대하여 사전 공지나 예고 없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.\n- 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우\n- 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우\n- 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우\n- 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우\n1. 위에서 언급한 사유로 서비스를 중단할 경우 사이트는 사전에 공지사항 등을 통하여 회원에게 통지합니다. 단, 사이트가 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.\n\n**제13조 서비스 이용 해지**\n\n1. 회원이 이용 계약을 해지하고자 하는 경우에는 회원 본인이 직접 서비스 이용 해지 신청을 하여야 합니다.\n2. 사이트를 통해 회원이 직접 서비스 이용 해지를 신청할 수 있으며, 직접 해지가 불가능한 조건의 일부 프로그램과 서비스의 경우 (사이트 주소)을 통해 환불 절차에 필요한 정보(이용자ID, 휴대전화번호, 이름, 환불 사유)를 전달함으로써 서비스 이용 해지 신청이 가능합니다.\n\n**제14조 서비스 이용 해지에 따른 환불**\n서비스 환불은 다음과 같은 규정을 따릅니다.\n\n1. 개인 회원 변심의 경우 이용권 금액을 기준으로 모임 시작일 14일 전까지 100%, 7일 전까지 80%, 3일 전까지 50% 환불이 가능합니다.\n2. 서비스 중 '장기모임(가제)'의 경우 하나의 모임이 3~4회 커리큘럼으로 구성되어 있고 이를 묶어 제공하는 것이므로, 첫 모임 시작일 이후에는 환불이 불가능합니다.\n3. 회사가 제공하는 서비스의 가입자 수가 적절한 수에 도달하지 못해 회사 내부적으로 모임 개최가 불가능하다고 판단할 경우 모임을 취소할 수 있으며, 이 경우 환불 규정에 명시된 기간과 관계없이 전액 환불하는 것으로 합니다. 단, 기등록 회원에게 해당 사실을 미리 통지하여야 합니다.\n4. 모임 개최 구성원(모임장, 강연자 등)의 개인 사정을 비롯해 기상악화, 천재지변, 정부규제 등으로 서비스가 취소되는 경우 전액 환불을 제공합니다.\n\n**제15조 정보의 제공 및 광고의 게재**\n\n1. 회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보를 문자, 이메일 등을 통해 회원에게 제공할 수 있습니다. 다만, 회원은 관련법에 따른 거래 관련 정보 및 고객 문의 등에 대한 답변 등을 제외하고는 언제든 수신 거부를 할 수 있습니다.2. 회사는 서비스의 운영과 관련하여 서비스 화면, 사이트, SNS 등에 광고를 게재할 수 있습니다. 해당 광고에는 회원의 게시물 및 서비스 중 이뤄지는 사진 촬영의 결과물 등이 포함될 수 있습니다.3. 회사는 회사가 제공하는 서비스와 관련한 회원의 게시물 또는 기타 정보를 변경, 수정, 제한하는 등의 조치를 취하지 않습니다. 더불어 이를 사용할 시, 회원에게 동의를 구한 후 사용합니다.4. 회원은 언제든지 고객센터 등을 통해 광고에 게재된 자신의 게시물과 자신의 사진 등에 대해 삭제, 검색결과 제외, 비공개 등의 조처를 할 수 있습니다.**제16조 게시물의 관리**\n\n1. 사이트의 게시물과 자료의 관리 및 운영의 책임은 회사의 운영자에게 있습니다. 운영자는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며, 불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를 삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.\n2. 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이 있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는 안됩니다.\n3. 정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 운영자는 회원의 사전동의 없이 게시물을 삭제하거나 이동 할 수 있습니다.\n4. 사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시 중단(전송 중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련 기관의 결정 등의 이유로 사이트에 접수된 경우 이에 따릅니다.\n**제17조 게시물의 보관**\n사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우, 회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조처를 하기 위해 노력합니다.\n\n**제18조 게시물에 대한 저작권**\n\n1. 회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 사이트는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.\n2. 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.\n3. 회사가 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용이 내규 위반에 해당한다고 판단할 경우, 회원의 게시물을 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.\n\n**제19조 손해배상**\n\n1. 이 사이트의 발생한 모든 민, 형법상 책임은 1차적으로 회원 본인에게 있습니다.\n2. 이 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 않습니다.\n3. 회원은 고의 또는 과실로 인해 회사의 제반 시설물에 파손을 입힌 경우에는 회사의 청구에 따라 원상회복 및 손해배상에 책임을 지고 변상하여야 합니다.\n\n**제20조 면책**\n\n1. 회사는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지 못 하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.\n2. 회사는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신 서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다\n3. 회사는 회원이 저장, 게시 또는 전송한 자료와 관련하여 모든 책임을 지지 않습니다.\n4. 회사는 회원의 귀책 사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.\n5. 회사는 회원이 게시 또는 전송한 자료 및 사이트를 통해 회원이 제공받을 모든 자료의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.\n6. 회사는 회원 상호 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 물품 거래 등을 한 경우에 그로부터 발생하는 모든 손해에 대하여 책임지지 아니합니다.\n7. 회사는 회사의 귀책 사유 없이 회원간 또는 회원과 제3자간에 발생한 모든 분쟁에 대하여 책임지지 아니합니다.\n8. 회사는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안 관련 업체에 의해 대응 방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 회사가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임을 지지 않습니다.\n\n**제21조 준거법 및 재판 관할**\n\n1. 회사와 회원 간 제기된 소송은 대한민국법을 준거법으로 합니다.\n2. 회사와 회원 간 발생한 분쟁에 관한 소송은 제소 당시의 회사의 본점 주소지를 관할하는 지방법원의 관할로 합니다.\n\n부칙\n\n이 약관은 2023년 12월29일부터 시행합니다.\n",
      term: "필수",
    },

    {
      title: "개인정보 처리방침(THE이상)",
      content:
        "개인정보 처리방침\n\nBE:BEAM 개인정보 처리 방침\n\nBE:BEAM(이하 ‘회사’)는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 BE:BEAM 서비스 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 두고 있습니다. 개인정보처리방침은 관련 법령, 지침, 고시 또는 회사 정책의 변경에 따라 변경될 수 있으며 변경 내용은 웹사이트를 통해 공지할 예정입니다.\n\n제1조 개인정보 수집 항목\n\n회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n\n이용자는 회원가입을 하지 않아도 일부 서비스를 회원과 동일하게 이용할 수 있고, 회원가입을 통해 더욱 다양한 서비스를 제공받을 수 있습니다. 이용자가 회원가입을 할 경우, 회사는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.\n\n• 회원 가입 시 수집될 수 있는 개인정보\n\n• 카카오톡 계정 (이름, 아이디, 이메일, 비밀번호)\n\n• 구글 계정 (이름, 아이디, 이메일, 비밀번호)\n\n• 보유기간 : 수집 이용 동의일부터 수신거부 시점까지\n\n• 서비스 이용과정 및 처리과정에서 수집될 수 있는 개인정보\n\n• 수집항목 : 쿠키, 서비스이용기록(IP, 방문일시, 불량이용기록등), 기기정보 서비스 이용기록\n\n• 수집방법 : 자동 생성 정보\n\n• 보유 및 이용기간 : 회원탈퇴시(단,관계법령에 따름)\n\n서비스 이용과정에서 이용자로부터 수집하는 개인정보는 서비스에 따라 차이가 있을 수 있습니다.\n\n추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내하고 동의를 받습니다.\n\n제2조 개인정보 수집 방\n\n회사는 아래와 같은 방법을 통해 개인정보를 수집합니다\n\n• 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우, 해당 개인정보를 수집합니다.\n\n• 고객센터 및 담당직원을 통한 상담 과정에서 웹페이지, 메일, 팩스, 문자, 전화 등을 통해 이용자의 개인정보가 수집될 수 있습니다.\n\n• 오프라인에서 진행되는 이벤트, 세미나 등에서 서면을 통해 개인정보가 수집될 수 있습니다.\n\n• 회사와 제휴한 외부 기업이나 단체로부터 개인정보를 제공받을 수 있으며, 이러한 경우에는 정보통신망법에 따라 제휴사에서 이용자에게 개인정보 제공 동의 등을 받은 후에 BE:BEAM에 제공합니다.\n\n• 회사의 이벤트 응모과정에서 해당 서비스의 이용자에 한해서만 추가정보들이 수집 될 수 있습니다. 이러한 경우에는 이벤트 응모 페이지를 통해 명시하고 제공 동의를 추가로 받습니다.\n\n제3조 개인정보 이용 목적\n\n회사는 이용자의 개인정보를 다음과 같은 목적으로만 처리합니다.\n\n• 홈페이지 가입 및 회원관리 : 회원가입, 서비스 이용, 본인인증 및 확인, 회원 탈퇴 의사 확인, 불량회원 부정 이용 방지 등\n\n• 불만처리 및 공지 : 문의사항 또는 민원처리, 약관 개정 및 서비스 이용 등에 관한 공지사항 기타 각종 통지, 법령 및 회사 이용약관을 위반하는 등 서비스의 원활한 이용에 지장을 주는 행위에 대한 방지 및 해당 회원 이용 제한 조치, 부정 이용방지,비인가 사용방지, 분쟁조정 해결을 위한 기록보존 등\n\n• 서비스 개발, 제공 및 향상 : 인구통계학적 분석, 서비스 방문 및 이용 기록 분석, 개인정보 및 관심사에 기반한 이용자 간 관계 형성, 질의 응답 서비스 제공, 신규 서비스 개발, 광고 및 마케팅 활용, 이벤트 및 광고성 정보 제공\n\n• 안전한 이용환경 구축 : 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축\n\n제4조 개인정보의 제3자 제공 및 위탁\n\n회사는 원칙적으로 이용자의 사전 동의없이 개인정보를 외부에 제공하지 않습니다. 개인정보처리방침에서 규정하고 있는 범위 내에서만 사용하고 있으며 범위를 초과하여 이용하거나 별도 동의 없이 제 3자에게 제공하지 않습니다. 다만 아래의 경우에는 예외로 합니다.\n\n• 이용자들이 사전에 동의한 경우\n\n• 법령에 규정에 의거하거나, 수사목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우\n\n• 이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우\n\n• 이외에 개인정보를 제공하거나 공유할 경우에는 사전에 고객께 제휴사가 누구인지, 제공 또는 공유되는 개인정보항목이 무엇인지, 왜 그러한 개인정보가 제공되거나 공유되어야 하는지, 그리고 언제까지 어떻게 보호관리되는지에 대해 고지하여 동의를 구하는 절차를 거치게 되며, 고객께서 동의하지 않는 경우에는 제휴사에게 제공하거나 제휴사와 공유하지 않습니다.\n\n• 또한 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우에는 특정 개인을 알아볼 수 없는 통계 자료의 형태로 가공하여 제공할 수 있습니다.\n\n\n\n제5조 개인정보의 보유, 이용기간 및 파기\n\n회사는 이용자로부터 동의 받은 처리목적이 달성되거나 법령에 따른 보존기간이 달성될 때까지 개인정보를 처리 및 보유합니다.\n\n단, 관계법령에 따라 개인정보 보존의무가 부과되는 경우에는 법령이 정한 기간 동안 보존합니다. 관계법령에 의해 보존해야 하는 정보와 보존기간은 아래와 같습니다.\n\n• 표시/광고에 관한 기록: 6개월\n\n• 계약 또는 청약철회에 관한 기록: 5년\n\n• 대금결제 및 재화 등의 공급에 관한 기록: 5년\n\n• 소비자의 불만 또는 분쟁처리에 관한 기록: 3년\n\n• 서비스 이용 관련 개인정보(로그인 기록): 3개월\n\n• 전자금융에 관한 기록: 5년\n\n• 신용정보의 수집, 처리 및 이용 등에 관한 기록: 3년\n\n회사는 이용자의 개인정보에 대해 처리목적이 달성되어 불필요하게 되었을 때는 해당 개인정보를 지체 없이 파기합니다. 개인정보 파기 절차 및 방법은 다음과 같습니다.\n\n• 전자적 파일 형태인 경우 복구 및 재생되지 않도록 기술적인 방법을 이용하여 완전하게 삭제합니다.\n\n• 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.\n\n제6조 이용자 권리와 의무 및 행사 방법\n\n회원 및 법정 대리인은 언제든지 등록되어 있는 자신 또는 대리자의 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴 절차에 따라 가입 해지(동의 철회)를 요청할 수 있습니다.\n\n• 회원은 홈페이지의 '마이페이지' 내의 '내 정보 수정’을 통하여 개인정보 조회 및 수정을 할 수 있습니다. 단, 서비스의 원활한 제공을 위하여 직접 수정이 제한된 개인정보의 수정을 위해서는 oddodd2121@gmail.com로 문의 바랍니다.\n\n• 가입 해지를 위해서는 성명, 휴대전화번호, 가입 시 기재된 메일주소 등의 정보를 탈퇴의사와 함께 기재하여 oddodd2121@gmail.com로 보내주시면 처리해드립니다.\n\n• 회원이 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공∙위탁하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 위탁한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 합니다.\n\n• 고객님께서는 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 고객의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오. 만약 이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』등에 의해 처벌받을 수 있습니다.\n\n• 회사는 만 14세 미만 아동의 개인정보를 보호하기 위하여 회원가입은 만14세 이상만 가능하도록 함으로써 법정 대리인의 동의가 필요한 만 14세미만 아동의 개인정보를 수집하지 않습니다.\n\n제7조 개인정보보호를 위한 기술\n\n회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 아니하도록 안전성을 확보하기 위하여 다음과 같이 기술적·관리적 보호대책을 강구하고 있습니다.\n\n• 회사는 개인화되고 맞춤화된 서비스를 제공하기 위해 BE:BAEM 웹사이트(웹사이트 주소, 이하 '사이트')에서 이용자의 정보를 저장하고 수시로 불러오는 쿠키(cookie)를 사용합니다.\n\n• 이용자가 웹사이트에 방문할 경우 웹 사이트 서버는 이용자의 컴퓨터, 모바일 기기 등의 디바이스에 저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하게 됩니다.\n\n• 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로 접속하고 편리하게 사용할 수 있도록 돕습니다. 또한, 이용자의 웹사이트 방문 기록, 이용 형태를 통해서 최적화된 광고 등 맞춤형 정보를 제공하기 위해 활용됩니다.\n\n• 쿠키는 개인을 식별하는 정보를 자동적/능동적으로 수집하지 않으며, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.\n\n• 다만 쿠키 설치를 거부할 경우 웹사이트 사용이 불편해지며 로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.\n\n제8조 개인정보의 안전성 확보 조치 및 민원 서비스\n\n회사는 이용자의 개인정보 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.\n\n• 관리적 조치: 직원 교육, 취급자 최소화\n\n• 기술적 조치: 시스템 접근권한 관리, 보안프로그램 설치\n\n• 물리적 조치: 보관장소 접근통제\n\n회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.\n\n[개인정보 보호 책임자]\n\n• 책임자 : 김성원\n\n• 직급: 기획운영팀장\n\n• 문의: 010-6481-1834, oddodd2121@gmail.com\n\n기타 개인정보 침해에 대한 신고나 상담이 필요한 경우에 아래 기관에 문의 가능합니다.\n\n• 개인정보 침해신고센터 : (국번없이) 118 (http://privacy.kisa.or.kr)\n\n• 개인정보 분쟁조정위원회 : 02-2100-2499 (http://kopico.go.kr)\n\n• 대검찰청 사이버수사과 : (국번없이) 1301 (http://spo.go.kr)\n\n• 경찰청 사이버안전국 : (국번없이) 182 (http://cyberbureau.police.go.kr)\n\n제9조 본 개인정보 처리방침의 적용 범위\n\n이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따라 내용 추가, 삭제 및 수정이 있을 경우 변경사항 시행 최소 7일 전부터 공지사항을 통하여 고지할 것입니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 공지하며, 필요 시 이용자 동의를 다시 받을 수도 있습니다.\n\n회사는 회원에게 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 회사가 포함하고 있는 링크를 클릭하여 타 웹사이트의 페이지로 옮겨 갈 경우 해당 사이트의 개인정보 처리방침은 회사와 무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다.\n\n제10조 사진/영상 촬영 및 초상권 사용에 대한 동의\n\n회사는 BE:BEAM 멤버십 서비스 진행 및 홍보 목적으로 멤버들의 활동을 촬영할 수 있습니다. 촬영된 사진 및 영상을 편집,가공,변형할 수 있으며, 온오프라인 매체 (SNS, 홈페이지, 사업보고서, 브로슈어, 언론보도 등)에 사용할 수 있습니다. 해당 내용은 행사 진행 시 다시 한번 고지할 예정이며, 초상권 사용에 동의하지 않을 수 있습니다.\n\n공고일자 : 2023년 12월 19일\n시행일자 : 2023년 월 일",
      term: "필수",
    },
    { title: "연령(14세 이상) 확인", term: "선택" },
    { title: "마케팅 동의", term: "선택" },
  ];

  // user가 있을시 Auth 페이지에 접근 불가.
  useEffect(() => {
    if (userIn) {
      navigate("/");
    }
  }, [userIn]);

  console.log(check);

  return (
    <>
      {!loading && (
        <div className="w-full">
          <div
            className={`${
              content === "login" ? "pb-10" : "pb-20"
            } sm:w-[500px] w-full mx-auto sm:pt-0 pt-10 px-5 box-border flex flex-col items-center`}
          >
            <img
              className="md:w-[100px] sm:w-[90px] w-[80px] object-cover mx-auto cursor-pointer"
              src={
                process.env.PUBLIC_URL + "/logo/logo2.png".replace("./", "/")
              }
              alt="logo"
            />

            <div>
              <h1 className="mt-6 text-[1.8rem] font-black">
                연결망을 통한 따뜻한 사회로.
              </h1>
              <div className="mt-2 flex items-center gap-x-2 justify-center text-[1.125rem] font-thin">
                <p>{`${
                  content === "login"
                    ? "아직 회원이 아니신가요?"
                    : "이미 회원이신가요?"
                }`}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (content === "login") {
                      const content = "signUp";
                      navigate("/auth", { state: { content } });
                    } else if (content === "signUp") {
                      const content = "login";
                      navigate("/auth", { state: { content } });
                    }
                  }}
                  className="text-[#f5aa15]"
                >
                  {`${content === "login" ? "회원가입하기" : "로그인하기"}`}
                </button>
              </div>
            </div>

            <form className="w-full mt-10">
              <div className="w-full mb-6">
                <div className="w-full mb-2">
                  {/* id로 로그인할 수 있도록 할 건지, 이메일로 로그인할 수 있도록 할 건지. */}
                  <label htmlFor="email" className="font-bold">
                    이메일
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder={`${
                      content === "login"
                        ? "이메일을 입력해주세요."
                        : "사용하실 이메일을 입력해주세요."
                    }`}
                    onChange={(e) => {
                      onEmailChange(e);

                      identify(
                        e.target.value,
                        undefined,
                        setEmailIdentifyCheck,
                        setPasswordIdentifyCheck
                      );
                    }}
                    value={emailInput}
                  />

                  <p
                    className={`${
                      emailIdentifyCheck ? "opacity-0" : "opacity-100"
                    } ${
                      emailInput.length === 0 && "opacity-100"
                    } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                  >{`${
                    emailInput.length !== 0 && emailIdentifyCheck
                      ? ""
                      : emailInput.length !== 0 && !emailIdentifyCheck
                      ? "이메일 양식을 맞춰주세요."
                      : "이메일을 입력하세요."
                  }`}</p>
                </div>

                <div className="w-full mb-2">
                  <label htmlFor="password" className="font-bold">
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    id="password"
                    placeholder={`${
                      content === "login"
                        ? "비밀번호를 입력해주세요."
                        : "사용하실 비밀번호를 입력해주세요."
                    }`}
                    onChange={(e) => {
                      onPasswordChange(e);

                      identify(
                        undefined,
                        e.target.value,
                        setEmailIdentifyCheck,
                        setPasswordIdentifyCheck
                      );
                    }}
                    value={passwordInput}
                  />
                  <p
                    className={`${
                      passwordIdentifyCheck ? "opacity-0" : "opacity-100"
                    } ${
                      passwordInput.length === 0 && "opacity-100"
                    } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                  >{`${
                    passwordInput.length !== 0 && passwordIdentifyCheck
                      ? ""
                      : passwordInput.length !== 0 && !passwordIdentifyCheck
                      ? "대소문자, 특수문자, 숫자를 포함하여 8자리 이상 입력해주세요."
                      : "비밀번호를 입력해주세요."
                  }`}</p>
                </div>

                {content === "signUp" && (
                  <>
                    <div className="w-full mb-2">
                      <label htmlFor="passwordCheck" className="font-bold">
                        비밀번호 확인
                      </label>
                      <Input
                        type="password"
                        id="passwordCheck"
                        placeholder="사용하실 비밀번호를 재입력해주세요."
                        onChange={(e) => {
                          onPasswordCheckChange(e);
                        }}
                        value={passwordCheckInput}
                      />
                      <p
                        className={`${
                          passwordCheckInput.length !== 0 &&
                          passwordInput === passwordCheckInput
                            ? "opacity-0"
                            : "opacity-100"
                        } ${
                          passwordCheckInput.length === 0 && "opacity-100"
                        } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                      >{`${
                        passwordCheckInput.length !== 0 &&
                        passwordInput === passwordCheckInput
                          ? ""
                          : passwordCheckInput.length !== 0 &&
                            passwordInput !== passwordCheckInput
                          ? "비밀번호가 일치하지 않습니다."
                          : "비밀번호를 입력해주세요."
                      }`}</p>
                    </div>

                    <div className="w-full mb-8">
                      <label htmlFor="nickname" className="font-bold">
                        닉네임
                      </label>
                      <Input
                        type="text"
                        id="nickname"
                        placeholder="사용하실 닉네임을 입력해주세요."
                        onChange={(e) => {
                          onNicknameChange(e);
                        }}
                        value={nicknameInput}
                      />
                      <p
                        className={`${
                          nicknameInput.length !== 0
                            ? "opacity-0"
                            : "opacity-100"
                        } ${
                          nicknameInput.length === 0 && "opacity-100"
                        } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                      >{`${
                        nicknameInput.length === 0
                          ? "닉네임을 입력해주세요."
                          : ""
                      }`}</p>
                    </div>

                    <div className="w-full mb-2">
                      <label className="font-bold">
                        개인 정보 처리 및 마케팅 수신 동의
                      </label>

                      <p className="mt-2 mb-4 text-[0.8125rem]">
                        서비스 이용에 꼭 필요한 사항입니다.
                        <br />
                        정책 및 약관을 클릭해 모든 내용을 확인해주세요.
                      </p>

                      <div className="w-full">
                        <div className="w-full">
                          <input
                            type="checkbox"
                            id="all-check"
                            checked={allCheck}
                            onChange={allBtnEvent}
                            className="sr-only"
                          />
                          <label
                            htmlFor="all-check"
                            className={`${
                              allCheck
                                ? "bg-[#fbb843] border-[#ffa228] text-white"
                                : "bg-white text-[#6b6b6b]"
                            } w-full p-3 box-border cursor-pointer rounded-lg  text-[0.875rem] border-[1px] border-solid border-[#ccc] transition-all duration-700 flex items-center gap-x-2`}
                          >
                            <FaCircleCheck className="text-[1.2rem]" />
                            전체동의
                          </label>
                        </div>

                        <div className="w-full px-3 py-4 box-border rounded-lg">
                          {checkboxData &&
                            checkboxData?.map((data, index) => {
                              return (
                                <>
                                  <div className="w-full mt-2 mb-3 flex items-center justify-between">
                                    <CheckboxContainer
                                      onClick={() => checkBtnEvent(index)}
                                    >
                                      <HiddenCheckbox
                                        type="checkbox"
                                        id={`check${index}`}
                                        checked={
                                          check[
                                            check?.findIndex(
                                              (el) =>
                                                el.title === `check${index}`
                                            )
                                          ]?.state
                                        }
                                      />
                                      <StyledCheckbox
                                        checked={
                                          check[
                                            check?.findIndex(
                                              (el) =>
                                                el.title === `check${index}`
                                            )
                                          ]?.state
                                        }
                                        onChange={() => checkBtnEvent(index)}
                                      >
                                        <Icon
                                          viewBox="0 0 24 24"
                                          className="scale-75"
                                        >
                                          <polyline points="20 6 9 17 4 12" />
                                        </Icon>
                                      </StyledCheckbox>

                                      <StyledLabel htmlFor={`check${index}`}>
                                        {data?.title}
                                        <span
                                          className={`${
                                            data.term === "선택"
                                              ? "text-[#b6b6b6]"
                                              : "text-[#6ca9ff]"
                                          } ml-1`}
                                        >{`(${data.term})`}</span>
                                      </StyledLabel>
                                    </CheckboxContainer>

                                    {(data?.title == "이용약관" ||
                                      data?.title ===
                                        "개인정보 처리방침(THE이상)") && (
                                      <button
                                        type="button"
                                        className="text-[1.3rem] text-[#414141]"
                                        onClick={(e) => {
                                          e.preventDefault();

                                          setModalOpen(true);
                                          setModalOpenIndex(index);
                                        }}
                                      >
                                        <GoChevronRight />
                                      </button>
                                    )}
                                  </div>

                                  <PersonalInfoProcessingDetailModal
                                    modalOpenIndex={modalOpenIndex}
                                    checkboxData={checkboxData}
                                    modalOpen={modalOpen}
                                    setModalOpen={setModalOpen}
                                    onClick={() =>
                                      checkBtnEvent2(modalOpenIndex)
                                    }
                                  />
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  // 로그인 / 회원가입 관련 로직 필요.

                  if (content === "login") {
                    alert("로그인 되었습니다.!");
                    // 로그인이 되었으면 메인페이지로 보내기 + Auth 페이지에 접근하지 못하게 하기
                    navigate("/");
                  } else {
                    alert("회원가입 되었습니다!");
                    // 회원가입 후에 바로 로그인되고 메인페이지로 보낼지, 아니면 로그인을 하도록 로그인 페이지로 보낼지 추후 상의.
                    navigate("/");
                  }
                }}
                buttonText={`${content === "login" ? "로그인" : "회원가입"}`}
                disabled={dataComeIn ? false : true}
                dataComeIn={dataComeIn}
              />
            </form>

            {content === "login" && (
              <>
                <div className="w-full my-8 text-[0.9375rem] font-bold text-[#282828] relative text-center">
                  <div className="w-[43%] h-[1px] bg-[#dddddd] absolute left-0 top-[40%]" />
                  <p>또는</p>
                  <div className="w-[43%] h-[1px] bg-[#dddddd] absolute right-0 top-[40%]" />
                </div>

                <Button buttonText="구글" disabled={false} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
