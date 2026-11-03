import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Particles3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );

        camera.position.z = 9;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // PARTICLES
        const count = 180;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const phases = new Float32Array(count);
        const opacities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

            sizes[i] = 1.5 + Math.random() * 3.5;
            phases[i] = Math.random() * Math.PI * 2;
            opacities[i] = 0.2 + Math.random() * 0.65;
        }

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute(
            "aSize",
            new THREE.BufferAttribute(sizes, 1)
        );
        geometry.setAttribute(
            "aPhase",
            new THREE.BufferAttribute(phases, 1)
        );
        geometry.setAttribute(
            "aOpacity",
            new THREE.BufferAttribute(opacities, 1)
        );

        // PARTICLE SHADER
        const material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,

            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: {
                    value: renderer.getPixelRatio()
                }
            },

            vertexShader: `
                attribute float aSize;
                attribute float aPhase;
                attribute float aOpacity;

                uniform float uTime;
                uniform float uPixelRatio;

                varying float vOpacity;
                varying float vDepth;

                void main() {
                    vec3 pos = position;

                    pos.y += sin(uTime * 0.3 + aPhase) * 0.12;
                    pos.x += cos(uTime * 0.2 + aPhase) * 0.06;

                    vec4 mvPosition =
                        modelViewMatrix * vec4(pos, 1.0);

                    gl_PointSize = aSize * uPixelRatio *
                        (9.0 / -mvPosition.z);

                    gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);

                    gl_Position =
                        projectionMatrix * mvPosition;

                    vOpacity = aOpacity;
                    vDepth = clamp((-mvPosition.z) / 18.0, 0.0, 1.0);
                }
            `,

            fragmentShader: `
                varying float vOpacity;
                varying float vDepth;

                void main() {
                    vec2 uv = gl_PointCoord - vec2(0.5);
                    float d = length(uv);

                    float glow = exp(-d * 10.0);
                    float core = 1.0 - smoothstep(0.02, 0.16, d);

                    vec3 blue = vec3(0.12, 0.48, 1.0);
                    vec3 cyan = vec3(0.35, 0.85, 1.0);
                    vec3 violet = vec3(0.42, 0.30, 1.0);

                    vec3 color = mix(blue, cyan, core);
                    color = mix(color, violet, vDepth * 0.35);

                    float alpha = glow * vOpacity * 0.65;

                    if (alpha < 0.015) discard;

                    gl_FragColor = vec4(color, alpha);
                }
            `
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // NETWORK CONNECTIONS
        const connections = [];

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];

                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < 2.0 && connections.length < 140) {
                    connections.push([i, j]);
                }
            }
        }

        const linePositions = new Float32Array(connections.length * 6);
        const lineGeometry = new THREE.BufferGeometry();

        lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(linePositions, 3)
        );

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.10,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const network = new THREE.LineSegments(
            lineGeometry,
            lineMaterial
        );

        scene.add(network);

        // MOUSE INTERACTION
        let targetX = 0;
        let targetY = 0;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            targetX = (event.clientX / window.innerWidth - 0.5) * 0.35;
            targetY = (event.clientY / window.innerHeight - 0.5) * 0.35;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // ANIMATION - THREE TIMER
        const timer = new THREE.Timer();
        let animationId;

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            timer.update();
            const time = timer.getElapsed();

            material.uniforms.uTime.value = time;

            mouseX += (targetX - mouseX) * 0.025;
            mouseY += (targetY - mouseY) * 0.025;

            particles.rotation.y = time * 0.008 + mouseX;
            particles.rotation.x = time * 0.004 + mouseY;

            const currentPositions = geometry.attributes.position.array;

            for (let i = 0; i < count; i++) {
                const index = i * 3;

                currentPositions[index + 1] +=
                    0.0008 + (sizes[i] * 0.0005);

                if (currentPositions[index + 1] > 6.5) {
                    currentPositions[index + 1] = -6.5;
                }
            }

            geometry.attributes.position.needsUpdate = true;

            // UPDATE NETWORK LINES
            const lineArray = lineGeometry.attributes.position.array;

            connections.forEach(([a, b], index) => {
                for (let axis = 0; axis < 3; axis++) {
                    lineArray[index * 6 + axis] =
                        currentPositions[a * 3 + axis];

                    lineArray[index * 6 + 3 + axis] =
                        currentPositions[b * 3 + axis];
                }
            });

            lineGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // RESPONSIVE
        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            if (!width || !height) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio, 1.5)
            );

            material.uniforms.uPixelRatio.value =
                renderer.getPixelRatio();
        };

        window.addEventListener("resize", handleResize);

        // CLEANUP
        return () => {
            cancelAnimationFrame(animationId);

            timer.dispose();

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            geometry.dispose();
            material.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
            renderer.dispose();

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        />
    );
}