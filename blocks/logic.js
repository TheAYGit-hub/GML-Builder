function loadLogicBlocks() {
    Blockly.Blocks['hello_block'] = {
        init: function() {
            this.appendDummyInput().appendField("say hello");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(120);
        }
    }
    Blockly.JavaScript['hello_block'] = () => {
        return 'alert("Hello from Blockly!");\n'
    }
}