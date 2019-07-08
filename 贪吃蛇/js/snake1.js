(function () {
	var position = 'absolute';
	var elements = [];
	function Snake (options) {
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.body = [
		//对象之间是用逗号隔开，而不是用分号
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'green'},
			{x: 1, y: 2, color: 'green'}
		];
		this.direction = options.direction || 'right';
	}

	Snake.prototype.render = function (map) {
		remove();
		for (var i = 0, len = this.body.length; i < len; i ++){
			
			var div = document.createElement('div');
			map.appendChild(div);	
			//
			elements.push(div);
			div.style.left = this.body[i].x * this.width + 'px';
			//
			div.style.top = this.body[i].y * this.height + 'px';			
			div.style.backgroundColor = this.body[i].color;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.position = position;
			div.style.direction = this.direction;
		
		}		
	}
	// 出了原型和构造函数便不能再用this了？
	function remove() {
		for (var i = elements.length - 1; i >= 0; i --) {
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i, 1);
		}
	}

	// 看此处的this是否需要用that
	//为何这里用原型函数，而不是像move似的用普通的函数，这是因为remove函数在render原型中调用，归根结底还是render原型中的表达式，只是将其提取出来了而已；而move函数并没有在render原型中调用，所以要用原型函数
	Snake.prototype.move = function (food, map) {
		//让蛇的身体动起来这一部分很容易忘记写
	for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
		var head = this.body[0];
		switch(this.direction) {
			//switch的格式经常容易写错
			case 'left':
			head.x -= 1;
			break;
			case 'top':
			//
			head.y -= 1;
			break;
			case 'right':
			head.x += 1;
			break;
			case 'bottom':
			//
			head.y += 1;
			break;
		}
		var headX = head.x * this.width;
		var headY = head.y * this.width;
		if (headX === food.x && headY === food.y) {
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			});
			food.render(map);
		}
	}
	window.Snake = Snake;
})()
// var map = document.getElementById('map');
// var snake = new Snake();
// snake.render(map);