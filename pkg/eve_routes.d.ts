/* tslint:disable */
/* eslint-disable */
/**
*/
export function init(): void;
/**
* @param {number} start
* @param {number} destination
* @param {any} additions
* @returns {Promise<Uint32Array>}
*/
export function calc_short_route(start: number, destination: number, additions: any): Promise<Uint32Array>;
/**
* @param {number} start
* @param {Uint32Array} destinations
* @param {string} route_type
* @param {any} additions
* @param {Uint32Array | undefined} avoid
* @returns {Promise<any>}
*/
export function calc_weighted_routes(start: number, destinations: Uint32Array, route_type: string, additions: any, avoid?: Uint32Array): Promise<any>;
/**
*/
export enum RouteType {
  Safest = 0,
  Shortest = 1,
  LessSafe = 2,
}
/**
*/
export class Connection {
  free(): void;
/**
* @param {number} source
* @param {number} target
*/
  constructor(source: number, target: number);
}
/**
*/
export class NodeMap {
  free(): void;
}
