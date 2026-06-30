import type { RuntimeVal, NumberVal} from "./values.ts";
import type { NodeType, Stmt, NumericLiteral, BinaryExpr, Program, VarChanging, AssignmentExpr, VarDrop, ObjectLiteral, CallExpr, StringLiteral, FunctionDeclaration, DeleteVar, MemberExpr } from "../frontend/ast.ts"; 
import type Environment from "./environment.ts";
import type { Identifier } from "../frontend/ast.ts";
import type { VarDeclaration } from "../frontend/ast.ts";
import { eval_delete_var, eval_function_declaration, eval_program, eval_var_changing, eval_var_declaration, eval_var_drop } from "./eval/statements.ts";
import { eval_identifier, eval_binary_expr, eval_assignment, eval_obj_expr, eval_str_expr, eval_call_expr, eval_mem_expr } from "./eval/expressions.ts";

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch (astNode.kind) {
        case "VarChanging":
            return eval_var_changing(astNode as VarChanging, env);
        case "NumericLiteral": 
            return {value: ((astNode as NumericLiteral).value), type: "number"} as NumberVal;
        case "DeleteVar":
            return eval_delete_var(astNode as DeleteVar, env);
        case "Identifier":
            return eval_identifier(astNode as Identifier, env);
        case "ObjectLiteral":
            return eval_obj_expr(astNode as ObjectLiteral, env);
        case "StringLiteral":
            return eval_str_expr(astNode as StringLiteral, env);
        case "AssignmentExpr":
            return eval_assignment(astNode as AssignmentExpr, env);
        case "VarDrop":
            return eval_var_drop(astNode as VarDrop, env);
        case "MemberExpr":
            return eval_mem_expr(astNode as MemberExpr, env);
        case "BinaryExpr":
            return eval_binary_expr(astNode as BinaryExpr, env);
        case "Program":
            return eval_program(astNode as Program, env);
        case "VarDeclaration":
            return eval_var_declaration(astNode as VarDeclaration, env);
        case "FunctionDeclaration":
            return eval_function_declaration(astNode as FunctionDeclaration, env);
        case "CallExpr":
            return eval_call_expr(astNode as CallExpr, env);
       
        default:
            console.error("FWL: <error>\nThis AST Node has not yet been setup for interpretation.\nPlease report this bug on GitHub.\nAst Node:\n",astNode,"\nERR: <FWL.BUG>")
            Deno.exit(1)
    }
}