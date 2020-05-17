// 存放各种api集合  发挥脑洞 自己操作
import axios from './index';

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
};  
