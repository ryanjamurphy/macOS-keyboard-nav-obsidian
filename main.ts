import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MyPlugin extends Plugin {
	onload() {
		console.log('Loading the macOS Keyboard Navigation plugin.');
		
		this.registerDomEvent(document, 'keydown', (keyboardPressEvent: KeyboardEvent) => {
			if (keyboardPressEvent.getModifierState("Alt")) {
				if (keyboardPressEvent.key == "ArrowUp") {
					let editor = this.app.workspace.activeLeaf.view.sourceMode.cmEditor;
					let cursorHead = editor.getCursor("head");
					let cursorAnchor = editor.getCursor("anchor");
					if (keyboardPressEvent.getModifierState("Shift")) { // select up

						let doc = editor.getDoc();
						if (cursorHead.ch != 0) {
							doc.setSelection({line:cursorAnchor.line, ch:cursorAnchor.ch}, {line:cursorHead.line, ch:0}, {scroll: true});
						} else {
							doc.setSelection({line:cursorAnchor.line, ch:cursorAnchor.ch}, {line:cursorHead.line - 1, ch:0}, {scroll: true});
						}
					} else {
						// move up
						if (cursorHead.ch != 0) {
							editor.setCursor(cursorHead.line, 0);
						} else {
							editor.setCursor((cursorHead.line - 1), 0);
						}
					}
				}
			}
		});

		this.registerDomEvent(document, 'keydown', (keyboardPressEvent: KeyboardEvent) => {
			if (keyboardPressEvent.getModifierState("Alt")) {
				if (keyboardPressEvent.key == "ArrowDown") {
					let editor = this.app.workspace.activeLeaf.view.sourceMode.cmEditor;
					let cursorHead = editor.getCursor("head");
					let cursorAnchor = editor.getCursor("anchor");
					let doc = editor.getDoc();
					let lineLength = doc.getLine(cursorHead.line).length;
					if (keyboardPressEvent.getModifierState("Shift")) { // select down
						console.log("alt and shift are held");
						if (cursorHead.ch != lineLength) {
							doc.setSelection({line:cursorAnchor.line, ch:cursorAnchor.ch}, {line:cursorHead.line + 1, ch:0}, {scroll: true});
						} else {
							doc.setSelection({line:cursorAnchor.line, ch:cursorAnchor.ch}, {line:cursorHead.line + 1, ch:0}, {scroll:true});
						}
					} else { // move down
						if (cursorHead.ch != lineLength) {
							editor.setCursor(cursorHead.line, lineLength);
						} else {
							editor.setCursor((cursorHead.line + 1), doc.getLine(cursorHead.line + 1).length);
						}
					}
				}
			}
		});
	}

	onunload() {
		console.log('Unloading the macOS Keyboard Navigation plugin.');
	}
}
