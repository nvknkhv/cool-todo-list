import React, { FC } from 'react';
import { Grid, GridItem, Text, List, ListItem } from '@chakra-ui/react';

const KeyList: FC<{ data: Record<string, any> }> = ({ data }) => (
  <>
    {Object.entries(data).map(([key, value]) => (
      <Grid templateColumns="150px 1fr" gap={8} key={key}>
        <GridItem>
          <Text as="b">{key}</Text>
        </GridItem>
        <GridItem mb={4}>
          {Array.isArray(value) ? (
            value.length === 0 ? (
              '-'
            ) : (
              <List>
                {value.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </List>
            )
          ) : typeof value === 'string' ? (
            <Text>{value || '-'}</Text>
          ) : (
            value
          )}
        </GridItem>
      </Grid>
    ))}
  </>
);

export default KeyList;
