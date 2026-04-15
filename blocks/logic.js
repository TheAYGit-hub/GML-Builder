export function loadLogic(Blockly, gmlGenerator) {
    Blockly.Blocks['logic_if'] = {
        init: function() {
            this.appendValueInput("cond").setCheck("Boolean").appendField("if")
            this.appendStatementInput("statement")
            this.setPreviousStatement(true)
            this.setNextStatement(true)
            this.setColour(210)
        }
    }
    Blockly.Blocks['logic_else_if'] = {
        init: function() {
            this.appendValueInput("cond").setCheck("Boolean").appendField("else if")
            this.appendStatementInput("statement")
            this.setPreviousStatement(true)
            this.setNextStatement(true)
            this.setColour(210)
        }
    }
    Blockly.Blocks['logic_else'] = {
        init: function() {
            this.appendDummyInput().appendField("else")
            this.appendStatementInput("statement")
            this.setPreviousStatement(true)
            this.setNextStatement(true)
            this.setColour(210)
        }
    }
    Blockly.Blocks['logic_if_report'] = {
        init: function() {
            this.appendValueInput("cond").setCheck("Boolean").appendField("if")
            this.appendValueInput("valueA").appendField("then")
            this.appendValueInput("valueB").appendField("else")
            this.appendStatementInput("statement")
            this.setPreviousStatement(true)
            this.setNextStatement(true)
            this.setinlineInputs(true)
            this.setColour(210)
        }
    }
    gmlGenerator.forBlock['logic_if'] = function(block, gmlgenerator) {
        const cond = gmlgenerator.valueToCode(block, 'cond', 0) || 'false'
        const statement = gmlgenerator.statementToCode(block, 'statement')
        return `if (${cond}) {\n${statement}}\n`
    }
    gmlGenerator.forBlock['logic_else_if'] = function(block, gmlgenerator) {
        const cond = gmlgenerator.valueToCode(block, 'cond', 0) || 'false'
        const statement = gmlgenerator.statementToCode(block, 'statement')
        return `else if (${cond}) {\n${statement}}\n`
    }
    gmlGenerator.forBlock['logic_else'] = function(block, gmlgenerator) {
        const statement = gmlgenerator.statementToCode(block, 'statement')
        return `else {\n${statement}}\n`
    }
    gmlGenerator.forBlock['logic_if_report'] = function(block, gmlgenerator) {
        const cond = gmlgenerator.valueToCode(block, 'cond', 0) || 'false'
        const valueA = gmlgenerator.valueToCode(block, 'valueA', 0) || 'false'
        const valueB = gmlgenerator.valueToCode(block, 'valueB', 0) || 'false'
        return `(${cond} ? ${valueA} : ${valueB})`
    }
}