import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { randomIntFromInterval } from "../../utils/utils"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const InputModelModel = types
  .model("InputModel")
  .props({
    id: types.maybeNull(types.string),
    astData: types.optional(types.frozen(), []),
    randomData: types.optional(types.frozen(), []),
    isSubmit: types.optional(types.boolean, false),
    isRandomID: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchRandomID: flow(function* fetchRandomID() {
      try {
        self.isRandomID = true
        const response = yield api.getRandomID()

        if (response.kind === "ok") {
          const randomId =
            response.post.near_earth_objects[
              randomIntFromInterval(0, response.post.near_earth_objects.length - 1)
            ].id
          self.id = randomId
          self.isRandomID = false
        } else {
          self.isRandomID = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isSubmit = true
        const response = yield api.getID(self.id)
        if (response.kind === "ok") {
          self.astData = response.post
          self.isSubmit = false
        } else {
          self.astData = null
          self.isSubmit = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
    updateID(value) {
      self.id = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type InputModelType = Instance<typeof InputModelModel>
export interface InputModel extends InputModelType {}
type InputModelSnapshotType = SnapshotOut<typeof InputModelModel>
export interface InputModelSnapshot extends InputModelSnapshotType {}
