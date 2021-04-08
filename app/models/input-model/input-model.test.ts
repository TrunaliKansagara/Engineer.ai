import { InputModelModel, InputModel } from "./input-model"

test("can be created", () => {
  const instance: InputModel = InputModelModel.create({})

  expect(instance).toBeTruthy()
})