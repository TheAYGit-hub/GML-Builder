import {Blockly, config, workspace} from 'src/main.js'
export default function addLogicGenerators() {
    gmlGenerator.forBlock.logic_if = function(block) {
        const cond = gmlGenerator.valueToCode(block, "cond", 0) || "false"
        const statement = gmlGenerator.statementToCode(block, "statement")
        let code = `if (${cond}) {\n${statement}}`
        for (let i = 0; i < block.elseifCount_; i++) {
            const elseifCond = gmlGenerator.valueToCode(block, `elseif_cond${i}`, 0) || "false"
            const elseifDo = gmlGenerator.statementToCode(block, `elseif_do${i}`)
            code += ` else if (${elseifCond}) {\n${elseifDo}}`;
        }
        if (block.elseCount_) {
            const elseDo = gmlGenerator.statementToCode(block, "else_do")
            code += ` else {\n${elseDo}}`
        }
        return code + "\n";
    }
    gmlGenerator.forBlock.logic_if_report = function(block) {
        const cond = gmlGenerator.valueToCode(block, 'cond', 0) || 'false'
        const truevalue = gmlGenerator.valueToCode(block, 'truevalue', 0) || 'true'
        const falsevalue = gmlGenerator.valueToCode(block, 'falsevalue', 0) || 'false'
        return [`${cond} ? ${truevalue} : ${falsevalue}`, 15]
    }
    gmlGenerator.forBlock.logic_operator = function(block) {
        const op = block.getFieldValue('op')
        const a = gmlGenerator.valueToCode(block, 'a', 0) || 'false'
        const b = gmlGenerator.valueToCode(block, 'b', 0) || 'false'
        switch (op) {
            case 'and': return [`${a} && ${b}`, 13]
            case 'or': return [`${a} || ${b}`, 14]
            case 'xor': return [`${a} != ${b}`, 9]
            case 'nand': return [`!(${a} && ${b})`, 4.4]
            case 'nor': return [`!(${a} || ${b})`, 4.4]
            case 'xnor': return [`!(${a} != ${b})`, 4.4]
        }
    }
}