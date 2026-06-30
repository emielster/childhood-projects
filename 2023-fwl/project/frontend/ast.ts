// FWL: AST Definition
// deno-lint-ignore-file no-empty-interface
export type NodeType = 
 // STATEMENTS
 | "Program" 
 | "VarDrop"
 | "VarDeclaration"
 | "FunctionDeclaration"
 | "VarChanging"
 | "DeleteVar"
 // EXPRESSIONS
 | "AssignmentExpr"
 | "MemberExpr"
 | "CallExpr"
 // LITERALS
 | "StringLiteral"
 | "Property"
 | "ObjectLiteral"
 | "NumericLiteral"
 | "Identifier"
 | "BinaryExpr"

// Statement
export interface Stmt {
    kind: NodeType;
}
export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}
export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    constant: boolean,
    whis?: boolean,
    identifier: string,
    value?: Expr,
}
export interface FunctionDeclaration extends Stmt {
    kind: "FunctionDeclaration";
    parameters: string[];
    name: string;
    body: Stmt[];
}
export interface VarDrop extends Stmt {
    kind: "VarDrop";
    varname: string,
    tovar: string,
    // drop varname to whis;
}
export interface VarChanging extends Stmt {
    kind: "VarChanging",
    varName: string,
    type: string,
}
export interface DeleteVar extends Stmt {
    kind: "DeleteVar",
    varname: string,
}
export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
    kind: "AssignmentExpr";
    assigne: Expr;
    value: Expr;
}

export interface CallExpr extends Expr {
    kind: "CallExpr";
    args: Expr[];
    caller: Expr;
}

export interface MemberExpr extends Expr {
    kind: "MemberExpr";
    object: Expr;
    property: Expr; // FIX EMIELSTERDEV 2026
    computed: boolean;
}


export interface Identifier extends Expr {
    kind: "Identifier";
    symbol : string;
}
export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface Property extends Expr {
    kind: "Property";
    key: string,
    value?: Expr, // can be undefined, something like this: { key: the_key, --> key2 <--} => therefor, value?:
}


export interface ObjectLiteral extends Expr {
    kind: "ObjectLiteral";
    properties: Property[];
}
export interface StringLiteral extends Expr {
    kind: "StringLiteral";
    value: string,
}

// RESTORED EXPRESSIONS EMIELSTERDEV 2026

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}

