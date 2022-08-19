import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";

const getImagesOfGallery = async () => {
  const storage = getStorage();
  const reference = ref(storage, "Gallery");
  let allImages = [];

  let allImageRef = await listAll(reference);
  if (allImageRef.items.length) {
    for (let i = 0; i < allImageRef.items.length; i++) {
      let url = await getDownloadURL(allImageRef.items[i]);
      let metaData = await getMetadata(allImageRef.items[i]);
      let name = metaData.name.split(".");
      allImages.push({
        id: i,
        Imgurl: url,
        name: name[0],
      });
      if (i == allImageRef.items.length - 1) {
        return allImages;
      }
    }
  }
};

export default getImagesOfGallery;
