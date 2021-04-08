import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetUserPost = { kind: "ok"; post: any } | GeneralApiProblem
export type GetCountryData = { kind: "ok"; country: any } | GeneralApiProblem
export type GetWeatherResult = { kind: "ok"; weather: any } | GeneralApiProblem
