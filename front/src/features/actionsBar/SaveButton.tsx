import styled from 'styled-components';

const CustomButton = styled.button`
  background: url(http://1.bp.blogspot.com/-wxcJjtN_eNg/VMSacTkLMFI/AAAAAAAADSk/fPRt0eC89BM/s320/tileable_wood_texture.png);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.2),
        inset 0px -5px 0px 0px rgba(0,0,0,0.3),
     inset 0px 2px 0px 0px rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 8px 24px;
  position: relative;

  &:active {
    box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.2),
          inset 0px -2px 0px 0px rgba(0,0,0,0.3),
       inset 0px 2px 0px 0px rgba(255,255,255,0.5);
    top: 3px;
  }
`;

interface SaveButtonProps {
  onSave?: () => void;
}

export function SaveButton({ onSave }: SaveButtonProps) {
  return <CustomButton onClick={onSave}>Save</CustomButton>;
}
