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
  
  // Refs para controles customizados
  const keysRef = useRef({})
  const mouseStateRef = useRef({ isDown: false, x: 0, y: 0, deltaX: 0, deltaY: 0 })
  const modelRef = useRef()

  // ✅ SKYBOX CREATION
  const createSkybox = useCallback((scene) => {
    const skyboxGeometry = new THREE.SphereGeometry(1000, 32, 32)
    
    // Gradient texture for skybox
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')
    
    // Create gradient from dark blue to light purple
    const gradient = context.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#0a0a0a')
    gradient.addColorStop(0.5, '#1a1a2e')
    gradient.addColorStop(1, '#16213e')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, 256, 256)
    
    const texture = new THREE.CanvasTexture(canvas)
    const skyboxMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    })
    
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)
    scene.add(skybox)
    
    return skybox
  }, [])

  // ✅ KEYBOARD CONTROLS
  const handleKeyDown = useCallback((event) => {
    const key = event.key.toLowerCase()
    keysRef.current[key] = true
  }, [])

  const handleKeyUp = useCallback((event) => {
    const key = event.key.toLowerCase()
    keysRef.current[key] = false
  }, [])

  // ✅ MOUSE CONTROLS
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
      mouseStateRef.current.deltaX = event.clientX - mouseStateRef.current.x
      mouseStateRef.current.deltaY = event.clientY - mouseStateRef.current.y
      mouseStateRef.current.x = event.clientX
      mouseStateRef.current.y = event.clientY
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

  // ✅ CUSTOM CONTROLS APPLICATION
  const applyCustomControls = useCallback((camera, model, controls) => {
    if (!camera || !model) return

    const keys = keysRef.current
    const mouseState = mouseStateRef.current
    const moveSpeed = keys.shift ? 0.2 : 0.1
    const rotationSpeed = 0.01

    // ✅ KEYBOARD CONTROLS - Camera movement
    if (keys.w || keys.arrowup) camera.position.z -= moveSpeed
    if (keys.s || keys.arrowdown) camera.position.z += moveSpeed
    if (keys.a || keys.arrowleft) camera.position.x -= moveSpeed
    if (keys.d || keys.arrowright) camera.position.x += moveSpeed
    if (keys.q) camera.position.y -= moveSpeed
    if (keys.e) camera.position.y += moveSpeed

    // ✅ MOUSE CONTROLS - Model rotation
    if (mouseState.isDown && (mouseState.deltaX !== 0 || mouseState.deltaY !== 0)) {
      model.rotation.y += mouseState.deltaX * rotationSpeed
      model.rotation.x += mouseState.deltaY * rotationSpeed
      
      // Reset deltas after applying
      mouseState.deltaX = 0
      mouseState.deltaY = 0
    }

    // ✅ SPACE KEY - Reset position
    if (keys[' '] || keys.space) {
      model.rotation.set(0, 0, 0)
      camera.position.set(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )
      keys[' '] = false
      keys.space = false
    }

    // Update controls
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

      // ✅ SKYBOX IMPLEMENTATION
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

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI)
      scene.add(ambientLight)
      
      // Additional directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(10, 10, 5)
      scene.add(directionalLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      setControls(controls)

      // ✅ CUSTOM MOUSE EVENT LISTENERS
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
      }).catch((error) => {
        console.error('Error loading 3D model:', error)
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
          // ✅ APPLY CUSTOM CONTROLS
          applyCustomControls(camera, modelRef.current, controls)
        }

        renderer.render(scene, camera)
      }

      return () => {
        if (req) cancelAnimationFrame(req)
        renderer.domElement.removeEventListener('mousedown', handleMouseDown)
        renderer.domElement.removeEventListener('mousemove', handleMouseMove)
        renderer.domElement.removeEventListener('mouseup', handleMouseUp)
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }
  }, [createSkybox, handleMouseDown, handleMouseMove, handleMouseUp, applyCustomControls])

  // ✅ KEYBOARD EVENT LISTENERS
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
      
      {/* ✅ CUSTOM CONTROLS INSTRUCTIONS */}
      {!loading && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg text-xs backdrop-blur-sm z-10">
          <div className="font-bold mb-2">🎮 Controls:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>WASD/Arrows - Move camera</div>
            <div>QE - Up/Down</div>
            <div>Shift - Fast mode</div>
            <div>Space - Reset</div>
            <div>Mouse drag - Rotate model</div>
            <div>Scroll - Zoom</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoxelArt
