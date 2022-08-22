import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDocs, collection, query, orderBy} from 'firebase/firestore';

const BUCKET_NAME = 'xsj-portfolio';
const IMG_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/`;

export const fetchMedia = createAsyncThunk(
  'fetchMedia',
  async ({db, collectionName}) => {
    const q = query(collection(db, collectionName), orderBy('order'));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;

    return {
      collection: collectionName,
      media: docs.reduce((dataAccumulator, doc) => {
        const data = doc.data();
        const type = data.type;
        const content = data.content;

        return [
          ...dataAccumulator,
          {
            ...data,
            docId: doc.id,
            content:
              type === 'text'
                ? content.replaceAll('$[n]', '\n')
                : content.reduce((contentAccumulator, current) => {
                    if (type === 'media') {
                      return [
                        ...contentAccumulator,
                        {
                          ...current,
                          url: IMG_URL + current.filename,
                        },
                      ];
                    } else if (type === 'folder') {
                      const type = current.type;

                      if (type === 'image' || type === 'video') {
                        return [
                          ...contentAccumulator,
                          {
                            ...current,
                            url: IMG_URL + current.filename,
                          },
                        ];
                      } else if (type === 'text') {
                        return [...contentAccumulator, current];
                      } else {
                        console.log('Invalid folder child type: ' + type);
                        return [...contentAccumulator];
                      }
                    } else {
                      console.log('Invalid type: ' + type);
                      return [...contentAccumulator];
                    }
                  }, []),
          },
        ];
      }, []),
    };
  }
);
