import React, { useEffect } from 'react';

import MediaDisplay from '../MediaDisplay';
import Navbar from '../Navbar';
import TextDisplay from '../TextDisplay';
import Footer from '../Footer';
import FolderDisplay from '../FolderDisplay';

export default function MediaPageWrapper(props) {
    const bgColor = props.bgColor;
    const textColor = props.textColor;
    const pageTag = props.pageTag;
    const media = props.media;
    const centerContent = props.centerContent ?? true;
    const contentViewable = props.contentViewable ?? true;

    useEffect(() => {
        document.documentElement.style.setProperty('--bs-body-bg', bgColor);
        document.documentElement.style.setProperty('--bs-body-color', textColor);
    }, []);

    return (
        <>
            <Navbar tag={pageTag} bgColor={bgColor} />
            <div id={pageTag}>
                <div id="displays">
                    {media.reduce((displaysAccumulator, current, i) => {
                        const type = current.type;
                        const key = current.docId + i.toString();

                        if (type === 'media') {
                            return [
                                ...displaysAccumulator,
                                <MediaDisplay
                                    data={current}
                                    tag={pageTag}
                                    viewable={contentViewable}
                                    centered={centerContent}
                                    key={key}
                                />,
                            ];
                        } else if (type === 'text') {
                            return [
                                ...displaysAccumulator,
                                <TextDisplay
                                    data={current}
                                    tag={pageTag}
                                    centered={centerContent}
                                    key={key}
                                />,
                            ];
                        } else if (type === 'folder') {
                            return [
                                ...displaysAccumulator,
                                <FolderDisplay data={current} tag={pageTag} key={key} />,
                            ];
                        } else {
                            return [...displaysAccumulator];
                        }
                    }, [])}
                </div>
            </div>
            <Footer tag={pageTag} />
        </>
    );
}
