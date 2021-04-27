import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"
import { randomId } from "../../utils/utils"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const AstDataModel = types
  .model("AstData")
  .props({
    astId: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    astData: types.optional(types.frozen(), []),
    isRandomId: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    updateAstId(value: string) {
      self.astId = value
    },
    fetchAstData: flow(function* fetchAstData() {
      try {
        self.isLoading = true
        const data = yield api.getAstData(self.astId)
        console.log("datatta", data)
        if (data.kind === "ok") {
          const response = data.astData
          self.astData = response
          self.isLoading = false
        } else {
          self.astData=null
          self.isLoading = false
        }
      } catch (error) {}
    }),
    fetchRandomId: flow(function* fetchRandomId() {
      try {
        self.isRandomId = true
        const data = yield api.getRandomId()
        if (data.kind === "ok") {
          const response = data.astData
          self.astId =
            response.near_earth_objects[randomId( response.near_earth_objects)].id
          self.isRandomId = false
        } else {
          self.isRandomId = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AstDataType = Instance<typeof AstDataModel>
export interface AstData extends AstDataType {}
type AstDataSnapshotType = SnapshotOut<typeof AstDataModel>
export interface AstDataSnapshot extends AstDataSnapshotType {}
