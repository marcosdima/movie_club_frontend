import { useLayoutEffect, useState } from "react";

const SelectorSimple = ({ placeHolder, values, setter }) => {
    const [selection, setSelection] = useState('');
    const [clicked, setClicked] = useState(false)

    const filteredValues = values.filter(({ key }) => key.startsWith(selection))

    const onChange = (event) => setSelection(event?.target.value);

    const show = {
        display: (selection.length > 0 && !clicked) ? '' : 'none'
    }

    return (
        <div className="selector-simple">
            <input type="text" 
              onChange={onChange} 
              placeholder={placeHolder} 
              value={selection} 
              onClick={() => setClicked(false)}
            />
            <div style={show}>
                {
                    filteredValues.map(({key, id}) => (
                        <div 
                            key={id} 
                            label={key} 
                            onClick={() => {
                                setClicked(true)
                                setter(id);
                                setSelection(key);
                            }} 
                            >
                                {key}
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default SelectorSimple;