import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// Copo baixo com cachaça e gelo — o mesmo símbolo do selo da casa — em 3D.
export default function Glass3D() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current!
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    // Sem GPU (renderização por software) o 3D só pesaria: desiste em silêncio.
    const gl = renderer.getContext()
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
    if (/swiftshader|llvmpipe|software/i.test(gpu)) {
      renderer.dispose()
      return
    }
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    camera.position.set(0, 1.9, 7)
    camera.lookAt(0, 0.1, 0)

    const warm = new THREE.PointLight(0xffc27a, 30, 12)
    warm.position.set(2.2, 2.5, 2)
    const rim = new THREE.PointLight(0xc6a36a, 18, 12)
    rim.position.set(-2.5, 1, -2)
    scene.add(warm, rim, new THREE.AmbientLight(0x2a4a3a, 0.6))

    const group = new THREE.Group()
    scene.add(group)

    // copo: perfil girado (parede grossa, fundo pesado)
    const profile = [
      [0, -1], [0.92, -1], [0.98, -0.94], [1.06, 0.95], [1.02, 0.97],
      [0.95, -0.72], [0, -0.72],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    const glass = new THREE.Mesh(
      new THREE.LatheGeometry(profile, 72),
      // vidro "fake" (sem transmission): leve, nítido e igual em qualquer GPU
      new THREE.MeshPhysicalMaterial({
        color: 0xdfeee6, metalness: 0, roughness: 0.02, clearcoat: 1, clearcoatRoughness: 0.02,
        transparent: true, opacity: 0.22, envMapIntensity: 2.2, side: THREE.DoubleSide, depthWrite: false,
      }),
    )
    group.add(glass)

    const liquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.98, 0.95, 0.95, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0xb8661a, emissive: 0x3a1504, roughness: 0.1, clearcoat: 0.8, transparent: true, opacity: 0.9,
      }),
    )
    liquid.position.y = -0.24
    liquid.renderOrder = 1
    glass.renderOrder = 3
    group.add(liquid)

    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xf6f1e6, roughness: 0.08, clearcoat: 1, transparent: true, opacity: 0.55, envMapIntensity: 1.6,
    })
    const iceGeo = new RoundedBoxGeometry(0.62, 0.62, 0.62, 4, 0.1)
    const ice = [
      [-0.3, 0.12, 0.15, 0.3], [0.32, 0.22, -0.1, -0.4], [0.02, 0.62, 0.05, 0.9],
    ].map(([x, y, z, r]) => {
      const m = new THREE.Mesh(iceGeo, iceMat)
      m.position.set(x, y, z)
      m.rotation.set(r, r * 1.3, r * 0.6)
      m.renderOrder = 2
      group.add(m)
      return m
    })

    const orange = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.06, 16, 60, Math.PI * 1.2),
      new THREE.MeshStandardMaterial({ color: 0xe0782f, roughness: 0.5 }),
    )
    orange.position.set(0.55, 0.95, 0.2)
    orange.rotation.set(0.3, 0.4, 2.2)
    group.add(orange)

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      const scroll = Math.min(window.scrollY / window.innerHeight, 1)
      group.rotation.y = t * 0.25 + scroll * 1.4 + pointer.x * 0.5
      group.rotation.x = 0.12 + pointer.y * 0.15
      group.position.y = Math.sin(t * 0.9) * 0.08 - scroll * 0.4
      ice.forEach((m, i) => (m.position.y += Math.sin(t * 1.2 + i * 2) * 0.0008))
      renderer.render(scene, camera)
    }
    tick()
    el.style.opacity = '1'

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(o.material as THREE.Material).dispose()
        }
      })
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className="h-full w-full opacity-0 transition-opacity duration-1000 [&>canvas]:h-full [&>canvas]:w-full" />
}
