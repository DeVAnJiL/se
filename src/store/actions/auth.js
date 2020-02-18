import axios from 'axios';
import request from 'request-promise';
import * as actionTypes from './actionTypes';
import * as urls from '../urls';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, id, role) => {
    console.log("in authSuccess",token,id,role);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        id: id,
        role: role
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('idType');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
        };
        // fetch(urls.LOGIN, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(authData)
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log("got ",res);
        //         //const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                // localStorage.setItem('token', res.data.idToken);
                // //localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('id', res.data.user._id);
                // localStorage.setItem('role', res.data.user.role);
                // dispatch(authSuccess(res.data.idToken, res.data.localId));
                // dispatch(checkAuthTimeout(res.data.expiresIn));
                // dispatch(setAuthRedirectPath()); TODO: check and set path
        //     })
        //     .catch(err => {
        //         dispatch(authFail(err));
        // });
        /*axios.post(url, authData)
            .then(res => {
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.res.data.error));
            });*/
            const options={
                method:'POST',
                uri:"http://localhost:3000/api/users/login",
                body:authData,
                json:true
            };
            // console.log("requesting");
            request(options).then((body)=>{
                console.log(body);
                const expirationDate = new Date(new Date().getTime() + body.expires * 1000);
                localStorage.setItem('token', body.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('id', body.data.user._id);
                localStorage.setItem('role', body.data.user.role);
                dispatch(authSuccess(body.token, body.data.user._id,body.data.user.role));
                dispatch(checkAuthTimeout(body.expires));
            }).catch(err=> {
                console.log("errorinside",err.message);
                dispatch(authFail(authFail(err)));
            });
            
        
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const id = localStorage.getItem('id');
                const role = localStorage.getItem('role');
                dispatch(authSuccess(token, id, role));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};