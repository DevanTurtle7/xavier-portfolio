import { useSelector } from 'react-redux';
import { artSelector } from '../shared/redux/selectors/art_selector';
import MediaPageTemplate from '../shared/components/templates/MediaPageTemplate';

export default function Art() {
    const media = useSelector(artSelector);

    return (
        <MediaPageTemplate
            bgColor='#fff'
            textColor='#000'
            pageTag='art'
            media={media}
        />
    );
}
