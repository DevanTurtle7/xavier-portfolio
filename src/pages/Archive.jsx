import '../style/archive.css';
import { useSelector } from 'react-redux';
import { archiveSelector } from '../shared/redux/selectors/archive_selector';
import MediaPageTemplate from '../shared/components/templates/MediaPageTemplate';

function Archive() {
    const media = useSelector(archiveSelector);

    return (
        <MediaPageTemplate bgColor='#000' textColor='#fff' pageTag='archive' media={media} centerContent={false} contentViewable={false} />
    );
}

export default Archive;
