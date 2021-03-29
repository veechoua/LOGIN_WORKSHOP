import {React, useState, useEffect} from 'react'
import { button } from "react-bootstrap";
import {USER_KEY} from '../const/';
// import useReactRouter from 'use-react-router';
import {useHistory} from 'react-router-dom'
export default function Login() {
    // const { history, location, match } = useReactRouter();
    const history = useHistory();
    // set data to state
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [accountStatus, setAccountStatus] = useState(true)
    const [passwordStatus, setPasswordStatus] = useState(true);
    const [loginStatus, setLoginStatus] = useState(true);
    const [isLogIn, setIsLogIn] = useState(true);

    // get data from form here
    const _handleChangeAccountName = (e) =>{
      setusername(e.target.value);
      setAccountStatus(true);
      setLoginStatus(true);
    }

    const _handleChangePassword = (e) =>{
      setPassword(e.target.value);
      setPasswordStatus(true);
      setLoginStatus(true);
    }

    // Login to system here
    const _login = async () =>{
      if(
        (username =='' || username==' ' || username ==null)
         && 
         (password =='' || password==' ' || password==null)
      ){
        setAccountStatus(false);
        setPasswordStatus(false);
      }else if(username=='' || username==' ' || username==null){
        setAccountStatus(false);
      }else if(password==''|| password==' '||password==null){
        setPasswordStatus(false);
      }else{
        // let datas = {"username": username,"password": password}
        const result = await fetch("http://localhost:5000/we-use-router/userLogIn" ,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "apllication/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }).then((res) => res.json())
        .catch(err => {console.log(err); setIsLogIn(false)})
        if(result.status==='ok'){
          let data = result.data;
          localStorage.setItem(USER_KEY,JSON.stringify(data));
          history.push("/manage-user");
        }else{
          setIsLogIn(false);
        }
      }
    }
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <div className="form-group">
                  <label className="control-label">ຊື່ບັນຊີ</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="John"
                    value={username}
                    onChange={(e) => _handleChangeAccountName(e)}
                  />
                  {!accountStatus? (<span style={{color:"red"}}>ກະລຸນາປ້ອນຊື່ບັນຊີຜູ້ໃຊ້ກ່ອນ!</span>):('')}
                </div>
                <div className="form-group">
                  <label className="control-label">ລະຫັດຜ່ານ</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="******"
                    onChange={(e) => _handleChangePassword(e)}
                  />
                  {!passwordStatus? (<span style={{color:"red"}}>ກະລຸນາປ້ອນລະະຫັດຜ່ານກ່ອນ!</span>):('')}
                </div>
                <center>
                  {!isLogIn ?(<span style={{color:"red"}}>ບັນຊີ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ, ກວດສອບແລ້ວລອງອິກຄັ້ງ</span>):('')}
                </center>
                <button className="btn btn-info" onClick={() => _login()}>
                  Login
                </button>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    );
}
