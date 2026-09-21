/* ==========================================================================
   Arangkada Philippines — persistent site-wide ambient 3D background
   A single WebGL layer, fixed behind the whole page, that survives every
   route change. It only becomes visible through the site's translucent
   navy zones (hero, page banners, CTA band, footer) — opaque sections sit
   on top of it. Self-hosted Three.js, no CDN. Degrades to nothing (plain
   CSS gradients still apply) if WebGL is unavailable or motion is reduced.
   ========================================================================== */

(function () {
  "use strict";

  const HEX_COLORS = [0x2f6fb0, 0x7a4fb5, 0x1f9e8f, 0xe0a52c, 0x3fae4a, 0xd94f4f];
  const COUNT = 42;

  let THREE, renderer, scene, camera, field, canvas;
  let raf = null;
  const pointer = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
  const currentRot = { x: 0, y: 0 };

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function buildScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.AmbientLight(0x9fb4d8, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 6, 8);
    scene.add(key);

    const geo = new THREE.CylinderGeometry(1, 1, 0.35, 6);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x3a5a8c,
      roughness: 0.55,
      metalness: 0.2,
      transparent: true,
      opacity: 0.5
    });

    field = new THREE.InstancedMesh(geo, mat, COUNT);
    const dummy = new THREE.Object3D();
    const seeds = [];
    for (let i = 0; i < COUNT; i++) {
      const radius = 6 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const depth = -4 - Math.random() * 24;
      const scale = 0.4 + Math.random() * 1.1;
      dummy.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 16, depth);
      dummy.rotation.set(Math.PI / 2, 0, Math.random() * Math.PI);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      field.setMatrixAt(i, dummy.matrix);
      field.setColorAt(i, new THREE.Color(HEX_COLORS[i % HEX_COLORS.length]));
      seeds.push({ base: dummy.position.clone(), rot: dummy.rotation.z, phase: Math.random() * Math.PI * 2, scale });
    }
    field.userData.seeds = seeds;
    scene.add(field);
  }

  function tick(t) {
    raf = requestAnimationFrame(tick);
    currentRot.x += (targetRot.x - currentRot.x) * 0.03;
    currentRot.y += (targetRot.y - currentRot.y) * 0.03;
    scene.rotation.x = currentRot.x;
    scene.rotation.y = currentRot.y + t * 0.00002;

    const dummy = new THREE.Object3D();
    field.userData.seeds.forEach((s, i) => {
      dummy.position.copy(s.base);
      dummy.position.y += Math.sin(t * 0.00025 + s.phase) * 0.6;
      dummy.rotation.set(Math.PI / 2, 0, s.rot + t * 0.00006);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      field.setMatrixAt(i, dummy.matrix);
    });
    field.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
  }

  function onPointerMove(evt) {
    pointer.x = (evt.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (evt.clientY / window.innerHeight) * 2 - 1;
    targetRot.y = pointer.x * 0.12;
    targetRot.x = pointer.y * -0.08;
  }

  async function init() {
    canvas = document.getElementById("ambient3d-canvas");
    if (!canvas) return;

    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      THREE = await import("../assets/vendor/three.module.min.js");
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch (err) {
      return; // no WebGL — the site's CSS gradients already stand on their own
    }

    buildScene();
    resize();
    renderer.render(scene, camera);

    window.addEventListener("resize", resize);

    if (reduceMotion) return; // static single frame only

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    });

    raf = requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
