import styled from 'styled-components';

const CustomInput = styled.input`
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  padding: 4px 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface InputNameProps {
  onChange?: (value: string) => void;
}

export function InputName({ onChange }: InputNameProps) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value);
  };

  return (
    <InputWrapper>
      <label htmlFor="input-name">Garden name</label>
      <CustomInput id="input-name" onChange={handleChange} />
    </InputWrapper>
  );
}
