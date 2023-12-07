//Login.js
import "./login.css";

function Login(){
    return (

        <div>로그인</div>,
        <div>로고 넣기</div>, 
        <form>
            <h1>로그인</h1>
            <div className="id_pw_wrap">
                <div className="input_row" id="id_line">
                <label htmlFor="password">아이디 : </label>
                    <div className="icon_cell" id="id_cell">
                        <span class="blind">아이디</span>
                    </div>
                    <input type="text" id="id" placeholder="아이디" title="아이디" class="input_text" maxlength="41" value/>
                </div>
                
                
                <br /> 
                <label htmlFor="password">Password : </label>
                <input type="password" />
            </div>
            <br />
            <button className="btn" type="submit">로그인</button>
        </form>
        
    );
}

export default Login;
