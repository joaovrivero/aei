import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { VoxelSkeleton } from './skeleton-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelArt = () => {
  const refContainer = useRef()
  const refRenderer = useRef()
  const [loading, setLoading] = useState(true)
  const [_camera, setCamera] = useState()
  const [_controls, setControls] = useState()
  
  // Refs para evitar re-renders desnecessários
  const sceneRef = useRef()
  const modelRef = useRef()
  
  // Estados para controles customizados
  const keysRef = useRef({
    w: false, a: false, s: false, d: false,
    q: false, e: false, shift: false, space: false
  })
  
  const mouseStateRef = useRef({
    isDown: false,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0
  })

  // Função para criar skybox
  const createSkybox = useCallback((scene) => {
    const loader = new THREE.CubeTextureLoader()
    
    // Criando skybox procedural (sem texturas externas)
    const skyboxGeometry = new THREE.SphereGeometry(1000, 32, 32)
    const skyboxMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    })
    
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
    scene.add(skybox)
    
    return skybox
  }, [])

  // Controles de teclado
  const handleKeyDown = useCallback((event) => {
    const key = event.key.toLowerCase()
    keysRef.current[key] = true
  }, [])

  const handleKeyUp = useCallback((event) => {
    const key = event.key.toLowerCase()
    keysRef.current[key] = false
  }, [])

  // Controles de mouse customizados
  const handleMouseDown = useCallback((event) => {
    mouseStateRef.current = {
      ...mouseStateRef.current,
      isDown: true,
      x: event.clientX,
      y: event.clientY
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (mouseStateRef.current.isDown) {
      mouseStateRef.current = {
        ...mouseStateRef.current,
        deltaX: event.clientX - mouseStateRef.current.x,
        deltaY: event.clientY - mouseStateRef.current.y,
        x: event.clientX,
        y: event.clientY
      }
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseStateRef.current = {
      ...mouseStateRef.current,
      isDown: false,
      deltaX: 0,
      deltaY: 0
    }
  }, [])

  // Função para aplicar controles customizados
  const applyCustomControls = useCallback((camera, model, controls) => {
    if (!camera || !model) return

    const keys = keysRef.current
    const mouseState = mouseStateRef.current
    const moveSpeed = keys.shift ? 0.2 : 0.1
    const rotationSpeed = 0.01

    // Controles de teclado - movimento da câmera
    if (keys.w) camera.position.z -= moveSpeed
    if (keys.s) camera.position.z += moveSpeed
    if (keys.a) camera.position.x -= moveSpeed
    if (keys.d) camera.position.x += moveSpeed
    if (keys.q) camera.position.y -= moveSpeed
    if (keys.e) camera.position.y += moveSpeed

    // Controles de mouse - rotação do modelo
    if (mouseState.isDown && (mouseState.deltaX !== 0 || mouseState.deltaY !== 0)) {
      model.rotation.y += mouseState.deltaX * rotationSpeed
      model.rotation.x += mouseState.deltaY * rotationSpeed
      
      // Reset deltas após aplicar
      mouseState.deltaX = 0
      mouseState.deltaY = 0
    }

    // Tecla Space - reset da posição
    if (keys.space) {
      model.rotation.set(0, 0, 0)
      camera.position.set(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )
      keys.space = false // Reset para evitar loop
    }

    // Atualizar controles
    controls.update()
  }, [])

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight
      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer
      
      const scene = new THREE.Scene()
      sceneRef.current = scene

      // ✅ SKYBOX IMPLEMENTADO
      createSkybox(scene)

      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      setCamera(camera)

      // Iluminação melhorada
      const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI)
      scene.add(ambientLight)
      
      // Luz direcional adicional
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(10, 10, 5)
      scene.add(directionalLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      setControls(controls)

      // ✅ EVENT LISTENERS PARA MOUSE CUSTOMIZADO
      renderer.domElement.addEventListener('mousedown', handleMouseDown)
      renderer.domElement.addEventListener('mousemove', handleMouseMove)
      renderer.domElement.addEventListener('mouseup', handleMouseUp)

      loadGLTFModel(scene, '/pc.glb', {
        receiveShadow: false,
        castShadow: false
      }).then((model) => {
        modelRef.current = model
        animate()
        setLoading(false)
      })

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          // ✅ CONTROLES CUSTOMIZADOS APLICADOS
          applyCustomControls(camera, modelRef.current, controls)
        }

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.domElement.removeEventListener('mousedown', handleMouseDown)
        renderer.domElement.removeEventListener('mousemove', handleMouseMove)
        renderer.domElement.removeEventListener('mouseup', handleMouseUp)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [createSkybox, handleMouseDown, handleMouseMove, handleMouseUp, applyCustomControls])

  // ✅ EVENT LISTENERS PARA TECLADO
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [handleWindowResize])

  return (
    <div className="relative mb-16 md:mb-20">
      <div
        ref={refContainer}
        className="voxel-art mx-auto w-[280px] md:w-[480px] lg:w-[640px] h-[280px] md:h-[480px] lg:h-[640px] relative"
      >
        {loading && <VoxelSkeleton className="absolute inset-0" />}
      </div>
      
      {/* Instruções de controle */}
      {!loading && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-xs backdrop-blur-sm">
          <div className="font-bold mb-2">🎮 Controls:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>WASD - Move camera</div>
            <div>QE - Up/Down</div>
            <div>Shift - Fast mode</div>
            <div>Space - Reset</div>
            <div>Mouse - Rotate model</div>
            <div>Scroll - Zoom</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoxelArt