import React from "react"

type OptionProps = {
    label: string;
    checked: boolean;
    onClick: () => void;
    multi?: boolean;
};

const Option: React.FC<OptionProps> = ({ label, checked, onClick, multi }) => {
    return (
        <div className='option' onClick={onClick}>
            { multi ? <input
                type="checkbox"
                checked={checked}
            /> : null }
            { label }
        </div>
    )
}


export default Option;