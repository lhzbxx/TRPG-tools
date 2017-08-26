import Universe from './universe';

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
    for (let i = 0; i < dices; i += 1) {
      this.dices.push(Universe.random(sides));
    }
    this.add = add;
    this.item = item;
  }

  /**
   * 最终值
   */
  __total() {
    let result = 0;
    this.dices.forEach((dice) => {
      result += dice;
    });
    return result + this.add;
  }

  /**
   * 结果
   */
  result() {
    const total = this.__total();
    let result = this.item ? `${this.item}的判定：` : '判定：';
    result += this.dices.pop();
    this.dices.forEach((dice) => {
      result += `+${dice}`;
    });
    return `${result}=${total}`;
  }
}

export default Dice;
