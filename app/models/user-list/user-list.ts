import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const UserListModel = types
  .model("UserList")
  .props({
    isLoading: types.optional(types.boolean, false),
    userData: types.optional(types.frozen(), []),
    limit: types.optional(types.number, 0),
    isLoadMore: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchUserList: flow(function* fetchUserList() {
      try {
        self.isLoading = true
        const data = yield api.getUserList(self.limit)
        console.log("data===>", data)
        if (data.kind === "ok") {
          self.userData = data.user.data.users
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {
        console.log("error==>", error)
      }
    }),
    fetchMoreUserList: flow(function* fetchMoreUserList() {
      try {
        self.isLoadMore = true
        self.limit = self.limit + 10
        const data = yield api.getUserList(self.limit)
        console.log("data===>", data)
        if (data.kind === "ok") {
          const response = data.user.data.users
          const responseList = [...self.userData, ...response]
          self.userData = responseList
          self.isLoadMore = false
        } else {
          self.isLoadMore = false
        }
      } catch (error) {}
    }),
    updateLimit(value) {
      self.limit = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserListType = Instance<typeof UserListModel>
export interface UserList extends UserListType {}
type UserListSnapshotType = SnapshotOut<typeof UserListModel>
export interface UserListSnapshot extends UserListSnapshotType {}
