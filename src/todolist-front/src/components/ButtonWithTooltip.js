import React from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';

const ButtonWithTooltip = (props) => {
  return (
    <OverlayTrigger placement="top"
      delay={{ show: 100, hide: 100 }}
      overlay={
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: '2px 10px',
            color: 'white',
            borderRadius: 5
          }}>
          {props.tooltip}
        </div>}>

      <Button className="bt-tb-button"
        variant={props.variant}
        onClick={props.onClick}>
        {props.children}
      </Button>

    </OverlayTrigger>
  );
};

export default ButtonWithTooltip;
