import {
	MK_BOOL,
	MK_NATIVE_FN,
	MK_NULL,
	MK_NUMBER,
	RuntimeVal,
} from "./values.ts";

import { appendOutput } from "../sharedOutput.ts";

export function createGlobalEnv() {
	const env = new Environment();
	env.declareVar("true", MK_BOOL(true), true);
	env.declareVar("false", MK_BOOL(false), true);
	env.declareVar("null", MK_NULL(), true);

	env.declareVar(
		"print",
		MK_NATIVE_FN((args, scope) => {
      //console.log(...args);
			const message = args.map(arg => JSON.stringify(arg)).join(" ");
      //console.log(message + 1);
      appendOutput(message);
			return MK_NULL();
		}),
		true
	);

	function timeFunction(_args: RuntimeVal[], _env: Environment) {
		return MK_NUMBER(Date.now());
	}
	env.declareVar("time", MK_NATIVE_FN(timeFunction), true);

	return env;
}

export default class Environment {
	private parent?: Environment;
	private variables: Map<string, RuntimeVal>;
	private constants: Set<string>;

	constructor(parentENV?: Environment) {
		this.parent = parentENV;
		this.variables = new Map();
		this.constants = new Set();
	}

	public declareVar(
		varname: string,
		value: RuntimeVal,
		constant: boolean
	): RuntimeVal {
		if (this.variables.has(varname)) {
			throw `Cannot declare variable ${varname}. As it already is defined.`;
		}

		this.variables.set(varname, value);
		if (constant) {
			this.constants.add(varname);
		}
    //console.log(value);
    //console.log(99);
		return value;
	}

	public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
		const env = this.resolve(varname);

		if (env.constants.has(varname)) {
			throw new Error(`Cannot reasign to variable ${varname} as it was declared constant.`);
		}

		env.variables.set(varname, value);
		return value;
	}

	public lookupVar(varname: string): RuntimeVal {
		const env = this.resolve(varname);
		return env.variables.get(varname) as RuntimeVal;
	}

	public resolve(varname: string): Environment {
		if (this.variables.has(varname)) {
			return this;
		}

		if (this.parent == undefined) {
			throw new Error(`Cannot resolve '${varname}' as it does not exist.`);
		}

		return this.parent.resolve(varname);
	}
}