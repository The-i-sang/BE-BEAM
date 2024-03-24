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

export function getUserData(snsAuthType, userData) {
  const googleAuthTrue =
    snsAuthType === "googleAuth" && Object.keys(userData).length > 0;
  const kakaoAuthTrue =
    snsAuthType === "kakaoAuth" && Object.keys(userData).length > 0;

  const profileImg = googleAuthTrue
    ? userData?.photos[0]?.url
    : kakaoAuthTrue
    ? userData?.kakao_account?.profile?.profile_image_url
    : "/image/basic_user_profile.jpg";

  const userNickname =
    googleAuthTrue && userData?.nicknames[0]?.value
      ? userData?.nicknames[0]?.value
      : googleAuthTrue && !userData?.nicknames[0]?.value
      ? userData?.names[0]?.displayName
      : kakaoAuthTrue
      ? userData?.kakao_account?.profile?.nickname
      : "userName";

  const userRealName =
    googleAuthTrue && userData?.names[0]?.displayName
      ? userData?.names[0]?.displayName
      : "";
  const userEmail = googleAuthTrue
    ? userData.emailAddresses[0].value
    : kakaoAuthTrue
    ? userData.kakao_account.email
    : "";
  const userBirthday =
    googleAuthTrue && userData.birthdays[0].date
      ? userData.birthdays[0].date
      : "";
  const userGender =
    googleAuthTrue && userData.genders[0].value
      ? userData.genders[0].value
      : "";

  return {
    profileImg,
    userNickname,
    userRealName,
    userEmail,
    userBirthday,
    userGender,
  };
}

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
    : searchText.length > 0 && filteredDatas.length === 0
    ? "검색 결과가 없습니다."
    : searchText.length === 0
    ? "데이터가 없습니다."
    : null;

  return comment;
}
