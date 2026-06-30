import type { DeleteVar, FunctionDeclaration, Program, VarChanging, VarDeclaration, VarDrop } from "../../frontend/ast.ts";
import type Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import type { RuntimeVal, FunctionValue } from "../values.ts";
import { MK_NULL } from "../values.ts";
export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }

    return lastEvaluated;
}

export function eval_var_declaration(
    declaration: VarDeclaration,
    env: Environment
): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    if (declaration.whis == undefined) {
        declaration.whis = false;
    }
    return env.declareVar(declaration.identifier, value, declaration.constant, declaration.whis);
}
export function eval_function_declaration(
    declaration: FunctionDeclaration,
    env: Environment
): RuntimeVal {
    const fn = {
        type: "function",
        name: declaration.name,
        parameters: declaration.parameters,
        declarationEnv: env,
        body: declaration.body,
    } as FunctionValue;

    return env.declareVar(declaration.name, fn, true, false);

}
export function eval_var_changing(astNode: VarChanging, env: Environment): RuntimeVal {
    if (astNode.type == "down") {
        env.downVar(astNode.varName);
    }
    if (astNode.type == "recover") {
        env.recover(astNode.varName);
    }
}
export function eval_delete_var(astNode: DeleteVar, env: Environment): RuntimeVal {
    env.deleteVar(astNode.varname);
}

export function eval_var_drop(astNode: VarDrop, env: Environment): RuntimeVal {
    const varname = astNode.varname;
    const tovar = astNode.tovar;

    env.dropVar(varname, tovar);
}