import * as React from 'react'

import './Hello.css';

export interface IProps {
    name: string;
    enthusiasmLevel?: number
}

export default function Hello({name, enthusiasmLevel = 1}: IProps) {
    if (enthusiasmLevel <= 0) {
        throw new Error('Your could be a little more enthusiastic. :D')
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    )
}

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join("!");
}
