
// The FWL language: The Lexer
export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen,
    OpenBracket,
    CloseBracket,
    CloseParen,
    OpenBrace,
    CloseBrace,
    String,
    BinaryOperator,
    Say,
    Comma,
    Task,
    Colon,
    Dot,
    Delete,
    Down,
    Recover,
    Whisper,
    Yell,
    Semicolon,
    Drop,
    EOF, // EOF = End Of File
}

const KEYWORDS: Record<string, TokenType> = {
    say: TokenType.Say,
    whis: TokenType.Whisper,
    yell: TokenType.Yell,
    down: TokenType.Down,
    rec: TokenType.Recover,
    del: TokenType.Delete,
    drop: TokenType.Drop,
    task: TokenType.Task,
}

export interface Token {
    value: string,
    type: TokenType,

}

function isalpha(src: string) {
    return src.toUpperCase() != src.toLowerCase()
}

function isskippable(str: string) {
    return str == ' ' || str == '\n' || str == '\t' || str == '\r'
}

function isint(str: string) {
    const c = str.charCodeAt(0);
    const bounds: [number, number] = [
    '0'.charCodeAt(0),
    '9'.charCodeAt(0)
];
    return (c >= bounds[0] && c <= bounds[1]);
}
function token(value = "", type: TokenType): Token {
    return { value, type }
}

export function tokenize (src: string): Token[] {

    const tokens = new Array<Token>()

    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.charAt(0), TokenType.OpenParen));
            src = src.substring(1);
        } else if (src[0] == ')') {
            tokens.push(token(src.charAt(0), TokenType.CloseParen));
            src = src.substring(1);
        } else if (src[0] == '{') {
            tokens.push(token(src.charAt(0), TokenType.OpenBrace));
            src = src.substring(1);
        } else if (src[0] == '}') {
            tokens.push(token(src.charAt(0), TokenType.CloseBrace));
            src = src.substring(1);
        } else if (src[0] == '[') {
            tokens.push(token(src.charAt(0), TokenType.OpenBracket));
            src = src.substring(1);
        } else if (src[0] == ']') {
            tokens.push(token(src.charAt(0), TokenType.CloseBracket));
            src = src.substring(1);
        } else if (src[0] == '/') {
            const currentc = src.charAt(0);
            src = src.substring(1);
            const nextc = src.charAt(0);
            src = src.substring(1);
            if (nextc == "/") {
                // its the '//' comment
                while(src[0] != "\n") {
                    if (src[0] == undefined) {
                        tokens.push({type: TokenType.EOF, value: "EndOfFile"}); // if no new line is given on the eof.(end of file)
                        break
                    }
                    src.charAt(0);
                    src = src.substring(1);
                }
            } else if (nextc == "$") {
                // its the '/$ $/' comment
                src.charAt(0);
                src = src.substring(1);
                while (src.charAt(0) != "$") {
                    src = src.substring(1);
                }
                src = src.substring(1);
                if (src.charAt(0) != "/") {
                    throw "Expected a slash for the comment. Like this: /$   ...    $->/<-"
                }
                src = src.substring(1);
            } else {
                // its the '/' operator
                tokens.push(token(currentc, TokenType.BinaryOperator))
            }
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "%") {
            tokens.push(token(src.charAt(0), TokenType.BinaryOperator))
            src = src.substring(1);
        } else if (src[0] == '=') {
            tokens.push(token(src.charAt(0), TokenType.Equals))
            src = src.substring(1);
        }  else if (src[0] == ';') {
            tokens.push(token(src.charAt(0), TokenType.Semicolon))
            src = src.substring(1);
        } else if (src[0] == ':') {
            tokens.push(token(src.charAt(0), TokenType.Colon))
            src = src.substring(1);
        } else if (src[0] == ',') {
            tokens.push(token(src.charAt(0), TokenType.Comma))
            src = src.substring(1);
        } else if (src[0] == '.') {
            tokens.push(token(src.charAt(0), TokenType.Dot))
            src = src.substring(1);
        }else if (src[0] == '"'){
            src.charAt(0)
            src = src.substring(1);
            if (src.includes('"')) {
                let str = "";
                while (src[0] != '"') {
                    str += src.charAt(0)
                    src = src.substring(1);
                };
                src.charAt(0);
                src = src.substring(1);
                tokens.push(token(str, TokenType.String));
            } else {
                throw `Missing '"', to close the string. WARNING: This error might be stupid, or wrong, just report the bug on GitHub.`
            }

        }else if (src[0] == "'") {
            src.charAt(0);
            src = src.substring(1);
            if (src.includes("'")) {
                let str = "";
                while (src[0] != "'") {
                    str += src.charAt(0);
                    src = src.substring(1);
                };
                src.charAt(0);
                src = src.substring(1);
                tokens.push(token(str, TokenType.String));
            }
            else {
                throw `Missing "'", to close the string. WARNING: This error might be stupid, or wrong, just report the bug on GitHub.`
            }
        }
        else {


            if (isint(src[0]!)) {
                // BUG FOUND IN THIS CODE: BEGIN
                let num = "";
                while (src.length > 0 && isint(src[0]!)) {
                    num += src.charAt(0);
                    src = src.substring(1);
                }
                tokens.push(token(num, TokenType.Number));
                // END
            } else if (isalpha(src[0]!)){
                let ident = ""; 
                // ADDS SUPPORT FOR THIS: say test5 = 10;
                while (src.length > 0 && isalpha(src[0]!) || isint(src[0]!) || src[0] == '_') {
                    ident += src.charAt(0);
                    src = src.substring(1);
                    if (src.length == 0) {
                        break
                    }
                }
                const reserved = KEYWORDS[ident];
                if (typeof reserved == "number") {
                    tokens.push(token(ident, reserved));
                } else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            } else if (isskippable(src[0]!)) {
                src.charAt(0);
                src = src.substring(1);
            } else {
                console.log("FWL <error>: Unreconized character found in source: ", src[0],"\n ERR: <FWL.BUG>");
                Deno.exit(1);
            }
        }
    }
    tokens.push({type: TokenType.EOF, value: "EndOfFile"});
    return tokens;
}