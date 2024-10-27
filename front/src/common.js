// 프로젝트에서 공통으로 사용하는 함수들을 모아둔 곳.

export function identify(
  emailInput,
  passwordInput,
  setEmailIdentifyCheck,
  setPasswordIdentifyCheck
) {
  if (emailInput) {
    // 빈칸이 있는지 검사하는 정규표현식
    const blankRegex = /\s/;

    // email 주소 유효성 검사 정규표현식
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    return !emailRegex.test(emailInput) || blankRegex.test(emailInput)
      ? setEmailIdentifyCheck(false)
      : setEmailIdentifyCheck(true);
  } else if (passwordInput) {
    // password 주소 유효성 검사 정규표현식
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return !passwordRegex.test(passwordInput)
      ? setPasswordIdentifyCheck(false)
      : setPasswordIdentifyCheck(true);
  }
}

export function getUserData(userData) {
  const profileImg = userData
    ? userData?.kakao_account?.profile?.profile_image_url
    : null;

  const userNickname = userData
    ? userData?.kakao_account?.profile?.nickname
    : null;

  const userRealName = "";

  const userEmail = userData ? userData?.kakao_account?.email : null;

  const userBirthday = "";
  const userGender = "";

  return {
    profileImg,
    userNickname,
    userRealName,
    userEmail,
    userBirthday,
    userGender,
  };
}

export function formatDate(dateObj) {
  // dateObj : ex) {year: 2000, month: 9, day: 21}
  const { year, month, day } = dateObj;

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

// 나중에 없앨 함수
export function handleConsoleError(
  isLoading,
  error,
  searchText,
  filteredDatas
) {
  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : (searchText?.length === 0 || searchText?.length > 0) &&
      filteredDatas?.length === 0
    ? "검색 결과가 없습니다."
    : null;

  return comment;
}

export function handleConsoleError2(isLoading, error, datas) {
  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : datas?.length === 0
    ? "검색 결과가 없습니다."
    : null;

  return comment;
}

export function formatDate2(timestamp) {
  // timestamp : ex) Date.now()로 얻은 값. 1724466015502.
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

// -년 전, -달 전, -주 전, -일 전, -시간 전, 방금 전
export function formatTimeAgo(date) {
  const now = new Date();
  const pastDate = new Date(date);
  const seconds = Math.floor((now - pastDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return "방금 전";
  }
}

// phoneNumber 사이에 -가 삽입되도록
export const changePhoneNumberRepresentation = (phoneNumber) => {
  const input = phoneNumber.replace(/\D/g, ""); // 숫자만 남기기
  const formattedNumber = input.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
  return formattedNumber;
};

// ex: 2024-10-15 6시
export const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);

  // 날짜 및 시간 포맷 설정
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}시`;
};

// 유저의 개인정보(객체)의 프로퍼티 값이 하나라도 비어 있는지 확인
export const isValid = (obj) => {
  for (const key in obj) {
    const value = obj[key];
    if (value === "" || (Array.isArray(value) && value.length === 0)) {
      return false;
    }
  }
  return true;
};
