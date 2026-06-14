import {Blockly, config, workspace} from 'src/main.js'
export default function addNumbersBlocks() {
    class FieldNumeral extends Blockly.FieldTextInput {
        constructor(value = "0") {
            super(value, FieldNumeral.validator)
        }
        static validator(text) {
            try {
                if (text == "Infinity" || text == "NaN") return text
                return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
            } catch {return "0"}
        }
    }
    Blockly.fieldRegistry.register('field_numeral', FieldNumeral)
    class FieldInteger extends Blockly.FieldTextInput {
        constructor(value = "0") {
            super(value, FieldInteger.validator)
        }
        static validator(text) {
            try {return text.replace(/[^0-9]/g, '')}
            catch {return "0"}
        }
    }
    Blockly.fieldRegistry.register('field_integer', FieldInteger)
    Blockly.Blocks.numbers_real = {
        init: function() {
            this.appendDummyInput().appendField("real").appendField(new Blockly.FieldNumber(0), "num")
            this.setOutput(true, "Real")
            this.setTooltip("Create a number with a decimal point. For example: 3.14, -0.001, or 2.5.")
            this.setColour(225)
        }
    }
    Blockly.Blocks.numbers_integer = {
        init: function() {
            this.appendDummyInput().appendField("int").appendField(new FieldUint64("0"), "num")
            this.setOutput(true, "Integer")
            this.setTooltip("Create a 64-bit unsigned integer. For example: 0, 5, or 100. Maxes out to 18446744073709551615")
            this.setColour(225)
        }
    }
}