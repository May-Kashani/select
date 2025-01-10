import React from 'react';
import Chip from './Chip.tsx';
import { Option } from '../Select.tsx';

type SelectedItemsProps = {
  selectedItems: Option[],
  removeItem: (option: Option) => void 
}

const SelectionComponent: React.FC<SelectedItemsProps> = ({selectedItems, removeItem}) => {
  return (
    <div className="selection-component">
      <div className="chips-wrapper">
        {selectedItems.map((item: Option) => (
            <Chip key={`${item.value}-${item.label}`} item={item} handleRemove={removeItem}/>
        ))}
      </div>
    </div>
  );
};

export default SelectionComponent;
