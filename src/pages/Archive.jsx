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
import { useSelector } from 'react-redux';
import { archiveSelector } from '../shared/redux/selectors/archive_selector';
import MediaPageWrapper from '../shared/components/templates/MediaPageWrapper';

function Archive() {
    const media = useSelector(archiveSelector);

    return (
        <MediaPageWrapper bgColor='#000' textColor='#fff' pageTag='archive' media={media} centerContent={false} contentViewable={false} />
    );
}

export default Archive;
