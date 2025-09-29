export interface MachineState {
    status: 'running' | 'idle',
    temperature: number,
    rpm: number
}