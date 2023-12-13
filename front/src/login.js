//login.js


import "./login.css";
import logo from './logo1.png';

function Login(){
    return (

        <div className="wrap">
        <form>
            <img clasName="img" src={logo} alt="로고이미지" />
            <h1><span className="title">로그인</span></h1>
            <div className="id_pw_wrap">
        
                <p>
                    <label className="word" htmlFor="password" > </label>
                    <input className="input" type="text" placeholder="아이디" />
                </p>
                <br>
                </br>
                <p>
                    <label className="word" htmlFor="password">  </label>
                    <input className="input" type="password" placeholder="비밀번호"/>
                </p>
                
            </div>


            <br />
            <button className="btn" type="submit">로그인</button>
        </form>
        </div>
    );
}

export default Login;
