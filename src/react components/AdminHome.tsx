import React from 'react';
import { authInstance } from '../firebase/Firebase';
import { deleteSurvey, getSurveys } from '../firebase/Queries/SurveyQueries';
import { setSurveys } from '../redux/dataSlice.ts';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changePage, OperationType, PageType } from '../redux/navigationSlice';
import ListViewer from './ListViewer';
import ListElement from './survey/ListElement';

/** The props (arguments) to create this element */
interface props {

}

const AdminHome: React.FC<props> = (props) => {
    const surveys = useAppSelector(s => s.data.surveys);
    const jobOpps = useAppSelector(s => s.data.jobOpps)
    const appDispatch = useAppDispatch();
    const user = authInstance.currentUser;

    return (
        <div id="adminHome" className='adminContainer'> {/*Contains the whole page*/}
            <div className='topGrid'> {/*top part (notif center, job ops, surveys*/}
                <div className='leftColumn'>
                    {/* <div className='notifHeading'>
                        <div className='notifNumCircle'>
                            <h3 id='notifNum'>{unresolvedResponses}</h3>
                        </div>
                        <h3 id='newResponsePrompt'>New Responses</h3>
                    </div> */}
                    <div className='notifContainer'>
                        <ListViewer height="100%" title='New Responses'>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                            <div>TODO: Add responses</div>
                        </ListViewer>
                    </div>
                </div>
                <div className='middleColumn'>
                    {/* <h3 id='jobName'>Job Opportunities</h3> */}
                    <div className='jobContainer'>
                        <ListViewer height="350px" title='Job Opportunities' handleNew={() => appDispatch(changePage({ type: PageType.JobManage, operation: OperationType.Creating }))} >
                            <ListElement type = "Job Opportunity" name="Test job opp" handleEdit={() => appDispatch(changePage({ type: PageType.JobManage, operation: OperationType.Editing }))} handleDelete={() => alert("This function has not been completed yet.")} />
                            <ListElement type = "Job Opportunity" name="Test job opp" handleEdit={() => appDispatch(changePage({ type: PageType.JobManage, operation: OperationType.Editing }))} handleDelete={() => alert("This function has not been completed yet.")} />
                            <ListElement type = "Job Opportunity" name="Test job opp" handleEdit={() => appDispatch(changePage({ type: PageType.JobManage, operation: OperationType.Editing }))} handleDelete={() => alert("This function has not been completed yet.")} />
                            {jobOpps.length > 0 ?
                                jobOpps.map((jobOpp, ind) => {
                                    return <ListElement
                                        key={ind}
                                        type = "Job Opportunity"
                                        name={jobOpp.jobName}
                                        handleEdit={() => appDispatch(changePage({ type: PageType.JobManage, operation: OperationType.Editing, data: jobOpp }))} // does not actually handle edits yet
                                        handleDelete={() => alert("This function has not been completed yet.")}
                                    />
                                })
                                : <div>Click the "New" button to create a new job opportunity</div>
                            }
                        </ListViewer>
                    </div>
                    {/* <h3 id='surveyName'>Surveys</h3> */}
                    <div className='surveyContainer'>
                        <ListViewer height="350px" title='Survey Templates' handleNew={() => appDispatch(changePage({ type: PageType.Survey, operation: OperationType.Creating }))}>
                            {surveys.length > 0 ?
                                surveys.map((survey, ind) => {
                                    return <ListElement
                                        key={ind}
                                        type = "Survey"
                                        name={survey.title}
                                        handleEdit={() => appDispatch(changePage({ type: PageType.Survey, operation: OperationType.Editing, data: survey }))}
                                        handleDelete={async () => { await deleteSurvey(survey.id); appDispatch(setSurveys(await getSurveys()))}}
                                    />
                                })
                                : <div>Click the "New" button to create a new survey template</div>
                            }
                        </ListViewer>
                    </div>
                </div>
                <div className='rightColumn'>
                    <div className="userInfo">
                        <p>
                            {user?.email}
                            <br />
                            Administrator
                        </p>
                    </div>
                    <div className='adminButtons'>
                        <button className='manageLabel' onClick={() => { appDispatch(changePage({ type: PageType.LabelManage })) }}>Manage Labels</button>
                        <button className='red' onClick={() => { appDispatch(changePage({ type: PageType.AdminManage })) }}>Manage Admins</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;