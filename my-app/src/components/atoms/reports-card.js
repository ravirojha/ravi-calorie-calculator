import React from 'react';
import { Card } from 'semantic-ui-react';

function ReportsCard({ header, data }) {
  return (
    <Card
      style={{
        height: '140px',
        width: '450px'
      }}
    >
      <Card.Content
        style={{
          padding: '35px'
        }}
      >
        <Card.Header
          style={{
            fontSize: '25px'
          }}
        >
          {header}
        </Card.Header>
        <Card.Description
          style={{
            fontSize: '25px'
          }}
        >
          {data}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default ReportsCard;
