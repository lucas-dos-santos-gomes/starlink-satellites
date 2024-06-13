import { StyledButton } from "./style";
import * as PropTypes from 'prop-types';

export default function Button({ children, onClick, more }) {
  return (
    <StyledButton onClick={onClick} className="Btn" more={more ? 'more' : 'less'}>
      <div className="sign">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {/* Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          {more && <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>}
          {more || <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>}
        </svg>
      </div>
      <div className="text">{children}</div>
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  more: PropTypes.bool.isRequired
};