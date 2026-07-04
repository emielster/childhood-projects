# fwl-documentation-additional

Now that you understand the fundamental concepts of `FWL`, it's time to look at some concepts that are less important.

## Comments
You've probably noticed that I use `//` everywhere in my code snippets. This is a comment. It is something that the `interpreter` completely ignores.

There are two types of comments:

### Single line comments

You can create them with `//`. Everything after the `//` in that line is ignored. 

Brief example:

```fwl
say x = "hello"; // comment, this is single line and its ignored
```

Use these type of comments for:

- Short explanations
- FIXME's
- TODO's
- ...

### Multi line comments <sub>(AKA comment blocks)</sub>

With these comments, you have more control about the **starting point** of the `comment block` and the **ending point** of the `comment block`. This means you can create comments that go over multiple lines. Use `/$` for the **starting point** and `$/` for the **ending point**. 

```fwl
/$ 
this comment stretches over multiple lines.
anything between the control points is ignored.
$/
```
Use these type of comments for:

- Long explanations
- File metadata (e.g. author, description, ...)
- License
- ...

## Objects <sub>*(expiremental!)*</sub>

An example of a more advanced type of variable is an object. You can think of it like a collection of named values.

```fwl
say obj = {
    element1: "hello",
    element2: "world!"
};
```

To access an element of the object, use the dot (`.`) operator:
```fwl
println(obj.element1);
```

> *NOTE*: This is expiremental and quite fragile. It is not recommended to use

## Operators

FWL follows standard mathematical operator precedence, *like any other language*. This means that parentheses can be used to explicitly control math order.

Example:

```fwl
say x = 5 * 2 + (3 + 5); // result: 18
```

Current supported operators: 
<!-- `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division) -->
| Operator | Description | 
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |


