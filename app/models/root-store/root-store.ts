import { CountryStoreModel } from "../country-store/country-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { InputModelModel } from "../input-model/input-model"
import { PostListModel } from "../post-list/post-list"
import { TodoStoreModel } from "../todo-store/todo-store"
import { UserListModel } from "../user-list/user-list"
import { TraficSignalScreen } from "../../screens"
import { SignalModelModel } from "../signal-model/signal-model"
import { PostList1Model } from "../post-list-1/post-list-1"
import { AstDataModel } from "../ast-data/ast-data"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  countryStore: types.optional(CountryStoreModel, {}),
    todoStore: types.optional(TodoStoreModel, {}),
    postListStore: types.optional(PostListModel, {}),
    inputStore: types.optional(InputModelModel, {}),
  userStore: types.optional(UserListModel, {}),
  signalStore: types.optional(SignalModelModel, {}),
  postList1Store: types.optional(PostList1Model, {}),
        astDataStore:types.optional(AstDataModel,{})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
