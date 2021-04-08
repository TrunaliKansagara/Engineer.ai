import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const ListStoreModel = types.model("ListStore").props({
    
    name: types.maybeNull(types.string),
    sname: types.maybeNull(types.string),
    

}).actions(self => ({
   
    
    addToLocalStore(value: any) {
      self.name=value
        }
  }))

/**
 * The RootStore instance.
 */
export interface ListStore extends Instance<typeof ListStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface ListStoreSnapshot extends SnapshotOut<typeof ListStoreModel> {}
