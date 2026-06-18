import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  NgZone,
  inject,
} from '@angular/core';
import * as THREE from 'three';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  templateUrl: './particle-bg.component.html',
  styleUrl: './particle-bg.component.scss',
})
export class ParticleBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private animationId = 0;
  private mouse = { x: 0, y: 0 };
  private ngZone = inject(NgZone);
  private theme = inject(ThemeService);

  private boundMouseMove = (e: MouseEvent) => {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private boundResize = () => this.onResize();

  ngOnInit(): void {
    this.initThree();
    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('resize', this.boundResize);
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('resize', this.boundResize);
    this.renderer.dispose();
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.createParticles();
  }

  private createParticles(): void {
    const count = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      size: 0.4,
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Connection lines
    const lineGeom = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    this.scene.add(lines);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const positions = this.particles.geometry.attributes['position'];
    const velocities = this.particles.geometry.attributes['velocity'];

    for (let i = 0; i < positions.count; i++) {
      const ix = i * 3;
      const posArray = positions.array as Float32Array;
      const velArray = velocities.array as Float32Array;

      posArray[ix] += velArray[ix];
      posArray[ix + 1] += velArray[ix + 1];
      posArray[ix + 2] += velArray[ix + 2];

      // Wrap around boundaries
      for (let j = 0; j < 3; j++) {
        if (posArray[ix + j] > 50) posArray[ix + j] = -50;
        if (posArray[ix + j] < -50) posArray[ix + j] = 50;
      }
    }
    positions.needsUpdate = true;

    // Mouse interaction — subtle rotation
    this.particles.rotation.x += (this.mouse.y * 0.05 - this.particles.rotation.x) * 0.02;
    this.particles.rotation.y += (this.mouse.x * 0.05 - this.particles.rotation.y) * 0.02;

    // Update color based on theme
    const mat = this.particles.material as THREE.PointsMaterial;
    const currentTheme = this.theme.currentTheme();
    if (currentTheme === 'cyberpunk') {
      mat.color.set(0x00ffd5); // Teal/cyan
      mat.opacity = 0.8;
    } else if (currentTheme === 'orange') {
      mat.color.set(0xff6b35); // Orange
      mat.opacity = 0.8;
    } else if (currentTheme === 'dark') {
      mat.color.set(0x4a9eff);
      mat.opacity = 0.7;
    } else {
      mat.color.set(0x2563eb);
      mat.opacity = 0.4;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
