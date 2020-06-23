import React from 'react'

const CharDumb = (props) => {

    let style = {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'normal',
        display: 'inline-block',
        padding: '16px',
        textAlign: 'center',
        margin: '16px',
        border: '1px solid black',
    };

    // set color depends on correctness
    if (props.char === String(props.inputChar).toLowerCase()) {
        style.backgroundColor = 'lightgreen';
        style.color = 'green';
        style.fontWeight = 'bold';
    } else if(props.inputChar && props.char !== props.inputChar){
        style.backgroundColor = 'salmon';
        style.color = 'red';
        style.fontWeight = 'bold';
    }

    return <p style={style}>
        {props.char}</p>;
}

export default CharDumb