import React, { useCallback, useEffect, useRef, useState } from 'react';
import Option from './smallComponents/Option.tsx';
import debounce from 'lodash/debounce.js';
import SelectionComponent from './smallComponents/SelectedItems.tsx';
import SearchBox from './smallComponents/SearchBox.tsx';

export type Option = {
	label: string,
	value: number | string
}

type SelectProps = { 
	options: Option[],
	onChange: (selectedOptions: Option | Option[]) => void,
	placeholder?: string,
	multi?: boolean
}

const Select: React.FC<SelectProps> = ({ options, multi, placeholder = 'Select...', onChange }) => {
	const [open, setOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: Option }>({});
	const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
	const [searchValue, setSearchValue] = useState('');
	const selectContainerRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const selectedValue = Object.values(selectedOptions);

	useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !selectContainerRef.current?.contains(event.target as Node)) {
                setOpen(false);
				setSearchValue('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

	const toggleSelectBox = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setOpen(!open);
		setSearchValue('');
	}

	const debouncedSearch = useCallback(debounce((value: string) => {
        const filtered = options.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
        setFilteredOptions(filtered);
	}, 300), [options]); 

	useEffect(() => {
		if (!searchValue) {
			setFilteredOptions(options);
		} else { 
			debouncedSearch(searchValue);
		}
	}, [searchValue, options, debouncedSearch])

	const renderSelections = () => { 
		if (!selectedValue.length ) return placeholder;
		return multi ? <SelectionComponent selectedItems={selectedValue} removeItem={handleSelection}/> : selectedValue[0]?.label
	}
	
	const handleSelection = (option: Option) => {
		let newSelectedOptions: { [value: string]: Option } = {} 
		if (multi) {
			newSelectedOptions = { ...selectedOptions };
			if (newSelectedOptions[option.value]) {
				delete newSelectedOptions[option.value];
			} else {
				newSelectedOptions[option.value] = option;
			}
		} else {
			newSelectedOptions = { [option.value]: option }
		}

		setSelectedOptions(newSelectedOptions);
		onChange(multi ? Object.values(newSelectedOptions) : option);
	} 
	
	const handleToggleAll = () => {
		let newSelectedOptions: { [value: string]: Option } = {} 

		if (selectedValue.length !== options.length) { 
			newSelectedOptions = options.reduce((acc, option) => {
				acc[option.value] = option;
				return acc;
			}, {} as { [key: number]: Option });
		}

		setSelectedOptions(newSelectedOptions)
		onChange(Object.values(newSelectedOptions));
	}

	return (
		<div className='multi-select'>
			<div className='select-box' onClick={toggleSelectBox} ref={selectContainerRef}>
				<div className='selected-items'  >
					{renderSelections()}
				</div>
				<span className={`arrow ${open ? 'open' : ''}`}>
					<i className='fa fa-angle-down'></i>
				</span>
			</div>
			{ open && 
				<div className='dropdown' ref={dropdownRef}>
					<SearchBox searchValue={searchValue} onSearch={setSearchValue}/>
					{ multi && <div className='toggle-all-option'>
						<Option
							multi={multi}
							label='Select All'
							checked={Object.values(selectedOptions).length === options.length}
							onClick={handleToggleAll}
						/>
					</div> }

					<div className='options-wrapper'>
						{ filteredOptions.map((opt) => ( 
							<Option key={`${opt.value}-${opt.label}`} 
								multi={multi}
								label={opt.label} 
								checked={!!selectedOptions[opt.value]} 
								onClick={() => handleSelection(opt)}
							/>
						))} 
					</div>
				</div>
			}
		</div>
	)
}

export default Select;


