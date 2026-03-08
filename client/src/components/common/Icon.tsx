import IcomoonReact from 'icomoon-react';
import iconSet from '../../../public/icon-font/selection.json';

function Icon(props) {
    return (
        <IcomoonReact
            iconSet={iconSet}
            {...props}
        />
    )
}

export default Icon