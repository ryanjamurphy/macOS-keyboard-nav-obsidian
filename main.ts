import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MyPlugin extends Plugin {
	onload() {
		console.log('Loading the macOS Keyboard Navigation plugin.');
		let editor = this.app.workspace.activeLeaf.view.sourceMode.cmEditor;
		
		this.registerDomEvent(document, 'keydown', (keyboardPressEvent: KeyboardEvent) => {
			if (keyboardPressEvent.getModifierState("Alt")) {
				if (keyboardPressEvent.key == "ArrowUp") {
					let cursor = editor.getCursor();
					if (cursor.ch != 0) {
						editor.setCursor(cursor.line, 0);
					} else {
						editor.setCursor((cursor.line - 1), 0);
					}
					console.log("Alt+↑ pressed")
				}
			}
		});

		this.registerDomEvent(document, 'keydown', (keyboardPressEvent: KeyboardEvent) => {
			if (keyboardPressEvent.getModifierState("Alt")) {
				if (keyboardPressEvent.key == "ArrowDown") {
					let cursor = editor.getCursor();
					let doc = editor.getDoc();
					let lineLength = doc.getLine(cursor.line).length;
					if (cursor.ch != lineLength) {
						editor.setCursor(cursor.line, lineLength);
					} else {
						editor.setCursor((cursor.line + 1), doc.getLine(cursor.line + 1).length);
					}
					console.log("Alt+↓ pressed")
				}
			}
		});
	}

	onunload() {
		console.log('Unloading the macOS Keyboard Navigation plugin.');
	}
}
