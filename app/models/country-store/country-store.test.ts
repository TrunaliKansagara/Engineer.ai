import { CountryStoreModel, CountryStore } from "./country-store"

test("can be created", () => {
  const instance: CountryStore = CountryStoreModel.create({})

  expect(instance).toBeTruthy()
})