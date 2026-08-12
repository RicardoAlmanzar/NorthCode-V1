import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255, 196, 140, .95)');
  gradient.addColorStop(0.28, 'rgba(222, 108, 58, .42)');
  gradient.addColorStop(0.62, 'rgba(96, 165, 250, .12)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function makeDiamondRingGeometry(outer = 1.55, inner = 1.08, depth = 0.16) {
  const shape = new THREE.Shape();
  shape.moveTo(0, outer);
  shape.lineTo(outer, 0);
  shape.lineTo(0, -outer);
  shape.lineTo(-outer, 0);
  shape.lineTo(0, outer);

  const hole = new THREE.Path();
  hole.moveTo(0, inner);
  hole.lineTo(-inner, 0);
  hole.lineTo(0, -inner);
  hole.lineTo(inner, 0);
  hole.lineTo(0, inner);
  shape.holes.push(hole);

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: 0.055,
    bevelThickness: 0.045,
    bevelSegments: 6,
  }).center();
}

export default function HeroCore3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.05, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    const mark = new THREE.Group();
    root.add(mark);
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xffffff, 1.48));

    const keyLight = new THREE.DirectionalLight(0xffcfaa, 5.2);
    keyLight.position.set(4.2, 5.2, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6aa8ff, 2.8);
    fillLight.position.set(-4.5, 1.8, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xde6c3a, 30, 9);
    rimLight.position.set(-2.6, -2.4, 3.5);
    scene.add(rimLight);

    const blueLight = new THREE.PointLight(0x60a5fa, 16, 8);
    blueLight.position.set(2.7, 1.6, 3.2);
    scene.add(blueLight);

    const coral = new THREE.MeshPhysicalMaterial({
      color: 0xde6c3a,
      metalness: 0.82,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.16,
      emissive: 0x3a1307,
      emissiveIntensity: 0.35,
    });

    const navy = new THREE.MeshPhysicalMaterial({
      color: 0x0b1726,
      metalness: 0.72,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.22,
    });

    const graphite = new THREE.MeshPhysicalMaterial({
      color: 0x121f31,
      metalness: 0.42,
      roughness: 0.3,
      clearcoat: 0.7,
      transparent: true,
      opacity: 0.88,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x9fc8ff,
      metalness: 0.05,
      roughness: 0.08,
      transparent: true,
      opacity: 0.28,
      transmission: 0.24,
      clearcoat: 1,
      side: THREE.DoubleSide,
    });

    const white = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.12,
      roughness: 0.22,
      clearcoat: 0.7,
    });

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.set(5.2, 5.2, 1);
    glow.position.z = -0.9;
    root.add(glow);

    const plaque = new THREE.Mesh(new RoundedBoxGeometry(2.62, 1.42, 0.18, 6, 0.12), graphite);
    plaque.position.set(0, -0.04, -0.16);
    plaque.rotation.z = -0.03;
    mark.add(plaque);

    const plaqueEdge = new THREE.Mesh(new RoundedBoxGeometry(2.76, 1.56, 0.08, 6, 0.12), glass);
    plaqueEdge.position.set(0, -0.04, -0.28);
    plaqueEdge.rotation.z = -0.03;
    mark.add(plaqueEdge);

    const diamondRing = new THREE.Mesh(makeDiamondRingGeometry(), navy);
    diamondRing.position.z = 0.08;
    diamondRing.scale.set(0.98, 0.98, 1);
    mark.add(diamondRing);

    const accentGeo = new RoundedBoxGeometry(0.78, 0.14, 0.22, 8, 0.06);
    [
      { pos: [0.74, 0.73, 0.32], rot: -Math.PI / 4 },
      { pos: [-0.74, -0.73, 0.32], rot: -Math.PI / 4 },
      { pos: [1.22, 0.02, 0.34], rot: Math.PI / 4, scale: [0.62, 1, 1] },
    ].forEach((spec) => {
      const accent = new THREE.Mesh(accentGeo, coral);
      accent.position.set(...spec.pos);
      accent.rotation.z = spec.rot;
      if (spec.scale) accent.scale.set(...spec.scale);
      mark.add(accent);
    });

    const capGeo = new THREE.SphereGeometry(0.095, 32, 32);
    [
      [0, 1.52, 0.26, navy],
      [1.52, 0, 0.3, coral],
      [0, -1.52, 0.26, navy],
      [-1.52, 0, 0.26, navy],
    ].forEach(([x, y, z, mat]) => {
      const cap = new THREE.Mesh(capGeo, mat);
      cap.position.set(x, y, z);
      cap.scale.set(1, 1, 0.62);
      mark.add(cap);
    });

    const codeGroup = new THREE.Group();
    codeGroup.position.set(0, -0.86, 0.58);
    const codeBar = new RoundedBoxGeometry(0.42, 0.08, 0.08, 5, 0.025);
    [
      [-0.44, 0.1, 0.65],
      [-0.44, -0.1, -0.65],
      [0.44, 0.1, -0.65],
      [0.44, -0.1, 0.65],
    ].forEach(([x, y, rot], index) => {
      const bar = new THREE.Mesh(codeBar, white);
      bar.position.set(x, y, 0);
      bar.rotation.z = rot;
      codeGroup.add(bar);
    });
    mark.add(codeGroup);

    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xde6c3a, transparent: true, opacity: 0.82 });
    for (let i = 0; i < 4; i += 1) {
      const line = new THREE.Mesh(new RoundedBoxGeometry(0.74 - i * 0.08, 0.045, 0.018, 4, 0.014), lineMaterial);
      line.position.set(-0.46 + i * 0.04, 0.31 - i * 0.18, 0.52);
      mark.add(line);
    }

    const chips = [
      { pos: [-2.18, 0.56, -0.26], rot: [0.08, 0.52, -0.16], color: 0xde6c3a },
      { pos: [2.12, -0.38, -0.22], rot: [-0.08, -0.5, 0.14], color: 0x60a5fa },
      { pos: [1.72, 1.08, -0.42], rot: [0.04, -0.42, 0.22], color: 0xffffff },
    ].map((spec, index) => {
      const chip = new THREE.Group();
      chip.position.set(...spec.pos);
      chip.rotation.set(...spec.rot);
      const body = new THREE.Mesh(new RoundedBoxGeometry(0.86, 0.48, 0.08, 5, 0.07), glass);
      chip.add(body);
      for (let i = 0; i < 3; i += 1) {
        const line = new THREE.Mesh(
          new RoundedBoxGeometry(0.42 - i * 0.04, 0.028, 0.014, 4, 0.01),
          new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: index === 2 ? 0.55 : 0.72 })
        );
        line.position.set(-0.08, 0.12 - i * 0.12, 0.055);
        chip.add(line);
      }
      root.add(chip);
      return chip;
    });

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      root.scale.setScalar(width < 520 ? 0.88 : 1);
    };

    const onPointerMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      root.rotation.y += ((pointerX * 0.18) - root.rotation.y) * 0.035;
      root.rotation.x += ((-pointerY * 0.1) - root.rotation.x) * 0.035;

      if (!reducedMotion) {
        mark.rotation.y = Math.sin(elapsed * 0.72) * 0.18;
        mark.rotation.x = -0.14 + Math.cos(elapsed * 0.58) * 0.045;
        mark.rotation.z = Math.sin(elapsed * 0.45) * 0.035;
        mark.position.y = Math.sin(elapsed * 0.95) * 0.065;
        glow.material.opacity = 0.72 + Math.sin(elapsed * 1.3) * 0.12;

        chips.forEach((chip, index) => {
          chip.position.y += Math.sin(elapsed * 1.1 + index) * 0.0009;
          chip.rotation.z += Math.sin(elapsed * 0.8 + index) * 0.0008;
        });
      }

      renderer.render(scene, camera);
      if (!disposed && !reducedMotion) frameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (!object.isMesh && !object.isSprite) return;
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.map?.dispose();
          object.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-core-3d" aria-hidden="true" />;
}
