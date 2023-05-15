import {request} from '../utils/request';
export default function editProfile(options){
	return request({
		url:'/edit_profile',
		method:'POST',
		data:options
	})
}