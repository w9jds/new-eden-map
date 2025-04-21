import React, { FC, ReactNode, useState } from 'react';

import './IconSwitch.scss';

type Props = {
  initialState?: number,
  icons: ReactNode[],
  onChange?: (index: number) => void,
  className?: string,
}

const IconSwitch: FC<Props> = ({
  initialState = 0,
  icons,
  onChange,
  className,
}) => {
  const [state, setState] = useState(Math.max(0, Math.min(icons.length - 1, initialState)));

  const handleIconClick = (index) => {
    if (index !== state) {
      setState(index);
      if (onChange) {
        onChange(index);
      }
    }
  };

  const stageClassName = `stage-${state}`;

  return (
    <div className={`icon-switch-container ${stageClassName} ${className}`} role="radiogroup">
      <div className="icon-switch-bubble" aria-hidden="true"></div>
      <div className="icon-switch-options">
        {icons.map((icon, index) => (
          <button
            key={index}
            type="button"
            className={`icon-switch-option ${state === index ? 'active' : ''}`}
            onClick={() => handleIconClick(index)}
            role="radio"
            aria-checked={state === index}
            aria-label={`Option ${index + 1}`}
            tabIndex={state === index ? 0 : -1}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default IconSwitch;
