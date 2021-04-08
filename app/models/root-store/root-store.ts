import { CountryStoreModel } from "../country-store/country-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { InputModelModel } from "../input-model/input-model"
import { PostListModel } from "../post-list/post-list"
import { TodoStoreModel } from "../todo-store/todo-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  countryStore: types.optional(CountryStoreModel, {}),
    todoStore: types.optional(TodoStoreModel, {}),
    postListStore: types.optional(PostListModel, {}),
    inputStore: types.optional(InputModelModel, {}),
    
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
