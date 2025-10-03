import { create } from "zustand";
import type { DataPoint } from "../types/chart.types";

export interface State {
  temperature: number;
  rpm: number;
  historicalData: DataPoint[];
}

export interface Actions {
  setTelemetry: (temperature: number, rpm: number) => void;
  addHistoricalReading: (dataPoint: DataPoint) => void;
}

export const useMachineStore = create<State & Actions>((set) => ({
  // Initial State
  temperature: 0,
  rpm: 0,
  historicalData: [],

  // Actions
  setTelemetry: (temp, rpm) => set(() => ({ temperature: temp, rpm: rpm })),

  addHistoricalReading: (newDataPoint) =>
    set((state) => ({
      historicalData: [...state.historicalData, newDataPoint].slice(-30), // Keep only the last 30 points
    })),
}));
