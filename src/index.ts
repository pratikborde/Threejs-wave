import * as three from 'three';
import simplexNoise from 'simplex-noise';

class Main {
  scene: three.Scene;
  renderer: three.WebGLRenderer;
  width: number;
  height: number;
  camera: three.PerspectiveCamera;
  floor: three.Mesh;
  floorGeometry: three.PlaneGeometry;
  noise: simplexNoise;
  flying: any = 0;

  init() {
    this.setup();
    this.createScene();
    this.createCamera();
    this.addFloor();
    this.addSpotLight();
    this.animate();
  }

  addFloor() {
    const segs = 120;
    this.floorGeometry = new three.PlaneGeometry(50, 30, segs, segs);
    const material = new three.MeshDepthMaterial();
    this.floor = new three.Mesh(this.floorGeometry, material);
    this.floor.castShadow = true;
    this.floor.receiveShadow = true;
    this.floor.rotation.x = -Math.PI / 3.5;
    this.floor.position.z = 10;
    this.scene.add(this.floor);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const offset = Date.now() * 0.0004;
    this.adjustVertices(offset);
    this.renderer.render(this.scene, this.camera);
  }

  adjustVertices(offset: number) {
    for (let i = 0; i < this.floorGeometry.vertices.length; i++) {
      const vertex = this.floorGeometry.vertices[i];
      const x = vertex.x / 6;
      const y = vertex.y / 11;
      vertex.z = this.noise.noise2D(x, y + offset) * 1.6;
    }
    this.floorGeometry.verticesNeedUpdate = true;
    this.floorGeometry.computeVertexNormals();
  }

  addSpotLight() {
    const light = new three.SpotLight('#fff', 2, 1000);
    light.position.set(0, 0, 30);
    this.scene.add(light);
  }

  createCamera() {
    this.camera = new three.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, 20);
  }

  createScene() {
    this.scene = new three.Scene();
    this.renderer = new three.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.noise = new simplexNoise();

    document.body.appendChild(this.renderer.domElement);
  }

  setup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}

const app = new Main();
app.init();
