/* ==========================================================================
   Arangkada Philippines — 3D hero scene (Three.js, self-hosted, no CDN)
   A slowly rotating cluster of hexagonal prisms echoing the brand mark,
   with gentle pointer-parallax. Degrades to a static gradient if WebGL
   is unavailable or the viewer prefers reduced motion.
   ========================================================================== */

const Hero3D = (() => {
  "use strict";

  const HEX_COLORS = [0x2f6fb0, 0x7a4fb5, 0x1f9e8f, 0xe0a52c, 0x2f6fb0, 0x3fae4a, 0xd94f4f];
  /* Same offset-hex layout as the brand mark's seven cells. */
  const LAYOUT = [
    { x: -1.05, y: 0.95, z: 0.2, s: 0.62 },
    { x: 0.55, y: 0.95, z: -0.3, s: 0.62 },
    { x: -1.6, y: -0.2, z: -0.1, s: 0.62 },
    { x: -0.25, y: -0.2, z: 0.35, s: 0.7 },
    { x: 1.1, y: -0.2, z: -0.25, s: 0.62 },
    { x: -1.05, y: -1.35, z: 0.15, s: 0.62 },
    { x: 0.55, y: -1.35, z: -0.15, s: 0.62 }
  ];

  let THREE = null;
  let renderer, scene, camera, group, canvas, container;
  let raf = null;
  let io = null;
  let visible = false;
  let reduceMotion = false;
  let pointer = { x: 0, y: 0 };
  let targetRot = { x: 0, y: 0 };
  let currentRot = { x: 0, y: 0 };
  let disposed = true;

  function onPointerMove(evt) {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    pointer.x = (evt.clientX - cx) / (rect.width / 2 || 1);
    pointer.y = (evt.clientY - cy) / (rect.height / 2 || 1);
    targetRot.y = pointer.x * 0.35;
    targetRot.x = pointer.y * -0.22;
  }

  function buildScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const hemi = new THREE.HemisphereLight(0xdfe9ff, 0x0b1730, 1.1);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe0a52c, 0.8);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(1, 1, 0.5, 6);

    LAYOUT.forEach((cell, i) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: HEX_COLORS[i],
        metalness: 0.25,
        roughness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.z = Math.PI / 6;
      mesh.position.set(cell.x, cell.y, cell.z);
      mesh.scale.setScalar(cell.s);
      mesh.userData.baseZ = cell.z;
      mesh.userData.floatOffset = i * 1.1;
      group.add(mesh);
    });

    group.rotation.x = -0.15;
    group.rotation.y = 0.3;
    scene.add(group);
  }

  function resize() {
    if (!renderer || !container) return;
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function renderStatic() {
    resize();
    renderer.render(scene, camera);
  }

  function tick(t) {
    raf = requestAnimationFrame(tick);
    currentRot.x += (targetRot.x - currentRot.x) * 0.06;
    currentRot.y += (targetRot.y - currentRot.y) * 0.06;
    group.rotation.x = -0.15 + currentRot.x;
    group.rotation.y = 0.3 + currentRot.y + t * 0.00012;
    group.children.forEach((mesh) => {
      mesh.position.z = mesh.userData.baseZ + Math.sin(t * 0.0006 + mesh.userData.floatOffset) * 0.12;
    });
    renderer.render(scene, camera);
  }

  function start() {
    if (!renderer) return;
    if (raf) return;
    if (reduceMotion) {
      renderStatic();
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  async function mount(hostEl) {
    if (!hostEl || !disposed) return;
    container = hostEl;
    canvas = hostEl.querySelector("canvas") || document.createElement("canvas");
    if (!canvas.parentNode) hostEl.appendChild(canvas);

    reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      if (!THREE) {
        THREE = await import("../assets/vendor/three.module.min.js");
      }
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (err) {
      container.classList.add("hero3d-unsupported");
      return;
    }

    disposed = false;
    buildScene();
    resize();
    renderStatic();

    window.addEventListener("resize", resize);
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove);
    }

    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
        if (visible) start(); else stop();
      });
    }, { threshold: 0.05 });
    io.observe(container);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop(); else if (visible) start();
    });
  }

  function unmount() {
    stop();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    if (io) { io.disconnect(); io = null; }
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    scene = null;
    camera = null;
    group = null;
    container = null;
    canvas = null;
    disposed = true;
  }

  return { mount, unmount };
})();
