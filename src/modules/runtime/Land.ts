import Sprite from '@/modules/base/Sprite';

/**
 * 陆地类
 */

export default class Land extends Sprite {
  private landX: number;
  private landSpeed: number;

  public constructor() {
    const image = Sprite.getImage('land');
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      window.innerHeight - image.height, // 放置在画布的底部
      image.width,
      image.height
    );
    this.landX = 0;
    this.landSpeed = 2;
  }

  public draw(): void {
    this.landX += this.landSpeed;
    if (this.landX > this.image.width - window.innerWidth) {
      this.landX = 0;
    }
    super.draw(
      this.image,
      this.sx,
      this.sy,
      this.sWidth,
      this.sHeight,
      -this.landX, // 陆地要从右往左移动
      this.dy,
      this.dWidth,
      this.dHeight
    );
  }
}
