/**
 * Three.js 3D Interactive WebGL Engine
 * Physics Wallah Coaching Helpline Robertsganj
 */

(function () {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') {
    console.warn('Three.js or canvas container not found.');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090f, 0.0018);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 38);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0e1726, 2.5);
  scene.add(ambientLight);

  const coreLight = new THREE.PointLight(0xf59e0b, 3.5, 60);
  coreLight.position.set(0, 0, 0);
  scene.add(coreLight);

  const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 80);
  cyanLight.position.set(20, 15, 20);
  scene.add(cyanLight);

  const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 70);
  purpleLight.position.set(-20, -10, 15);
  scene.add(purpleLight);

  // ==========================================
  // 1. Central Pulsing Nucleus (Atom Core)
  // ==========================================
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Inner nucleus
  const nucleusGeo = new THREE.IcosahedronGeometry(3.2, 2);
  const nucleusMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    wireframe: true
  });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  coreGroup.add(nucleus);

  // Nucleus inner energy core
  const innerCoreGeo = new THREE.SphereGeometry(2.0, 32, 32);
  const innerCoreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.85
  });
  const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
  coreGroup.add(innerCore);

  // ==========================================
  // 2. Rutherford-Bohr Electron Orbit Rings
  // ==========================================
  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  const ringsData = [
    { radius: 10, tube: 0.08, color: 0x06b6d4, rotX: Math.PI / 3, rotY: Math.PI / 6, speed: 0.015 },
    { radius: 14, tube: 0.08, color: 0xf59e0b, rotX: -Math.PI / 4, rotY: Math.PI / 3, speed: -0.012 },
    { radius: 18, tube: 0.08, color: 0x8b5cf6, rotX: Math.PI / 2.2, rotY: -Math.PI / 5, speed: 0.009 }
  ];

  const ringMeshes = [];
  const electronMeshes = [];

  ringsData.forEach((data, index) => {
    const ringGeo = new THREE.TorusGeometry(data.radius, data.tube, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: data.color,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = data.rotX;
    ringMesh.rotation.y = data.rotY;
    orbitGroup.add(ringMesh);
    ringMeshes.push({ mesh: ringMesh, speed: data.speed });

    // Electron particle on orbit
    const elGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const elMat = new THREE.MeshStandardMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.8
    });
    const electron = new THREE.Mesh(elGeo, elMat);
    scene.add(electron);
    electronMeshes.push({
      mesh: electron,
      radius: data.radius,
      rotX: data.rotX,
      rotY: data.rotY,
      speed: 0.8 + index * 0.4,
      angle: index * (Math.PI / 1.5)
    });
  });

  // ==========================================
  // 3. Interactive Subject Floating Nodes
  // ==========================================
  const interactiveNodes = [];
  const subjects = [
    {
      id: 'physics',
      name: 'Physics Masterclasses',
      tag: 'IIT JEE & NEET',
      desc: 'Rotational Dynamics, Modern Physics, Electromagnetism, and Thermo with high-yield numerical shortcuts.',
      color: 0x06b6d4,
      pos: new THREE.Vector3(-15, 6, 8),
      geo: new THREE.OctahedronGeometry(2.2, 0)
    },
    {
      id: 'chemistry',
      name: 'Physical & Organic Chemistry',
      tag: 'NCERT Topper Notes',
      desc: 'Named reactions, reaction mechanisms, stoichiometry, equilibrium & coordination compounds decoded.',
      color: 0xf59e0b,
      pos: new THREE.Vector3(16, 7, 6),
      geo: new THREE.IcosahedronGeometry(2.1, 0)
    },
    {
      id: 'biology',
      name: 'Biology NCERT Mastery',
      tag: 'NEET Special',
      desc: 'High-speed line-by-line NCERT diagrams, Genetics, Plant Physiology & Human Reproduction modules.',
      color: 0x10b981,
      pos: new THREE.Vector3(-14, -8, 5),
      geo: new THREE.DodecahedronGeometry(2.0, 0)
    },
    {
      id: 'maths',
      name: 'JEE Advanced Mathematics',
      tag: 'AIR Booster',
      desc: 'Calculus mastery, 3D Geometry, Vectors, Probability and Coordinate Geometry problem bank.',
      color: 0x8b5cf6,
      pos: new THREE.Vector3(15, -7, 7),
      geo: new THREE.TetrahedronGeometry(2.4, 0)
    }
  ];

  subjects.forEach((subj) => {
    const group = new THREE.Group();
    group.position.copy(subj.pos);

    // Core mesh
    const mat = new THREE.MeshStandardMaterial({
      color: subj.color,
      roughness: 0.15,
      metalness: 0.9,
      emissive: subj.color,
      emissiveIntensity: 0.35,
      wireframe: false
    });
    const mesh = new THREE.Mesh(subj.geo, mat);
    mesh.castShadow = true;
    group.add(mesh);

    // Wireframe outer halo
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const haloMesh = new THREE.Mesh(subj.geo.clone(), wireMat);
    haloMesh.scale.set(1.3, 1.3, 1.3);
    group.add(haloMesh);

    // Orbiting mini node
    const miniGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const miniMat = new THREE.MeshBasicMaterial({ color: subj.color });
    const mini = new THREE.Mesh(miniGeo, miniMat);
    mini.position.set(3, 0, 0);
    group.add(mini);

    scene.add(group);

    // Associate data for raycasting
    mesh.userData = {
      id: subj.id,
      name: subj.name,
      tag: subj.tag,
      desc: subj.desc,
      color: subj.color,
      group: group,
      halo: haloMesh,
      initialScale: 1
    };
    interactiveNodes.push(mesh);
  });

  // ==========================================
  // 4. Quantum Cosmic Particle Field (2,000 pts)
  // ==========================================
  const particleCount = 2000;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const palette = [
    new THREE.Color(0x06b6d4), // Cyan
    new THREE.Color(0xf59e0b), // Gold
    new THREE.Color(0x3b82f6), // Blue
    new THREE.Color(0x8b5cf6)  // Purple
  ];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 140;
    const y = (Math.random() - 0.5) * 90;
    const z = (Math.random() - 0.5) * 80;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const col = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.65
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // ==========================================
  // Mouse Raycasting & Dynamic Parallax
  // ==========================================
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-1000, -1000);
  const targetCameraPos = new THREE.Vector3(0, 5, 38);
  let isHoveringNode = false;
  let hoveredMesh = null;

  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Gentle parallax camera target
    targetCameraPos.x = mouse.x * 6;
    targetCameraPos.y = 5 + mouse.y * 4;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Raycast hover & click handling
  function checkRaycast() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveNodes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hoveredMesh !== hit) {
        if (hoveredMesh) resetNode(hoveredMesh);
        hoveredMesh = hit;
        highlightNode(hit);
      }
      container.style.cursor = 'pointer';
      isHoveringNode = true;
    } else {
      if (hoveredMesh) {
        resetNode(hoveredMesh);
        hoveredMesh = null;
      }
      container.style.cursor = 'default';
      isHoveringNode = false;
    }
  }

  function highlightNode(mesh) {
    mesh.material.emissiveIntensity = 0.9;
    mesh.userData.group.scale.set(1.2, 1.2, 1.2);
    if (window.PWAudio) window.PWAudio.playHoverSound();
  }

  function resetNode(mesh) {
    mesh.material.emissiveIntensity = 0.35;
    mesh.userData.group.scale.set(1, 1, 1);
  }

  function onPointerClick() {
    if (hoveredMesh) {
      const data = hoveredMesh.userData;
      selectSubject(data.id, data.name, data.tag, data.desc);
      if (window.PWAudio) window.PWAudio.playClickSound();
    }
  }

  window.addEventListener('click', onPointerClick);

  // Global selector accessible to HUD chips
  window.selectSubject = function (id, name, tag, desc) {
    const subjectNameEl = document.getElementById('hud-subject-name');
    const examTagEl = document.getElementById('hud-exam-tag');
    const subjectDescEl = document.getElementById('hud-subject-desc');

    if (subjectNameEl) subjectNameEl.textContent = name;
    if (examTagEl) examTagEl.textContent = tag;
    if (subjectDescEl) subjectDescEl.textContent = desc;

    // Update active chip state
    document.querySelectorAll('.subject-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.subject === id);
    });

    // Find and pulse the 3D node
    interactiveNodes.forEach(node => {
      if (node.userData.id === id) {
        node.userData.group.scale.set(1.4, 1.4, 1.4);
        setTimeout(() => {
          node.userData.group.scale.set(1, 1, 1);
        }, 400);
      }
    });
  };

  // Wire up HUD subject chips
  document.querySelectorAll('.subject-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const subjId = chip.dataset.subject;
      const target = subjects.find(s => s.id === subjId);
      if (target) {
        window.selectSubject(target.id, target.name, target.tag, target.desc);
      }
    });
  });

  // Responsive window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ==========================================
  // Animation Loop (60 FPS)
  // ==========================================
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // 1. Smooth camera interpolation
    camera.position.x += (targetCameraPos.x - camera.position.x) * 0.05;
    camera.position.y += (targetCameraPos.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // 2. Pulse Nucleus
    nucleus.rotation.x += 0.008;
    nucleus.rotation.y += 0.012;
    const pulseScale = 1 + Math.sin(time * 3) * 0.06;
    coreGroup.scale.set(pulseScale, pulseScale, pulseScale);

    // 3. Orbit Rings & Electrons
    ringMeshes.forEach(r => {
      r.mesh.rotation.z += r.speed;
    });

    electronMeshes.forEach(el => {
      el.angle += el.speed * delta;
      // Calculate 3D position in orbit
      const x = Math.cos(el.angle) * el.radius;
      const y = Math.sin(el.angle) * el.radius;
      
      const v = new THREE.Vector3(x, y, 0);
      v.applyAxisAngle(new THREE.Vector3(1, 0, 0), el.rotX);
      v.applyAxisAngle(new THREE.Vector3(0, 1, 0), el.rotY);
      el.mesh.position.copy(v);
    });

    // 4. Interactive Subject Nodes rotation & float
    interactiveNodes.forEach((node, idx) => {
      node.rotation.x += 0.01;
      node.rotation.y += 0.015;
      node.userData.halo.rotation.x -= 0.008;
      node.userData.halo.rotation.y -= 0.01;

      // Gentle floating bobbing
      node.userData.group.position.y =
        node.userData.group.position.y + Math.sin(time * 2 + idx) * 0.015;
    });

    // 5. Ambient particle slow swirl
    particleSystem.rotation.y = time * 0.02;
    particleSystem.rotation.x = Math.sin(time * 0.01) * 0.05;

    // 6. Raycast check
    checkRaycast();

    // 7. Render scene
    renderer.render(scene, camera);
  }

  animate();
  console.log('🌌 PW Robertsganj 3D WebGL Scene Initialized.');
})();
