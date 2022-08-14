/**
 * The art page of the site. Contains centered art images with descriptions.
 *
 * Props:
 *  media: An array of JSON objects that represent media on the page
 *
 * @author Devan Kavalchek
 */

import { Fragment, useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';

import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar';
import TextDisplay from '../components/TextDisplay';
import Footer from '../components/Footer';
import FolderDisplay from '../components/FolderDisplay';
import { useSelector } from 'react-redux';
import { artSelector } from '../redux/selectors/art_selector';

const BG_COLOR = '#fff';
const TEXT_COLOR = '#000';
const PAGE_TAG = 'art';

function Art(props) {
  const media = useSelector(artSelector);

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
      <MediaDisplay
        data={data}
        tag={PAGE_TAG}
        viewable={true}
        centered
        key={key}
      />
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
    return <TextDisplay data={data} tag={PAGE_TAG} centered key={key} />;
  };

  const createFolderDisplay = (data, key) => {
    return <FolderDisplay data={data} tag={PAGE_TAG} key={key} />;
  };

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
      }
    }, []);

  return (
    <Fragment>
      <Navbar tag={PAGE_TAG} bgColor={BG_COLOR} />
      <Col className={PAGE_TAG}>{getDisplays()}</Col>
      <Footer tag={PAGE_TAG} />
    </Fragment>
  );
}

export default Art;
