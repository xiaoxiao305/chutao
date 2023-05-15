import {request} from '../utils/request';
export default function profiles(options){
	return request({
		url:'/profiles',
		method:'POST',
		data:options
	})
}