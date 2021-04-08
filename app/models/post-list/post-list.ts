import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostListModel = types
  .model("PostList")
  .props({
    posts: types.optional(types.frozen(), null),
    pageNo: 0,
    isLoading: false,
    postDetail: types.optional(types.frozen(), {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getPosts: flow(function* getPosts() {
      try {
        self.isLoading = true
        const response = yield api.getPost(self.pageNo)
        
        if (response.kind === "ok") {
          self.posts = response.post.hits
          self.isLoading = false
        }
      } catch (error) {
        self.isLoading = false
        console.log("error==>", error)
      }
    }),
    getLoadMorePost: flow(function* getLoadMorePost() {
      try {
        self.isLoading = true
        self.pageNo = self.pageNo + 1
        const response = yield api.getPost(self.pageNo)
         console.log("response==>", self.pageNo)
        const postList = [...self.posts, ...response.post.hits]

        self.posts = postList
        self.isLoading = false
      } catch (error) {
        // self.isLoading = false
      }
    }),
    updatePostDetail(value) {
      self.postDetail=value
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PostListType = Instance<typeof PostListModel>
export interface PostList extends PostListType {}
type PostListSnapshotType = SnapshotOut<typeof PostListModel>
export interface PostListSnapshot extends PostListSnapshotType {}
