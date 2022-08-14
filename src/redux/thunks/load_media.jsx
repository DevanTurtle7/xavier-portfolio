import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, Firestore } from "firebase/firestore";

const IMG_URL = "https://xavier-portfolio.s3.us-east-2.amazonaws.com/";

export const fetchMedia = createAsyncThunk(
  "fetchMedia",
  async ({ db, collectionName }) => {
    console.log("Retrieving data...");

    // Get all docs from collection
    const querySnapshot = await getDocs(collection(db, collectionName));
    const media = [];

    // Iterate over all of the documents in the collection
    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const type = data.type;
      const order = data.order;
      let current;

      if (type === "media") {
        const description = data.description;
        const currentContent = [];
        const content = data.content;

        // Iterate over the content
        for (let i = 0; i < content.length; i++) {
          const fileInfo = content[i];
          const fileName = fileInfo.filename;
          const fileType = fileInfo.type;

          const url = IMG_URL + fileName;

          // Save the content to the array
          currentContent.push({ url: url, type: fileType });
        }

        // Create a JSON object from this document
        current = {
          description: description,
          order: order,
          content: currentContent,
          type: "media",
          link: data.link,
        };
      } else if (type === "text") {
        let content = data.content;
        const size = data.size;

        content = content.replaceAll("$[n]", "\n");

        // Create a JSON object from this document
        current = {
          content: content,
          order: order,
          type: "text",
          size: size,
          link: data.link,
        };
      } else if (type === "folder") {
        console.log(data);
        let content = data.content;
        let description = data.description;
        let currentContent = [];

        for (let i = 0; i < content.length; i++) {
          const info = content[i];
          const currentType = info.type;

          if (currentType === "image" || currentType === "video") {
            const fileName = info.filename;
            const url = IMG_URL + fileName;

            // Save the content to the array
            currentContent.push({ url: url, type: currentType });
          } else if (currentType === "text") {
            currentContent.push({
              content: info.content,
              type: currentType,
              size: info.size,
            });
          }
        }

        current = {
          content: currentContent,
          order: order,
          type: "folder",
          description: description,
        };
      } else {
        console.log("Invalid type: " + type);
      }

      if (current !== undefined) {
        // Insert the current object into the list of media in a sorted manner
        const mediaCount = media.length;

        if (mediaCount > 0) {
          // Insert sorted
          let i = 0;
          let indexFound = false;

          // Linear search
          while (i < mediaCount && !indexFound) {
            let currentOrder = media[i].order;

            if (currentOrder >= order) {
              indexFound = true;
            } else {
              i += 1;
            }
          }

          media.splice(i, 0, current);
        } else {
          media.push(current);
        }
      }
    });

    console.log("Data retrieved");
    console.log(media);
    return { collection: collectionName, media };
  }
);
