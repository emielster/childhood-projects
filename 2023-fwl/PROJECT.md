# 2023-fwl (⭐) 

<div align="center">
<img src="project/images/fwl_logo.ico" alt="Logo FWL" width="300">
<sub></sub>

![Language](https://img.shields.io/badge/Language-TypeScript-blue) ![Status](https://img.shields.io/badge/Status-Files%20recovered-brightgreen) ![Platform](https://img.shields.io/badge/Platform-Linux%20%7C%20Windows%20%7C%20macOS-lightgrey) ![Year](https://img.shields.io/badge/Year-2023-yellow) ![Kit](https://img.shields.io/badge/Kit-FWK-orange)
</div>

>From main [README.md](../README.md): \
>One of the biggest projects from that time was the "FW" Universe. It started as a simple idea (*FWL*, my own interpreter written in TypeScript), but it gradually grew into a much larger project (*FWK*, a "kit" containing all FW-products), including an IDE (*FWIDE*), OS (*FWOS*, more on that later) and a NewScraper (*FWP??*) (although some of these projects were developed later). One of my favorite things about FWL was its syntax. Instead of using traditional keywords, I tried to make the language more *expressive*: `say` created normal variables, `yell` created constants, `whisper` created silent variables that could be overwritten or deleted. I remember that I spent the entire summer working on it, even when I was on vacation. It shows my passion for programming.

FWL is an *expressive* language I designed when I was 11, and in this project I made an interpreter for it written in TypeScript. (Deno) 

I have tried my best to fix certain inconsistensies like not needing a `;` for call expressions, whilst you **do** need it for variable declarations. Additionally, I actually made a FWL syntax highlighting VSCode extension for this language when I was 11. (This too will be included in this project, you can find how to install it in here too)


## Installation

### 1. Deno
You'll need `deno` in order to run the interpreter.
#### macOS and Linux
For **macOS / Linux**:
```bash
curl -fsSL https://deno.land/install.sh | sh
```
For **macOS with Homebrew**:
```bash
brew install deno
```
#### Windows
For **Windows** (Powershell):
```powershell
irm https://deno.land/install.ps1 | iex
```
For **Windows with Scoop**:
```bash
scoop install deno
```
#### All
Using **npm/npx**:
```bash
npm install -g deno
```
Using **Cargo**:
```bash
cargo install deno --locked
```

Please verify Deno is installed before continuening:
```
deno --version
```

### 2. Clone 
Clone the GitHub repository:
```bash
git clone https://github.com/emielster/childhood-projects
cd childhood-projects/2023-fwl/project
```
### 3. Run it!
You'll see that there are two separate TypeScript files in the `project/` directory:
```
main.ts
run.ts
```
If you run `main.ts` (`deno run -A main.ts`) you'll get the REPL (*Read-Eval-Print Loop*) version of FWL. <br>
Additionally, if you run `run.ts` (`deno run -A run.ts <file_path>`) the interpreter will run the file specified.



## Syntax highlighting
Here is how to install the Syntax Highlighting extension for Visual Studio Code:
### "Just use it" (easy way ⭐)
I have provided a `.vsix` file that can be used to add the extension to Visual Studio Code: 


### Build it (hard way)
```bash
npm install
```