import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  NgZone,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface TiltEngine {
  setImmediate(x: number, y: number): void;
  setTarget(x: number, y: number): void;
  toCenter(): void;
  beginInitial(durationMs: number): void;
  getCurrent(): { x: number; y: number; tx: number; ty: number };
  cancel(): void;
}

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180,
};

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  @Input() avatarUrl = 'images/profile.jpg';
  @Input() name = 'Abisheak S';
  @Input() title = 'Software Engineer';
  @Input() description = 'A Software Engineer who builds innovative solutions.';
  @Input() handle = 'abisheak';
  @Input() status = 'Available';
  @Input() contactText = 'Contact Me';
  @Input() showUserInfo = false;
  @Input() showInfoBelow = true;
  @Input() socialLinks: { name: string; url: string; icon: string }[] = [];
  @Input() enableTilt = true;
  @Input() behindGlowEnabled = true;
  @Input() innerGradient = 'linear-gradient(145deg, #1a3a5c8c 0%, #4a9eff44 100%)';
  @Input() behindGlowColor = 'rgba(74, 158, 255, 0.5)';
  @Input() behindGlowSize = '50%';

  @Output() contactClick = new EventEmitter<void>();

  @ViewChild('wrapEl', { static: true }) wrapRef!: ElementRef<HTMLDivElement>;
  @ViewChild('shellEl', { static: true }) shellRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);
  private tiltEngine: TiltEngine | null = null;
  private enterTimer: ReturnType<typeof setTimeout> | null = null;
  private leaveRaf: number | null = null;

  private boundPointerMove = (e: PointerEvent) => this.onPointerMove(e);
  private boundPointerEnter = (e: PointerEvent) => this.onPointerEnter(e);
  private boundPointerLeave = () => this.onPointerLeave();

  ngOnInit(): void {
    if (!this.enableTilt) return;
    this.tiltEngine = this.createTiltEngine();

    this.ngZone.runOutsideAngular(() => {
      const shell = this.shellRef.nativeElement;
      shell.addEventListener('pointerenter', this.boundPointerEnter);
      shell.addEventListener('pointermove', this.boundPointerMove);
      shell.addEventListener('pointerleave', this.boundPointerLeave);

      const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
      const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
      this.tiltEngine!.setImmediate(initialX, initialY);
      this.tiltEngine!.toCenter();
      this.tiltEngine!.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    });
  }

  ngOnDestroy(): void {
    const shell = this.shellRef?.nativeElement;
    if (shell) {
      shell.removeEventListener('pointerenter', this.boundPointerEnter);
      shell.removeEventListener('pointermove', this.boundPointerMove);
      shell.removeEventListener('pointerleave', this.boundPointerLeave);
    }
    if (this.enterTimer) clearTimeout(this.enterTimer);
    if (this.leaveRaf) cancelAnimationFrame(this.leaveRaf);
    this.tiltEngine?.cancel();
  }

  onContactClicked(): void {
    this.contactClick.emit();
  }

  onAvatarError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  private getOffsets(evt: PointerEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  private onPointerMove(event: PointerEvent): void {
    const shell = this.shellRef.nativeElement;
    if (!this.tiltEngine) return;
    const { x, y } = this.getOffsets(event, shell);
    this.tiltEngine.setTarget(x, y);
  }

  private onPointerEnter(event: PointerEvent): void {
    const shell = this.shellRef.nativeElement;
    if (!this.tiltEngine) return;

    shell.classList.add('active', 'entering');
    if (this.enterTimer) clearTimeout(this.enterTimer);
    this.enterTimer = setTimeout(() => {
      shell.classList.remove('entering');
    }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

    const { x, y } = this.getOffsets(event, shell);
    this.tiltEngine.setTarget(x, y);
  }

  private onPointerLeave(): void {
    const shell = this.shellRef.nativeElement;
    if (!this.tiltEngine) return;

    this.tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = this.tiltEngine!.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove('active');
        this.leaveRaf = null;
      } else {
        this.leaveRaf = requestAnimationFrame(checkSettle);
      }
    };
    if (this.leaveRaf) cancelAnimationFrame(this.leaveRaf);
    this.leaveRaf = requestAnimationFrame(checkSettle);
  }

  private createTiltEngine(): TiltEngine {
    const shellRef = this.shellRef;
    const wrapRef = this.wrapRef;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.nativeElement;
      const wrap = wrapRef.nativeElement;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(props)) {
        wrap.style.setProperty(k, v);
      }
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x: number, y: number) {
        currentX = x; currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x; targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.nativeElement;
        if (!shell) return;
        targetX = shell.clientWidth / 2;
        targetY = shell.clientHeight / 2;
        start();
      },
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null; running = false; lastTs = 0;
      },
    };
  }
}
