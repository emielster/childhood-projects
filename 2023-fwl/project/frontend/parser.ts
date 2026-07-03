import type { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, VarChanging, AssignmentExpr, DeleteVar, Property, ObjectLiteral, VarDrop, CallExpr, MemberExpr, FunctionDeclaration, StringLiteral } from "./ast.ts";
import { tokenize, TokenType } from "./lexer.ts";
import type {Token} from "./lexer.ts"
// RETURN STATEMENT TODO SEE COMMENT IN FUNCTION DECLARATION
export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0]?.type !== TokenType.EOF;
    }
    private at() {
        return this.tokens[0] as Token;
    }
    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }
    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type ) {
            console.error("FWL <error>:\n",err,prev,"\n - Expecting: ",type,"\nERR: <FWL.MISSING_ERR>")
            Deno.exit(1)
        }
        return prev;
    }
    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: []
        }

        while (this.not_eof()) {
            program.body.push(this.parse_stmt())
        }


        return program;
    }

    private parse_whis_variables(type: string): Stmt {
        this.eat()
        const variableName = this.expect(TokenType.Identifier, `Expected an identifier for using ${type}, please add it.`).value;
        this.expect(TokenType.Semicolon, "Expected a semicolon. I know, it's annoying but i'll try to remove it when i make FWL2.")
        return { kind: "VarChanging", varName: variableName, type } as VarChanging;
    }
    private parse_stmt(): Stmt {
        switch (this.at().type) {
            case TokenType.Drop:
                return this.parse_drop_var();
            case TokenType.Delete:
                return this.parse_delete_variable();
            case TokenType.Down:
                return this.parse_whis_variables("down");
            case TokenType.Recover:
                return this.parse_whis_variables("recover");
            case TokenType.Whisper:
                return this.parse_whis_declaration();
            case TokenType.Say:
            case TokenType.Yell:
                return this.parse_var_declaration();
            case TokenType.Task:
                return this.parse_task_declaration();
            default:
                // EDIT EMIELSTERDEV 2026:
                // 
                const expr = this.parse_expr();

                this.expect(TokenType.Semicolon, "Expected a semicolon. I know, it's annoying but i'll try to remove it when i make FWL2.")

                return expr;
            }
    }
    private parse_task_declaration(): Stmt {
        this.eat(); // eats this: -> task <- keyword
        const name = this.expect(TokenType.Identifier, "Expected function name following the 'task' keyword.").value;
        const args = this.parse_args();
        const params: string[] = [];
        for (const arg of args) {
            if (arg.kind !== "Identifier") {
                console.log(arg)
                throw `FWL <error>: Expected inside function declaration to be an identifier. <FWL.TYPE_ERR> `
            }
            params.push((arg as Identifier).symbol);
        } 
        this.expect(TokenType.OpenBrace, "Expected function body following declaration.");

        const body: Stmt[] = [];
        // ADD RETURN STATEMENT HERE
        while (this.at().type != TokenType.EOF && this.at().type != TokenType.CloseBrace) {
            body.push(this.parse_stmt());
        }
    
        this.expect(TokenType.CloseBrace, "Expected closing brace '}' in function declaration.");
        const task = {
            body, name, parameters: params, kind: "FunctionDeclaration"
        } as FunctionDeclaration;

        if (this.at().type == TokenType.Semicolon) {
            this.eat();
        }

        return task;
    }
    private expect_var(err: string) {
        const prev = this.tokens.shift() as Token;
        if (prev.type != TokenType.Say && prev.type != TokenType.Whisper && prev.type != TokenType.Yell) {
            throw `Error: ${err}`
        } 
        return prev;
    }
    private parse_drop_var(): Stmt {
        this.eat();
        const varname = this.expect(TokenType.Identifier, "Expected an identifier after the drop keyword.").value;
        if (this.eat().value != "to") {
            throw "FWL: <error>: Expected this: 'drop <VARNAME> -->TO<-- <VAR_TYPE>"
        }
        const tovar = this.expect_var("Expected a vartype after the 'drop <VARNAME> to -->..<VAR_TYPE>..<--'").value;
        this.expect(TokenType.Semicolon, "Expected a semicolon after the variable type.");
        return { kind: "VarDrop", varname, tovar } as VarDrop;
    }
    private parse_delete_variable(): Stmt {
        this.eat()
        const identifier = this.expect(TokenType.Identifier, "Expected an identifier after the delete keyword.").value;
        this.expect(TokenType.Semicolon, "Expected a semicolon after the variable name.");
        return { kind: "DeleteVar", varname: identifier } as DeleteVar;
    }
    
    // own thing for whispered variables
    private parse_whis_declaration(): Stmt {
        const isWhis = true;
        this.eat()
        const identifier = this.expect(TokenType.Identifier, "Expected identifier name following the keyword 'say' | 'yell' | 'whis'.\nPlease fix this with adding a name after the keyword.\n|1\n|2  <*KEYWORD*> <NAME> = <VALUE>;\n|3              ^^^^^^\n|4\n|5\n<*KEYWORD*> can be say, whis or yell. Bug? Report it on my GitHub Repository.").value;
        if (this.at().type == TokenType.Semicolon) {
            this.eat()
            return { kind: "VarDeclaration",  identifier, constant: false } as VarDeclaration;
        }
        this.expect(TokenType.Equals, "Expected equals token following identifier. Example:\n|1\n|2\n|3  <*KEYWORD*> <NAME> = <VALUE>\n|4                     ^\nGood luck with fixing!")
        const declaration = { kind: "VarDeclaration", value: this.parse_expr(), identifier, constant: false, whis: isWhis } as VarDeclaration;
        this.expect(TokenType.Semicolon, "Expected a semicolon. I know this is annoying, but if i make a FWL2, i'll see if i can delete the semicolon. And make the errors better and faster. REAL ERR: Expected semicolon (;) after the variable statement.");
        return declaration;
    }
    private parse_var_declaration(): Stmt {
        const isConstant = this.eat().type == TokenType.Yell;
        const identifier = this.expect(TokenType.Identifier, "Expected identifier name following the keyword 'say' | 'yell' | 'whis'.\nPlease fix this with adding a name after the keyword.\n|1\n|2  <*KEYWORD*> <NAME> = <VALUE>;\n|3              ^^^^^^\n|4\n|5\n<*KEYWORD*> can be say, whis or yell. Bug? Report it on my GitHub Repository.").value;
        if (this.at().type == TokenType.Semicolon) {
            this.eat()
            if (isConstant) {
                console.error("FWL <error>:\n Must assign value to a constant expression. Example:\n|1\n|2\n|3  yell <NAME>; -- wrong,\n|4  yell <NAME> = <VALUE>; -- Right\n|5\nGood luck with fixing!")
                Deno.exit(1);
            }
            return { kind: "VarDeclaration",  identifier, constant: false } as VarDeclaration;
        }
        this.expect(TokenType.Equals, "Expected equals token following identifier. Example:\n|1\n|2\n|3  <*KEYWORD*> <NAME> = <VALUE>\n|4                     ^\nGood luck with fixing!")
        const declaration = { kind: "VarDeclaration", value: this.parse_expr(), identifier, constant: isConstant } as VarDeclaration;
        this.expect(TokenType.Semicolon, "Expected a semicolon. I know this is annoying, but if i make a FWL2, i'll see if i can delete the semicolon. And make the errors better and faster. REAL ERR: Expected semicolon (;) after the variable statement.");
        return declaration;
    }

    private parse_expr(): Expr {
        return this.parse_assignment_expr();
    } 
    private parse_assignment_expr(): Expr {
        const left = this.parse_string_expr();
        
        if(this.at().type == TokenType.Equals) {
            this.eat();
            const value = this.parse_assignment_expr();
            return { value, assigne: left, kind: "AssignmentExpr"} as AssignmentExpr;

        }
        return left;
    }
    private parse_string_expr(): Expr {
        if (this.at().type != TokenType.String) {
            return this.parse_object_expr();
        }
        let str = this.eat().value;
        return { kind: "StringLiteral", value: str } as StringLiteral;
    }
    private parse_object_expr(): Expr {
        // { Properties[] }
        if (this.at().type != TokenType.OpenBrace) {
            return this.parse_additive_expr();
        }

        this.eat();
        const properties = new Array<Property>();
        while (this.not_eof() && this.at().type != TokenType.CloseBrace ) {
            const key = this.expect(TokenType.Identifier, "Object literal key expected.").value;
            // shorthand: { key, } or { key }
            if (this.at().type == TokenType.Comma) {
                this.eat();
                properties.push({key, kind: "Property" });
                continue;
            } else if (this.at().type == TokenType.CloseBrace) {
                properties.push({key, kind: "Property"});
                continue;
            }

            this.expect(TokenType.Colon, "Missing colon following identifier in Object Expression.")
            const value = this.parse_expr();

            properties.push({ kind: "Property", value, key})
            if (this.at().type != TokenType.CloseBrace) {
                this.expect(TokenType.Comma, "Expected a comma or a closing brace following Property.");   
            }
        }
        this.expect(TokenType.CloseBrace, "Object literal missing closing  brace.");

        return { kind: "ObjectLiteral", properties } as ObjectLiteral;
    }

    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicitave_expr();

        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicitave_expr();
            left = {
                kind: "BinaryExpr", 
                left,
                right,
                operator
            } as BinaryExpr
        }

        return left;
    }
    private parse_call_member_expr(): Expr {
        const member = this.parse_member_expr();

        if(this.at().type == TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }

        return member; 
    }
    private parse_call_expr(caller: Expr): Expr {
        let call_expr: Expr = {
            kind: "CallExpr",
            caller,
            args: this.parse_args(),
        } as CallExpr;
        if (this.at().type == TokenType.OpenParen) {
            call_expr = this.parse_call_expr(call_expr);
        }
        return call_expr;
    }
    private parse_args(): Expr[] {
        this.expect(TokenType.OpenParen, "Expected open parenthesis. '('");
        const args = 
           this.at().type == TokenType.CloseParen ? [] : this.parse_argument_list();
        this.expect(TokenType.CloseParen, "Missing closing parenthesis inside argument list. ')'. How to fix?:\n<CALL_NAME>(arg: 1, key: 1234, ... ->)<-")
        return args;
    }
    private parse_argument_list(): Expr[] {
        const args = [this.parse_assignment_expr()];
        while (this.at().type == TokenType.Comma && this.eat()) {
            args.push(this.parse_assignment_expr())
        }
        return args;
    }
    private parse_member_expr(): Expr {
        let object = this.parse_primary_expr();

        while (this.at().type == TokenType.Dot || this.at().type == TokenType.OpenBracket) {
            const operator = this.eat();
            let property: Expr;
            let computed: boolean;

            if (operator.type == TokenType.Dot) {
                computed = false;
                property = this.parse_primary_expr();

                if (property.kind != "Identifier") {
                    throw `Cannot use dot operator without RHS (Right Hand Side => LHS(Left Hand Side) ... ->RHS<-) being an identifier.`;
                }
            } else {
                computed = true;
                property = this.parse_expr();
                this.expect(TokenType.CloseBracket, "Missing closing bracket in computed value.")
            }
            object = { kind: "MemberExpr", object, property, computed} as MemberExpr;
        };

        return object;
    }
    private parse_multiplicitave_expr(): Expr {
        let left = this.parse_call_member_expr();

        while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%") {
            const operator = this.eat().value;
            const right = this.parse_call_member_expr();
            left = {
                kind: "BinaryExpr", 
                left,
                right,
                operator
            } as BinaryExpr
        }

        return left;
    }
    private parse_primary_expr(): Expr {

        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier
            case TokenType.Number:
                return { 
                    kind: "NumericLiteral", 
                    value: parseFloat(this.eat().value)
                } as NumericLiteral;

            case TokenType.OpenParen: {
                this.eat();
                const value = this.parse_expr();
                this.expect(TokenType.CloseParen, "FWL <error>: Unexpected token found inside parenthisised expression. Expected closing parenthisised.\nERR: <FWL.MISSING_ERR>");
                return value;
            }
            default:
                console.error("FWL <error>: Unexpected token found during parsing. (Parsing is a state of compiling the language): ", this.at(),"\nERR: <FWL.BUG>");
                Deno.exit(1);
        }

    }
}