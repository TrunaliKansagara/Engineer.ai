import { SignalModelModel, SignalModel } from "./signal-model"

test("can be created", () => {
  const instance: SignalModel = SignalModelModel.create({})

  expect(instance).toBeTruthy()
})