# fwl-documentation-overview

Here is a quick overview of every keyword, sign and each data type:

## Keywords
| Keyword | Description | Example |
|---------|-------------|---------|
| `say`<sub>[see variables](variables.md)</sub> | Declare a changeable variable| ***`say`***` x = 5;`
| `whis`<sub>[see variables](variables.md)</sub> | Declare a silent variable | ***`whis`***` x = 5;` 
| `yell`<sub>[see variables](variables.md)</sub> | Declare a constant variable | ***`yell`***` x = 5;` 
| `drop`<sub>[see variables](variables.md)</sub> | Change a variable type | ***`drop`***` x to whis;` |
| `down`<sub>[see variables](variables.md)</sub> | "Down" a silent variable | ***`down`***` x;` |
| `rec`<sub>[see variables](variables.md)</sub> | Recover a silent variable | ***`rec`***` x;` |
| `del`<sub>[see variables](variables.md)</sub> | Delete a silent variable | ***`del`***` x;` |
`task`<sub>[see tasks](tasks.md)</sub> | Declare a task | ***`task`***` f(x) { x + 3; };` |



## Signs
| Sign | Description | Example |
|------|-------------|---------|
| `+`<sub>[see additional](additional.md)</sub> | Add two numbers together | `say x = 5 `***`+`***` 3;` 
| `-`<sub>[see additional](additional.md)</sub> | Subtract two numbers | `say x = 5 `***`-`***` 3;` |
| `*`<sub>[see additional](additional.md)</sub> | Multiply two numbers | `say x = 5 `***`*`***` 3;` |
| `/`<sub>[see additional](additional.md)</sub> | Divide two numbers | `say x = 5 `***`/`***` 3;`|
`=`<sub>[see variables](variables.md)</sub> | Assign a value to a variable | `say x `***`=`***` 3;` |
`(` <sub>*and*</sub> `)`<sub>[see additional](additional.md)</sub>  | Used for operation precedence  | `say x = 3 + `***`(`***`2 - 1`***`)`***`;` |
`(` <sub>*and*</sub> `)`<sub>[see tasks](tasks.md)</sub>  | Used for paramater declaration of tasks | `task f`***`(`***`x`***`)`***` { x + 3; };` |
`(` <sub>*and*</sub> `)`<sub>[see tasks](tasks.md)</sub> | Used for call expressions | `f`***`(`***`3`***`)`***`;`
| `{` <sub>*and*</sub> `}`<sub>[see tasks](tasks.md)</sub>| Used for the body declaration of tasks | `task f(x) `***`{`***` x + 3; `***`}`***`;` |
| `{` <sub>*and*</sub> `}`<sub>[see additional](additional.md)</sub> | Used for the declerations of objects | `say obj = `***`{`***`msg: "hello"`***`}`***`;` |
| `:`<sub>[see additional](additional.md)</sub> | Used for assignment of a value to an element in an object | `say obj = { msg`***`:`***` "hello" };` |
`"` <sub>[see variables](variables.md)</sub> | Used for the creation of strings | `say str = `***`"`***`Hello, world!`***`"`***`;` 
`;` <sub>[see syntax](syntax.md)</sub> | At the end of each line/action| `say x = 5`***`;`*** |
`//` <sub>[see additional](additional.md)</sub> | Used for single line comments | ***`//`***`this is a comment` |
`/$` <sub>[see additional](additional.md)</sub> | Used for the starting point of a comment block | ***`/$`***` this is a comment $/` |
`$/`<sub>[see additional](additional.md)</sub> | Used for the ending point of a comment block | `/$ this is a comment `***`$/`*** |
`,` <sub>[see tasks](tasks.md)</sub> | Used give multiple parameters in task declarations | `task f(x`***`,`***`y) { x + y; };` |
`,` <sub>[see tasks](tasks.md)</sub> | Used to give multiple arguments in call expressions | `f(5`***`,`***`3);` |
`.` <sub>[see additional](additional.md)</sub> | Used to get an element of an object | `println(obj`***`.`***`msg);`
<!-- ohh boy.. This formatting is crazy but whatever and yes, I wrote this all by hand at 1 AM. Kinda hate my life. -->

## Data types
| Data type | Description | Example |
|-----------|-------------|---------|
| Integer<sub>it's everywhere!</sub>| A numeric value | `20` |
| String<sub>[see tasks](tasks.md#1-output)</sub> | A series of characters, plain text | `"hello"` |
| Object<sub>[see additional](additional.md#objects-expiremental)| A collection of named values | `{ msg: "Hello" }` |
| Booleans<sub>[see variables](variables.md#2-via-boxes-also-easy)</sub> | Either `true` or `false` | `true` |


<!-- "yes, i wrote this all out by hand at 1 AM. i am crazy" - emielsterdev, no seriously though, its more difficult than it looks -->
