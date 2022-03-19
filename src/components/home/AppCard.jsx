import { Card, Badge } from 'react-bootstrap';
import convertDate from '../../util/DateUtils.js';

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