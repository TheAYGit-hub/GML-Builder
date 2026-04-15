import {javascriptGenerator} from 'https://unpkg.com/blockly/javascript.js'
gmlGenerator = new javascriptGenerator.Generator('GML');
function loadLogicBlocks() {
    /* blocks */ {
        Blockly.Blocks['logic_if'] = {
            init: function() {
                this.appendValueInput('bool').setCheck('Boolean').appendField('if');
                this.appendValueInput('statement')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(210);
                this.setMutator(new Blockly.Mutator(['logic_if_else']));
            }
        }
        Blockly.Blocks['logic_else_if'] = {
            init: function() {
                this.appendValueInput('bool').setCheck('Boolean').appendField('else if');
                this.appendValueInput('statement')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(210);
                this.setMutator(new Blockly.Mutator(['logic_if_else']));
            }
        }
        Blockly.Blocks['logic_else'] = {
            init: function() {
                this.appendDummyInput().appendField('else');
                this.appendValueInput('statement')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(210);
                this.setMutator(new Blockly.Mutator(['logic_if_else']));
            }
        }
        Blockly.Blocks['logic_if_report'] = {
            init: function() {
                this.appendValueInput('bool').setCheck('Boolean').appendField('if');
                this.appendValueInput('valueA').appendField('then');
                this.appendValueInput('valueB').appendField('else');
                this.setInputsInline(true)
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(210);
            }
        }
    }
    /* generators */ {
        gmlGenerator['logic_if'] = (block) => {
            bool = gmlGenerator.valueToCode(block, 'bool', gmlGenerator.ORDER_ATOMIC) || 'false';
            statement = gmlGenerator.statementToCode(block, 'statement');
            return `if (${bool}) {\n${statement}}\n`;
        }
        gmlGenerator['logic_else_if'] = (block) => {
            bool = gmlGenerator.valueToCode(block, 'bool', gmlGenerator.ORDER_ATOMIC) || 'false';
            statement = gmlGenerator.statementToCode(block, 'statement');
            return `else if (${bool}) {\n${statement}}\n`;
        }
        gmlGenerator['logic_else'] = (block) => `else {\n${gmlGenerator.statementToCode(block, 'statement')}}\n`;
        gmlGenerator['logic_if_report'] = (block) => {
            bool = gmlGenerator.valueToCode(block, 'bool', gmlGenerator.ORDER_ATOMIC) || 'false';
            valueA = gmlGenerator.statementToCode(block, 'statement');
            valueB = gmlGenerator.valueToCode(block, 'valueB', gmlGenerator.ORDER_ATOMIC) || '0';
            return `(${bool}) ? (${valueA} : ${valueB})`;
        }
    }
}
export default loadLogicBlocks