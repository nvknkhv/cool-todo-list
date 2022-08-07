import React, { FC } from 'react';
import { Grid, GridItem, Text, List, ListItem } from '@chakra-ui/react';

const KeyList: FC<{ data: Record<string, any> }> = ({ data }) => (
  <>
    {Object.entries(data).map(([key, value]) => (
      <Grid templateColumns="150px 1fr" gap={8} key={key}>
        <GridItem mb={4}>
          <Text as="b">{key}</Text>
        </GridItem>
        <GridItem>
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
          ) : (
            <Text>{value || '-'}</Text>
          )}
        </GridItem>
      </Grid>
    ))}
  </>
);

export default KeyList;
