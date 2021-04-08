import { DrawerActions } from "@react-navigation/native"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RootStoreModel } from "../root-store/root-store"
import { ListStoreModel } from "./list-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const TodoStoreModel = types.model("TodoStore").props({
    userlist:types.array(ListStoreModel),
    

}).actions(self => ({
    add(todo:any) {
      // var abc=objects.key(LocalStoreModel)
      self.userlist.push(todo);
    },
    remove(name: string) {
      // console.warn(todo)
      // var data=JSON.parse(JSON.stringify(self.userlist))
      // data.splice(todo,1)
      // self.userlist
    self.userlist =  self.userlist.filter(item => item.name !== name)
    // self.userlist =  self.userlist.filter(item => item.name !== id)



      // self.userlist.filter(item => item.name !== todo)


        
      
    }
  }))

/**
 * The RootStore instance.
 */
export interface TodoStore extends Instance<typeof TodoStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface TodoStoreSnapshot extends SnapshotOut<typeof TodoStoreModel> {}
