export interface JsonPatch {
  jsonpatch: Array<{ op: string; path: string; value: any }>;
}

import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AssetInfo } from "@lib/models/AssetInfo";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dgmss9oy4",
  },
  url: {
    secure: true,
  },
});

export function toImage(asset: AssetInfo): CloudinaryImage {
  return cld.image(asset.key).format(asset.format).setVersion(asset.version);
}
