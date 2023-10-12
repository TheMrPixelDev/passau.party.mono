/**
 * Please write a migration if you modify these types since they represent entities in the database.
 */

export type EventDTO = {
  title: string;
  description: string;
  summary: string;
  rating: number;
  datetime: number;
  location: string;
};

export type EventDAO = {
  id: string;
  safe: boolean;
} & EventDTO;

export type Message = {
  text: string;
  type: "ERROR" | "INFO" | "WARNING" | "SUCCESS";
};

export type CustomResponse = {
  messages: Message[];
};

export enum ResponseTypes {
  INVALID_BODY_TYPE = "INVALID_BODY_TYPE",
  INVALID_VALUE = "INVALID_VALUE",
  BACKEND_ERROR = "BACKEND_ERROR",
  DATA_MANIPULATION_SUCCESS = "DATA_MANIPULATION_SUCCESS",
  DATA_WRITE_SUCCESS = "DATA_WRITE_SUCCESS",
  DATA_MANIPULATION_ERROR = "DATA_MANIPULATION_ERROR",
  DATA_WRITE_ERROR = "DATA_WRITE_ERROR",
  AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
}
