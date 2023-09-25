import {useEffect, useState, ReactNode} from 'react'

type Params = {
  onClick: () => void,
  disableMs: number,
  children?: ReactNode
}

export function TimeoutButton({onClick, disableMs, children}: Params) {
  const [isDisabled, setDisabled] = useState(false);

  const clickWrapper = () => {
    setDisabled(true);

    onClick();

    setTimeout(() => setDisabled(false), disableMs);
  }

  return (
    <button onClick={clickWrapper} disabled={isDisabled}>{children}</button>
  )
}
