import { Color, Tag } from '~/model/enums';

export const tagsConfig: Record<Tag, { color: Color }> = {
  [Tag.Low]: {
    color: Color.Purple,
  },
  [Tag.Medium]: {
    color: Color.Yellow,
  },
  [Tag.High]: {
    color: Color.Orange,
  },
  [Tag.Critical]: {
    color: Color.Red,
  },
  [Tag.Design]: {
    color: Color.Pink,
  },
  [Tag.Development]: {
    color: Color.Green,
  },
  [Tag.Research]: {
    color: Color.Cyan,
  },
};

export const TAGS = Object.keys(tagsConfig);
