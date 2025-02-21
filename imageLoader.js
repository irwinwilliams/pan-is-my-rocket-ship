// ImageLoader.js
export default class ImageLoader {
    constructor() {
      this.images = {};
    }
  
    loadImage(name, src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        this.images[name] = image;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = src;
      });
    }
  
    getImage(name) {
      return this.images[name];
    }
  
    async loadAll() {
      await Promise.all([
        this.loadImage('heart', 'heart.png'),
        this.loadImage('note2', 'note2.png'),
        this.loadImage('obstacle', 'obstacle.png'),
        this.loadImage('planet1', 'planet1.png'),
        this.loadImage('planet2', 'planet2.png'),
        this.loadImage('planet3', 'planet3.png'),
        this.loadImage('power-up', 'power-up.png'),
        this.loadImage('rocket2', 'rocket2.png'),
        this.loadImage('space_background', 'space_background.jpg'),
        this.loadImage('speed-up', 'speed-up.png'),
        this.loadImage('lyric-powerup', 'lyric-powerup.png')
      ]);

    }
  }

const imageLoader = new ImageLoader(); // Create an instance

export { imageLoader }; // Export the instance
