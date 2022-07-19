
if(Cache-Control === no-store) {
	// 绝对禁止缓存，浏览器本地不会进行缓存，每次请求资源都要从服务器重新获取。
	直接向服务器获取资源（本地不缓存资源）
} else if (Cache-Control === no-cache) {
	// 设置了no-cache之后并不代表浏览器不缓存，而是在获取缓存前要向服务器确认资源是否被更改。
	每次请求都向服务器确认资源是否被更改（本地缓存资源），走下面的协商缓存
} else if (本地未过期=> max-age|| Expires) {
	使用浏览器本地缓存
} else {
	if (Etag有值) {
		向服务器请求带 if-None-Match
		if(Etag与原来的一致) {
			返回304，直接使用本地缓存
		} else {
			返回200，获取新资源
		}
	} else if (Last-modified有值) {
		向服务器请求带 if-Modified-Since
		if (Last-modified与原来的一致) {
			返回304，直接使用本地缓存
		} else {
			返回200，获取新资源
		}
	} else {
		向服务器获取新资源，返回200
	}
}

