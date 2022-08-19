import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

const getSliderImages = async () => {
  const storage = getStorage();
  const refrance = ref(storage, "clothTypes");
  let allImages = [];

  listAll(refrance)
    .then((res) => {
      res.items.forEach((itemRef) => {
        //  All the items under listRef.

        getDownloadURL(itemRef).then((url) => {
          console.log("url", url);
          //   url && allImages.push(url);
          //   url && console.log(allImages);
        });
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};

export default getSliderImages;
