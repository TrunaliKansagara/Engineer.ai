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
export type GetUserResults = { kind: "ok"; user: any } | GeneralApiProblem
export type GetUserPost1 = { kind: "ok"; post: any } | GeneralApiProblem
export type GetAstData = { kind: "ok"; astData: any } | GeneralApiProblem
