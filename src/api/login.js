import {request} from '../utils/request';
export default function login(options){
	return request({
		url:'/user_login',
		method:'POST',
		data:options
	})
}