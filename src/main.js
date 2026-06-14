gmlGenerator = Blockly.JavaScript, config = {
    renderer: 'geras',
    theme: 'dark',
    grid: {spacing: 20, length: 3, colour: '#888', snap: true},
    move: {scrollbars: {horizontal: true, vertical: true}, drag: true, wheel: true},
    zoom: {controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2, pinch: true}
}, workspace = Blockly.inject('blocklyDiv', {...config, toolbox: document.getElementById(`toolbox`)})

Blockly.Theme.defineTheme('dark', {
    name: 'dark',
    base: Blockly.Themes.Classic,
    componentStyles: {
        workspaceBackgroundColour: '#1e1e1e',
        toolboxBackgroundColour: '#333',
        toolboxForegroundColour: '#fff',
        flyoutBackgroundColour: '#252526',
        flyoutForegroundColour: '#ccc',
        flyoutOpacity: 1,
        scrollbarColour: '#797979',
        insertionMarkerColour: '#fff',
        insertionMarkerOpacity: 0.3,
        scrollbarOpacity: 0.4,
        cursorColour: '#d0d0d0'
    }
})
Blockly.Tooltip.setCustomTooltip(function (div, element) {
    if (element instanceof Blockly.BlockSvg) div.style.backgroundColor = element.getColour()
    const tip = Blockly.Tooltip.getTooltipOfObject(element)
    const text = document.createElement('div')
    text.textContent = tip
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.appendChild(text)
    div.appendChild(container)
})

export {Blockly, config, workspace}
import addBlocksAndGenerators from "./collective"
addBlocksAndGenerators()

function exportCode() {
    const code = gmlGenerator.workspaceToCode(workspace)
    const blob = new Blob([code], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "code.gml"
    a.click()
    URL.revokeObjectURL(url)
}
function configureSettings() {
    const state = Blockly.serialization.workspaces.save(workspace)
    if (workspace) workspace.dispose()
    zelos = config.renderer === 'zelos'
    workspace = Blockly.inject('blocklyDiv', {
        ...config, startHats: true,
        toolbox: zelos ? document.getElementById('toolboxZelos') : document.getElementById('toolbox')
    })
    Blockly.serialization.workspaces.load(state, workspace)
}

//const block = workspace.newBlock("loops_on_event")
//block.initSvg?.()
//block.render()
//block.moveBy(50, 50)