import { react, useState, useEffect } from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios'
import Notiflix from 'notiflix-react'
import "./main.css";
export default function UserAdd() {
    const [userName, setuserName] = useState();
    const [password, setPassword] = useState();
    const [status, setStatus] = useState(false);
    const [datas, setDatas] = useState([]);
    console.log("datas:", datas);
    const api = "http://localhost:5000/we-use-router";
    const messageSuccess = (e) => {
        setuserName('');
        setPassword('');
        setStatus(true);
        // Notiflix.Notify.Init({ position: "right-bottom", });
        Notiflix.Notify.Success(e);
    }
    const messageError = (e) => {
        // Notiflix.Notify.Init({ position: "right-bottom", });
        Notiflix.Notify.Warning(e);
    }

    const _loadData = ()=>{
        axios.get(`${api}/getuser`)
            .then((response) => setDatas(response.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        _loadData();
    }, [])
    useEffect(() => {
        _loadData();
        setStatus(false);
    }, [status])

    const _adduser = async () => {

        const userAdd = {
            username: userName,
            password: password
        }
        if(userName =="" || password ==""){
            Notiflix.Report.Warning('ການເພີ່ມລົ້ມແຫລວ','ທັງສອງຫ້ອງບໍ່ໃຫ້ມີຄ່າຫວ່າງ, ກະລຸນາປ້ອນໃຫ້ຄົນ','ດຳເນີນການຕໍ່')
        }else{
        axios.post(`${api}/adduser`, userAdd)
            .then(res => messageSuccess('ການເພີ່ມຜູ້ໃຊ້ສຳເລັດ'))
            .catch(err => messageError('ລົ້ມແຫຼວ'))
        }
    }

    const _delete = (e) =>{
        console.log("id:", e);
        axios.delete(`${api}/deleteuser/${e}`)
        .then(res => messageSuccess('ລືບຂໍ້ມູນສຳເລັດ'))
            .catch(err => messageError('ລືບລົ້ມແຫຼວ'))
    }


    return (
        <div>
            <div className="container"><br />
                <Form>
                    <Row>
                        <Col sm='3'></Col>
                        <Col sm='2'>
                            <Form.Label>ຊື່ບັນຊີຜູ້ໃຊ້:</Form.Label>
                        </Col>
                        <Col sm='4'>
                            <Form.Control
                                type="text"
                                name="username"
                                value={userName}
                                placeholder="ກະລຸນາປ້ອນຊື່ບັນຊີຜູ້ໃຊ້"
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm='3'></Col>
                        <Col sm='2'>
                            <Form.Label>ລະຫັດຜ່ານ:</Form.Label>
                        </Col>
                        <Col sm='4'>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Row><br />
                    <Row>
                        <Col sm='6'></Col>
                        <Button className="btn btn-info" onClick={() =>  _adduser()}>ເພີ່ມບັນຊີຜູ້ໃຊ້</Button>
                    </Row>
                </Form><br />
                <Table className="table table-hover">
                    <thead>
                        <th width="20%">ລະຫັດ</th>
                        <th>ບັນຊີ</th>
                        <th>ລະຫັດຜ່ານ</th>
                        <th width="30%" style={{ textAlign: "center" }}>ຈັດການ</th>
                    </thead>
                    {datas?.map((item, index) => {
                        return (
                            <tr>
                                <td >{item?._id}</td>
                                <td>{item?.username}</td>
                                <td>{item?.password}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button className="btn btn-success">ແກ້ໄຂ</button>
                                        &nbsp;&nbsp;
                                    <button className="btn btn-danger" onClick={()=>_delete(item?._id)}>ລຶບ</button>
                                </td>
                            </tr>
                        )
                    })}
                </Table>
                <br />
            </div>
        </div>
    )
}
