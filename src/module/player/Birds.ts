/**
 * 小鸟类
 * 循环渲染三只小鸟，其实是循环渲染图片的三个部分
 */
import Sprite from '@/module/base/Sprite';
import DataStore from '@/module/base/DataStore';
import Director from '@/module/Director';

interface BirdsConfig {
  clippingX: number[];
  clippingY: number[];
  clippingWidth: number[];
  clippingHeight: number[];
  birdsWidth: number[];
  birdsHeight: number[];
  birdsX: number[];
  birdsY: number[];
  originY: number[];
  time: number;
  index: number;
  count: number;
  birdX: number;
  birdSpeed: number;
}

export default class Birds extends Sprite implements BirdsConfig {
  public clippingX: number[];
  public clippingY: number[];
  public clippingWidth: number[];
  public clippingHeight: number[];
  public birdsWidth: number[];
  public birdsHeight: number[];
  public birdsX: number[];
  public birdsY: number[];
  public originY: number[];
  public time: number;
  public index: number;
  public count: number;
  public birdX: number;
  public birdSpeed: number;

  public constructor() {
    const image: HTMLImageElement = Sprite.getImage('birds');
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height,
    );
    this.ctx = DataStore.getInstance().ctx;
    // 小鸟的三种状态用数组去存储
    const _birdWidth = 34;
    const _birdHeight = 24;
    const _birdX: number = window.innerWidth / 4;
    const _birdY: number = window.innerHeight / 2;
    // 小鸟宽 34，高 24，上下边距 10，左右边距 9
    this.clippingX = [
      9,
      9 + 34 + 18,
      9 + 34 + 18 + 34 + 18,
    ];
    this.clippingY = [10, 10, 10];
    this.clippingWidth = [_birdWidth, _birdWidth, _birdWidth];
    this.clippingHeight = [_birdHeight, _birdHeight, _birdHeight];
    this.birdsWidth = [_birdWidth, _birdWidth, _birdWidth];
    this.birdsHeight = [_birdHeight, _birdHeight, _birdHeight];
    this.birdsX = [_birdX, _birdX, _birdX];
    this.birdsY = [_birdY, _birdY, _birdY];
    // 小鸟 y 坐标
    this.originY = [_birdY, _birdY, _birdY];
    // 小鸟下落时间
    this.time = 0;
    // 判断小鸟是第几只
    this.index = 0;
    // 循环小鸟个数
    this.count = 0;

    this.birdX = 0;
    this.birdSpeed = Director.getInstance().moveSpeed;
  }

  public draw(): void {
    // 0.1 是切换小鸟的速度
    this.count += 0.1;
    if (this.count > 3) {
      this.count = 0;
    }
    // 由于浏览器默认一秒钟刷新 60 次，小鸟会出现快速切换，体验不好
    // 采取了小数又会导致绘制不出来出现闪烁，取四舍五入，达到一个减速器的作用
    this.index = Math.floor(this.count);

    // 让小鸟掉下去
    const g = 0.98 / 2.4;
    // 向上偏移一点点
    const offsetUp = 20;
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2;

    for (let i = 0; i < 3; i += 1) {
      this.birdsY[i] = this.originY[i] + offsetY;
    }
    this.time += 1;

    super.draw(
      this.img,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index],
    );
  }
}