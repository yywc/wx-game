import ResourceLoader from './base/ResourceLoader';
import DataStore from './base/DataStore';
import Director from './Director';
import Background from './runtime/Background';
import Land from './runtime/Land';

/**
 * Main 主体类，游戏启动入口
 */
export default class Main {
  private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement;
  private readonly dataStore = DataStore.getInstance();
  private readonly director = Director.getInstance();

  public constructor() {
    this.onLoadResource();
  }

  private async onLoadResource(): Promise<void> {
    let res: Map<string, HTMLImageElement> = new Map();
    try {
      [res] = await ResourceLoader.getInstance().onLoad();
    } catch (e) {
      console.error(`Promise Error: ${e}`);
    }
    this.dataStore.ctx = this.canvas.getContext('2d');
    this.dataStore.res = res;
    this.init();
  }

  private init(): void {
    this.dataStore
      .set('background', Background)
      .set('land', Land)
      .set('pencils', []);
    // 游戏开始前先创建一组铅笔
    this.director.createPencils();
    this.director.run();
  }
}
