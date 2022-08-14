import { useSelector } from 'react-redux';
import { artSelector } from '../shared/redux/selectors/art_selector';
import MediaPageWrapper from '../shared/components/templates/MediaPageWrapper';

export default function Art() {
    const media = useSelector(artSelector);

    return (
        <MediaPageWrapper
            bgColor='#fff'
            textColor='#000'
            pageTag='art'
            media={media}
        />
    );
}
