"use client"

import { create } from "zustand"

interface EnergySystemState {
  // Component states
  inverterActive: boolean
  switchActive: boolean
  bulbActive: boolean
  wordActive: boolean
  prevBulbActive: boolean

  // Animation and metrics
  animationPhase: number
  energySaved: number
  co2Reduced: number

  // State update functions
  setInverterActive: (active: boolean) => void
  setSwitchActive: (active: boolean) => void
  setBulbActive: (active: boolean) => void
  setWordActive: (active: boolean) => void
  setAnimationPhase: (phase: number) => void
  incrementEnergySaved: () => void
  incrementCo2Reduced: () => void

  // Utility functions
  activateFullSystem: () => void
  deactivateFullSystem: () => void
}

export const useEnergySystemStore = create<EnergySystemState>((set, get) => ({
  // Initial states
  inverterActive: false,
  switchActive: false,
  bulbActive: false,
  wordActive: false,
  prevBulbActive: false,
  animationPhase: 0,
  energySaved: 0,
  co2Reduced: 0,

  // Core state update functions
  setInverterActive: (active) =>
    set((state) => {
      if (!active) {
        return {
          inverterActive: false,
          switchActive: false,
          bulbActive: false,
          wordActive: false,
          prevBulbActive: state.bulbActive,
          animationPhase: 0,
          energySaved: state.energySaved,
          co2Reduced: state.co2Reduced,
        }
      }
      return {
        ...state,
        inverterActive: active,
        animationPhase: 1,
      }
    }),

  setSwitchActive: (active) =>
    set((state) => {
      if (!state.inverterActive) return state
      const prevBulbActive = state.bulbActive
      return {
        ...state,
        switchActive: active,
        bulbActive: active ? state.bulbActive : false,
        wordActive: active ? state.wordActive : false,
        prevBulbActive,
      }
    }),

  setBulbActive: (active) =>
    set((state) => ({
      ...state,
      bulbActive: active,
      prevBulbActive: state.bulbActive,
    })),

  setWordActive: (active) => set((state) => ({ ...state, wordActive: active })),

  setAnimationPhase: (phase) => set((state) => ({ ...state, animationPhase: phase })),

  incrementEnergySaved: () =>
    set((state) => ({ ...state, energySaved: state.energySaved + 0.05 })),

  incrementCo2Reduced: () =>
    set((state) => ({ ...state, co2Reduced: state.co2Reduced + 0.02 })),

  // Utility functions
  activateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: true,
      switchActive: true,
      bulbActive: true,
      wordActive: true,
      animationPhase: 1,
    })),

  deactivateFullSystem: () =>
    set((state) => ({
      ...state,
      inverterActive: false,
      switchActive: false,
      bulbActive: false,
      wordActive: false,
      animationPhase: 0,
    })),
}))
