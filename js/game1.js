(function () {
  var that;
  //之所以要传map是因为这Game构造函数里面用到map
  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    //
    this.map = map;
    that = this;
  }
  Game.prototype.render = function (map) {
    //
    this.food.render(this.map);
    this.snake.render(this.map);
    //
    runSnake();
    bindKey();
    
  }
  function bindKey () {
    document.addEventListener('keydown',function (e) {
      //keyCode容易写成keyboard
      switch (e.keyCode) {
        case 37:
        //虽然bindKey在原型中被调用，但是这也只是被调用，bindKey已经出了原型函数，所以this便不能用了，所以要在外部建立一个全局that，使原型中的this=that，那么原型中的this便属于全局，所以在构造函数之外的bindKey函数使用that相当于使用this了
        this.snake.direction = 'left';
        break;
        case 38:
        this.snake.direction = 'top';
        break;
        case 39:
        this.snake.direction = 'right';
        break;
        case 40:
        this.snake.direction = 'bottom';
        break;
      }
      //
    }.bind(that),false);
  }
  function runSnake () {
    var timerId = setInterval(function () {
    this.snake.move(this.food, this.map);
    //以下所有的that都相当于this，之所以加that（this）是因为runSnake是从render函数中独立出来的，所以也相当于是Snake原型中的函数
    this.snake.render(this.map);
    //
    var maxX = this.map.offsetWidth / this.snake.width;
    var maxY = this.map.offsetHeight / this.snake.height;
    //;
    var headX = this.snake.body[0].x;
    var headY = this.snake.body[0].y;
    if (headX < 0 || headX >= maxX) {
      alert('Game Over');
      clearInterval(timerId);
    }
    if (headY < 0 || headY >= maxY) {
      alert('Game Over');
      clearInterval(timerId);
    }
     }.bind(that), 500);  
  }
  window.Game = Game;
})();
var map = document.getElementById('map');
//
var game = new Game(map);
//
game.render();
