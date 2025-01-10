import React, { useState } from 'react';
import './App.css';
import Select, { Option } from './components/Select.tsx';

type FormData = {
	name: string,
	email: string,
	age: string,
	multipleSelect: Option[],
	singleSelect: Option
}

const hobbies: Option[] = [
	{ value: 1, label: 'Reading' },
	{ value: 2, label: 'Traveling' },
	{ value: 3, label: 'Gaming' },
	{ value: 4, label: 'Cooking' },
	{ value: 5, label: 'Sports' },
	{ value: 6, label: 'Music' },
	{ value: 7, label: 'Photography' },
];

const status: Option[] = [
	{ value: 1, label: 'Single' },
	{ value: 2, label: 'Married' },
	{ value: 3, label: 'Divorced' },
	{ value: 4, label: 'Widowed' },
]

function App() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		age: "",
		multipleSelect: [] as Option[],
		singleSelect: {} as Option
	});
	
	const inputs = [
		{ label: 'Name', type: 'text', name: 'name', value: formData.name },
		{ label: 'Email', type: 'email', name: 'email', value: formData.email },
		{ label: 'Age', type: 'number', name: 'age', value: formData.age },
	]
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	
	// Test for both options
	const handleSelectionChange = (field: 'singleSelect' | 'multipleSelect', selection: Option | Option[]) => {
		setFormData((prev) => ({ ...prev, [field]: selection }));
	};

	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
	};
	
	return (
		<form className='form-container' onSubmit={handleSubmit}>
			{ inputs.map(input => (
				<div className='form-group'>
					<label className='field-label'>{input.label}</label>
					<input type={input.type} name={input.name} value={input.value} onChange={handleInputChange}/>
				</div>
			))}
			
			<div style={{marginBottom: '15px'}}>
				<label className='field-label'>Marital Status</label>
				<Select options={status} onChange={(selection) => handleSelectionChange('singleSelect', selection)}/>
			</div>

			<div>
				<label className='field-label'>Hobbies</label>
				<Select multi options={hobbies} onChange={(selection) => handleSelectionChange('multipleSelect', selection)}/>
			</div>
			
			<button className='submit-btn' type="submit">Submit</button>
		</form>
	);
}

export default App;