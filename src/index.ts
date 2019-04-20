import * as three from 'three';

const radians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

class Box {
  geom: three.BoxBufferGeometry;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  constructor() {
    this.geom = new three.BoxBufferGeometry(0.5, 0.5, 0.5, 0.02, 0.2);
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
  }
}

class Torus {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  geom: three.TorusBufferGeometry;
  constructor() {
    this.geom = new three.TorusBufferGeometry(0.3, 0.12, 30, 200);
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = radians(-180);
  }
}

class Cone {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  geom: three.ConeBufferGeometry;
  constructor() {
    this.geom = new three.ConeBufferGeometry(0.3, 0.5, 32);
    this.rotationX = radians(90);
    this.rotationY = 0;
    this.rotationZ = 0;
  }
}

class Main {
  renderer: three.WebGLRenderer;
  scene: three.Scene;
  width: number;
  height: number;
  camera: three.PerspectiveCamera;
  geometries: (Box | Torus | Cone)[];
  raycaster: three.Raycaster;
  grid: { rows: number; cols: number };
  meshes: any[];
  gutter: { size: number };

  init() {
    this.setup();
    this.createScene();
    this.createCamera();
    this.animate();

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  setup() {
    this.gutter = { size: 4 };
    this.meshes = [];
    this.grid = { rows: 11, cols: 7 };
    this.raycaster = new three.Raycaster();
    this.geometries = [new Box(), new Torus(), new Cone()];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  createScene() {
    this.scene = new three.Scene();
    this.renderer = new three.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(new three.Color(0x000));

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new three.PerspectiveCamera(20, this.width / this.height, 1);
    this.camera.position.set(0, -65, 10);
    this.camera.rotation.x = -1.57;
    this.scene.add(this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

const app = new Main();
app.init();
