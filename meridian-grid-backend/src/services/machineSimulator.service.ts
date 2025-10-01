import { MachineState } from "../types/machine.types";

export class MachineSimulator {
  private state: MachineState;
  private intervalId: NodeJS.Timeout | null;

  constructor(private readonly machineId: string, private onStateUpdate: (state: MachineState) => void) {
    this.state = {
      status: "idle",
      temperature: 25,
      rpm: 0,
    };

    this.intervalId = null;


  }
  private _updateState(): void {
    if (this.state.status === "running") {
      this.state.temperature += 0.5 + Math.random() * 0.5;
      this.state.rpm = 1200 + Math.random() * 100;

      // Add a condition to stop if it gets too hot
      if (this.state.temperature > 90) {
        this.stop();
        // TODO: add alerting here in a future week
      }

      this.onStateUpdate(this.state);
    }
  }

  public start(): void {
    // If simulation is already running
    if (this.intervalId !== null) {
      return;
    }
    this.state.status = "running";
    this.intervalId = setInterval(() => this._updateState(), 2000);
  }

  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.state.status = "idle";
    }
  }

  public getState(): MachineState {
    return this.state;
  }
}
