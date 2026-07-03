# fwl-documentation

Welcome to the FWL documentation. I've tried my best documenting the language, so you can learn it too or take inspiration from it. Enjoy!


> **FUN FACT**: I've tried documenting the programming language originally, you can find the original documentation files under project/examples/ although it is quite confusing to say the least.

## Documentation Overview
| Title | Description |
|-------|-------------|
| [Syntax](syntax.md) <sub>(⭐ starting point)</sub> | Rules to follow when writing code. The spelling of the language.
| [Variables](variables.md)<sub>(whis, say, yell)</sub> | A brief introduction to variables, variable types, and how you can use them.
| [Tasks](tasks.md)<sub>(AKA functions)</sub>  | What are tasks and how can you use them?|
| [Built-in](built-in.md) | All built-in tasks<sub>(AKA functions)</sub> in the language | 
| [Additional](additional.md) | Additional information: *comments, operators, objects, ...*|
| [Overview](overview.md) | A well-organized overview of every *keyword, sign and data types* 

## Examples Overview

I have provided 3 examples in the `examples/` directory.

Please make sure you are in the `2023-fwl/` directory:
```bash
cd 2023-fwl/
```

| Title | Description | How to run |
|-------|-------------|------------|
| [***`greeting.fwl`***](examples/greeting.fwl) | Asks for name, then greets you. Cute! | `deno run -A project/run.ts documentation/examples/greeting.fwl` |
| [***`next_year.fwl`***](examples/next_year.fwl) | Says how old you will be next year. Please configure the variables to fit your data! | `deno run -A project/run.ts documentation/examples/next_year.fwl`
| [***`object.fwl`***](examples/object.fwl) | Prints out an object. Please configure the variables to fit your data! | `deno run -A project/run.ts documentation/examples/object.fwl` |

## What is missing from `FWL`

- `return` statements, as mentioned in the [task](tasks.md#what-is-missing-from-fwl-return-statements) documentation.
- `if`-`elif`-`else` statements
- essential built-in functions (like `exit()`, and many more)
- `for` and `while` loops
- `float` types <sub>(AKA decimals)</sub>
- ...

`FWL` is archived<sub>, *and I got interested into other projects quickly*,</sub> so this project is left unfinished. Common features found in other languages have not been implemented yet.
In the future, I might rewrite this whole language *probably in C++*, including all these features.

