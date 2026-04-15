import * as Blockly from "https://unpkg.com/blockly/blockly.min.js"
import { javascriptGenerator } from "https://unpkg.com/blockly/javascript.js"
import { loadLogic } from "./blocks/logic.js"

loadLogic(Blockly, javascriptGenerator)
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox')
});

window.runCode = function() {
    const code = javascriptGenerator.workspaceToCode(workspace)
    console.log(code)
    try {
        eval(code)
        document.getElementById("output").textContent = "Ran successfully"
    } catch (e) {
        document.getElementById("output").textContent = "Error: " + e.message
    }
}

window.saveBlocks = function() {
    const xml = Blockly.Xml.workspaceToDom(workspace)
    const text = Blockly.Xml.domToText(xml)
    localStorage.setItem("blocklyWorkspace", text)
    document.getElementById("output").textContent = "Saved!"
};

window.loadBlocks = function() {
    const text = localStorage.getItem("blocklyWorkspace")
    if (!text) {
        document.getElementById("output").textContent = "Nothing saved"
        return
    }
    workspace.clear()
    const xml = Blockly.Xml.textToDom(text)
    Blockly.Xml.domToWorkspace(xml, workspace)
    document.getElementById("output").textContent = "Loaded!"
};