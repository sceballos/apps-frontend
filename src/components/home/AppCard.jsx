import { Card, Badge } from 'react-bootstrap';
import convertDate from './../../util.js';

function AppCard({ app, loggedUser, handleClick, isSelected}) {
    const maxTextLength = 100;

    return (
        <div className="row-lg-1 d-flex align-items-stretch">
            <Card
                style={{ margin: '5px', display: 'inline-block', width: '250px', height: '250px', maxHeight: '250px' }}
                onClick={(e) => handleClick(e, app, loggedUser)}>
                <div style={{ margin: 5 }}>
                    {isSelected ? <Badge bg="danger">Selected</Badge>
                        : <Badge bg="info">{`Modified on ${convertDate(app.modified_on)}`}</Badge>}
                </div>
                <Card.Img
                    style={{ height: '10%', width: '10%' }}
                    variant="top"
                    src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=s180" />

                <Card.Body>
                    <Card.Title>
                        {app.name}
                    </Card.Title>
                    <Card.Text>
                        {app.description.substring(0, maxTextLength)} {app.description.length >= maxTextLength && '...'}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

    );

}

export default AppCard;