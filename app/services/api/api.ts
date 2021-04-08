import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { API_TOKEN } from "../../utils/utils"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
  // api of post list demo
  async getPost(pageNo: number): Promise<Types.GetUserPost> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/search_by_date?tags=story&page=${pageNo}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", post: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  // api  of astId and random id demo

  async getRandomID(): Promise<Types.GetUserPost> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=` + API_TOKEN)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", post: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getID(ID: string): Promise<Types.GetUserPost> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`https://api.nasa.gov/neo/rest/v1/neo/${ID}?api_key=` + API_TOKEN)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", post: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getCountries(countryName: string): Promise<Types.GetCountryData> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      "https://restcountries.eu/rest/v2/name/" + countryName,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", country: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getWeatherDetail(countryName: string): Promise<Types.GetWeatherResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `http://api.weatherstack.com/current?access_key=1527fd41470d4349f468084a4daa1d64&query=${countryName}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", weather: response.data }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
