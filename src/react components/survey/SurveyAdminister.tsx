import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { changePage, PageType } from '../../redux/navigationSlice';

interface props {

}

const SurveyAdminister: React.FC = (p: props) => {
    const dispatch = useAppDispatch();

    return (
        <div className='administerSurveyPage'>
            <div className='survey'>
                <div className='surveyTitle'>
                    Survey Title
                </div>
                <div className='description'>
                    This is the description of the survey. There probably should be instructions here, and potentially a brief background of why the survey is taken
                </div>
                <div className='questions'>
                    {/* The questions will go here. They will be mapped from the current survey */}
                    <div className='question frq'>
                        <div className='title'>This is an FRQ! What do you think of it?</div>
                        <textarea rows={5} placeholder='Answer...' />
                    </div>
                    <div className='question sq'>
                        <div className='title'>This is an Scaled Question! What do you think of it?</div>
                        <div className='answers'>
                            Strongly Disagree
                            <input type="radio" id="QUESTION_ID_1" name="QUESTIONID" placeholder='N/A' />
                            <input type="radio" id="QUESTION_ID_2" name="QUESTIONID" placeholder='N/A' />
                            <input type="radio" id="QUESTION_ID_3" name="QUESTIONID" placeholder='N/A' />
                            <input type="radio" id="QUESTION_ID_4" name="QUESTIONID" placeholder='N/A' />
                            <input type="radio" id="QUESTION_ID_5" name="QUESTIONID" placeholder='N/A' />
                            Strongly Agree
                        </div>
                    </div>
                    <div className='question mcq'>
                        <div className='title'>This is a multiple choice question! What do you think of it?</div>
                        <div className='answers'>
                            <input type="radio" id="QUESTION2_ID_1" name="QUESTIONID2" placeholder='N/A' />
                            <label htmlFor='QUESTION_ID_1'>Option 1</label>
                            <br />

                            <input type="radio" id="QUESTION2_ID_2" name="QUESTIONID2" placeholder='N/A' />
                            <label htmlFor='QUESTION2_ID_2'>Option 2</label>
                            <br />

                            <input type="radio" id="QUESTION2_ID_3" name="QUESTIONID2" placeholder='N/A' />
                            <label htmlFor='QUESTION2_ID_3'>Option 3</label>
                            <br />

                            <input type="radio" id="QUESTION2_ID_4" name="QUESTIONID2" placeholder='N/A' />
                            <label htmlFor='QUESTION2_ID_4'>Option 4</label>
                        </div>
                    </div>
                    <button onClick={() => { alert("Feature yet to submit to database"); dispatch(changePage({ type: PageType.Home })); }} className='gray'>Cancel Survey</button>
                    <button onClick={() => { alert("Feature yet to submit to database"); dispatch(changePage({ type: PageType.Home })); }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SurveyAdminister;