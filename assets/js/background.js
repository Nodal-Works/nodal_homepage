/*!
 * NODAL – Transparent Bayer Dithering Background (no-module)
 * Drop in Hugo: assets/js/background.js and include with a <script defer>.
 * DOES NOT change the page background – only draws translucent dots.
 */
(function () {
  // ---- 0) Load THREE if needed ----
  function start() {
    try { new BayerDitherBackground(); }
    catch (e) { console.error('[bayerbg] failed to init', e); }
  }
  if (typeof THREE === 'undefined') {
    console.warn('[bayerbg] Three.js not found, loading CDN…');
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/three@0.155.0/build/three.min.js';
    s.onload = start;
    document.head.appendChild(s);
  } else {
    start();
  }

  // ---- 1) Helper: read color from CSS var or fallback ----
  function readVar(name, fallback) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    } catch (_) { return fallback; }
  }
  function readData(el, key, fallback) {
    var v = el.getAttribute('data-' + key);
    return (v === null || v === undefined || v === '') ? fallback : v;
  }

  // ---- 2) Main class ----
  function BayerDitherBackground() {
    var body = document.body;

    // Default values - these will be overridden by background-config.js
    var defaults = {
      dot:  readVar('--bayer-dot',  readData(body, 'bayer-dot',  '#4d525f')),
      dot2: readVar('--bayer-dot2', readData(body, 'bayer-dot2', '#6ea3ff')),
      opacity: parseFloat(readData(body, 'bayer-opacity', '0.50')), // Default opacity lowered to 0.22
      cellSize: parseFloat(readData(body, 'bayer-cell', '5')),     // Default cell size changed to 16
      shape: readData(body, 'bayer-shape', 'circle'),               // Default shape is circle
      twoToneMode: parseFloat(readData(body, 'bayer-mode', '1')),   // 0=random,1=density,2=edge
      toneLow: parseFloat(readData(body, 'bayer-low', '0.40')),
      toneHigh: parseFloat(readData(body, 'bayer-high', '0.60')),
      parallax: parseFloat(readData(body, 'bayer-parallax', '1.0')),
      seed: parseFloat(readData(body, 'bayer-seed', '0'))
    };

    // Scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,               // << transparent canvas
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setClearColor(0x000000, 0); // fully transparent
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    var canvas = this.renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    // Shader (no background color mixed in)
    var shapeMap = { circle:0, square:1, diamond:2, cross:3, point:4, ring:5 };
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime:        { value: 0 },
        uResolution:  { value: new THREE.Vector2(window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio()) },
        uOpacity:     { value: defaults.opacity },
        uDotColor:    { value: new THREE.Color(defaults.dot) },
        uDotColor2:   { value: new THREE.Color(defaults.dot2) },
        uPatternSeed: { value: defaults.seed },
        uScrollNorm:  { value: 0.0 },
        uTwoToneMode: { value: defaults.twoToneMode },
        uToneLow:     { value: defaults.toneLow },
        uToneHigh:    { value: defaults.toneHigh },
        uShapeType:   { value: shapeMap[defaults.shape] || 0 }, // Default to circle (0) instead of ring (5)
        uCellSize:    { value: defaults.cellSize },
        uParallaxScale:{ value: defaults.parallax }
      },
      vertexShader: 'void main(){gl_Position=vec4(position,1.0);}',

      // Transparent dots only; page bg shows through untouched.
      fragmentShader: `
        precision highp float;
        uniform float uTime, uPatternSeed, uScrollNorm, uTwoToneMode, uToneLow, uToneHigh, uShapeType, uCellSize, uParallaxScale, uOpacity;
        uniform vec2  uResolution;
        uniform vec3  uDotColor, uDotColor2;

        float hash11(float n){ return fract(sin(n)*43758.5453); }
        float vnoise(vec3 p){
          vec3 ip=floor(p), fp=fract(p);
          float n000=hash11(dot(ip+vec3(0.,0.,0.), vec3(1.,57.,113.)));
          float n100=hash11(dot(ip+vec3(1.,0.,0.), vec3(1.,57.,113.)));
          float n010=hash11(dot(ip+vec3(0.,1.,0.), vec3(1.,57.,113.)));
          float n110=hash11(dot(ip+vec3(1.,1.,0.), vec3(1.,57.,113.)));
          float n001=hash11(dot(ip+vec3(0.,0.,1.), vec3(1.,57.,113.)));
          float n101=hash11(dot(ip+vec3(1.,0.,1.), vec3(1.,57.,113.)));
          float n011=hash11(dot(ip+vec3(0.,1.,1.), vec3(1.,57.,113.)));
          float n111=hash11(dot(ip+vec3(1.,1.,1.), vec3(1.,57.,113.)));
          vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
          float x00=mix(n000,n100,w.x); float x10=mix(n010,n110,w.x);
          float x01=mix(n001,n101,w.x); float x11=mix(n011,n111,w.x);
          float y0=mix(x00,x10,w.y); float y1=mix(x01,x11,w.y);
          return mix(y0,y1,w.z)*2.-1.;
        }
        float fbmStable(vec2 uv, float t){
          const int OCT=5; float amp=1., freq=1., sum=1.;
          for(int i=0;i<OCT;i++){ sum += amp * vnoise(vec3(uv*4.0*freq, t)); freq*=1.25; }
          return sum*0.5+0.5;
        }

        float Bayer2(vec2 a){ a=floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
        float Bayer4(vec2 a){ return Bayer2(0.5*a)*0.25 + Bayer2(a); }
        float Bayer8(vec2 a){ return Bayer4(0.5*a)*0.25 + Bayer2(a); }

        void main(){
          vec2 frag = gl_FragCoord.xy;
          vec2 uv = frag / uResolution;

          // parallax + tiny zoom based on scroll
          float par = uScrollNorm;
          vec2 center = uv - 0.5;
          center *= 1.0 + par * 0.06 * uParallaxScale;
          uv = center + 0.5;
          uv.x += par * 0.12 * uParallaxScale;
          uv.y += par * 0.25 * uParallaxScale;

          float pixelSize = uCellSize;
          vec2 fc = frag - 0.5 * uResolution;
          vec2 uvAlt = fc / uResolution.y;
          float tShift = uTime*0.10*(1.0 + uPatternSeed*0.05);

          // base field and Bayer threshold
          float fieldRaw = fbmStable(uvAlt + vec2(uPatternSeed*0.37 + uScrollNorm*0.4, uPatternSeed*0.61 + uScrollNorm*0.2), tShift);
          float feed = fieldRaw * 0.5 - 0.65;
          float bayerVal = Bayer8(frag / pixelSize) - 0.5;
          float thresh = feed + bayerVal;
          float bw = smoothstep(0.45, 0.55, thresh);

          // two-tone selection
          float toneMix;
          if (uTwoToneMode < 0.5) {
            float r = hash11(dot(floor(frag/pixelSize), vec2(7.13,157.37)) + uPatternSeed*13.17);
            toneMix = smoothstep(uToneLow, uToneHigh, r);
          } else if (uTwoToneMode < 1.5) {
            vec2 d = vec2(0.02, 0.0);
            float n1 = fbmStable(uvAlt + d.xy, tShift);
            float n2 = fbmStable(uvAlt + d.yx, tShift);
            float n3 = fbmStable(uvAlt - d.yx, tShift);
            float density = (fieldRaw + n1 + n2 + n3) * 0.25;
            toneMix = smoothstep(uToneLow, uToneHigh, density);
          } else {
            vec2 e = vec2(0.015,0.0);
            float gx = fbmStable(uvAlt+e.xy, tShift) - fbmStable(uvAlt-e.xy, tShift);
            float gy = fbmStable(uvAlt+e.yx, tShift) - fbmStable(uvAlt-e.yx, tShift);
            float edge = sqrt(gx*gx+gy*gy);
            toneMix = smoothstep(uToneLow, uToneHigh, edge);
          }

          // shape mask inside each pixel-size cell
          vec2 cellCoord = frag / pixelSize;
          vec2 cellUV = fract(cellCoord) - 0.5;
          float mask;
          if (uShapeType < 0.5) {
            mask = step(length(cellUV), 0.42);
          } else if (uShapeType < 1.5) {
            mask = step(max(abs(cellUV.x), abs(cellUV.y)), 0.42);
          } else if (uShapeType < 2.5) {
            mask = step(abs(cellUV.x)+abs(cellUV.y), 0.60);
          } else if (uShapeType < 3.5) {
            float h = step(abs(cellUV.y),0.17) * step(abs(cellUV.x),0.55);
            float v = step(abs(cellUV.x),0.17) * step(abs(cellUV.y),0.55);
            mask = clamp(h+v,0.0,1.0);
          } else if (uShapeType < 4.5) {
            mask = step(length(cellUV), 0.18);
          } else {
            float d = length(cellUV);
            float outer = smoothstep(0.44, 0.41, d);
            float inner = smoothstep(0.20, 0.23, d);
            mask = outer * inner;
          }

          float alpha = bw * mask;
          vec3 dotColor = mix(uDotColor2, uDotColor, toneMix);
          gl_FragColor = vec4(dotColor, alpha * uOpacity); // TRANSPARENT where no dots
        }
      `
    });

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
    this.scene.add(mesh);

    // State
    this.time = 0;
    this.timeScale = 1.0;
    this.userSpeedMultiplier = 1.0;
    this.scrollTarget = 0.0;
    this.scrollCurrent = 0.0;

    // Events
    var self = this;
    function onResize() {
      self.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      self.renderer.setSize(window.innerWidth, window.innerHeight);
      var pr = self.renderer.getPixelRatio();
      self.material.uniforms.uResolution.value.set(window.innerWidth * pr, window.innerHeight * pr);
    }
    window.addEventListener('resize', onResize);

    window.addEventListener('scroll', function () {
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      self.scrollTarget = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
      self.timeScale = Math.min(self.timeScale + 0.05, 3.0);
    }, { passive: true });

    // Theme change events are now managed in background-config.js

    // RAF
    this.lastTS = performance.now();
    function tick() {
      var now = performance.now();
      var dt = (now - self.lastTS) / 1000;
      self.lastTS = now;
      self.time += dt * self.timeScale;
      self.scrollCurrent += (self.scrollTarget - self.scrollCurrent) * 0.08;

      self.material.uniforms.uTime.value = self.time * self.userSpeedMultiplier;
      self.material.uniforms.uScrollNorm.value = self.scrollCurrent;

      self.renderer.render(self.scene, self.camera);
      requestAnimationFrame(tick);
    }
    tick();

    // Expose a tiny API (optional)
    window.bayerBackground = {
      setDots: function (c1, c2) {
        console.debug('[bayerbg] Setting dot colors:', c1, c2);
        if (c1) {
          self.material.uniforms.uDotColor.value.set(c1);
          console.debug('[bayerbg] Primary dot color set to:', c1);
        }
        if (c2) {
          self.material.uniforms.uDotColor2.value.set(c2);
          console.debug('[bayerbg] Secondary dot color set to:', c2);
        }
      },
      setOpacity: function (o) { self.material.uniforms.uOpacity.value = Math.max(0, Math.min(1, o)); },
      setCellSize: function (px) { if (px > 0) self.material.uniforms.uCellSize.value = px; },
      setShape: function (name) {
        var m = { circle:0, square:1, diamond:2, cross:3, point:4, ring:5 };
        console.log('[bayerbg] Setting shape to:', name, 'value:', m[name] || 0);
        self.material.uniforms.uShapeType.value = m[name] || 0; // Default to circle (0)
      },
      setSpeed: function (mult) { self.userSpeedMultiplier = Math.max(0.05, mult); }
    };

    // Initial resize sync
    onResize();
    console.log('[bayerbg] transparent dithering background ready');
  }
})();
