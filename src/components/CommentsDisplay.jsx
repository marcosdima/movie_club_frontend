import { useEffect, useState } from "react";
import genericService from "../services/genericService";
import { useSelector } from "react-redux";

const CommentsDisplay = ({ activityId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const group = useSelector((state) => state.group);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const getComments = async () => setComments(await genericService.getAll(`comments/${activityId}`));
        if (group && activityId) getComments();
    }, [group])

    const commentSomething = async () => {
        await genericService.create('comments', {
            writer: user.id,
            activity: activityId,
            content: text
        });
        setText('')
    } 
    if (!group || !activityId || comments.length == 0) return <></>;

    return (
        <div className='comments'>
            <h3>Comments:</h3>
            <div className="comments-body">
                {
                    comments.map((({ content, writer: { name }, id }) => <p key={id}>{ name }: { content }</p>))
                }
            </div>    
            <div>
                Comment something: 
                <input type="text" onChange={({ target }) => setText(target.value)} value={text} />
                <button onClick={() => commentSomething()}>Send</button>
            </div>
        </div>
    )
};

export default CommentsDisplay;