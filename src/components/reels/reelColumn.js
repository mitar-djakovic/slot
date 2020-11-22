import React from 'react';
import { Container } from 'react-pixi-fiber';
import ReelSymbol from "./reelSymbol";
import { symbolWidth } from "../../helpers/size";

const ReelColumn = ({ symbols, position, columnPosition }) => {
  const positionX = symbolWidth() * position;

  return (
    <Container x={positionX}>
      {symbols.map((symbol, position) => (
        <ReelSymbol
          key={`reelSymbol#${position}`}
          symbol={symbol}
          position={position}
          columnPosition={columnPosition.position}
        />
      ))}
    </Container>
  )
}

export default ReelColumn;
