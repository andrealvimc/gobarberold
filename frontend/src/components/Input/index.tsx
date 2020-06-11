import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core';
import { Container, ErrorContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ isFocus, setIsFocus ] = useState(false);
  const [ isFilled, setIsFilled ] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true)
  },[])

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);

    if(inputRef.current?.value){
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!! error} isFilled={isFilled} isFocus={isFocus}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
         />

         {error &&
            <ErrorContainer title={error}>
              <FiAlertCircle color='#c53030' size={20} />
            </ErrorContainer>
          }
    </Container>
  );
};

export default Input;
