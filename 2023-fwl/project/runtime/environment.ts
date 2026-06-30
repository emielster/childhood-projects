import { MK_BOOL, MK_NATIVE_FN, MK_NULL, MK_NUMBER } from "./values.ts";
import type { RuntimeVal } from "./values.ts";

export function createGlobalEnv() {
    const env = new Environment();
    env.declareVar("true", MK_BOOL(true), true, false);
    env.declareVar("false", MK_BOOL(false), true, false);
    env.declareVar("null", MK_NULL(), true, false);
    env.declareVar("println", MK_NATIVE_FN((args, scope) => {
        // !! PRINT STATEMENT !! IMPORTANT TO ASSIGN NEW FN !!

        for (const arg of args) {
            if (arg.value == undefined) {
                console.log(arg)
                break
            }
            console.log(arg.value); // ignore error, it works perfectly fine
        }
        
        return MK_NULL();
    }), true, false);
    env.declareVar("input", MK_NATIVE_FN((args, scope) => {
        let value;
        let i = 0;
        let value_array = [];
        for (const arg of args) {
            i++;
            if (arg.value == true && i == 2) {
                value = prompt("[?] "+value_array[0]+": ")

                return value;
            }
            value = prompt(arg.value)
            value_array.push(value)
            
        }
        return value;
    }),true, false);

    function timeFunction(_args: RuntimeVal[], _env: Environment) {
        return MK_NUMBER(Date.now());
    }
    env.declareVar("Date.get_current_time", MK_NATIVE_FN(timeFunction), true, false)
    return env;
}
export default class Environment {
    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;
    private constants: Set<string>;
    private whispers: Map<string, RuntimeVal>;
    private downedVars: Map<string, RuntimeVal>;

    constructor (parentENV?: Environment) {
        const global = parentENV ? true : false;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
        this.whispers = new Map();
        this.downedVars = new Map();
    }

    public downVar(varname: string): RuntimeVal {
        const env = this.resolve(varname);
        if (env.whispers.has(varname)) {
            const runval = env.whispers.get(varname)
            env.whispers.delete(varname);
            env.variables.delete(varname);
            env.downedVars.set(varname, runval);
        } else {
            console.error("FWL <error>: The variable you try to down, is not declared with the whisper keyword.\nPlease use\n|1 whis <NAME> = <VALUE>;\n to unlock this keyword.")
            Deno.exit(1)
        }
    }
    public deleteVar(varname: string) {
        const env = this.resolve(varname);
        if (env.variables.has(varname) && !env.whispers.has(varname) && !env.constants.has(varname)) {
            // its probably a 'say' variable
            console.error('FWL <error>: Cannot delete variables declared with "say". Please declare the variable with "whis".')
        }
        if (env.variables.has(varname) && env.constants.has(varname) && !env.whispers.has(varname)) {
            // its probably a 'yell' variable
            console.error('FWL <error>: Cannot delete variables declared with "yell". Please declare the variable with "whis".')
        }
        if (env.variables.has(varname) && env.whispers.has(varname) && !env.constants.has(varname)) {
            env.whispers.delete(varname);
            env.variables.delete(varname);
        }
    }
    public recover(varname: string): RuntimeVal {
        if (this.downedVars.has(varname)) {
            const runval = this.downedVars.get(varname);
            this.variables.delete(varname);
            this.constants.delete(varname);
            this.whispers.delete(varname);
            this.downedVars.delete(varname);
            this.variables.set(varname, runval);
            this.whispers.set(varname, runval)
        } else {
            console.error("FWL <error>: The variable you try to recover, is not already downed. Please down it with:\n|1 down <VAR_NAME>;\nThen, try this again.")
            Deno.exit(1);
        }
    }

    public dropVar(varname: string, tovar: string) {
        // whis
        if (this.variables.has(varname) && !this.constants.has(varname) && this.whispers.has(varname)) {
            if (tovar == "say") {
                this.whispers.delete(varname);
            }
            if (tovar == "yell") {
                this.whispers.delete(varname);
                this.constants.add(varname);
            }
        }
        // say
        if (this.variables.has(varname) && !this.constants.has(varname) && !this.whispers.has(varname)) {
            if (tovar == "yell") {
                this.constants.add(varname);
            }
            if (tovar == "whis") {
                this.whispers.set(varname, this.variables.get(varname));
            }
        }
        // yell
        if (this.variables.has(varname) && this.constants.has(varname) && !this.whispers.has(varname)) {
            if (tovar == "say") {
                this.constants.delete(varname);
            }
            if (tovar == "whis") {
                this.constants.delete(varname);
                this.whispers.set(varname, this.variables.get(varname));
            }   
        }
    }
    public declareVar(varname: string, value: RuntimeVal, constant: boolean, whis: boolean): RuntimeVal {
        if (this.variables.has(varname)) {
            throw `FWL <error>: Cannot declare variable ${varname}, because it's already defined. ERR: <FWL.DEFINED_VARIABLE_ERR>`
        }

        this.variables.set(varname, value);
        if (constant) {
            this.constants.add(varname);
        }
        if (whis == true) {
            this.whispers.set(varname, value);
        }
        return value;
    }
    public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
        const env = this.resolve(varname);
        if (env.constants.has(varname)) {
            throw `Cannot reasign to variable. ${varname}, because it's a constant variable. <FWL.YELL_VARIABLE_ERR>`
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
        if (this.downedVars.get(varname) != undefined) {
            console.error(`FWL <error>: ${varname} is undefined. Please define it or recover it before using.`)
            Deno.exit(1)
        }
        if (this.parent == undefined) {
            throw `FWL <error>: Cannot resolve '${varname}', as it doesnt exist. ERR: <FWL.RESOLVE_VARIABLE_ERR> `
        }
        return this.parent.resolve(varname);
    }
} 