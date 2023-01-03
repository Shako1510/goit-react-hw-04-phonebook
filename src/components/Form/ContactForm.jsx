import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormBox, ButtonAdd, InputBox, LabelBox } from './FormStyled';

export function Form({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');


    const handleInputChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'number':
                setNumber(value)
                break;
            default:
                console.log('incorrect input name');
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        onSubmit({ name, number });
        setName('');
        setNumber('');
    };

    return (
        <FormBox>
            <form onSubmit={handleSubmit}>
                <LabelBox >Name
                    <InputBox
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={handleInputChange}
                        value={name}

                    />
                </LabelBox>

                <LabelBox>Number
                    <InputBox
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={handleInputChange}
                        value={number}
                    />
                </LabelBox>

                <ButtonAdd type="submit">Add contact</ButtonAdd>
            </form>
        </FormBox >
    )

}

export default Form;

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,

};


