import * as _ from 'lodash';
import {USER_KEY} from './index';

export const userLogInData = () =>{
    const logInData = JSON.parse(localStorage.getItem(USER_KEY));
    return logInData;
}

export const isLogIn =() =>{
    const getData = userLogInData();
    const isData = !_.isEmpty(getData);
    return isData;
}