import {Blockly, config, workspace} from 'src/main.js'
export default function addNumbersGenerators() {
    gmlGenerator.forBlock.numbers_real = (block) => [String(block.getFieldValue("num")), 0]
    gmlGenerator.forBlock.numbers_integer = (block) => [`int64(${block.getFieldValue("num")})`, 0]
}