/*
* 
* get/set 解决获取和设置时，无节点中断的问题
* create 可以创建多级节点，若存在则覆盖新值
* delete 删除节点及其子节点
*/
function Json() {

}

/**
*	例如：json.get(Data, 'country', 'province', 'city');
*	结果则返回 Data['country']['province']['city']
*	无则返回 false
*/
Json.prototype.get = function (obj, key) {
	var args = this.get.arguments;
	var result = obj;

	for (var i=1; i<args.length; i++) {
		result =result[args[i]];
		if (result === undefined) {
			return false;
		};
	};
	return result;
};

/**
*	例如：obj.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234);
*	结果则返回 data['ENTRY']['FA_TOKEN_INVALID'] 设置为1234
*	成功true, 失败false
*/
Json.prototype.set = function(obj, key) {
	var args =this.set.arguments;
	if (ergodic_set(obj, args, 1)) {
		return true;
	} else {
		return false;
	}
};
function ergodic_set(obj, args, floor) {
	if (obj.constructor === Object) {
		for (var tmpKey in obj) {
			if (tmpKey === args[floor]) {
				if (floor < args.length-2) {
					return ergodic_set(obj[tmpKey], args, floor+1);
				} else {
					obj[tmpKey] = args[floor + 1];
					return true;
				}
			}
		}
	}
};

/**
*	例如：obj.create(data, 'add', 'hello', 'test', 120);
*	添加 data['create']['hello']['test'] 节点并设置值为 120
*	成功true, 失败false
*/
Json.prototype.create = function (obj, key) {
    var args = this.create.arguments;
    if (ergodic_create(obj, args, 1)) {
        return true
    } else {
        return false
    }
};

function ergodic_create(obj, args, floor) {
    if (obj.constructor === Object) {
        for (var tmpKey in obj) {
            if (tmpKey === args[floor]) {
                if (floor < args.length-2) {
                    return ergodic_create(obj[tmpKey], args, floor+1)
                } else {
                    obj[tmpKey] = args[floor + 1];
                    return true;
                }
            }
        }
    };
    // 节点不存在，创建新节点
    if (floor < args.length-1) {
        var jsonstr = getJsonFormat(args[args.length -1]);
        for (var i = args.length-2; i>floor; i--) {
            jsonstr = '{"' + args[i] + '":' + jsonstr + '}';
        };
        // 使用eval解析第三方json数据时，可能会执行的恶意代码
        // var node = eval('(' + jsonstr + ')');
        var node = JSON.parse(jsonstr);
        obj[args[floor]] = node;
        return true;
    };
};

function getJsonFormat (param) {
    if (param.constructor === String) {
        return '"' + param + '"'
    } else {
        return param;
    }
};












