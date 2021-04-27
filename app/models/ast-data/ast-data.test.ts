import { AstDataModel, AstData } from "./ast-data"

test("can be created", () => {
  const instance: AstData = AstDataModel.create({})

  expect(instance).toBeTruthy()
})