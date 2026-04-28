import gmlGenerator from 'index.html'

Blockly.Blocks['repeat'] = {
    init: function() {
        this.appendValueInput('TIMES').setCheck('Number').appendField('repeat');
        this.appendStatementInput('DO').appendField('do');
        this.setPreviousStatement(true, "Block");
        this.setNextStatement(true, "Block");
        this.setColour(120);
        this.setTooltip('Repeat the enclosed blocks a certain number of times.');
    }
};
gmlGenerator['repeat'] = function(block) {
    const repeats = gmlGenerator.valueToCode(block, 'TIMES', 0) || '0';
    const branch = gmlGenerator.statementToCode(block, 'DO');
    return [`repeat(${repeats}) {\n${branch}}\n`, 0];
}