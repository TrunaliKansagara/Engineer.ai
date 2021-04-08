import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const CountryStoreModel = types
  .model("CountryStore")
  .props({
    countryData: types.optional(types.frozen(), []),
    isLoading: types.maybeNull(types.boolean),
    countryName: types.maybeNull(types.string),
    weatherData: types.optional(types.frozen(), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getCountryDetail: flow(function* getCountryDetail() {
      try {
        self.isLoading = true
        const response = yield api.getCountries(self.countryName)
        console.log("response", response)
        if (response.kind === "ok") {
          const data = response.country
          for (let i = 0; i <= data.length; i++) {
            if (data[i].name === self.countryName) {
              self.countryData = data[i]
            } else {
              self.countryData = data[0]
            }
          }

          self.isLoading = false
        } else {
          self.isLoading = false
          self.countryData = null
        }
      } catch (error) {
        console.log(error)
        self.isLoading = false
      }
    }),
    getWeatherDetail: flow(function* getWeatherDetail(capitalName) {
      try {
        self.isLoading = true
        const response = yield api.getWeatherDetail(capitalName)
        console.log("response==>", response)
        if (response.kind === "ok") {
          self.weatherData = response.weather
          self.isLoading = false
        } else {
          self.weatherData = null
          self.isLoading = false
        }
      } catch (error) {
        console.log("error", error)
      }
    }),
    updateCountry(value: string) {
      self.countryName = value
    },
    clearWeatherDetail() {
      self.weatherData = null
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CountryStoreType = Instance<typeof CountryStoreModel>
export interface CountryStore extends CountryStoreType {}
type CountryStoreSnapshotType = SnapshotOut<typeof CountryStoreModel>
export interface CountryStoreSnapshot extends CountryStoreSnapshotType {}
