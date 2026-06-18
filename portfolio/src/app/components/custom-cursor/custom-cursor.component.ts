import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
  NgZone,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorService, CURSOR_OPTIONS } from '../../services/cursor.service';

const TRAIL_LENGTH = 20;

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  cursor = inject(CursorService);
  cursorOptions = CURSOR_OPTIONS;
  pickerOpen = false;

  @ViewChild('dotEl') dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ringEl') ringRef!: ElementRef<HTMLDivElement>;
  @ViewChild('trailCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private isClicking = false;
  private isHovering = false;
  private animationId = 0;

  // Trail points stored as circular buffer
  private trailPoints: { x: number; y: number }[] = [];
  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngAfterViewInit(): void {
    this.setupCanvas();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const target = e.target as HTMLElement;
    this.isHovering = !!target.closest('a, button, [role="button"], .clickable, input, textarea');

    // Add trail point when in trail mode
    if (this.cursor.cursorType() === 'trail') {
      this.trailPoints.push({ x: e.clientX, y: e.clientY });
      if (this.trailPoints.length > TRAIL_LENGTH) {
        this.trailPoints.shift();
      }
    }
  }

  @HostListener('window:mousedown')
  onMouseDown(): void {
    this.isClicking = true;
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.isClicking = false;
  }

  togglePicker(): void {
    this.pickerOpen = !this.pickerOpen;
    this.cdr.markForCheck();
  }

  selectCursor(type: string): void {
    this.cursor.setCursor(type as any);
    this.pickerOpen = false;
    this.trailPoints = [];
    this.cdr.markForCheck();
  }

  private animate(): void {
    // Smooth ring follow
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;

    this.updateDom();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updateDom(): void {
    const type = this.cursor.cursorType();

    // Update dot position
    const dot = this.dotRef?.nativeElement;
    if (dot) {
      dot.style.left = `${this.mouseX}px`;
      dot.style.top = `${this.mouseY}px`;
      dot.classList.toggle('clicking', this.isClicking);
    }

    // Update ring/spotlight position
    const ring = this.ringRef?.nativeElement;
    if (ring) {
      ring.style.left = `${this.ringX}px`;
      ring.style.top = `${this.ringY}px`;
      ring.classList.toggle('clicking', this.isClicking);
      ring.classList.toggle('hovering', this.isHovering);
    }

    // Draw trail on canvas
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      canvas.style.display = type === 'trail' ? 'block' : 'none';
    }
    if (type === 'trail') {
      this.drawTrail();
    }
  }

  private drawTrail(): void {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;

    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.trailPoints.length < 2) return;

    // Get accent color from CSS variable
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#4a9eff';

    const time = Date.now() * 0.01; // For sparkle animation

    // Draw glittering star trail
    for (let i = 0; i < this.trailPoints.length; i++) {
      const point = this.trailPoints[i];
      const progress = i / this.trailPoints.length; // 0 to 1
      const baseSize = 2 + progress * 6;
      const baseOpacity = progress * 0.9;

      // Sparkle effect - random twinkle based on time and position
      const sparkle = Math.sin(time + i * 0.5) * 0.5 + 0.5;
      const brightness = 0.5 + sparkle * 0.5;

      // Draw outer glow
      const gradient = this.ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, baseSize * 3
      );
      gradient.addColorStop(0, this.hexToRgba(accentColor, baseOpacity * 0.6 * brightness));
      gradient.addColorStop(0.4, this.hexToRgba(accentColor, baseOpacity * 0.3 * brightness));
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, baseSize * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Draw star shape for some particles
      if (i % 2 === 0 || progress > 0.7) {
        this.drawStar(point.x, point.y, baseSize * brightness, baseOpacity * brightness, accentColor);
      }

      // Draw core sparkle (white center)
      const coreSize = baseSize * 0.5 * brightness;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, coreSize, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${baseOpacity * brightness})`;
      this.ctx.fill();

      // Random extra sparkles near the point
      if (Math.random() > 0.7 && progress > 0.3) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        const miniSize = 1 + Math.random() * 2;
        this.ctx.beginPath();
        this.ctx.arc(point.x + offsetX, point.y + offsetY, miniSize, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${baseOpacity * 0.6})`;
        this.ctx.fill();
      }
    }
  }

  private drawStar(x: number, y: number, size: number, opacity: number, color: string): void {
    if (!this.ctx) return;
    
    // Draw 4-point star/sparkle
    this.ctx.save();
    this.ctx.translate(x, y);
    
    // Vertical line
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size * 2);
    this.ctx.lineTo(0, size * 2);
    this.ctx.strokeStyle = this.hexToRgba(color, opacity * 0.8);
    this.ctx.lineWidth = size * 0.3;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    
    // Horizontal line
    this.ctx.beginPath();
    this.ctx.moveTo(-size * 2, 0);
    this.ctx.lineTo(size * 2, 0);
    this.ctx.stroke();
    
    // Diagonal lines (smaller)
    this.ctx.beginPath();
    this.ctx.moveTo(-size, -size);
    this.ctx.lineTo(size, size);
    this.ctx.strokeStyle = this.hexToRgba(color, opacity * 0.5);
    this.ctx.lineWidth = size * 0.2;
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(size, -size);
    this.ctx.lineTo(-size, size);
    this.ctx.stroke();
    
    this.ctx.restore();
  }

  private hexToRgba(hex: string, alpha: number): string {
    // Handle rgb/rgba format
    if (hex.startsWith('rgb')) {
      const match = hex.match(/[\d.]+/g);
      if (match) {
        return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
      }
    }
    // Handle hex format
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
    }
    return `rgba(74, 158, 255, ${alpha})`;
  }
}
