import { gif } from "../interfaces/gif.interfaces";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
    static mapGiphyToGif(item: GiphyItem): gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }
    }
    static mapGiphyItemsToGifArray(items: GiphyItem[]): gif[] {
        return items.map(this.mapGiphyToGif)
    }
}