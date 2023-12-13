//Signup.js


import "./signup.css";
import logo from './logo1.png';

function Signup(){
    return (

        <div className="wrap">
        <form>
            <img clasName="img" src={logo} alt="로고이미지" />
            <h1><span className="title">회원가입</span></h1>
            <div className="id_pw_wrap">
        
                <p>
                    <label className="word" htmlFor="password" > </label>
                    <input className="input" type="text" placeholder="아이디" /><br></br>
                    <input className="input" type="password" placeholder="비밀번호"/><br></br>
                    <input className="input" type="password" placeholder="비밀번호확인"/><br></br>
                </p>
                <span className="warningMessage"></span>
                <span className="warningMessage"></span>
            </div>

            <div className="personal_info">
                <p>
                <input className="input" type="text" placeholder="이름" /><br></br>
                <input className="input" type="text" placeholder="휴대전화번호" /><br></br>
                <input className="input" type="text" placeholder="이메일" />
                </p>
            </div>


            <br />
            <button className="btn" type="submit">로그인</button>
        </form>
        </div>
    );
}

export default Signup;
