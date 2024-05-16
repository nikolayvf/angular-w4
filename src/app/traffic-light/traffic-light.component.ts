import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class TrafficLightComponent {
  @Input() position: string = '';
  @Input() status: string = '';
  @Output() crossing = new EventEmitter<void>();

  public canCross(): boolean {
    return this.status !== 'red';
  }

  public onCross(): void {
    if (this.status === 'yellow') {
      alert('Неправилно пресичане');
    } else {
      this.crossing.emit();
    }
  }
}
