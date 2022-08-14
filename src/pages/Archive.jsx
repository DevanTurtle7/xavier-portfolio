/**
 * The archive page of the site. Displays media on the left hand side of the page,
 * with 2 vertical lines on the far left.
 *
 * Props:
 *  media: An array of JSON objects that represent media on the page
 *
 * @author Devan Kavalchek
 */

import '../style/archive.css';

import { useEffect } from 'react';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import MediaDisplay from '../shared/components/MediaDisplay';
import TextDisplay from '../shared/components/TextDisplay';
import FolderDisplay from '../shared/components/FolderDisplay';
import { useSelector } from 'react-redux';
import { archiveSelector } from '../shared/redux/selectors/archive_selector';

const BG_COLOR = '#000';
const TEXT_COLOR = '#fff';
const PAGE_TAG = 'archive';

function Archive(props) {
  const media = useSelector(archiveSelector);

  useEffect(() => {
    // Set theme colors
    document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
    document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
  }, []);

  /**
   * Creates a media display
   *
   * @param {*} data The JSON object of the document
   * @param {*} key A unique identifier used by React
   * @returns A MediaDisplay
   */
  const createMediaDisplay = (data, key) => {
    return (
      <MediaDisplay data={data} tag={PAGE_TAG} viewable={false} key={key} />
    );
  };

  /**
   * Creates a text display
   *
   * @param {*} data The JSON object of the document
   * @param {*} key A unique identifier used by React
   * @returns A TextDisplay
   */
  const createTextDisplay = (data, key) => {
    return <TextDisplay data={data} tag={PAGE_TAG} key={key} />;
  };

  const createFolderDisplay = (data, key) => {
    return <FolderDisplay data={data} tag={PAGE_TAG} key={key} />;
  };

  /**
   * Creates all of the displays on the page
   *
   * @return A list of all of the displays
   */
  const getDisplays = () =>
    media.reduce((displaysAccumulator, current, i) => {
      const type = current.type;
      const key = current.docId + i.toString();

      if (type === 'media') {
        return [...displaysAccumulator, createMediaDisplay(current, key)];
      } else if (type === 'text') {
        return [...displaysAccumulator, createTextDisplay(current, key)];
      } else if (type === 'folder') {
        return [...displaysAccumulator, createFolderDisplay(current, key)];
      } else {
        return [...displaysAccumulator];
      }
    }, []);

  return (
    <>
      <Navbar tag={PAGE_TAG} bgColor={BG_COLOR} />
      <div id={PAGE_TAG}>
        <div id="displays">{getDisplays()}</div>
      </div>
      <Footer tag={PAGE_TAG} />
    </>
  );
}

export default Archive;
