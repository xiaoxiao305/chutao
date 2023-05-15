import {request} from '../utils/request';
class Api{
	constructor() {
	}
	delProfile(options){
		return request({
			url:'/edit_profile',
			method:'POST',
			data:options
		})
	}
}
export default  Api=new Api() 