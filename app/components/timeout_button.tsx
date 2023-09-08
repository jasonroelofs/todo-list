import {useEffect, useState} from 'react'

type Params = {
  onClick: () => null,
  disableMs: number,
  children: React.PropsWithChildren<{}>
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
