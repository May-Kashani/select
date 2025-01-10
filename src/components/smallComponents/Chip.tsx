import React from "react";
import { Option } from "../Select";

type ChipProps = {
    item: Option;
    handleRemove: (item: Option) => void;
};

const Chip: React.FC<ChipProps> = ({ item, handleRemove }) => { 
	const onRemoveClick = (e) => {
		e.stopPropagation(); 
		handleRemove(item);
	}
	return (
		<span className="chip">
			{item.label}
			<div className='x-icon' onClick={onRemoveClick}>×</div>
		</span>
	)
}

export default Chip;