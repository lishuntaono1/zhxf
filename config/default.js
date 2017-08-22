'use strict';

module.exports = {
	port: 5001,
	mongoUrl: 'mongodb://localhost:27017/zhxf',

	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	},
	//地图访问apikey
	tencentkey: 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL',
	tencentkey2 :'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X',
	baidukey:'fjke3YUipM9N64GdOIh1DNeK2APO2WcT',
	baidukey2:'fjke3YUipM9N64GdOIh1DNeK2APO2WcT',
}
