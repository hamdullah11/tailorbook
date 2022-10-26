import { collection, getDocs } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { db } from "../../firebase";

const getImagesOfGallery = async () => {
  const storage = getStorage();
  const reference = collection(db, "globalImageGallery");

  let allImages = [];
  return getDocs(reference)
    .then((docs) => {
      docs.forEach((doc) => {
        allImages.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      return allImages;
    })
    .catch((err) => {
      console.log(err);
    });

  // let allImageRef = await listAll(reference);
  // if (allImageRef.items.length) {
  //   for (let i = 0; i < allImageRef.items.length; i++) {
  //     let url = await getDownloadURL(allImageRef.items[i]);
  //     let metaData = await getMetadata(allImageRef.items[i]);
  //     let name = metaData.name.split(".");
  //     allImages.push({
  //       id: i,
  //       Imgurl: url,
  //       name: name[0],
  //     });
  //     if (i == allImageRef.items.length - 1) {
  //       console.log(allImages);
  //       return allImages;
  //     }
  //   }
  // }
};

export default getImagesOfGallery;
