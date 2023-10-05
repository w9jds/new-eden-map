import * as wasm from "./eve_routes_bg.wasm";
import { __wbg_set_wasm } from "./eve_routes_bg.js";
__wbg_set_wasm(wasm);
export * from "./eve_routes_bg.js";

wasm.__wbindgen_start();
