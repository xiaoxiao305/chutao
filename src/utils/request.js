let BASEURL = "http://localhost:8181";

export const request =(options={})=>{
	return new Promise((resolve,rejects)=>{
		handleRequest(options,resolve,rejects)
	})
}

// 发起请求
function handleRequest(options, resolve, reject) {
	uni.request({
		url: BASEURL + options.url,
		method: options.method,
		data: options.data,
		success: (response) => {
			return resolve(response.data)
		},
		fail: (fail) => {
			console.log('fail',fail)
			return reject(fail);
		}
	})
}