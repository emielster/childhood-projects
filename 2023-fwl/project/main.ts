import Parser from "./frontend/parser.ts";
import Environment, { createGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_NULL, MK_BOOL, MK_NUMBER } from "./runtime/values.ts";
repl()

function repl() {
    const parser = new Parser();
    const env = createGlobalEnv();
    console.log("\nFWL: Flexible Water Language 💦\n Happy coding! (type h or help for help.)")
    while (true) {
        const input = prompt("$FWC >> ")

        if (!input || input.includes("exit") || input == "q") {
            console.log("Bye! 💦")
            Deno.exit(1);
        }
        if (input == "h" || input == "help"){
            console.log("credits - Gives the credits for FWL.\nq or exit - Quits the compiler")
            continue
        }
        if (input == "credits") {
            console.log("Thanks for:\nemielster (main developer, created the language)\nTypeScript (language used for making this language)\nYou (for using this language)")
            continue
        }
        // if (input == "<FWL.BUG>") {
        //     console.log("<FWL.BUG> is not the fault of you, it is the fault of emielster who created this language.\nPlease report it on the GitHub Repository.\nWe'll fix it as fast as possible.")
        //     continue
        // }
        // if (input == "<FWL.MISSING_ERR>") {
        //     console.log("<FWL.MISSING_ERR>if you get this error message, it's probably your are missing a bracket or something.\nIf not, report this bug on the GitHub Repository.\nWe'll fix it as fast as possible.")
        //     continue
        // }
        // if (input == "<FWL.DEFINED_VARIABLE_ERR>") {
        //     console.log("<FWL.DEFINED_VARIABLE_ERR>: You are trying to declare a variable that already is defined. Use something like <variablename>2 to declare your new variable.\nIf it isn't already defined, report it on the GitHub Repositor.\nWe'll fix it as fast as possible.")
        //     continue
        // }
        // if (input == "<FWL.RESOLVE_VARIABLE_ERR>") {
        //     console.log("<FWL.RESOLVE_VARIABLE_ERR>: Make sure that the variable is declared. Otherwise, you'll get this error. Is it defined? Report this on my GitHub Repository. We'll fix it as fast as possible.")
        //     continue
        // }
        //  if (input == "<FWL.YELL_VARIABLE_ERR>") {
            //     console.log("<FWL.YELL_VARIABLE_ERR>: Make sure you declared the variable like whisper or say. Please try again with a non constant variable.")
            //     continue
            // }
        const program = parser.produceAST(input)

        const result = evaluate(program, env);
        console.log(result)
    }
}