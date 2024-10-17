// import
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="container">
        <div className="header">
            <div className="text">Log In</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <br></br>
                <svg className = "img" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <input type="text" placeholder="Username" />
            </div>
            <div className="input">
                <svg className = "img" viewBox="0 0 448 512" height="19" width="19" fill="#686b78">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                </svg>
                <input type="password" placeholder="Password" />           
                <br></br>
            </div>
            <div className = "submit-container">
                <div className = "submit">Forgot Password?</div>
                <br></br>
                <div className = "submit">Log In</div>
            </div>
        </div>
        
    </div>
    );
};

export default Login;
