import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { MachineSimulator } from "./machineSimulator.service";

export class SimulationService {
  private activeSimulators: Map<string, MachineSimulator> = new Map<
    string,
    MachineSimulator
  >();
  private prisma: PrismaClient = new PrismaClient();

  constructor(private io: Server) {}

  public async startAllSimulations(): Promise<void> {
    console.log("Simulation Service is starting ...");
    const machines = await this.prisma.machine.findMany();
    console.log(`${machines.length} machines were found.`);
    machines.forEach((machine) => {
      let newSimulator = new MachineSimulator(machine.id, (newState) => {
        this.io.to(machine.id).emit("machine:data", newState);
      });
      newSimulator.start();
      console.log(
        `A simulator for machine ID: ${machine.id} has been started.`
      );
      this.activeSimulators.set(machine.id, newSimulator);
    });
  }
}
