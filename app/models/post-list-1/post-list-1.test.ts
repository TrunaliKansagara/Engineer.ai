import { PostList1Model, PostList1 } from "./post-list-1"

test("can be created", () => {
  const instance: PostList1 = PostList1Model.create({})

  expect(instance).toBeTruthy()
})