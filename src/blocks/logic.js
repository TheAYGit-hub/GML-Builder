/*  block order guide
  ATOMIC = 0,            // 0 "" ...
  NEW = 1.1,             // new
  MEMBER = 1.2,          // . []
  FUNCTION_CALL = 2,     // ()
  INCREMENT = 3,         // ++
  DECREMENT = 3,         // --
  BITWISE_NOT = 4.1,     // ~
  UNARY_PLUS = 4.2,      // +
  UNARY_NEGATION = 4.3,  // -
  LOGICAL_NOT = 4.4,     // !
  TYPEOF = 4.5,          // typeof
  VOID = 4.6,            // void
  DELETE = 4.7,          // delete
  AWAIT = 4.8,           // await
  EXPONENTIATION = 5.0,  // **
  MULTIPLICATION = 5.1,  // *
  DIVISION = 5.2,        // /
  MODULUS = 5.3,         // %
  SUBTRACTION = 6.1,     // -
  ADDITION = 6.2,        // +
  BITWISE_SHIFT = 7,     // << >> >>>
  RELATIONAL = 8,        // < <= > >=
  IN = 8,                // in
  INSTANCEOF = 8,        // instanceof
  EQUALITY = 9,          // == != === !==
  BITWISE_AND = 10,      // &
  BITWISE_XOR = 11,      // ^
  BITWISE_OR = 12,       // |
  LOGICAL_AND = 13,      // &&
  LOGICAL_OR = 14,       // ||
  CONDITIONAL = 15,      // ?:
  ASSIGNMENT = 16,       // = += -= **= *= /= %= <<= >>= ...
  YIELD = 17,            // yield
  COMMA = 18,            // ,
  NONE = 99,             // (...)
*/
import {Blockly, config, workspace} from 'src/main.js'
export default function addLogicBlocks() {
    Blockly.Blocks.logic_if = {
        init: function() {
            this.elseifCount_ = 0
            this.elseCount_ = 0
            this.appendValueInput("cond").setCheck("Boolean").appendField("if")
            this.appendStatementInput("statement").setCheck("Action")
            this.setPreviousStatement(true, "Action")
            this.setNextStatement(true, "Action")
            this.setTooltip("If the condition is true, then run the following statements.")
            this.setColour("#4c97ff")
            Blockly.Extensions.apply(`if_mutator`, this, true)
        }
    }
    Blockly.Blocks.if_mutator = {
        init: function() {
            this.appendDummyInput().appendField("else if").appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "elseif").appendField("else").appendField(new Blockly.FieldCheckbox(true), "else")
            this.setColour("#4c97ff")
        }
    }
    Blockly.Blocks.logic_if_report = {
        init: function() {
            this.appendValueInput("cond").setCheck("Boolean").appendField("if")
            this.appendValueInput("truevalue").appendField("then")
            this.appendValueInput("falsevalue").appendField("else")
            this.setOutput(true)
            this.setTooltip("Returns the first value if the condition is true, otherwise returns the second value.")
            this.setColour("#4c97ff")
        }
    }
    Blockly.Blocks.logic_operator = {
        init: function() {
            this.appendValueInput("a").setCheck("Boolean")
            this.appendDummyInput().appendField(new Blockly.FieldDropdown([["and", "and"], ["or", "or"], ["xor", "xor"], "separator", ["nand", "nand"], ["nor", "nor"], ["xnor", "xnor"]]), "op")
            this.appendValueInput("b").setCheck("Boolean")
            this.setOutput(true, "Boolean")
            this.setInputsInline(true)
            this.setTooltip("Run a logic operation (and, or, xor, etc.) on two booleans.")
            this.setColour("#4c97ff")
        }
    }
    Blockly.Blocks.logic_not = {
        init: function() {
            this.appendValueInput("bool").setCheck("Boolean").appendField("not")
            this.setOutput(true, "Boolean")
            this.setTooltip("Returns the opposite of the input boolean; Returns true if the input is false, and vice versa.")
            this.setColour("#4c97ff")
        }
    }
    Blockly.Blocks.logic_boolean = {
        init: function() {
            this.appendDummyInput().appendField(new Blockly.FieldDropdown([["true", "true"], ["false", "false"]]), "op")
            this.setOutput(true, "Boolean")
            this.setInputsInline(true)
            this.setTooltip("Returns the specified boolean value; either true or false.")
            this.setColour("#4c97ff")
        }
    }
    gmlGenerator.forBlock.logic_not = (block) => ['!' + gmlGenerator.valueToCode(block, 'bool', 0) || 'false', 4.4]
    gmlGenerator.forBlock.logic_boolean = (block) => [block.getFieldValue('op'), 0]
}