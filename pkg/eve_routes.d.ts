/* tslint:disable */
/* eslint-disable */
export function init(): void;
export function calc_short_route(start: number, destination: number, additions: any): Promise<Uint32Array>;
export function calc_weighted_routes(start: number, destinations: Uint32Array, route_type: string, additions: any, avoid?: Uint32Array | null): Promise<any>;
export enum RouteType {
  Safest = 0,
  Shortest = 1,
  LessSafe = 2,
}
export class Connection {
  free(): void;
  constructor(source: number, target: number);
}
export class NodeMap {
  private constructor();
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_nodemap_free: (a: number, b: number) => void;
  readonly init: () => void;
  readonly calc_short_route: (a: number, b: number, c: any) => any;
  readonly calc_weighted_routes: (a: number, b: number, c: number, d: number, e: number, f: any, g: number, h: number) => any;
  readonly __wbg_connection_free: (a: number, b: number) => void;
  readonly connection_new: (a: number, b: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly closure46_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure60_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
