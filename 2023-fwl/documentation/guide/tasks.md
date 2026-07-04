# fwl-documentation-tasks

Remember that, in the [syntax](syntax.md) documentation I said that the `interpreter` runs the code line by line from top to bottom. 

A `task` or `function` is one of the first concepts that breaks this simple "top-to-bottom" rule.


## Understanding it
Like in the [variable](variables.md) documentation, I made two ways of how you can understand functions.  

<sub>(understand it already? click [here](#understanding-the-bigger-picture))</sub>

### 1. Via mathematics <sub>(⭐ much easier to understand)</sub>

#### `functions`
Take this function:
```mathematics
f(x) = x + 3
```
Remember that I said in the [variable](variables.md) documentation that `x` here is a variable? That means that `x` can be any value:

```mathematics
f(2) = 2 + 3
f(2) = 5
```

You computed the function for value `2`. This concept is **so** similar to programming.

Take a look at this `FWL` code:
```fwl
task f(x) {
    x + 3;
};
```
Notice the similarity? Whenever you call `f(2)` in `FWL` it will compute that `function` with `x` equal to 2 inside that **`scope`**!

> **FYI**: A `scope` <sub>(between `{` and `}`)</sub> is essentially a *sub variable-environment* separated from the global variable-environment. This means that the sub scope can see variables from the global scope, but the global scope cannot use variables declared in the sub scope. In other words, imagine something like:
> ```fwl
> say y = 3;
> task do_something() { 
>    say x = y + 3; // works fine! (the scope can see variables from the global scope)
> };
> say z = x + 3; // ERROR! (x is undefined)
> ```

```fwl
f(2); // this will compute f(x) for x == 2
```

That's a task in `FWL`! 



### 2. Via "the interpreter" way <sub>(⭐ also easy)</sub>

Remember how I said in the [syntax](syntax.md) documentation that the `interpreter` goes down line by line and by doing so, it executes the `action` <sub>(or instruction)</sub> from that line.

This is not entirely true when it comes to concepts like `tasks`!
Look at this:
```fwl
task do_something(x) {
    x + 2;
};
do_something(4);
```
The call expression <sub>(`do_something(4)`)</sub> can also be seen as: `hey interpreter, I want you to go back where do_something was declared and run that code while making x = 4 for`**`that piece of code.`**

>*FYI*: **`that piece of code`** has a so-called `scope`. See the explanation above in the *FYI* in [via mathematics](#1-via-mathematics--much-easier-to-understand).

That's a task in `FWL`!



## Understanding the bigger picture

Now that you understand the fundamental concept of `tasks`, it is time to understand how you can use them.

### Parameters

```fwl
task do_something(x, y) {
    x + y;
};

do_something(2, 3);
```
Notice that between the parentheses <sub>(`(` and `)`)</sub> you see `x` and `y`? 
These are called `parameters`. They're quite similar to `variables`, just declared differently. Whenever you call the task <sub>(`do_something(2, 3)`)</sub>, the `interpreter` assigns the passed `arguments`<sub>(the values you pass in the parentheses of the call expression)</sub> to the task's `parameters`. You can imagine something like this ...
```fwl
say x = 2;
say y = 3;
```
... that the `interpreter` runs before executing the code in the braces <sub>(`{` and `}`)</sub>. 

The values `2` and `3` are called **`arguments`**<sub>(not parameters!)</sub> because they are passed to the task when it is called.
**As mentioned before, the global scope cannot access the variables declared in the task's scope.** 
### What is missing from `FWL` (`return` statements)

Notice that I've been doing: 
```fwl
task do_something(x) {
    x + 4;
};
```
instead of
```fwl
task do_something(x) {
    return x + 4;
};
```
This is because I sadly haven't implemented `return` statements yet.  
In *more complete* languages, you normally have a `return` keyword that returns a value back to the place where the task was called. That sounds confusing, so let me give you an example instead:
```fwl
task sum(x, y) {
    return x + y;
};

say x = sum(5, 2);
```
When the `interpreter` gets to the call expression <sub>(`say x = sum(5, 2);`)</sub>, it executes `sum(x, y)` with `x equal to 5 and y equal to 2`. 

You can imagine that after computing the value, the `interpreter` replaces `sum(5, 2)` in `say x = sum(5, 2);` with its `returned` value <sub>(which is 7)</sub> so you get: `say x = 7;`. 

That is all a `return` statement really does. It gives back a value back to the code that called that task.


### Now what?

You might think: `"okay, all good and well, but how do I start interacting with the user instead of only doing mathematics"`. This is usually the fun moment.

To solve this: `FWL` provides several `built-in` tasks. You can find a brief overview at [built-in](../reference/built-in.md). These are tasks that essentially "`reach out of the box`", declared by `FWL` before any code is even ran!

The most important ones are:
####  1. Output
```fwl
println(string); // outputs a string to the console
```

> **NOTE**: As mentioned in the [variable](variables.md) documentation, a `string` is a variable type that is a `series of characters`. To clarify: `"Hello, world!"` and even `"FWL is amazing"` is a string! Essentially, you can see it as a variable that holds `text`. In `FWL`<sub>, and in almost every other language,</sub> you make strings with *double quotes* (`"`). 
> Take a look:
> ```fwl
> say msg = "Hello, world!"; // msg is a string here
> ``` 

> **ADVANCED FYI**: Explicit languages like *C++* or *C* usually differentiate a `string` variable with a `character` variable. A `string` is a series of characters, and a `character` is just a singular character. Characters are also defined with *singular quotes* (`'`) instead of double ones. Take a look at this example written in *C++*: 
> ```cpp
> char x = 'c';
> std::string y = "hello";
> ``` 
> Not something to remember for `FWL`, but to remember in your journey to more advanced languages.

`println` is pretty useful for debugging, and communicating with the user! <sub>(finally a Hello, world program in FWL! :p)</sub> 

```fwl
println("Hello, world!"); // output: "Hello, world!"
```

You can also pass multiple strings as `arguments`!
```fwl
println("Hello", "world!"); 
/$ output:
Hello
world!
$/
```
Multiple strings that are printed out are  seperated with a newline.

#### 2. Input 
```fwl
input(message); // outputs the message and waits for input
```


This forces the user to write input in the `console` or `terminal` with the message provided. The result gets stored in the `variable` if assigned to one.

For example:
```fwl
say number = input("Enter a number: ");
```

