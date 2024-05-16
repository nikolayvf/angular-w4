import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TrafficLightComponent from './traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public trafficLightStates: string[] = ['red', 'yellow', 'green', 'yellow'];
  public currentLightIndex = 0;
  public lightStatus1 = 'red';
  public lightStatus2 = 'green';
  public lightStatus3 = 'red';
  public lightStatus4 = 'green';
  public blink = false;
  private isEmergency = false;

  private trafficLightInterval!: any;

  ngOnInit() {
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

    this.blink = newStatus === 'yellow';

    if (this.blink) {
      this.startBlinking();
    } else {
      this.stopBlinking();
      this.lightStatus1 = newStatus;
      this.lightStatus2 =
        this.trafficLightStates[
          (this.currentLightIndex + 2) % this.trafficLightStates.length
        ];
      this.lightStatus3 = newStatus;
      this.lightStatus4 =
        this.trafficLightStates[
          (this.currentLightIndex + 2) % this.trafficLightStates.length
        ];
    }
  }

  private startBlinking() {
    setTimeout(() => {
      if (this.blink) {
        this.lightStatus1 = this.lightStatus1 === 'yellow' ? '' : 'yellow';
        this.lightStatus2 = this.lightStatus2 === 'yellow' ? '' : 'yellow';
        this.lightStatus3 = this.lightStatus3 === 'yellow' ? '' : 'yellow';
        this.lightStatus4 = this.lightStatus4 === 'yellow' ? '' : 'yellow';
        this.startBlinking();
      }
    }, 800); // ако е жълто - премигва
  }

  private stopBlinking() {
    this.blink = false;
    this.lightStatus1 = this.trafficLightStates[this.currentLightIndex];
    this.lightStatus2 =
      this.trafficLightStates[
        (this.currentLightIndex + 2) % this.trafficLightStates.length
      ];
    this.lightStatus3 = this.trafficLightStates[this.currentLightIndex];
    this.lightStatus4 =
      this.trafficLightStates[
        (this.currentLightIndex + 2) % this.trafficLightStates.length
      ];
  }

  public triggerEmergency() {
    if (this.isEmergency) {
      // Ако вече е в авария - бутонът авария спира аварията
      this.isEmergency = false;
      clearInterval(this.trafficLightInterval);
      this.stopBlinking();
      this.startTrafficLightCycle();
    } else {
      // Включва авариен режим
      this.isEmergency = true;
      clearInterval(this.trafficLightInterval);
      this.lightStatus1 = 'yellow';
      this.lightStatus2 = 'yellow';
      this.lightStatus3 = 'yellow';
      this.lightStatus4 = 'yellow';
      this.blink = true;
      this.startBlinking();
    }
  }
}
