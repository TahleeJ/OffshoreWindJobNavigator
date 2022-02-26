import React from 'react';
import { Label } from '../../firebase/Types';
import { hasId } from '../../redux/dataSlice.ts';

/** The props (arguments) to create this element */
interface props {
    labels: (Label & hasId & { isEnabled: boolean })[];
    toggleLabel: (id: string) => void;
    handleClose: (event: React.MouseEvent) => void;

    top: number;
    left: number;
}

/** The header of the application. */
const LabelSelector: React.FC<props> = (props) => {
    return (
        <div className='transparentBackground' onClick={(e) => props.handleClose(e)}>
            <div className='dropdown' style={{ top: props.top + 35, left: props.left - 100 }} onClick={e => e.stopPropagation()}>
                <div className='title'>Labels</div>
                {props.labels.length > 0 ?
                    props.labels.map((label, ind) => {
                        // console.log(label)
                        return <div key={ind} className={"labelChoice" + (label.isEnabled ? " active" : "")} onClick={() => props.toggleLabel(label.id)}>
                            {/* {label.isEnabled ? <i className="fas fa-link"></i> : null} */}
                            {label.isEnabled ? "✓ " : null}
                            {label.name}
                            </div>
                    })
                    : null
                }
            </div>

        </div>
    )
}

export default LabelSelector

