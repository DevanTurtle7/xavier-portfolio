import '../style/credits.css';

import {useEffect, useState} from 'react';
import Footer from '../shared/components/Footer';
import Navbar from '../shared/components/Navbar';
import {useSelector} from 'react-redux';
import {creditsSelector} from '../shared/redux/selectors/credits_selector';

const BG_COLOR = '#000';
const TEXT_COLOR = '#fff';
const PAGE_TAG = 'credits';

function Credits(props) {
  const [colorsUpdated, setColorsUpdated] = useState(false);
  const credits = useSelector(creditsSelector);

  useEffect(() => {
    if (!colorsUpdated) {
      // Set theme colors
      document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
      document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);
      setColorsUpdated(true);
    }
  }, [colorsUpdated]);

  return (
    <div id='credits-root'>
      <Navbar tag={PAGE_TAG} />
      <div className='credits-col'>
        <p className='credit'>
          <b>special thanks to:</b>
        </p>
        {credits.map((credit, i) =>
          credit.link === '' ? (
            <p className='credit' key={i}>
              {credit.name}
            </p>
          ) : (
            <a
              href={credit.link}
              className='credit-link'
              target='_blank'
              rel='noreferrer'
              key={i}
            >
              {credit.name}
            </a>
          )
        )}
      </div>
      <Footer tag={PAGE_TAG} />
    </div>
  );
}

export default Credits;
