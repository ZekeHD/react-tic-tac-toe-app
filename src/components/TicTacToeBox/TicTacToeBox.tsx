import xIcon from '../../assets/x.svg';
import oIcon from '../../assets/o.svg';
import { MouseEventHandler } from 'react';

import './TicTacToeBox.css';

type TicTacToeBoxArgs = {
  symbol: string,
  clickHandler: MouseEventHandler,
};

function TicTacToeBox({ symbol, clickHandler }: TicTacToeBoxArgs) {
  let icon;
  if (symbol === 'x') icon = xIcon;
  else if (symbol === 'o') icon = oIcon;

  return (
    <div className="box-container" onClick={clickHandler}>
      { icon && <img src={icon} /> }
    </div>
  );
}

export default TicTacToeBox;