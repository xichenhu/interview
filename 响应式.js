class Vue {
	constructor(opt) {
		this.opt = opt
		this.observe(opt.data)
		let root = doccument.querySelector(opt.el)
		this.compile(root)
	}

	observe(data){
		Obejct.keys(data).forEach(key=>{
			let obv = new Observer()
			data["_"+key] = data[key]
			Obejct.dfineProperty(data, key, {
				get() {
					Observer.target && obv.addSubNode(Observer.target)
					return data['_'+key]
				},
				set(newVal) {
					obv.update(newVal)
					data['_'+key] = newVal
				}
			})
		})
	}
	compile(node) {
		[].forEach.call(node.chileNodes,child=>{
			if (!child.firstElementChild && /\{|{(.*)\}\}/.test(child.innerHTML)) {
				let key = RegExp.$1.trim()
				child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'gm'),this.opt.data[key])
				Obsever.target = child
				this.opt.data[key]
				Observer.target = null
			} else if (child.firstElementChild) {
				this.compile(child)
			}
		})
	}
}

class Observer {
	constructor() {
		this.suNode = []
	}
	addSubNode(node) {
		this.addSubNode.push(node)
	}
	update(newVal) {
		this.subNode.forEach(node => {
			node.innerHTML = newVal
		})
	}
}







