// script created by @emielster 2026
// this is **not** apart of the original fwl language made in 2023,
// i added this as a convienience
const vscode = require('vscode');

function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'fwl',
        {
            provideCompletionItems() {
                const keywords = [
                    'task',
                    'rec',
                    'say',
                    'drop',
                    'whis',
                    'yell',
                    'down',
                    'del',
                    'println'
                ];

                return keywords.map(word => {
                    const item = new vscode.CompletionItem(
                        word,
                        vscode.CompletionItemKind.Keyword
                    );
                    return item;
                });
            }
        }
    );

    context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};