import {Blockly, config, workspace} from 'src/main.js'
Blockly.Extensions.registerMutator("if_mutator", {
    saveExtraState() {
        return {elseif: this.elseifCount_, else: this.elseCount_}
    },
    loadExtraState(state) {
        this.elseifCount_ = state.elseif || 0
        this.elseCount_ = state.else || 0
        this.updateShape_();
    },
    compose(topBlock) {
        this.elseifCount_ = Number(topBlock.getFieldValue("elseif")) || 0
        this.elseCount_ = topBlock.getFieldValue("else") === "TRUE" ? 1 : 0
        this.updateShape_()
    },
    decompose(workspace) {
        const block = workspace.newBlock("if_mutator")
        block.initSvg?.()
        block.setFieldValue(String(this.elseifCount_), "elseif")
        block.setFieldValue(this.elseCount_ ? "TRUE" : "FALSE", "else")
        return block
    },
    mutationToDom: function() {
        const xml = Blockly.utils.xml.createElement("mutation")
        xml.setAttribute("elseif", this.elseifCount_ || 0)
        xml.setAttribute("else", this.elseCount_ || 0)
        return xml
    },
    domToMutation: function(xml) {
        this.elseifCount_ = Number(xml.getAttribute("elseif")) || 0
        this.elseCount_ = Number(xml.getAttribute("else")) || 0
        this.updateShape_()
    },
    updateShape_: function() {
        let i = 0
        while (this.getInput(`elseif_cond${i}`)) {
            this.removeInput(`elseif_cond${i}`)
            this.removeInput(`elseif_do${i}`)
            i++
        }
        if (this.getInput("else_do")) this.removeInput("else_do")
        for (i = 0; i < this.elseifCount_; i++) {
            this.appendValueInput(`elseif_cond${i}`).setCheck("Boolean").appendField("else if")
            this.appendStatementInput(`elseif_do${i}`).setCheck("Action").appendField("do")
        }
        if (this.elseCount_) this.appendStatementInput("else_do").setCheck("Action").appendField("else")
    }
}, undefined, ["if_mutator"])