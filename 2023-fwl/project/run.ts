import Parser from "./frontend/parser.ts";
import type { Environment} from "./runtime/environment.ts"
import { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
// run.ts
// TODO:
// 1. Upgrade the lexer, to NOT bleed memory.
// 2. Add support for member expressions. (already made in parser)
// 3. Add an error for this: (9 / 0) => to be NOT Infinity
// 4. Add any other features like, Date.get_time() etc.. 


const args: string[] = Deno.args;

let fileName;
if (args.length > 0) {
    fileName = args[0];
} else {
    throw `Expected a file name to run.`
}
if (fileName.endsWith(".fwl")) {
    try {
        await Deno.readTextFile(fileName)
    } catch (error) {
        throw `The file name has to be valid. Please check the path. (${fileName})`
    }
    run(fileName)
} else {
    throw `The file name given is not a valid .fwl file. Please make sure that the file ends with '.fwl'.`; 
}

async function run(filename: string) {
    const parser = new Parser();
    const env = createGlobalEnv();

    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    const result = evaluate(program, env);
    // console.log(result)
}

