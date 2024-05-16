import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.css'],
})
export class TrafficLightComponent {
  @Input() status: string = '';
  @Input() position: string = '';

  public onCross(): void {
    if (this.status === 'yellow') {
      alert('Неправилно пресичане');
    } else {
      console.log('Crossing');
    }
  }
}

export default TrafficLightComponent;
