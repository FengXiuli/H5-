
// 自调用函数  --  开启一个新的作用域，避免命名冲突
(function () {
  var elements = [];
  var position = 'absolute';
  function Food (options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || 'green';
  }
  Food.prototype.render = function (map) {
    remove();
    var div = document.createElement('div');
    map.appendChild(div);
    //很容易将map加进去，其实是div
    elements.push(div);
    this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height; 
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.position = position;
    div.style.backgroundColor = this.color;
  }
  function remove () {
    for (var i = elements.length - 1; i >= 0; i --) {
      elements[i].parentNode.removeChild(elements[i]);
      elements.splice(i, 1);
    }
  }
  window.Food = Food;
})()
// var map = document.getElementById('map');
// var food = new Food();
// food.render(map);

