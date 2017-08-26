/**
 * 骰子
 */
class Dice {
  /**
   * 构造
   * @param {Number} dices 骰子个数
   * @param {Number} sides 骰子面数
   * @param {Number} add 追加值
   * @param {String} item 判定项
   */
  constructor(dices = 3, sides = 6, add = 0, item) {
    this.dices = [];
    for (let i = 0; i < dices; i++) {
      this.dices.push(this.__random(sides));
    }
    this.add = add;
    this.item = item;
  }

  /**
   * 随机数
   * @param {Number} max 最大值
   */
  __random(max) {
    return Math.ceil(Math.random() * max);
  }

  /**
   * 最终值
   */
  __total() {
    let result = 0;
    this.dices.forEach(dice => result += dice);
    return result + this.add;
  }

  /**
   * 结果
   */
  result() {
    const total = this.__total();
    let result = this.item ? '的${item}的判定：' : '的判定：';
    result += this.dices.pop();
    this.dices.forEach(dice => result += `+${dice}`);
    return `${result}=${total}`;
  }
}

export default Dice;
