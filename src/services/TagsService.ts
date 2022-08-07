import lsRequest from '~/api';
import { TAGS } from '~/assets/tagsConfig';
import { Tag } from '~/model/enums';

const TAGS_KEY = 'TAGS';

class KeywordsAPI {
  getKeywords = async (substr: string): Promise<Tag[]> => {
    if (!localStorage.getItem(TAGS_KEY)) {
      await lsRequest.setItem(TAGS_KEY, JSON.stringify(TAGS));
    }
    return lsRequest
      .getItem(TAGS_KEY)
      .then((data) => JSON.parse(<string>data))
      .then((tagsArr: Tag[]) => tagsArr.filter((tag) => tag.includes(substr)));
  };
}

export default new KeywordsAPI();
