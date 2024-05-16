import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public trafficLightStates: string[] = ['red', 'yellow', 'green'];
  public currentLightIndex = 0;
  public lightStatus = {
    horizontal: 'red',
    vertical: 'green',
  };
  private trafficLightInterval!: any;
  private emergencyTimeout!: any;

  public buttons = [
    { position: 'left', disabled: false },
    { position: 'right', disabled: false },
    { position: 'top', disabled: false },
    { position: 'bottom', disabled: false },
  ];

  constructor() {
    this.startTrafficLightCycle();
  }

  private startTrafficLightCycle() {
    this.trafficLightInterval = setInterval(() => {
      this.updateTrafficLights();
    }, 5000);
  }

  private updateTrafficLights() {
    this.currentLightIndex =
      (this.currentLightIndex + 1) % this.trafficLightStates.length;
    const newStatus = this.trafficLightStates[this.currentLightIndex];

    if (newStatus === 'yellow') {
      this.lightStatus.horizontal = newStatus;
      this.lightStatus.vertical = newStatus;
      this.disableButtons(true);
    } else {
      this.lightStatus.horizontal = newStatus;
      this.lightStatus.vertical = newStatus === 'red' ? 'green' : 'red';
      this.disableButtons(false);
    }
  }

  private disableButtons(disabled: boolean) {
    this.buttons.forEach((button) => {
      button.disabled = disabled || this.lightStatus[button.position] === 'red';
    });
  }

  public triggerEmergency() {
    clearInterval(this.trafficLightInterval);
    this.lightStatus.horizontal = 'yellow';
    this.lightStatus.vertical = 'yellow';

    this.emergencyTimeout = setTimeout(() => {
      this.startTrafficLightCycle();
    }, 10000);

    setTimeout(() => {
      (document.querySelector('button') as HTMLButtonElement).disabled = false;
    }, 20000);
    (document.querySelector('button') as HTMLButtonElement).disabled = true;
  }

  // public cross(position: string) {
  //   if (this.lightStatus[position] === 'yellow') {
  //     alert('Неправилно пресичане');
  //   }
  // }
}
