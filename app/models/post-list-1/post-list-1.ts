import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostList1Model = types
  .model("PostList1")
  .props({
    postListData: types.optional(types.frozen(), []),
    isLoading: types.optional(types.boolean, false),
    pageNo: types.optional(types.number, 0),
    isLoadMore: types.optional(types.boolean, false),
    postListDetail: types.optional(types.frozen(), {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchPostListData: flow(function* fetchPostListData() {
      try {
        self.isLoading = true
        const data = yield api.getPostListData(self.pageNo)

        if (data.kind === "ok") {
          const response = data.post.hits
          self.postListData = response
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
    fetchMoreData: flow(function* fetchMoreData() {
      try {
        self.pageNo = self.pageNo + 1
        self.isLoadMore = true
        const data = yield api.getPostListData(self.pageNo)

        if (data.kind === "ok") {
          console.log("self.pa", self.pageNo)
          const response = data.post.hits
          const responseData = [...self.postListData, ...response]
          self.postListData = responseData
          self.isLoadMore = false
        } else {
          self.isLoadMore = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
    updatePostListDetail(item: object) {
      self.postListDetail = item
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PostList1Type = Instance<typeof PostList1Model>
export interface PostList1 extends PostList1Type {}
type PostList1SnapshotType = SnapshotOut<typeof PostList1Model>
export interface PostList1Snapshot extends PostList1SnapshotType {}
