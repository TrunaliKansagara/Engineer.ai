import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SignalModelModel = types
  .model("SignalModel")
  .props({
    signal: types.optional(types.number, 10),
    value: types.optional(types.number, 10),
    currentSignal: types.optional(types.string, "A"),
    ambTime: types.optional(types.number, 10),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    updateSignal() {
      if (self.signal - 1 <= 0) {
        self.signal = self.value
        this.changeSignal()
      } else {
        self.signal = self.signal - 1
      }
    },
    changeSignal() {
      if (self.currentSignal === "A") {
        self.currentSignal = "B"
      } else if (self.currentSignal === "B") {
        self.currentSignal = "C"
      } else if (self.currentSignal === "C") {
        self.currentSignal = "D"
      } else if (self.currentSignal === "D") {
        self.currentSignal = "A"
      }
    },
    updateSignalValue(value) {
      self.signal = value
    },
    updateCurrentSignal(value) {
      self.signal = self.ambTime
      self.currentSignal = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type SignalModelType = Instance<typeof SignalModelModel>
export interface SignalModel extends SignalModelType {}
type SignalModelSnapshotType = SnapshotOut<typeof SignalModelModel>
export interface SignalModelSnapshot extends SignalModelSnapshotType {}
