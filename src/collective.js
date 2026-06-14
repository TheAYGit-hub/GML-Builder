import {Blockly, config, workspace} from 'src/main.js'

import addLogicBlocks from './blocks/logic'
import addNumbersBlocks from './blocks/numbers'

import addLogicGenerators from './generators/logic'
import addNumbersGenerators from './generators/numbers'

export default function addBlocksAndGenerators() {
    addLogicBlocks()
    addNumbersBlocks()

    addLogicGenerators()
    addNumbersGenerators()
}